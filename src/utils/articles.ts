import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n/config';

type ArticleEntry = CollectionEntry<'articles'>;

function matchesLocale(article: ArticleEntry, locale: Locale) {
  return article.data.locale === locale;
}

export async function getArticlesByLocale(locale: Locale) {
  const articles = await getCollection('articles');

  return articles
    .filter(article => matchesLocale(article, locale))
    .toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getArticleStaticPaths(locale: Locale) {
  const articles = await getArticlesByLocale(locale);

  return articles.map(post => ({
    params: { id: post.data.articleSlug },
    props: { post },
  }));
}
