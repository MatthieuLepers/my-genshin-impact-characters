import type { IWeapon, IRemoteWeapon } from '@renderer/core/entities/weapon/i';
import WeaponData from '@renderer/core/entities/weapon/data.json';
import { getLocalStorage, setLocalStorage } from '@renderer/core/stores/Storage';

export async function findAll(): Promise<Array<IRemoteWeapon>> {
  const storage = getLocalStorage();
  return Object
    .keys(WeaponData)
    .map((name) => ({
      dataValues: {
        id: name,
        level: storage.weapons?.[name]?.level ?? 1,
        rank: storage.weapons?.[name]?.rank ?? 1,
        owned: storage.weapons?.[name]?.owned ?? false,
      },
    }))
  ;
}

export async function update(identifier: string, body: string): Promise<IRemoteWeapon | null> {
  const storage = getLocalStorage();
  const values: Partial<IWeapon> = JSON.parse(body);
  storage.weapons[identifier] = {
    ...(storage.weapons[identifier] ?? {}),
    ...values,
  };
  setLocalStorage(storage);

  return {
    dataValues: storage.weapons[identifier],
  };
}
