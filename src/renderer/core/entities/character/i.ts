import type { IRemoteCharacterAptitude } from '@renderer/core/entities/characterAptitude/i';
import type { IRemoteCharacterStat } from '@renderer/core/entities/characterStat/i';
import type { IRemoteCharacterPassiveStat } from '@renderer/core/entities/characterPassiveStat/i';

export interface ICharacter {
  readonly id: number;
  readonly name: string;
  readonly releasedAt?: Date;
  readonly element: string;
  level: number;
  phase: number;
  constellation: number;
  readonly weaponType: string;
  aptitudes: Array<IRemoteCharacterAptitude>;
  readonly stats: Array<IRemoteCharacterStat>;
  readonly passiveStats: Array<IRemoteCharacterPassiveStat>;
  owned: boolean;
}

export interface IRemoteCharacter {
  dataValues: ICharacter;
}
