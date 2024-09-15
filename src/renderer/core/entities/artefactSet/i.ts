import type { IRemoteArtefactSetPassiveStat } from '@renderer/core/entities/artefactSetPassiveStat/i';

export interface IArtefactSet {
  readonly id: string;
  readonly releasedAt: Date;
  readonly passiveStats: Array<IRemoteArtefactSetPassiveStat>;
}

export interface IRemoteArtefactSet {
  dataValues: IArtefactSet;
}
