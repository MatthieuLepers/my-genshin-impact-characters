import type { IArtefactSetPassiveStat } from '@renderer/core/entities/artefactSetPassiveStat/i';

export interface IArtefactSetI18n {
  readonly locale: string;
}

export interface IArtefactSet {
  readonly id: string;
  readonly releasedAt?: Date;
  readonly passiveStats?: Array<IArtefactSetPassiveStat>;
  readonly i18n: Array<IArtefactSetI18n>;
}
