import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/seo/SeoMeta';
import { ButtonLink } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => (
  <div className="mx-auto max-w-xl py-16 text-center">
    <SeoMeta canonicalPath="/404" title="Page not found" description="The page you were looking for doesn’t exist." noindex />
    <p className="eyebrow">404</p>
    <h1 className="mt-2 text-3xl font-semibold">This page doesn’t exist</h1>
    <p className="mt-3 text-zinc-600 dark:text-zinc-400">The link might be old or mistyped. The coin is still here, though.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <ButtonLink to="/">Flip a coin</ButtonLink>
      <ButtonLink to="/sitemap" variant="secondary">
        See all pages
      </ButtonLink>
    </div>
    <p className="mt-8 text-sm text-zinc-500">
      Got a question? Try the <Link className="underline" to="/faq">FAQ</Link>.
    </p>
  </div>
);
