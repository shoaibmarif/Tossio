import React from 'react';
import { Mail, Globe, Bug } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/BrandIcons';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

const CHANNELS = [
  {
    href: `mailto:${SITE.author.email}?subject=${encodeURIComponent('Tossio')}`,
    icon: Mail,
    tint: 'bg-heads-100 text-heads-800 dark:bg-heads-900/40 dark:text-heads-200',
    title: 'Email',
    value: SITE.author.email,
    body: 'The quickest way to reach me. Questions, ideas, feedback, or just hello.',
  },
  {
    href: SITE.author.linkedin,
    icon: Linkedin,
    tint: 'bg-tails-100 text-tails-700 dark:bg-tails-900/40 dark:text-tails-200',
    title: 'LinkedIn',
    value: 'linkedin.com/in/shoaibmarif',
    body: 'Connect or send a message on LinkedIn.',
  },
  {
    href: SITE.author.url,
    icon: Globe,
    tint: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
    title: 'Portfolio',
    value: 'shoaibarif.vercel.app',
    body: 'See what else I’ve been working on.',
  },
  {
    href: SITE.issues,
    icon: Bug,
    tint: 'bg-heads-100 text-heads-800 dark:bg-heads-900/40 dark:text-heads-200',
    title: 'Report a bug',
    value: 'GitHub issues',
    body: 'Found something broken? Open an issue with your browser, device and what happened.',
  },
];

export const ContactPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/contact" />
    <PageHeader
      title="Contact"
      intro={`${SITE.name} is built and maintained by ${SITE.author.name}. I’d love to hear from you.`}
    />

    <ul className="grid gap-4 sm:grid-cols-2">
      {CHANNELS.map((c) => {
        const external = !c.href.startsWith('mailto:');
        return (
          <li key={c.title}>
            <a
              href={c.href}
              {...(external ? { target: '_blank', rel: 'noopener' } : {})}
              className="card flex h-full gap-4 p-5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${c.tint}`}>
                <c.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-medium">{c.title}</span>
                <span className="block break-all text-sm text-tails-600 dark:text-tails-400">{c.value}</span>
                <span className="mt-1 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{c.body}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>

    <div className="prose-page mt-12">
      <h2>Open source</h2>
      <p>
        {SITE.name}’s code is public on{' '}
        <a href={SITE.repo} target="_blank" rel="noopener">
          GitHub
        </a>
        . Pull requests and ideas are welcome.
      </p>

      <h2>Reporting an accessibility problem</h2>
      <p>
        If something is hard to read, hard to reach with a keyboard, or doesn’t work well with a screen reader,
        please tell me which page you were on and what device and browser you were using.
      </p>
    </div>

    <p className="mt-10 flex items-center gap-2 text-sm text-zinc-500">
      <Github className="h-4 w-4" aria-hidden="true" />
      <a href={SITE.repo} target="_blank" rel="noopener" className="hover:text-zinc-900 dark:hover:text-white">
        github.com/shoaibmarif/tossio
      </a>
    </p>
  </div>
);
