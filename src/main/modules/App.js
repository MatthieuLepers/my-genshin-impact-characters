import os from 'os';
import fs from 'fs';
import Module from './Module';

function $handleLoadDataSync(e) {
  const baseDir = `${os.homedir()}/Documents`;
  const fileName = 'genshin-impact-character.json';
  const filePath = `${baseDir}/${fileName}`;
  const defaultFilePath = `static/${fileName}`;
  if (!fs.existsSync(filePath)) {
    fs.copyFileSync(defaultFilePath, filePath);
  }
  e.returnValue = JSON.parse(`${fs.readFileSync(filePath)}`);
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
