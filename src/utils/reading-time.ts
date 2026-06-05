import calculateReadingTime from 'reading-time';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

export const getReadingTime = (text: string, locale = 'en'): string | undefined => {
  if (!text || !text.length) return undefined;
  try {
    const { minutes } = calculateReadingTime(toString(fromMarkdown(text)));
    if (minutes && minutes > 0) {
      const totalMinutes = Math.ceil(minutes);
      if (locale === 'es') return `${totalMinutes} min de lectura`;
      if (locale === 'ru') return `${totalMinutes} мин чтения`;
      if (locale === 'zh') return `阅读约 ${totalMinutes} 分钟`;
      return `${totalMinutes} min read`;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};
