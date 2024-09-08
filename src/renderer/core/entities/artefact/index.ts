import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IArtefact, IArtefactStat, IRemoteArtefact } from '@renderer/core/entities/artefact/i';
import { artefactSetsStore } from '@renderer/core/entities/artefactSet/store';
import type ArtefactSet from '@renderer/core/entities/artefactSet';
import StatRangeEnum from '@renderer/core/entities/artefact/StatRangeEnum';

export default class Artefact extends AbstractEntity<IArtefact> {
  declare id: number;

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
    const { min, max } = StatRangeEnum.main[this.mainStat.name];
    return Math.max(0, Math.round((this.mainStat.value - min) / ((max - min) / 20)));
  }

  get rollAmount(): number {
    return this.statsJson.reduce((acc, stat) => {
      if (stat.main) return 0;
      const ranges = [...Array(5).keys()]
        .map((i) => ({
          min: StatRangeEnum.sub[stat.name].min + i * StatRangeEnum.sub[stat.name].min,
          max: StatRangeEnum.sub[stat.name].maxRoll + i * StatRangeEnum.sub[stat.name].maxRoll,
        }))
      ;

      return acc + ranges.findLastIndex((range) => range.min <= stat.value && range.max >= stat.value);
    }, 0);
  }

  get mainStat(): IArtefactStat {
    return this.statsJson.find((stat) => stat.main)!;
  }

  get subStats(): Array<IArtefactStat> {
    return this.statsJson.filter((stat) => !stat.main);
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
