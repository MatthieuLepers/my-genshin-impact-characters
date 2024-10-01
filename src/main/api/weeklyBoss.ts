import { WeeklyBossI18n, WeeklyBoss } from '@/main/database/models';

export async function findAll(): Promise<Array<WeeklyBoss>> {
  return WeeklyBoss.findAll({
    order: [['releasedAt', 'ASC']],
    include: [
      { model: WeeklyBossI18n },
    ],
  });
}
