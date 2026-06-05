import { localizePath, withBase } from '@utils/links';
import type { Locale } from '@/i18n/config';
import { getUiStrings } from '@/i18n/ui';

export function getNavigationLinks(locale: Locale) {
  const t = getUiStrings(locale).nav;

  return [
    {
      path: localizePath('/catalogo', locale),
      href: withBase('/catalogo', locale),
      label: t.catalogo,
    },
    {
      path: localizePath('/about', locale),
      href: withBase('/about', locale),
      label: t.about,
    },

    {
      path: localizePath('/contact', locale),
      href: withBase('/contact', locale),
      label: t.contact,
    },
    {
      path: localizePath('/blog/articles', locale),
      href: withBase('/blog/articles', locale),
      label: t.blog,
    },
  ];
}
