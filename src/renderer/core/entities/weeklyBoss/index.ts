import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IWeeklyBoss, IRemoteWeeklyBoss } from '@renderer/core/entities/weeklyBoss/i';
import { image } from '@renderer/core/utils';

export default class WeeklyBoss extends AbstractI18nEntity<IWeeklyBoss> {
  declare readonly id: number;

  constructor(data: IWeeklyBoss) {
    super(data, []);
  }

  get image(): string {
    return image(`img/weeklyBosses/${this.id}.png`);
  }

  static async findAll(): Promise<Array<WeeklyBoss>> {
    const weeklyBosses = await api.WeeklyBoss.findAll();
    return weeklyBosses.map((material: IRemoteWeeklyBoss) => new WeeklyBoss(material.dataValues));
  }
}
