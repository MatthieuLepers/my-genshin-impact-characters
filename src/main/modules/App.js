import os from 'os';
import fs from 'fs';
import merge from 'deepmerge';
import Module from './Module';
import WindowStore from './Window/Store';

const STATIC_DIR = process.env.NODE_ENV === 'development'
  ? `${process.cwd()}/static`
  : require('path').join(__dirname, '/static').replace(/\\/g, '/')
;

function $handleLoadDataSync(e) {
  const baseDir = `${os.homedir()}/Documents`;
  const fileName = 'genshin-impact-character.json';
  const filePath = `${baseDir}/${fileName}`;
  const defaultFilePath = `${STATIC_DIR}/${fileName}`;
  if (!fs.existsSync(filePath)) {
    fs.copyFileSync(defaultFilePath, filePath);
    const data = JSON.parse(`${fs.readFileSync(filePath)}`);
    WindowStore.broadcastData('set-locale', data.locale || 'fr-FR');
    e.returnValue = data;
  } else {
    const data = merge(
      JSON.parse(`${fs.readFileSync(defaultFilePath)}`),
      JSON.parse(`${fs.readFileSync(filePath)}`),
    );
    WindowStore.broadcastData('set-locale', data.locale || 'fr-FR');
    e.returnValue = data;
  }
}

function $handleSaveDataSync(e, data) {
  const baseDir = `${os.homedir()}/Documents`;
  const fileName = 'genshin-impact-character.json';
  const filePath = `${baseDir}/${fileName}`;

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    e.returnValue = true;
  } catch (ex) {
    e.returnValue = false;
  }
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class AppModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.on('load-data', $handleLoadDataSync);
    ipcMain.on('save-data', $handleSaveDataSync);
  }
}

export default new AppModule();
