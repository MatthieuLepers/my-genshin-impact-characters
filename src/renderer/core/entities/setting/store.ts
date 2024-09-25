import { reactive } from 'vue';

import Setting from '@renderer/core/entities/setting';

interface IState {
  settings: Record<string, Setting>;
}

const useSettingsStore = () => {
  const state = reactive<IState>({
    settings: {},
  });

  const actions = {
    getSetting(key: string): Setting | null {
      return state.settings?.[key] ?? null;
    },
    getString(key: string): string {
      return state.settings?.[key]?.value ?? '';
    },
    async setString(key: string, value: string): Promise<Setting | null> {
      if (state.settings[key]) {
        state.settings[key].value = value;
        return state.settings[key].save();
      }
      state.settings[key] = new Setting({ key, value });
      return state.settings[key].save();
    },
    getBoolean(key: string): boolean {
      return state.settings?.[key]?.value === 'true' ?? false;
    },
    async setBoolean(key: string, value: boolean): Promise<Setting | null> {
      if (state.settings[key]) {
        state.settings[key].value = value.toString();
        return state.settings[key].save();
      }
      state.settings[key] = new Setting({ key, value: value.toString() });
      return state.settings[key].save();
    },
    async toggleBoolean(key: string): Promise<Setting | null> {
      return this.setBoolean(key, !this.getBoolean(key));
    },
    async load() {
      state.settings = await Setting.findAll();
    },
  };

  return {
    state,
    actions,
  };
};

export const settingsStore = useSettingsStore();
