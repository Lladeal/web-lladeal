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

function slugify(value: string) {
  return normalizeTitle(value).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function mergeLocalizedEntry(baseEntry: Record<string, any>, localizedEntry: Record<string, any>) {
  return {
    ...baseEntry,
    ...localizedEntry,
    slug: slugify(baseEntry.titulo),
    ImagenArchivo: baseEntry.ImagenArchivo,
    Data: baseEntry.Data,
  };
}

function mergeHomeFeatureEntry(baseEntry: Record<string, any>, localizedEntry?: Record<string, any>) {
  return {
    ...baseEntry,
    ...localizedEntry,
    image: baseEntry.image,
    imagen: baseEntry.imagen,
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

function mergeHomeContent(localizedHome: Record<string, any>) {
  const mergedCarousel = dedupeCarouselEntries(homeEs.carrusel.map((baseItem, index) => {
    const localizedItem =
      localizedHome.carrusel?.find(
        (item: Record<string, any>) => normalizeTitle(item.titulo ?? '') === normalizeTitle(baseItem.titulo),
      ) ?? localizedHome.carrusel?.[index];

    return localizedItem
      ? mergeLocalizedEntry(baseItem, localizedItem)
      : {
          ...baseItem,
          slug: slugify(baseItem.titulo),
        };
  }));

  const mergedFeaturesList = homeEs.features.lista.map((entry, index) => {
    const baseItem = entry as Record<string, any>;
    const localizedItem =
      localizedHome.features?.lista?.find(
        (item: Record<string, any>) => normalizeTitle(item.title ?? item.titulo ?? '') === normalizeTitle(baseItem.title ?? baseItem.titulo ?? ''),
      ) ?? localizedHome.features?.lista?.[index];

    return mergeHomeFeatureEntry(baseItem, localizedItem);
  });

  return {
    ...homeEs,
    ...localizedHome,
    imagen: {
      ...homeEs.imagen,
      ...localizedHome.imagen,
      video: homeEs.imagen.video,
      ImagenArchivo: homeEs.imagen.ImagenArchivo,
      Imagen: (homeEs.imagen as Record<string, any>).Imagen,
    },
    features: {
      ...homeEs.features,
      ...localizedHome.features,
      lista: mergedFeaturesList,
      Orbita: {
        ...homeEs.features.Orbita,
        ...localizedHome.features?.Orbita,
        Imagen_central: homeEs.features.Orbita.Imagen_central,
      },
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
      })),
    ),
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  return getLocaleFromPathname(url.pathname);
}

export function getHomeContent(locale: Locale) {
  if (locale === 'en') return mergeHomeContent(homeEn);
  if (locale === 'ru') return mergeHomeContent(homeRu);
  if (locale === 'zh') return mergeHomeContent(homeZh);
  return buildBaseHomeContent();
}

export function getNavbarContent(locale: Locale) {
  if (locale === 'en') {
    return {
      ...navbarEs,
      ...navbarEn,
      barra_de_navegacion: {
        ...navbarEs.barra_de_navegacion,
        ...navbarEn.barra_de_navegacion,
        logo: {
          ...navbarEs.barra_de_navegacion.logo,
          ...navbarEn.barra_de_navegacion.logo,
          imagen: navbarEs.barra_de_navegacion.logo.imagen,
        },
      },
    };
  }
  if (locale === 'ru') {
    return {
      ...navbarEs,
      ...navbarRu,
      barra_de_navegacion: {
        ...navbarEs.barra_de_navegacion,
        ...navbarRu.barra_de_navegacion,
        logo: {
          ...navbarEs.barra_de_navegacion.logo,
          ...navbarRu.barra_de_navegacion.logo,
          imagen: navbarEs.barra_de_navegacion.logo.imagen,
        },
      },
    };
  }
  if (locale === 'zh') {
    return {
      ...navbarEs,
      ...navbarZh,
      barra_de_navegacion: {
        ...navbarEs.barra_de_navegacion,
        ...navbarZh.barra_de_navegacion,
        logo: {
          ...navbarEs.barra_de_navegacion.logo,
          ...navbarZh.barra_de_navegacion.logo,
          imagen: navbarEs.barra_de_navegacion.logo.imagen,
        },
      },
    };
  }
  return navbarEs;
}

export function getFooterContent(locale: Locale) {
  if (locale === 'en') return footerEn;
  if (locale === 'ru') return footerRu;
  if (locale === 'zh') return footerZh;
  return footerEs;
}

export function getAboutContent(locale: Locale) {
  if (locale === 'en') {
    return {
      ...aboutEs,
      ...aboutEn,
      Team: {
        ...aboutEs.Team,
        ...aboutEn.Team,
        team: aboutEs.Team.team.map((baseMember: Record<string, any>, index: number) => ({
          ...baseMember,
          ...(aboutEn.Team.team[index] ?? {}),
          foto: baseMember.foto,
        })),
      },
    };
  }
  if (locale === 'ru') {
    return {
      ...aboutEs,
      ...aboutRu,
      Team: {
        ...aboutEs.Team,
        ...aboutRu.Team,
        team: aboutEs.Team.team.map((baseMember: Record<string, any>, index: number) => ({
          ...baseMember,
          ...(aboutRu.Team.team[index] ?? {}),
          foto: baseMember.foto,
        })),
      },
    };
  }
  if (locale === 'zh') {
    return {
      ...aboutEs,
      ...aboutZh,
      Team: {
        ...aboutEs.Team,
        ...aboutZh.Team,
        team: aboutEs.Team.team.map((baseMember: Record<string, any>, index: number) => ({
          ...baseMember,
          ...(aboutZh.Team.team[index] ?? {}),
          foto: baseMember.foto,
        })),
      },
    };
  }
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
  if (locale === 'en') {
    return {
      ...seoEs,
      ...seoEn,
      Seo_global: {
        ...seoEs.Seo_global,
        ...seoEn.Seo_global,
        imagen_og: seoEs.Seo_global.imagen_og,
        icono: seoEs.Seo_global.icono,
        icono_apple: seoEs.Seo_global.icono_apple,
        manifiesto: seoEs.Seo_global.manifiesto,
      },
    };
  }
  if (locale === 'ru') {
    return {
      ...seoEs,
      ...seoRu,
      Seo_global: {
        ...seoEs.Seo_global,
        ...seoRu.Seo_global,
        imagen_og: seoEs.Seo_global.imagen_og,
        icono: seoEs.Seo_global.icono,
        icono_apple: seoEs.Seo_global.icono_apple,
        manifiesto: seoEs.Seo_global.manifiesto,
      },
    };
  }
  if (locale === 'zh') {
    return {
      ...seoEs,
      ...seoZh,
      Seo_global: {
        ...seoEs.Seo_global,
        ...seoZh.Seo_global,
        imagen_og: seoEs.Seo_global.imagen_og,
        icono: seoEs.Seo_global.icono,
        icono_apple: seoEs.Seo_global.icono_apple,
        manifiesto: seoEs.Seo_global.manifiesto,
      },
    };
  }
  return seoEs;
}
