import type { ICharacterAptitude, ICharacterAptitudeJson } from '@renderer/core/entities/characterAptitude/i';
import type { ICharacterStat } from '@renderer/core/entities/characterStat/i';
import type { ICharacterPassiveStat } from '@renderer/core/entities/characterPassiveStat/i';

export interface IDatabaseCharacter {
  readonly id: number;
  readonly name: string;
  level: number;
  phase: number;
  constellation: number;
  aptitudeLevels: [number, number, number];
  owned: boolean;
}

export interface ICharacter extends IDatabaseCharacter {
  readonly releasedAt?: Date;
  readonly element: string;
  readonly weaponType: string;
  aptitudes: Array<ICharacterAptitude>;
  readonly stats: Array<ICharacterStat>;
  readonly passiveStats?: Array<ICharacterPassiveStat>;
}

export interface ICharacterJson {
  readonly releasedAt?: string;
  readonly element: string;
  readonly weaponType: string;
  readonly aptitudes: Array<ICharacterAptitudeJson>;
  readonly stats: Array<ICharacterStat>;
  readonly passiveStats?: Array<ICharacterPassiveStat>;
}

export interface IRemoteCharacter {
  dataValues: IDatabaseCharacter;
}
