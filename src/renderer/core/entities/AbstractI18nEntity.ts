import i18n from '@renderer/plugins/i18n';
import AbstractEntity from '@renderer/core/entities/AbstractEntity';

export interface II18nData {
  locale: string;
  [key: string]: string;
}

export default abstract class AbstractI18nEntity<T extends Record<string, any>> extends AbstractEntity<T> {
  constructor(
    data: T,
    ignoreMapping = [] as string[],
  ) {
    super(data, ['i18n', ...ignoreMapping]);
  }

  get i18n(): Record<string, II18nData> {
    return this.data.i18n.reduce((acc: Record<string, II18nData>, obj: II18nData) => ({
      ...acc,
      [obj.locale]: obj,
    }), {});
  }

  getI18n(field: string, defaultValue = ''): string {
    return this.i18n[i18n.global.locale.value]?.[field] ?? this.i18n['en-EN']?.[field] ?? defaultValue;
  }
}
