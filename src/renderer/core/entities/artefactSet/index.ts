import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArtefactSet, IRemoteArtefactSet } from '@renderer/core/entities/artefactSet/i';
import type { IRemoteArtefactSetPassiveStat } from '@renderer/core/entities/artefactSetPassiveStat/i';
import { image } from '@renderer/core/utils';

export default class ArtefactSet extends AbstractI18nEntity<IArtefactSet> {
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
      }), {})
    ;
  }

  getImage(type: string): string {
    return image(`img/artefacts/${this.id}/${type}.webp`);
  }

  static async findAll(): Promise<Array<ArtefactSet>> {
    const sets = await api.ArtefactSet.findAll();
    return sets.map((set: IRemoteArtefactSet) => new ArtefactSet(set.dataValues));
  }
}
