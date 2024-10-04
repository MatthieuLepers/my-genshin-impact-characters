import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArtefactSet } from '@renderer/core/entities/artefactSet/i';
import type { IArtefactSetPassiveStat } from '@renderer/core/entities/artefactSetPassiveStat/i';
import { image } from '@renderer/core/utils';
import ArtefactSetData from '@renderer/core/entities/artefactSet/data.json';

export default class ArtefactSet extends AbstractI18nEntity<IArtefactSet> {
  declare readonly id: string;

  declare readonly releasedAt: Date;

  constructor(data: IArtefactSet) {
    super(data, ['passiveStats']);
  }

  get stats(): Record<string, number> {
    return (this.data?.passiveStats ?? [])
      .reduce((acc, passiveStat: IArtefactSetPassiveStat) => ({
        ...acc,
        [passiveStat.statType]: passiveStat.statValue,
      }), {})
    ;
  }

  getImage(type: string): string {
    return image(`img/artefacts/${this.id}/${type}.webp`);
  }

  static findAll(): Record<string, ArtefactSet> {
    return Object
      .entries(ArtefactSetData)
      .reduce((acc, [id, set]) => ({
        ...acc,
        [id]: new ArtefactSet({
          ...set,
          id,
          releasedAt: new Date(set.releasedAt),
        }),
      }), {})
    ;
  }
}
