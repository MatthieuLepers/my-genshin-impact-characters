import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import type { IArtefact, IArtefactStat, IRemoteArtefact } from '@renderer/core/entities/artefact/i';
import { artefactSetsStore } from '@renderer/core/entities/artefactSet/store';
import type ArtefactSet from '@renderer/core/entities/artefactSet';
import { getRealValue } from '@renderer/core/entities/artefact/StatUtils';
import ArtefactMainStatData from '@renderer/core/datas/ArtefactMainStat.json';

export default class Artefact extends AbstractEntity<IArtefact> {
  declare readonly id: number;

  declare type: string;

  declare setId: string;

  declare statsJson: Array<IArtefactStat>;

  constructor(data: IArtefact) {
    super(data, []);
  }

  get artefactSet(): ArtefactSet {
    return artefactSetsStore.state.sets[this.setId];
  }

  get level(): number {
    const min = ArtefactMainStatData[this.mainStat.name][0];
    const max = ArtefactMainStatData[this.mainStat.name][20];
    return Math.max(0, Math.round((this.mainStat.value - min) / ((max - min) / 20)));
  }

  get mainStat(): IArtefactStat {
    return this.statsJson.find((stat) => stat.main)!;
  }

  get subStats(): Array<IArtefactStat> {
    return this.statsJson.filter((stat) => !stat.main);
  }

  get stats(): Record<string, number> {
    return this.statsJson.reduce((ac, stat) => ({
      ...ac,
      [stat.name]: (ac[stat.name] ?? 0) + (stat.main ? stat.value : getRealValue(stat)),
    }), {});
  }

  getStat(statName: string): number {
    return this.stats[statName] ?? 0;
  }

  static async findAll(): Promise<Array<Artefact>> {
    const artefacts = await api.Artefact.findAll();
    return artefacts.map((artefact: IRemoteArtefact) => new Artefact(artefact.dataValues));
  }

  static async create(data: IArtefact): Promise<Artefact> {
    const artefact = await api.Artefact.create(JSON.stringify(data));
    // @ts-ignore
    return new Artefact(artefact.dataValues);
  }

  async save(): Promise<Artefact> {
    const { type, setId, statsJson } = this.data;
    if (this.id) {
      await api.Artefact.update(this.id, JSON.stringify({ type, setId, statsJson }));
    }
    return this;
  }

  async destroy(): Promise<boolean> {
    if (this.id) {
      const success = await api.Artefact.destroy(this.id);
      return success;
    }
    return true;
  }
}
