export interface IMaterial {
  readonly id: number;
  inInventory: number;
  readonly bossId: string;
}

export interface IRemoteMaterial {
  dataValues: IMaterial;
}
