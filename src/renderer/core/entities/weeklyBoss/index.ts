import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IWeeklyBoss } from '@renderer/core/entities/weeklyBoss/i';
import { image } from '@renderer/core/utils';
import WeeklyBossData from '@renderer/core/entities/weeklyBoss/data.json';

export default class WeeklyBoss extends AbstractI18nEntity<IWeeklyBoss> {
  declare readonly id: number;

  constructor(data: IWeeklyBoss) {
    super(data, []);
  }

  get image(): string {
    return image(`img/weeklyBosses/${this.id}.png`);
  }

  static findAll(): Record<string, WeeklyBoss> {
    return Object
      .entries(WeeklyBossData)
      .reduce((acc, [id, weeklyBoss]) => ({
        ...acc,
        [id]: new WeeklyBoss({
          ...weeklyBoss,
          id,
          releasedAt: new Date(weeklyBoss.releasedAt),
        }),
      }), {})
    ;
  }
}
