export const defaultLocale = 'es';
export const locales = ['es', 'en', 'ru', 'zh'] as const;

export const localeMetadata = {
  es: { label: 'ES', htmlLang: 'es', schemaLang: 'es-EC' },
  en: { label: 'EN', htmlLang: 'en', schemaLang: 'en-US' },
  ru: { label: 'RU', htmlLang: 'ru', schemaLang: 'ru-RU' },
  zh: { label: '中文', htmlLang: 'zh-CN', schemaLang: 'zh-CN' },
} as const;

export type Locale = (typeof locales)[number];
