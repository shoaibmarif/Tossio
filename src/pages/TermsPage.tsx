import React from 'react';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

export const TermsPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/terms" />
    <PageHeader title="Terms and conditions" intro="Last updated 6 November 2026." />

    <article className="prose-page">
      <p>
        These terms apply when you use {SITE.name} at <a href={SITE.url}>{SITE.url.replace('https://', '')}</a>.
        By using the site you agree to them. If you don’t, please don’t use it.
      </p>

      <h2>1. What {SITE.name} is</h2>
      <p>
        A free online coin flip, with a few extras for fun and learning. There are no accounts, subscriptions
        or payments.
      </p>

      <h2>2. Not for gambling or anything important</h2>
      <p>
        {SITE.name} is for entertainment, everyday decisions and education. Please don’t use it for gambling,
        betting with money, legal or medical decisions, or anything where the outcome really matters. The
        weighted coin in the simulator is deliberately unfair and is clearly labelled as such.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You’re welcome to use, share and link to the site. Please don’t:</p>
      <ul>
        <li>try to disrupt or overload it, or send automated traffic to it;</li>
        <li>use it for anything unlawful;</li>
        <li>present the site, its name or its design as your own.</li>
      </ul>

      <h2>4. Source code</h2>
      <p>
        The code is public on{' '}
        <a href={SITE.repo} target="_blank" rel="noopener">
          GitHub
        </a>
        . Any reuse is governed by the license published in that repository; where none is published, all
        rights are reserved by the author.
      </p>

      <h2>5. Your data</h2>
      <p>
        Your flips and settings are stored in your browser and can’t be recovered if you clear it. See the{' '}
        <a href="/privacy">privacy policy</a>.
      </p>

      <h2>6. No warranty</h2>
      <p>
        The site is provided as is, without warranties of any kind. We do our best to keep it fair and working,
        but can’t guarantee it will always be available or error free.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent the law allows, {SITE.author.name} isn’t liable for any loss arising from your use of the
        site, including decisions made with it.
      </p>

      <h2>8. Changes</h2>
      <p>These terms may change from time to time. The date at the top shows the latest version.</p>

      <h2>9. Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SITE.author.email}`}>{SITE.author.email}</a>.
      </p>
    </article>
  </div>
);
