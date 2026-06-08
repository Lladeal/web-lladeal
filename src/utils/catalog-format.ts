import type { Locale } from '@/i18n/config';

type SpecField =
  | 'Tamaño_del_boton'
  | 'Longitud_del_tallo'
  | 'Vida_en_florero'
  | 'Numero_de_petalos'
  | 'Estado_fenologico'
  | 'Ciclo';

function extractNumericRange(value: string) {
  const matches = value.match(/[\d.,]+/g);
  if (!matches?.length) return value;
  return matches.join(' - ').replace(/,(?=\d)/g, '.');
}

function localizeDays(value: string, locale: Locale) {
  const numericValue = extractNumericRange(value);
  if (!/\d/.test(numericValue)) return value;

  const unitByLocale = {
    es: 'dias',
    en: 'days',
    ru: 'дней',
    zh: '天',
  } as const;

  return `${numericValue} ${unitByLocale[locale]}`;
}

function localizeCycle(value: string, locale: Locale) {
  const normalized = value.trim().toLowerCase();
  const cycleMap = {
    normal: {
      es: 'Normal',
      en: 'Normal',
      ru: 'Нормальный',
      zh: '正常',
    },
  } as const;

  return cycleMap.normal[locale] ?? value;
}

function localizeCentimeters(value: string) {
  const numericValue = extractNumericRange(value);
  if (!/\d/.test(numericValue)) return value;
  return `${numericValue} cm`;
}

export function formatCatalogSpecValue(locale: Locale, field: SpecField, value?: string) {
  if (!value?.trim()) return '-';

  if (field === 'Vida_en_florero' || field === 'Estado_fenologico') {
    return localizeDays(value, locale);
  }

  if (field === 'Tamaño_del_boton' || field === 'Longitud_del_tallo') {
    return localizeCentimeters(value);
  }

  if (field === 'Ciclo') {
    return localizeCycle(value, locale);
  }

  return extractNumericRange(value);
}
