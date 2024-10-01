import { reactive } from 'vue';

import WeeklyBoss from '@renderer/core/entities/weeklyBoss';

interface IState {
  bosses: Record<string, WeeklyBoss>;
}

const useWeeklyBossesStore = () => {
  const state = reactive<IState>({
    bosses: {},
  });

  const actions = {
    async load() {
      const bossList = await WeeklyBoss.findAll();
      state.bosses = bossList.reduce((acc, boss) => ({
        ...acc,
        [boss.id]: boss,
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const weeklyBossesStore = useWeeklyBossesStore();
