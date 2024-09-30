import type { IRemoteArtefactSetPassiveStat } from '@renderer/core/entities/artefactSetPassiveStat/i';
import type { IArtefactSetI18n } from '@renderer/core/entities/artefactSet/i18n';

export interface IArtefactSet {
  readonly id: string;
  readonly releasedAt: Date;
  readonly passiveStats: Array<IRemoteArtefactSetPassiveStat>;
  readonly i18n: Array<IArtefactSetI18n>;
}

export interface IRemoteArtefactSet {
  dataValues: IArtefactSet;
}
