export interface IMaterial {
  readonly id: number;
  inInventory: number;
}

export interface IRemoteMaterial {
  dataValues: IMaterial;
}
