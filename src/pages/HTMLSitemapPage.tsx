import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ROUTES } from '../seo/routes';

const GROUPS: { title: string; paths: string[] }[] = [
  { title: 'Flip', paths: ['/', '/decision-coin-flip', '/daily-coin-flip', '/coin-flip-experiment', '/coin-flip-statistics'] },
  { title: 'Learn', paths: ['/coin-flip-probability', '/how-coin-flipping-works', '/faq'] },
  { title: 'About Tossio', paths: ['/about', '/contact', '/privacy', '/terms'] },
];

export const HTMLSitemapPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/sitemap" />
    <PageHeader title="Sitemap" intro="Every page on Tossio, in one place." />
    <div className="grid gap-10 sm:grid-cols-3">
      {GROUPS.map((g) => (
        <section key={g.title}>
          <h2 className="text-base font-semibold">{g.title}</h2>
          <ul className="mt-3 space-y-3">
            {g.paths.map((p) => {
              const r = ROUTES.find((x) => x.path === p)!;
              return (
                <li key={p}>
                  <Link to={p} className="font-medium text-tails-600 hover:underline dark:text-tails-400">
                    {r.path === '/' ? 'Flip a coin' : r.heading}
                  </Link>
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{r.description}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  </div>
);
