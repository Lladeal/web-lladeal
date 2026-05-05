const BASE_URL = import.meta.env.BASE_URL;

export function withBase(path?: string) {
  if (!path) return path;

  if (/^(?:[a-z]+:|\/\/|#|mailto:|tel:)/i.test(path)) {
    return path;
  }

  const normalizedBase = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');

  if (path === '/') {
    return normalizedBase || '/';
  }

  const normalizedPath = path.replace(/^\//, '');
  return `${normalizedBase}/${normalizedPath}`;
}

export function stripBase(pathname: string) {
  const normalizedBase = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');

  if (normalizedBase && pathname.startsWith(normalizedBase)) {
    return pathname.slice(normalizedBase.length) || '/';
  }

  return pathname || '/';
}
