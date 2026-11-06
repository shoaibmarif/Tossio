export interface NavItem {
  to: string;
  label: string;
  desc?: string;
}

/** Top-level links shown directly in the header. */
export const PRIMARY_NAV: NavItem[] = [
  { to: '/decision-coin-flip', label: 'Decide' },
  { to: '/daily-coin-flip', label: 'Daily' },
  { to: '/coin-flip-experiment', label: 'Simulator' },
];

export const LEARN_NAV: NavItem[] = [
  { to: '/coin-flip-probability', label: 'Coin flip probability', desc: 'Odds, streaks and the gambler’s fallacy' },
  { to: '/how-coin-flipping-works', label: 'How coin flipping works', desc: 'Real coins vs random numbers' },
  { to: '/faq', label: 'FAQ', desc: 'Common questions, answered' },
];

export const FOOTER_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: 'Flip',
    items: [
      { to: '/', label: 'Flip a coin' },
      { to: '/decision-coin-flip', label: 'Decision flip' },
      { to: '/daily-coin-flip', label: 'Daily challenge' },
      { to: '/coin-flip-experiment', label: 'Simulator' },
      { to: '/coin-flip-statistics', label: 'Your statistics' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { to: '/coin-flip-probability', label: 'Probability' },
      { to: '/how-coin-flipping-works', label: 'How it works' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
];

export const SITE_LINKS: NavItem[] = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/sitemap', label: 'Sitemap' },
];
