import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IMaterial, IRemoteMaterial } from '@renderer/core/entities/material/i';
import type WeeklyBoss from '@renderer/core/entities/weeklyBoss';
import { weeklyBossesStore } from '@renderer/core/entities/weeklyBoss/store';
import { image } from '@renderer/core/utils';

export default class Material extends AbstractI18nEntity<IMaterial> {
  declare readonly id: string;

  declare inInventory: number;

  declare readonly bossId: string;

  constructor(data: IMaterial) {
    super(data, []);
  }

  get weeklyBoss(): WeeklyBoss {
    return weeklyBossesStore.state.bosses[this.bossId];
  }

  get image(): string {
    return image(`img/materials/${this.id}.png`);
  }

  async save(): Promise<Material> {
    const { inInventory } = this.data;
    if (this.id) {
      await api.Material.update(this.id, JSON.stringify({ inInventory }));
      return this;
    }
    throw new Error('Material not found');
  }

  static async findAll(): Promise<Array<Material>> {
    const materials = await api.Material.findAll();
    return materials.map((material: IRemoteMaterial) => new Material(material.dataValues));
  }
}
