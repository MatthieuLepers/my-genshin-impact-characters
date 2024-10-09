import os from 'os';

export const APP_PLATEFORM = os.platform();

export const HOME_DIR = os.homedir();

export const IS_DEV = process.env.NODE_ENV === 'development';

export const BASE_PATH = `${HOME_DIR}/Documents`;

export const LEGACY_FILE = `${BASE_PATH}/genshin-impact-character.json`;

export const DATABASE_FILE = IS_DEV
  ? './database.sqlite3'
  : `${BASE_PATH}/my-genshin-impact-characters.sqlite3`
;
