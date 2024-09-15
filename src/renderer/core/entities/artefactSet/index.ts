import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import type { IArtefactSet, IRemoteArtefactSet } from '@renderer/core/entities/artefactSet/i';
import type { IRemoteArtefactSetPassiveStat } from '@renderer/core/entities/artefactSetPassiveStat/i';

export default class ArtefactSet extends AbstractEntity<IArtefactSet> {
  declare readonly id: string;

  declare readonly releasedAt: Date;

  constructor(data: IArtefactSet) {
    super(data, ['passiveStats']);
  }

  get stats(): Record<string, number> {
    return (this.data?.passiveStats ?? [])
      .reduce((acc, passiveStat: IRemoteArtefactSetPassiveStat) => ({
        ...acc,
        [passiveStat.dataValues.statType]: passiveStat.dataValues.statValue,
      }), {});
  }

  static async findAll(): Promise<Array<ArtefactSet>> {
    const sets = await api.ArtefactSet.findAll();
    return sets.map((set: IRemoteArtefactSet) => new ArtefactSet(set.dataValues));
  }
}
