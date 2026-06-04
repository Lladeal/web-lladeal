import { withBase } from '@utils/links';

export const navigationLinks = [
  { path: '/about', href: withBase('/about'), label: 'Nosotros' },
  { path: '/contact', href: withBase('/contact'), label: 'Contactos' },
  { path: '/blog/articles', href: withBase('/blog/articles'), label: 'Blog' },
];
