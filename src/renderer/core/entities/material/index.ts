import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import type { IMaterial, IRemoteMaterial } from '@renderer/core/entities/material/i';

export default class Material extends AbstractEntity<IMaterial> {
  declare readonly id: number;

  declare inInventory: number;

  constructor(data: IMaterial) {
    super(data, []);
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
