import type { Identifier } from 'sequelize';
import { dialog, OpenDialogOptions, type SaveDialogOptions } from 'electron';
import { autoUpdater } from 'electron-updater';
import fs from 'fs';
import Ajv from 'ajv';

import { IpcHandle, IpcOn, GlobalShortcut } from '@/main/decorators';
import { Setting, Artefact } from '@/main/database/models';
import WindowStore from '@/main/stores/WindowStore';
import ArtefactSchema from '@/main/public/schemas/artefact.schema.json';

class AppModule {
  @IpcHandle
  static async localeChange(iso: string): Promise<void> {
    WindowStore.broadcastData('localeChange', iso);

    const localeSetting = await Setting.findByPk('locale');
    if (localeSetting) {
      await localeSetting.update({ value: iso });
    }
  }

  @IpcHandle
  static async sendDataToWindow(windowName: string, channel: string, ...args: any[]): Promise<void> {
    WindowStore.sendData(windowName, channel, ...args);
  }

  @IpcHandle
  static async exportArtefact(identifier: Identifier, dialogOptions: SaveDialogOptions): Promise<void> {
    const obj = await Artefact.findByPk(identifier);
    if (obj) {
      const mainWindow = WindowStore.get('main')!;
      const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, dialogOptions);

      if (!canceled && filePath?.length) {
        const { type, setId, statsJson } = obj;
        fs.writeFileSync(filePath, JSON.stringify({ type, setId, statsJson }, null, 2));
      }
    }
  }

  @IpcHandle
  static async importArtefact(dialogOptions: OpenDialogOptions): Promise<string | null> {
    const mainWindow = WindowStore.get('main')!;
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, dialogOptions);

    if (canceled || !filePaths.length || !fs.existsSync(filePaths[0])) return null;

    const fileContent = `${fs.readFileSync(filePaths[0])}`;
    const validator = new Ajv();

    try {
      const valid = validator.validate(ArtefactSchema, JSON.parse(fileContent));
      console.log(validator.errors);
      if (valid) {
        return fileContent;
      }
      return null;
    } catch (e) {
      return null;
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
