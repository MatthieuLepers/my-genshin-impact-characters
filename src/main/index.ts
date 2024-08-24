import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { autoUpdater } from 'electron-updater';

import { sequelize, migrateUp } from '@/main/database';
import { Setting } from '@/main/database/models';
import ElectronWindow from '@/main/classes/ElectronWindow';
import { APP_PLATEFORM } from '@/main/utils/Constants';

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

app
  .whenReady()
  .then(async () => {
    electronApp.setAppUserModelId('vite.electron.my-genshin-impact-characters');

    const AppModule = await import('@/main/modules/App');
    AppModule.default();

    createWindow();

    await sequelize.sync();
    await Setting.createDefault();
    await migrateUp();

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
    app.dock.hide();
    app.setActivationPolicy('accessory');
  } else {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (APP_PLATEFORM === 'darwin') {
    app.dock.hide();
    app.setActivationPolicy('accessory');
    app.quit();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 * https://github.com/iffy/electron-updater-example
 */
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', () => {
  if (!is.dev) autoUpdater.checkForUpdates();
});
