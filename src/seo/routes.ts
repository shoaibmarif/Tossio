/**
 * SEO metadata for every page. Used at runtime by <SeoMeta> and at build time
 * by scripts/seoPlugin.ts, which writes one static HTML file per page and
 * generates sitemap.xml. Keep titles under ~60 characters.
 */
export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  label: string;
  heading: string;
  changefreq: ChangeFreq;
  priority: number;
  noindex?: boolean;
  parent?: string;
  /** Marks interactive tool pages for WebApplication structured data. */
  app?: boolean;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Tossio - Flip a Coin Online, Heads or Tails',
    description:
      'Flip a coin online in one tap. Fair heads or tails with a real 3D coin, streaks, a daily challenge and a decision maker. Free, no sign-up.',
    label: 'Home',
    heading: 'Flip a coin',
    changefreq: 'weekly',
    priority: 1.0,
    app: true,
  },
  {
    path: '/decision-coin-flip',
    title: 'Decision Coin Flip - Let a Coin Choose Between Two Options',
    description:
      'Can’t decide? Type your two options and flip a coin to pick one. A fair, quick way to settle small decisions and friendly arguments.',
    label: 'Decision flip',
    heading: 'Decision coin flip',
    changefreq: 'monthly',
    priority: 0.9,
    parent: '/',
    app: true,
  },
  {
    path: '/daily-coin-flip',
    title: 'Daily Coin Flip Challenge and Prediction Game',
    description:
      'A new coin flip goal every day, plus a prediction game: call heads or tails before you flip, build a streak and see how lucky you really are.',
    label: 'Daily challenge',
    heading: 'Daily coin flip challenge',
    changefreq: 'daily',
    priority: 0.8,
    parent: '/',
    app: true,
  },
  {
    path: '/coin-flip-experiment',
    title: 'Coin Flip Simulator - Flip Up to 1,000,000 Coins at Once',
    description:
      'Flip 100, 10,000 or a million coins in an instant and see how close you get to 50/50. Includes a weighted coin and saved experiments.',
    label: 'Simulator',
    heading: 'Coin flip simulator',
    changefreq: 'monthly',
    priority: 0.9,
    parent: '/',
    app: true,
  },
  {
    path: '/coin-flip-probability',
    title: 'Coin Flip Probability Explained, With Live Examples',
    description:
      'Why a fair coin lands heads 50% of the time, how streaks happen, the gambler’s fallacy, and an interactive demo of the law of large numbers.',
    label: 'Probability',
    heading: 'Coin flip probability',
    changefreq: 'monthly',
    priority: 0.8,
    parent: '/',
  },
  {
    path: '/how-coin-flipping-works',
    title: 'How Coin Flipping Works, From Real Coins to Random Numbers',
    description:
      'What actually decides a real coin toss, why it’s not quite 50/50, and how an online coin flip like Tossio gets its random results.',
    label: 'How it works',
    heading: 'How coin flipping works',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/coin-flip-probability',
  },
  {
    path: '/coin-flip-statistics',
    title: 'Your Coin Flip Statistics, Streaks and Achievements',
    description:
      'Your total flips, heads and tails split, longest streaks and achievements. Stored only in your browser.',
    label: 'Statistics',
    heading: 'Your statistics',
    changefreq: 'monthly',
    priority: 0.3,
    noindex: true,
    parent: '/',
  },
  {
    path: '/faq',
    title: 'Coin Flip FAQ - Common Questions Answered',
    description:
      'Is an online coin flip really random? Can a coin land on its edge? Why do streaks happen? Answers to common questions about Tossio and coin flips.',
    label: 'FAQ',
    heading: 'Frequently asked questions',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/',
  },
  {
    path: '/about',
    title: 'About Tossio',
    description: 'Why Tossio exists, how it keeps every flip fair, and who builds it.',
    label: 'About',
    heading: 'About Tossio',
    changefreq: 'yearly',
    priority: 0.5,
    parent: '/',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Report a bug, suggest a feature or just say hello. Email, LinkedIn and GitHub links for Tossio.',
    label: 'Contact',
    heading: 'Contact',
    changefreq: 'yearly',
    priority: 0.4,
    parent: '/',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Tossio has no accounts and no game server. Your flips stay in your browser. Here’s what little we collect and why.',
    label: 'Privacy',
    heading: 'Privacy policy',
    changefreq: 'yearly',
    priority: 0.3,
    parent: '/',
  },
  {
    path: '/terms',
    title: 'Terms and Conditions',
    description: 'The terms that apply when you use Tossio.',
    label: 'Terms',
    heading: 'Terms and conditions',
    changefreq: 'yearly',
    priority: 0.3,
    parent: '/',
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    description: 'Every page on Tossio in one list.',
    label: 'Sitemap',
    heading: 'Sitemap',
    changefreq: 'monthly',
    priority: 0.2,
    parent: '/',
  },
];

/** Old or duplicate URLs, permanently redirected to their canonical page. */
export const REDIRECTS: Record<string, string> = {
  '/coin-flip': '/',
  '/flip-a-coin': '/',
  '/virtual-coin-flip': '/',
  '/heads-or-tails': '/',
  '/coin-flip-online': '/',
  '/random-coin-flip': '/',
  '/coin-flip-simulator': '/coin-flip-experiment',
};

const byPath = new Map(ROUTES.map((m) => [m.path, m]));

export const getRouteMeta = (path: string): RouteMeta | undefined => byPath.get(path);

export const getBreadcrumbs = (path: string): RouteMeta[] => {
  const trail: RouteMeta[] = [];
  let current = byPath.get(path);
  const seen = new Set<string>();
  while (current && !seen.has(current.path)) {
    seen.add(current.path);
    trail.unshift(current);
    current = current.parent ? byPath.get(current.parent) : undefined;
  }
  return trail;
};
