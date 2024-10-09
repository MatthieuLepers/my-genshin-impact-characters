import { reactive } from 'vue';

import WeeklyBoss from '@renderer/core/entities/weeklyBoss';

interface IState {
  bosses: Record<string, WeeklyBoss>;
}

const useWeeklyBossesStore = () => {
  const state = reactive<IState>({
    bosses: WeeklyBoss.findAll(),
  });

  return {
    state,
  };
};

export const weeklyBossesStore = useWeeklyBossesStore();
