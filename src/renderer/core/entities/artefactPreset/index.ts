import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IArtefactPreset, IRemoteArtefactPreset } from '@renderer/core/entities/artefactPreset/i';
import { artefactsStore } from '@renderer/core/entities/artefact/store';
import type Artefact from '@renderer/core/entities/artefact';

export default class ArtefactPreset extends AbstractEntity<IArtefactPreset> {
  declare readonly id: number;

  declare name: string;

  declare flowerId: number;

  declare featherId: number;

  declare sandsId: number;

  declare gobletId: number;

  declare circletId: number;

  constructor(data: IArtefactPreset) {
    super(data, []);
  }

  get flower(): Artefact {
    return artefactsStore.state.artefacts[this.flowerId];
  }

  set flower(artefact: Artefact) {
    this.flowerId = artefact.id;
  }

  get feather(): Artefact {
    return artefactsStore.state.artefacts[this.featherId];
  }

  set feather(artefact: Artefact) {
    this.featherId = artefact.id;
  }

  get sands(): Artefact {
    return artefactsStore.state.artefacts[this.sandsId];
  }

  set sands(artefact: Artefact) {
    this.sandsId = artefact.id;
  }

  get goblet(): Artefact {
    return artefactsStore.state.artefacts[this.gobletId];
  }

  set goblet(artefact: Artefact) {
    this.gobletId = artefact.id;
  }

  get circlet(): Artefact {
    return artefactsStore.state.artefacts[this.circletId];
  }

  set circlet(artefact: Artefact) {
    this.circletId = artefact.id;
  }

  get artefacts(): Array<Artefact> {
    return [this.flower, this.feather, this.sands, this.goblet, this.circlet];
  }

  get stats(): Record<string, number> {
    const artefactGroupedBySetId: Record<string, Array<Artefact>> = this.artefacts.reduce((acc, artefact) => ({
      ...acc,
      [artefact.setId]: [...(acc[artefact.setId] ?? []), artefact],
    }), {});

    const obj = Object
      .values(artefactGroupedBySetId)
      .filter((artefacts) => artefacts.length >= 2)
      .reduce((acc, [artefact]) => {
        return Object
          .entries(artefact.artefactSet.stats)
          .reduce((ac, [stat, val]) => ({
            ...ac,
            [stat]: (ac[stat] ?? 0) + val,
          }), acc)
        ;
      }, {})
    ;

    return this.artefacts.reduce((acc, artefact) => {
      return Object.entries(artefact.stats).reduce((ac, [k, v]) => ({
        ...ac,
        [k]: (acc[k] ?? 0) + v,
      }), acc);
    }, obj);
  }

  static async findAll(): Promise<Array<ArtefactPreset>> {
    const presets = await api.ArtefactPreset.findAll();
    return presets.map((preset: IRemoteArtefactPreset) => new ArtefactPreset(preset.dataValues));
  }

  static async create(data: IArtefactPreset): Promise<ArtefactPreset> {
    const preset = await api.ArtefactPreset.create(JSON.stringify(data));
    return new ArtefactPreset(preset.dataValues);
  }

  async save(): Promise<ArtefactPreset> {
    const { name, flowerId, featherId, sandsId, gobletId, circletId } = this.data;
    if (this.id) {
      await api.ArtefactPreset.update(this.id, JSON.stringify({ name, flowerId, featherId, sandsId, gobletId, circletId }));
    }
    return this;
  }

  async destroy(): Promise<boolean> {
    if (this.id) {
      const success = await api.ArtefactPreset.destroy(this.id);
      return success;
    }
    return true;
  }
}
