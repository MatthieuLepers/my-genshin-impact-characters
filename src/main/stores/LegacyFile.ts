import fs from 'fs';
import { LEGACY_FILE } from '@/main/utils/Constants';
import { Character } from '@/main/database/models';

interface ILegacyFile {
  materials?: Record<string, number>;
  ownedCharacters?: Array<string>;
  characters?: Record<string, {
    level: number;
    phase: number;
    constellations: number;
    aptitudes: {
      normalAttack: {
        level: number;
      };
      elementalSkill: {
        level: number;
      };
      elementalBurst: {
        level: number;
      };
    };
  }>;
}

class LegacyFile {
  public json: ILegacyFile;

  constructor() {
    try {
      this.json = JSON.parse(`${fs.readFileSync(LEGACY_FILE)}`);
    } catch (e) {
      this.json = {};
    }
  }

  getMaterialCount(materialId: string): number {
    return this.json?.materials?.[materialId] ?? 0;
  }

  getCharacterData(characterName: string, element?: string): Partial<Character> {
    if (characterName.startsWith('Traveler') && element) {
      [characterName] = characterName.split('-');
      return {
        owned: (this.json?.characters?.[characterName]?.level ?? 0) > 1,
        level: this.json?.characters?.[characterName]?.level ?? 1,
        phase: this.json?.characters?.[characterName]?.phase ?? 0,
        constellation: this.json?.characters?.[characterName]?.constellations?.[element] ?? 0,
        aptitudeLevels: [
          this.json?.characters?.[characterName]?.aptitudes?.[element]?.normalAttack?.level ?? 1,
          this.json?.characters?.[characterName]?.aptitudes?.[element]?.elementalSkill?.level ?? 1,
          this.json?.characters?.[characterName]?.aptitudes?.[element]?.elementalBurst?.level ?? 1,
        ],
      };
    }
    return {
      owned: this.json?.ownedCharacters?.includes(characterName) ?? false,
      level: this.json?.characters?.[characterName]?.level ?? 1,
      phase: this.json?.characters?.[characterName]?.phase ?? 0,
      constellation: this.json?.characters?.[characterName]?.constellations ?? 0,
      aptitudeLevels: [
        this.json?.characters?.[characterName]?.aptitudes?.normalAttack?.level ?? 1,
        this.json?.characters?.[characterName]?.aptitudes?.elementalSkill?.level ?? 1,
        this.json?.characters?.[characterName]?.aptitudes?.elementalBurst?.level ?? 1,
      ],
    };
  }
}

export default new LegacyFile();
