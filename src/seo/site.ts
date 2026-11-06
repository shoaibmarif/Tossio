/**
 * Brand and deployment details in one place. Change `url` if the domain
 * changes: canonical URLs, the sitemap, social tags and structured data all
 * derive from it.
 */
export const SITE = {
  name: 'Tossio',
  url: 'https://tossio.vercel.app',
  defaultDescription:
    'Flip a coin online with Tossio. Heads or tails in one tap, plus streaks, a daily challenge, a decision maker and a simulator for up to a million flips. Free, no sign-up.',
  locale: 'en_US',
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Tossio, a free online coin flip',
  author: {
    name: 'Shoaib Arif',
    url: 'https://shoaibarif.vercel.app/',
    github: 'https://github.com/shoaibmarif',
    linkedin: 'https://www.linkedin.com/in/shoaibmarif/',
    email: 'shoaibmuhammadarif@gmail.com',
  },
  repo: 'https://github.com/shoaibmarif/tossio',
  issues: 'https://github.com/shoaibmarif/tossio/issues',
} as const;

export const absoluteUrl = (path: string): string =>
  path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
