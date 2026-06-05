import { defaultLocale, locales } from '@/i18n/config';

const BASE_URL = import.meta.env.BASE_URL;

function normalizeInternalPath(path: string) {
  const normalizedBase = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');

  if (normalizedBase && (path === normalizedBase || path.startsWith(`${normalizedBase}/`))) {
    const stripped = path.slice(normalizedBase.length) || '/';
    return stripped.startsWith('/') ? stripped : `/${stripped}`;
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function shouldLocalizePath(path: string) {
  if (
    path.startsWith('/uploads/') ||
    path.startsWith('/_astro/') ||
    path.startsWith('/fonts/')
  ) {
    return false;
  }

  return !/\.[a-z0-9]+$/i.test(path);
}

export function getLocaleFromPathname(pathname: string) {
  const normalizedPath = stripBase(pathname);
  const [, firstSegment] = normalizedPath.split('/');

  return locales.includes(firstSegment as (typeof locales)[number])
    ? (firstSegment as (typeof locales)[number])
    : defaultLocale;
}

function stripLocalePrefix(path: string) {
  const normalizedPath = normalizeInternalPath(path);

  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (normalizedPath === `/${locale}`) return '/';
    if (normalizedPath.startsWith(`/${locale}/`)) {
      return normalizedPath.slice(locale.length + 1) || '/';
    }
  }

  return normalizedPath;
}

export function localizePath(path: string, locale = defaultLocale) {
  if (/^(?:[a-z]+:|\/\/|#|mailto:|tel:)/i.test(path)) {
    return path;
  }

  const normalizedPath = stripLocalePrefix(path);

  if (!shouldLocalizePath(normalizedPath)) {
    return normalizedPath;
  }

  if (locale !== defaultLocale) {
    return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`;
  }

  return normalizedPath;
}

export function withBase(path?: string, locale?: (typeof locales)[number]) {
  if (!path) return path;

  if (/^(?:[a-z]+:|\/\/|#|mailto:|tel:)/i.test(path)) {
    return path;
  }

  const normalizedBase = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');

  const localizedPath = locale ? localizePath(path, locale) : normalizeInternalPath(path);

  if (localizedPath === '/') {
    return normalizedBase || '/';
  }

  const normalizedPath = localizedPath.replace(/^\//, '');
  return `${normalizedBase}/${normalizedPath}`;
}

export function stripBase(pathname: string) {
  const normalizedBase = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');

  if (normalizedBase && pathname.startsWith(normalizedBase)) {
    return pathname.slice(normalizedBase.length) || '/';
  }

  return pathname || '/';
}
