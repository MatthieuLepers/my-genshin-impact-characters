import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { autoUpdater } from 'electron-updater';

import { sequelize } from '@/main/database';
import { Setting } from '@/main/database/models';
import ElectronWindow from '@/main/classes/ElectronWindow';
import { APP_PLATEFORM } from '@/main/utils/Constants';
import { store } from '@/main/stores/WindowStore';
import { registerAllGlobalShortcuts, registerAllIpcHandlers } from './decorators';

function createWindow() {
  const mainWindow = new ElectronWindow('main', {
    width: 1000,
    height: 563,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      allowRunningInsecureContent: false,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      devTools: is.dev,
    },
    icon: 'public/icons/icon16x.png',
  });
  mainWindow.init();
}

// Prevent app to flicker on starts
app.commandLine.appendSwitch('disable-gpu');

app
  .whenReady()
  .then(async () => {
    electronApp.setAppUserModelId('vite.electron.my-genshin-impact-characters');

    const { init: AppModule } = await import('@/main/modules/App.js');
    AppModule();

    createWindow();
    registerAllIpcHandlers();
    registerAllGlobalShortcuts();

    await sequelize.sync();
    await Setting.createDefault();

    if (is.dev) {
      // eslint-disable-next-line import/no-extraneous-dependencies
      const installExtension = require('electron-devtools-installer');
      await installExtension.default(installExtension.VUEJS_DEVTOOLS, { loadExtensionOptions: { allowFileAccess: true } })
        .then((name: string) => console.log(`Added Extension: ${name}`))
        .catch((err: Error) => console.log('An error occurred: ', err))
      ;
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });
  })
;

app.on('window-all-closed', () => {
  if (APP_PLATEFORM === 'darwin') {
    app.dock?.hide();
    app.setActivationPolicy('accessory');
  } else {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (APP_PLATEFORM === 'darwin') {
    app.dock?.hide();
    app.setActivationPolicy('accessory');
    app.quit();
  }
});

autoUpdater.on('update-available', () => {
  store.broadcastData('update-available');
});

autoUpdater.on('download-progress', (progressObj) => {
  store.broadcastData('download-progress', progressObj.percent);
});

autoUpdater.on('update-downloaded', () => {
  store.broadcastData('update-downloaded');
});

app.on('ready', () => {
  if (!is.dev) autoUpdater.checkForUpdates();
});
