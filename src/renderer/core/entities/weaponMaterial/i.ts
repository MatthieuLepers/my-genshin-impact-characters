export interface IWeaponMaterialI18n {
  readonly locale: string;
  readonly tier1: string;
  readonly tier2: string;
  readonly tier3: string;
  readonly tier4: string;
}

export interface IWeaponMaterial {
  readonly id: string;
  readonly i18n: Array<IWeaponMaterialI18n>;
}
