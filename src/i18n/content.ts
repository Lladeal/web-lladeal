import { getLocaleFromPathname } from '@utils/links';
import type { Locale } from './config';
import homeEs from '../content/pages/home.json';
import homeEn from '../content/pages/home.en.json';
import homeRu from '../content/pages/home.ru.json';
import homeZh from '../content/pages/home.zh.json';
import homeDe from '../content/pages/home.de.json';
import navbarEs from '../content/pages/navbar.json';
import navbarEn from '../content/pages/navbar.en.json';
import navbarRu from '../content/pages/navbar.ru.json';
import navbarZh from '../content/pages/navbar.zh.json';
import navbarDe from '../content/pages/navbar.de.json';
import footerEs from '../content/pages/footer.json';
import footerEn from '../content/pages/footer.en.json';
import footerRu from '../content/pages/footer.ru.json';
import footerZh from '../content/pages/footer.zh.json';
import footerDe from '../content/pages/footer.de.json';
import aboutEs from '../content/pages/about.json';
import aboutEn from '../content/pages/about.en.json';
import aboutRu from '../content/pages/about.ru.json';
import aboutZh from '../content/pages/about.zh.json';
import aboutDe from '../content/pages/about.de.json';
import contactEs from '../content/pages/contactos.json';
import contactEn from '../content/pages/contactos.en.json';
import contactRu from '../content/pages/contactos.ru.json';
import contactZh from '../content/pages/contactos.zh.json';
import contactDe from '../content/pages/contactos.de.json';
import catalogEs from '../content/pages/catalogo.json';
import catalogEn from '../content/pages/catalogo.en.json';
import catalogRu from '../content/pages/catalogo.ru.json';
import catalogZh from '../content/pages/catalogo.zh.json';
import catalogDe from '../content/pages/catalogo.de.json';
import seoEs from '../content/pages/SEO.json';
import seoEn from '../content/pages/SEO.en.json';
import seoRu from '../content/pages/SEO.ru.json';
import seoZh from '../content/pages/SEO.zh.json';
import seoDe from '../content/pages/SEO.de.json';

const localizedContentByLocale = {
  home: { en: homeEn, ru: homeRu, zh: homeZh, de: homeDe },
  navbar: { en: navbarEn, ru: navbarRu, zh: navbarZh, de: navbarDe },
  footer: { en: footerEn, ru: footerRu, zh: footerZh, de: footerDe },
  about: { en: aboutEn, ru: aboutRu, zh: aboutZh, de: aboutDe },
  contact: { en: contactEn, ru: contactRu, zh: contactZh, de: contactDe },
  catalog: { en: catalogEn, ru: catalogRu, zh: catalogZh, de: catalogDe },
  seo: { en: seoEn, ru: seoRu, zh: seoZh, de: seoDe },
} as const;

const baseOnlyKeys = new Set([
  'imagen',
  'Imagen',
  'image',
  'ImagenArchivo',
  'video',
  'foto',
  'icono',
  'icono_apple',
  'imagen_og',
  'manifiesto',
  'Imagen_central',
  'link',
  'Link',
  'linkHref',
  'linkhref2',
  'phone',
  'telefono',
  'mail',
  'email',
  'website',
  'whatsapp-link',
  'valor',
]);

