import fs from 'fs';
import Module from './Module';
import WindowsStore from './Window/Store';

/**
 * @param {IpcMainEvent} e
 * @param {String} filePath
 * @param {Object} data
 */
function $handleWriteFileSync(e, filePath, data) {
  e.returnValue = fs.writeFileSync(filePath, data);
}

/**
 * @param {IpcMainEvent} e
 * @param {String} filePath
 */
function $handleReadFileSync(e, filePath) {
  e.returnValue = `${fs.readFileSync(filePath)}`;
}

/**
 * @param {IpcMainEvent} e
 * @param {String} iso
 */
function $handleLocaleChangeAsync(e, iso) {
  WindowsStore.broadcastData('set-locale', iso);
}

/**
 * @param {IPCMainEvent} e
 * @param {String} name
 * @param {String} channel
 * @param  {...any} args
 */
function $handleSendDataToWindow(e, name, channel, ...args) {
  WindowsStore.sendData(name, channel, ...args);
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class ElectronUIModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.on('write-file-sync', $handleWriteFileSync);
    ipcMain.on('read-file-sync', $handleReadFileSync);
    ipcMain.handle('locale-change', $handleLocaleChangeAsync);
    ipcMain.handle('send-data-to-window', $handleSendDataToWindow);
  }
}

export default new ElectronUIModule();
