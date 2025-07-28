import { ipcMain, globalShortcut } from 'electron';
import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

export const ipcHandlers: Array<{
  type: 'handle' | 'on';
  name: string;
  fn: Function;
}> = [];

export const shortcuts: Array<{
  key: string;
  fn: Function;
}> = [];

export const IpcHandle = (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  ipcHandlers.push({
    type: 'handle',
    name: propertyKey,
    fn: descriptor.value.bind(target),
  });
  return descriptor;
};

export const IpcOn = (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  ipcHandlers.push({
    type: 'on',
    name: propertyKey,
    fn: descriptor.value.bind(target),
  });
  return descriptor;
};

export const GlobalShortcut = (accelerator: string) => (target: any, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  shortcuts.push({
    key: accelerator,
    fn: descriptor.value.bind(target),
  });
  return descriptor;
};

export function registerAllIpcHandlers() {
  ipcHandlers.forEach(({ type, name, fn }) => {
    if (type === 'handle') {
      ipcMain.handle(name, (_e: IpcMainInvokeEvent, ...args: any[]): any => fn(...args));
    }
    if (type === 'on') {
      ipcMain.on(name, (e: IpcMainEvent, ...args: any[]): any => {
        e.returnValue = fn(...args);
      });
    }
  });
}

export function registerAllGlobalShortcuts() {
  shortcuts.forEach(({ key, fn }) => {
    globalShortcut.register(key, () => fn(key));
  });
}
