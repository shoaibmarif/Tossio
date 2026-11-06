import React from 'react';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

export const PrivacyPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/privacy" />
    <PageHeader title="Privacy policy" intro="Last updated 6 November 2026." />

    <article className="prose-page">
      <p>
        {SITE.name} is a coin flip that runs in your browser. There are no accounts and no game server, so
        there’s very little to tell. Here is all of it.
      </p>

      <h2>Nothing to sign up for</h2>
      <p>You can use {SITE.name} without giving us your name, email address or anything else about you.</p>

      <h2>What stays on your device</h2>
      <p>
        Your flip history, statistics, streaks, achievements, saved experiments, decision options, coin design
        and settings are stored in your browser’s <code>localStorage</code>. They never leave your device and
        we can’t see them. You can delete them with the reset buttons on the statistics page, or by clearing
        this site’s data in your browser.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics and Google Tag Manager to understand, in general terms, how many people visit and which pages they
        use. Google Analytics uses cookies and collects details like the pages you view, your approximate
        location, and your device and browser type. We don’t use it for advertising and we don’t sell data. You
        can block it with a content blocker or Google’s{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          opt-out add-on
        </a>
        . See{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google’s privacy policy
        </a>{' '}
        for more.
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted on Vercel, which keeps standard server logs (such as IP addresses and the pages
        requested) to run the service and protect it from abuse.
      </p>

      <h2>Questions</h2>
      <p>
        If you email me, I’ll only use your address to reply. Questions about this policy can go to{' '}
        <a href={`mailto:${SITE.author.email}`}>{SITE.author.email}</a>.
      </p>
    </article>
  </div>
);
