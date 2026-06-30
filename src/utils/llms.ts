import { getCollection, type CollectionEntry } from 'astro:content';
import {
  getAboutContent,
  getCatalogContent,
  getContactContent,
  getHomeContent,
  getSeoContent,
} from '@i18n/content';
import { defaultLocale, locales, type Locale } from '@i18n/config';
import { withBase } from '@utils/links';

type LlmsEntry = {
  title: string;
  url: string;
  description: string;
};

type CatalogItem = Record<string, any>;
type ArticleEntry = CollectionEntry<'articles'>;

const localeLabels: Record<Locale, string> = {
  es: 'Spanish',
  en: 'English',
  ru: 'Russian',
  zh: 'Chinese',
  de: 'German',
};

function normalizeText(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
}

function absoluteUrl(site: URL, path: string, locale?: Locale) {
  const resolvedPath = locale ? withBase(path, locale) : withBase(path);
  return new URL(resolvedPath ?? path, site).toString();
}

function englishizeMetric(value: string) {
  return value.replace(/\bd[ii\u00ed]as?\b/gi, 'days').replace(/\s{2,}/g, ' ').trim();
}

function formatEntry(entry: LlmsEntry) {
  return `- [${entry.title}](${entry.url}): ${entry.description}`;
}

function getCatalogItems(limit?: number) {
  const home = getHomeContent('en');
  const items = Array.isArray(home.carrusel)
    ? (home.carrusel as CatalogItem[])
    : [];

  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

function buildSiteName() {
  const seo = getSeoContent('en');
  const rawTitle = normalizeText(seo.Seo_global?.titulo);
  return rawTitle.split('|')[0]?.trim() || 'Lladeal';
}

function buildDescription() {
  const home = getHomeContent('en');
  const heroTitle = normalizeText(home.hero?.titulo);
  return heroTitle ||
    'Lladeal grows and exports premium high-altitude roses from Cayambe, Ecuador for importers, wholesalers, florists, and international floral buyers.';
}

function buildDocsEntries(site: URL) {
  const home = getHomeContent('en');
  const about = getAboutContent('en');
  const contact = getContactContent('en');
  const catalog = getCatalogContent('en');

  return [
    {
      title: 'Homepage',
      url: absoluteUrl(site, '/'),
      description: normalizeText(
        `${home.hero?.subtitulo} ${home.features?.titulo}.`
      ),
    },
    {
      title: 'Catalog',
      url: absoluteUrl(site, '/catalogo'),
      description: normalizeText(
        `${catalog.hero?.subTitle} ${catalog.hero?.linkTitle}.`
      ),
    },
    {
      title: 'About Lladeal',
      url: absoluteUrl(site, '/about'),
      description: normalizeText(
        `${about.datos_sobre_nosotros?.descripcion} ${about.datos_de_experticie?.titulo}`
      ),
    },
    {
      title: 'Contact',
      url: absoluteUrl(site, '/contact'),
      description: normalizeText(
        `${contact.contactos?.subtitulo} ${contact.contactos?.descripcion_form}`
      ),
    },
  ] satisfies LlmsEntry[];
}

function buildProductEntries(site: URL) {
  const items = getCatalogItems(6);

  return items.map(item => {
    const budSize = normalizeText(item.Data?.Tama\u00f1o_del_boton);
    const stemLength = normalizeText(item.Data?.Longitud_del_tallo);
    const vaseLife = englishizeMetric(
      normalizeText(item.Data?.Vida_en_florero)
    );

    return {
      title: `${item.titulo} rose`,
      url: absoluteUrl(site, `/catalogo/${item.slug}`),
      description: normalizeText(
        `${item.tipo} export rose with bud size ${budSize}, stem length ${stemLength}, and vase life ${vaseLife}.`
      ),
    } satisfies LlmsEntry;
  });
}

function buildLanguageEntries(site: URL) {
  return locales.map(locale => ({
    title: `${localeLabels[locale]} site`,
    url: absoluteUrl(site, '/', locale),
    description:
      locale === defaultLocale
        ? 'Default site version with company, catalog, and wholesale sales information in Spanish.'
        : `Localized ${localeLabels[locale]} entry point for company, catalog, and contact information.`,
  })) satisfies LlmsEntry[];
}

function buildCatalogVarietyEntries(site: URL) {
  return getCatalogItems().map(item => {
    const budSize = normalizeText(item.Data?.Tama\u00f1o_del_boton);
    const stemLength = normalizeText(item.Data?.Longitud_del_tallo);
    const petals = normalizeText(item.Data?.Numero_de_petalos);
    const vaseLife = englishizeMetric(
      normalizeText(item.Data?.Vida_en_florero)
    );

    return {
      title: `${item.titulo} rose`,
      url: absoluteUrl(site, `/catalogo/${item.slug}`),
      description: normalizeText(
        `${item.tipo} export variety with bud size ${budSize}, stem length ${stemLength}, ${petals} petals, and vase life ${vaseLife}.`
      ),
    } satisfies LlmsEntry;
  });
}

async function getEnglishArticles() {
  const articles = await getCollection('articles');

  return articles
    .filter((article: ArticleEntry) => article.data.locale === 'en')
    .toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

function buildArticleEntries(site: URL, articles: ArticleEntry[]) {
  return articles.map(article => ({
    title: article.data.title,
    url: absoluteUrl(site, `/en/blog/articles/${article.data.articleSlug}`),
    description: normalizeText(article.data.description),
  })) satisfies LlmsEntry[];
}

function buildResourceEntries(site: URL) {
  return [
    {
      title: 'English blog',
      url: absoluteUrl(site, '/en/blog/articles'),
      description:
        'English resource hub covering export rose quality control, cold chain logistics, and sustainable high-altitude flower production.',
    },
    {
      title: 'Spanish blog',
      url: absoluteUrl(site, '/blog/articles'),
      description:
        'Spanish article hub for buyers researching rose production, export preparation, and post-harvest handling practices.',
    },
    {
      title: 'German blog',
      url: absoluteUrl(site, '/blog/articles', 'de'),
      description:
        'German article hub for international buyers seeking commercial and operational guidance about export roses.',
    },
    {
      title: 'Russian blog',
      url: absoluteUrl(site, '/blog/articles', 'ru'),
      description:
        'Russian article hub with educational content on rose quality, logistics, and farm operations.',
    },
    {
      title: 'Chinese blog',
      url: absoluteUrl(site, '/blog/articles', 'zh'),
      description:
        'Chinese article hub with educational content supporting wholesale rose sourcing and export understanding.',
    },
  ] satisfies LlmsEntry[];
}

function buildKeyFacts() {
  const home = getHomeContent(defaultLocale);
  const about = getAboutContent(defaultLocale);
  const contact = getContactContent(defaultLocale);
  const roseCount = Array.isArray(home.carrusel) ? home.carrusel.length : 0;
  const exportMarkets = normalizeText(
    about.datos_sobre_nosotros?.estadisticas?.find(
      (item: { texto?: string }) => item?.texto === 'Destinos de exportaci\u00f3n'
    )?.valor
  );

  return [
    `Business: ${normalizeText(getSeoContent('en').sobre_nosotros?.parte_de?.descripcion)}`,
    `Location: ${normalizeText(contact.contactos?.direcciones?.direccion_1)}; ${normalizeText(contact.contactos?.direcciones?.direccion_2)}`,
    `Catalog: ${roseCount} listed rose varieties with export specifications and product detail pages`,
    `Markets: importers, wholesalers, florists, distributors, and international brokers`,
    exportMarkets ? `Reach: ${exportMarkets} export destinations highlighted in company content` : '',
    'Languages: Spanish, English, German, Russian, and Chinese',
  ].filter(Boolean);
}

function buildContactLines(site: URL) {
  const home = getHomeContent(defaultLocale);
  const contact = getContactContent(defaultLocale);

  return [
    `- Website: ${absoluteUrl(site, '/')}`,
    `- Email: ${normalizeText(contact.contactos?.correo?.mail)}`,
    `- Phone: ${normalizeText(contact.contactos?.correo?.telefono)}`,
    `- Address: ${normalizeText(contact.contactos?.direcciones?.direccion_1)}; ${normalizeText(contact.contactos?.direcciones?.direccion_2)}`,
    `- Sales: ${normalizeText(home.anuncio?.link)}`,
  ];
}

export function generateLlmsTxt(site: URL) {
  const lines = [
    `# ${buildSiteName()}`,
    '',
    `> ${buildDescription()}`,
    '',
    '## Docs',
    ...buildDocsEntries(site).map(formatEntry),
    '',
    '## Products',
    ...buildProductEntries(site).map(formatEntry),
    '',
    '## Languages',
    ...buildLanguageEntries(site).map(formatEntry),
    '',
    '## Key Facts',
    ...buildKeyFacts().map(fact => `- ${fact}`),
    '',
    '## Contact',
    ...buildContactLines(site),
    '',
  ];

  return lines.join('\n');
}

export async function generateLlmsFullTxt(site: URL) {
  const articles = await getEnglishArticles();
  const lines = [
    `# ${buildSiteName()}`,
    '',
    `> ${buildDescription()}`,
    '',
    '## Docs',
    ...buildDocsEntries(site).map(formatEntry),
    '',
    '## Resources',
    ...buildResourceEntries(site).map(formatEntry),
    ...buildArticleEntries(site, articles).map(formatEntry),
    '',
    '## Products',
    ...buildCatalogVarietyEntries(site).map(formatEntry),
    '',
    '## Languages',
    ...buildLanguageEntries(site).map(formatEntry),
    '',
    '## Key Facts',
    ...buildKeyFacts().map(fact => `- ${fact}`),
    '',
    '## Contact',
    ...buildContactLines(site),
    '',
  ];

  return lines.join('\n');
}
