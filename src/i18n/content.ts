import { getLocaleFromPathname } from '@utils/links';
import type { Locale } from './config';
import homeEs from '../content/pages/home.json';
import homeEn from '../content/pages/home.en.json';
import homeRu from '../content/pages/home.ru.json';
import homeZh from '../content/pages/home.zh.json';
import navbarEs from '../content/pages/navbar.json';
import navbarEn from '../content/pages/navbar.en.json';
import navbarRu from '../content/pages/navbar.ru.json';
import navbarZh from '../content/pages/navbar.zh.json';
import footerEs from '../content/pages/footer.json';
import footerEn from '../content/pages/footer.en.json';
import footerRu from '../content/pages/footer.ru.json';
import footerZh from '../content/pages/footer.zh.json';
import aboutEs from '../content/pages/about.json';
import aboutEn from '../content/pages/about.en.json';
import aboutRu from '../content/pages/about.ru.json';
import aboutZh from '../content/pages/about.zh.json';
import contactEs from '../content/pages/contactos.json';
import contactEn from '../content/pages/contactos.en.json';
import contactRu from '../content/pages/contactos.ru.json';
import contactZh from '../content/pages/contactos.zh.json';
import catalogEs from '../content/pages/catalogo.json';
import catalogEn from '../content/pages/catalogo.en.json';
import catalogRu from '../content/pages/catalogo.ru.json';
import catalogZh from '../content/pages/catalogo.zh.json';
import seoEs from '../content/pages/SEO.json';
import seoEn from '../content/pages/SEO.en.json';
import seoRu from '../content/pages/SEO.ru.json';
import seoZh from '../content/pages/SEO.zh.json';

function normalizeTitle(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function mergeLocalizedEntry(baseEntry: Record<string, any>, localizedEntry: Record<string, any>) {
  return {
    ...baseEntry,
    ...localizedEntry,
    Data: {
      ...(baseEntry.Data ?? {}),
      ...(localizedEntry.Data ?? {}),
    },
  };
}

function mergeHomeContent(localizedHome: Record<string, any>) {
  const mergedCarousel = homeEs.carrusel.map((baseItem, index) => {
    const localizedItem =
      localizedHome.carrusel?.find(
        (item: Record<string, any>) => normalizeTitle(item.titulo ?? '') === normalizeTitle(baseItem.titulo),
      ) ?? localizedHome.carrusel?.[index];

    return localizedItem ? mergeLocalizedEntry(baseItem, localizedItem) : baseItem;
  });

  return {
    ...homeEs,
    ...localizedHome,
    carrusel: mergedCarousel,
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  return getLocaleFromPathname(url.pathname);
}

export function getHomeContent(locale: Locale) {
  if (locale === 'en') return mergeHomeContent(homeEn);
  if (locale === 'ru') return mergeHomeContent(homeRu);
  if (locale === 'zh') return mergeHomeContent(homeZh);
  return homeEs;
}

export function getNavbarContent(locale: Locale) {
  if (locale === 'en') return navbarEn;
  if (locale === 'ru') return navbarRu;
  if (locale === 'zh') return navbarZh;
  return navbarEs;
}

export function getFooterContent(locale: Locale) {
  if (locale === 'en') return footerEn;
  if (locale === 'ru') return footerRu;
  if (locale === 'zh') return footerZh;
  return footerEs;
}

export function getAboutContent(locale: Locale) {
  if (locale === 'en') return aboutEn;
  if (locale === 'ru') return aboutRu;
  if (locale === 'zh') return aboutZh;
  return aboutEs;
}

export function getContactContent(locale: Locale) {
  if (locale === 'en') return contactEn;
  if (locale === 'ru') return contactRu;
  if (locale === 'zh') return contactZh;
  return contactEs;
}

export function getCatalogContent(locale: Locale) {
  if (locale === 'en') return catalogEn;
  if (locale === 'ru') return catalogRu;
  if (locale === 'zh') return catalogZh;
  return catalogEs;
}

export function getSeoContent(locale: Locale) {
  if (locale === 'en') return seoEn;
  if (locale === 'ru') return seoRu;
  if (locale === 'zh') return seoZh;
  return seoEs;
}
