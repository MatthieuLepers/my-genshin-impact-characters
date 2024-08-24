import type { IRemoteCharacterAptitude } from '@renderer/core/entities/characterAptitude/i';

export interface ICharacter {
  readonly id: number;
  name: string;
  releasedAt: Date;
  element: string;
  level: number;
  phase: number;
  constellation: number;
  aptitudes: Array<IRemoteCharacterAptitude>;
  owned: boolean;
}

export interface IRemoteCharacter {
  dataValues: ICharacter;
}