function normalizeTitle(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function slugify(value: string) {
  return normalizeTitle(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isPlainObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isAssetKey(key: string) {
  return baseOnlyKeys.has(key) || /^Icono_\d+$/.test(key);
}

function isAssetValue(value: unknown) {
  return (
    typeof value === 'string' &&
    (value.startsWith('/uploads/') ||
      /\.(?:png|jpe?g|webp|avif|svg|webm|mp4|webmanifest)$/i.test(value))
  );
}

function shouldPreferBaseValue(key: string, baseValue: unknown) {
  return isAssetKey(key) || isAssetValue(baseValue);
}

function mergeLocalizedArray(baseArray: any[], localizedArray: any[]) {
  const merged = [];
  const maxLength = Math.max(baseArray.length, localizedArray.length);

  for (let index = 0; index < maxLength; index += 1) {
    const baseValue = baseArray[index];
    const localizedValue = localizedArray[index];

    if (localizedValue === undefined) {
      if (baseValue !== undefined) merged.push(baseValue);
      continue;
    }

    if (baseValue === undefined) {
      merged.push(localizedValue);
      continue;
    }

    merged.push(mergeLocalizedValue(baseValue, localizedValue));
  }

  return merged;
}

function mergeLocalizedValue(
  baseValue: any,
  localizedValue: any,
  key = ''
): any {
  if (localizedValue === undefined) return baseValue;
  if (shouldPreferBaseValue(key, baseValue)) return baseValue;

  if (Array.isArray(baseValue) && Array.isArray(localizedValue)) {
    return mergeLocalizedArray(baseValue, localizedValue);
  }

  if (isPlainObject(baseValue) && isPlainObject(localizedValue)) {
    const merged: Record<string, any> = { ...baseValue };

    for (const [childKey, childValue] of Object.entries(localizedValue)) {
      merged[childKey] = mergeLocalizedValue(
        baseValue[childKey],
        childValue,
        childKey
      );
    }

    return merged;
  }

  return localizedValue;
}

function getLocalizedContent<T extends Record<string, any>>(
  locale: Locale,
  baseContent: T,
  localizedEntries: Partial<Record<Locale, Record<string, any>>>
) {
  if (locale === 'es') return baseContent;
  return mergeLocalizedValue(baseContent, localizedEntries[locale] ?? {});
}

function mergeHomeFeatureEntry(
  baseEntry: Record<string, any>,
  localizedEntry?: Record<string, any>
) {
  return mergeLocalizedValue(baseEntry, localizedEntry ?? {});
}

function localizeRoseDescription(locale: Locale, title: string) {
  if (locale === 'en') return `${title} rose`;
  if (locale === 'ru') return `Роза ${title}`;
  if (locale === 'zh') return `${title} 玫瑰`;
  if (locale === 'de') return `${title} Rose`;
  return `Rosa ${title}`;
}

function localizeRoseType(locale: Locale, type: string) {
  const normalizedType = normalizeTitle(type);

  if (normalizedType === 'bicolor' || normalizedType === 'bicolores') {
    if (locale === 'en') return 'Bicolor';
    if (locale === 'ru') return 'Двухцветная';
    if (locale === 'zh') return '双色';
    if (locale === 'de') return 'Zweifarbig';
    return 'Bicolores';
  }

  if (
    normalizedType === 'color unico' ||
    normalizedType === 'solid color' ||
    normalizedType === 'red'
  ) {
    if (locale === 'en') {
      return normalizedType === 'red' ? 'Red' : 'Solid Color';
    }

    if (locale === 'ru') {
      return normalizedType === 'red' ? 'Красная' : 'Однотонная';
    }

    if (locale === 'zh') {
      return normalizedType === 'red' ? '红色' : '纯色';
    }

    if (locale === 'de') {
      return normalizedType === 'red' ? 'Rot' : 'Einfarbig';
    }

    return normalizedType === 'red' ? 'Roja' : 'Color Único';
  }

  return type;
}

function localizeCarouselEntry(locale: Locale, baseEntry: Record<string, any>) {
  return {
    ...baseEntry,
    descripcion: localizeRoseDescription(locale, baseEntry.titulo),
    tipo: localizeRoseType(locale, baseEntry.tipo),
    slug: slugify(baseEntry.titulo),
  };
}

function dedupeCarouselEntries<T extends { slug: string }>(items: T[]) {
  const seen = new Set<string>();

  return items.filter(item => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function mergeHomeContent(locale: Locale, localizedHome: Record<string, any>) {
  const mergedCarousel = dedupeCarouselEntries(
    homeEs.carrusel.map(baseItem => localizeCarouselEntry(locale, baseItem))
  );

  const mergedFeaturesList = homeEs.features.lista.map((entry, index) => {
    const baseItem = entry as Record<string, any>;
    const localizedItem =
      localizedHome.features?.lista?.find(
        (item: Record<string, any>) =>
          normalizeTitle(item.title ?? item.titulo ?? '') ===
          normalizeTitle(baseItem.title ?? baseItem.titulo ?? '')
      ) ?? localizedHome.features?.lista?.[index];

    return mergeHomeFeatureEntry(baseItem, localizedItem);
  });

  return {
    ...mergeLocalizedValue(homeEs, localizedHome),
    features: {
      ...mergeLocalizedValue(homeEs.features, localizedHome.features ?? {}),
      lista: mergedFeaturesList,
    },
    carrusel: mergedCarousel,
  };
}

function buildBaseHomeContent() {
  return {
    ...homeEs,
    carrusel: dedupeCarouselEntries(
      homeEs.carrusel.map(baseItem => ({
        ...baseItem,
        slug: slugify(baseItem.titulo),
      }))
    ),
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  return getLocaleFromPathname(url.pathname);
}

export function getHomeContent(locale: Locale) {
  if (locale === 'en')
    return mergeHomeContent(locale, localizedContentByLocale.home.en);
  if (locale === 'ru')
    return mergeHomeContent(locale, localizedContentByLocale.home.ru);
  if (locale === 'zh')
    return mergeHomeContent(locale, localizedContentByLocale.home.zh);
  if (locale === 'de')
    return mergeHomeContent(locale, localizedContentByLocale.home.de);
  return buildBaseHomeContent();
}

export function getNavbarContent(locale: Locale) {
  return getLocalizedContent(locale, navbarEs, localizedContentByLocale.navbar);
}

export function getFooterContent(locale: Locale) {
  return getLocalizedContent(locale, footerEs, localizedContentByLocale.footer);
}

export function getAboutContent(locale: Locale) {
  return getLocalizedContent(locale, aboutEs, localizedContentByLocale.about);
}

export function getContactContent(locale: Locale) {
  return getLocalizedContent(
    locale,
    contactEs,
    localizedContentByLocale.contact
  );
}

export function getCatalogContent(locale: Locale) {
  return getLocalizedContent(
    locale,
    catalogEs,
    localizedContentByLocale.catalog
  );
}

export function getSeoContent(locale: Locale) {
  return getLocalizedContent(locale, seoEs, localizedContentByLocale.seo);
}
