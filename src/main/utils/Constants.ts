import os from 'os';

export const APP_PLATEFORM = os.platform();

export const HOME_DIR = os.homedir();

export const IS_DEV = process.env.NODE_ENV === 'development';
