import React from 'react';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { Accordion } from '../components/ui/Accordion';
import { ButtonLink } from '../components/ui/Button';
import { FAQ_ITEMS } from '../data/faq';
import { faqJsonLd } from '../seo/head';

export const FAQPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/faq" structuredData={faqJsonLd(FAQ_ITEMS)} />
    <PageHeader title="Frequently asked questions" intro="About Tossio, randomness, streaks and real coins." />
    <Accordion items={FAQ_ITEMS} />
    <div className="mt-10 text-center">
      <ButtonLink to="/" size="lg">
        Flip a coin
      </ButtonLink>
    </div>
  </div>
);
