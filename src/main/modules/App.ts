import fs from 'fs';
import os from 'os';
import merge from 'deepmerge';
import { autoUpdater } from 'electron-updater';
import database from '@renderer/assets/genshin-impact-character';

import { IpcHandle, IpcOn, GlobalShortcut } from '@/main/decorators';
import WindowStore from '@/main/stores/WindowStore';

class AppModule {
  @IpcHandle
  static async localeChange(iso: string): Promise<void> {
    WindowStore.broadcastData('localeChange', iso);
  }

  @IpcHandle
  static async sendDataToWindow(windowName: string, channel: string, ...args: any[]): Promise<void> {
    WindowStore.sendData(windowName, channel, ...args);
  }

  @IpcOn
  static readDirSync({ path, onlyFiles, onlyDirectories }) {
    const dirContent = fs.readdirSync(path);
    return dirContent.filter((file) => {
      if (onlyFiles || onlyDirectories) {
        const stats = fs.lstatSync(`${path}/${file}`);
        return (onlyFiles && stats.isFile()) || (onlyDirectories && stats.isDirectory());
      }
      return true;
    });
  }

  @IpcOn
  static loadData() {
    const baseDir = `${os.homedir()}/Documents`;
    const fileName = 'genshin-impact-character.json';
    const filePath = `${baseDir}/${fileName}`;

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(database, null, 2));
      WindowStore.broadcastData('set-locale', database.locale || 'fr-FR');
      return database;
    }
    const data = merge(
      database,
      JSON.parse(`${fs.readFileSync(filePath)}`),
    );
    WindowStore.broadcastData('set-locale', data.locale || 'fr-FR');
    return data;
  }

  @IpcOn
  static saveData(json: string) {
    const baseDir = `${os.homedir()}/Documents`;
    const fileName = 'genshin-impact-character.json';
    const filePath = `${baseDir}/${fileName}`;

    try {
      fs.writeFileSync(filePath, json);
      return true;
    } catch (ex) {
      return false;
    }
  }

  @IpcOn
  static databaseReady() {
    WindowStore.getVisibleWindows().forEach((win) => {
      win.sendData('database-ready');
      win.webContents.addListener('did-finish-load', () => {
        win.sendData('database-ready');
      });
    });
  }

  @IpcOn
  static quitAndInstallUpdate() {
    autoUpdater.quitAndInstall();
  }

  @GlobalShortcut('Alt+F4')
  static closeAppNonDarwin() {
    const win = WindowStore.get('main');
    if (win) {
      win.close();
    }
  }

  @GlobalShortcut('Command+Q')
  static closeAppDarwin() {
    const win = WindowStore.get('main');
    if (win) {
      win.close();
    }
  }
}

export default () => AppModule;
