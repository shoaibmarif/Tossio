import React from 'react';
import { Globe, Mail } from 'lucide-react';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/Button';
import { Github, Linkedin } from '../components/ui/BrandIcons';
import { SITE } from '../seo/site';

const LINKS = [
  { href: SITE.author.url, label: 'Portfolio', Icon: Globe },
  { href: SITE.author.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: SITE.repo, label: 'Source code', Icon: Github },
  { href: `mailto:${SITE.author.email}`, label: 'Email', Icon: Mail },
];

export const AboutPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/about" />
    <PageHeader title="About Tossio" intro="A coin flip that does one thing well, plus a few extras for the curious." />

    <article className="prose-page">
      <h2>What it’s for</h2>
      <p>
        Who goes first. Pizza or tacos. Which film to watch. Sometimes you just need a coin, and you don’t have
        one in your pocket. Tossio is a quick, fair one you can open on any phone or computer.
      </p>
      <p>
        Around that sits some extra stuff for people who enjoy it: a daily challenge, a prediction game, a
        simulator that flips a million coins at once, and a few pages about the surprisingly interesting maths
        and physics of coin tosses.
      </p>

      <h2>Keeping it fair</h2>
      <p>
        Every flip uses your browser’s cryptographic random number generator, so heads and tails are always
        exactly 50/50. The animation is just for show; the result is decided the moment you press the button.
        If you want the details, <a href="/how-coin-flipping-works">here’s how it works</a>.
      </p>

      <h2>No accounts, no ads</h2>
      <p>
        Your flips, streaks and settings are saved in your own browser. There’s nothing to sign up for and
        nothing to buy. Google Analytics is used to see roughly how many people visit; the{' '}
        <a href="/privacy">privacy policy</a> has the details.
      </p>

      <h2>Under the hood</h2>
      <p>
        Tossio is built with React and TypeScript and hosted on Vercel. The code is public on{' '}
        <a href={SITE.repo} target="_blank" rel="noopener">
          GitHub
        </a>
        , so you can see exactly how the coin decides.
      </p>

      <h2>Who’s behind it</h2>
      <p>
        I’m{' '}
        <a href={SITE.author.url} target="_blank" rel="noopener">
          {SITE.author.name}
        </a>
        , a software engineer, and Tossio is one of my side projects. Feedback, bug reports and ideas are
        always welcome.
      </p>
    </article>

    <ul className="mt-6 flex flex-wrap gap-2">
      {LINKS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener' })}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </a>
        </li>
      ))}
    </ul>

    <div className="mt-12 flex flex-wrap gap-3">
      <ButtonLink to="/">Flip a coin</ButtonLink>
      <ButtonLink to="/contact" variant="secondary">
        Get in touch
      </ButtonLink>
    </div>
  </div>
);
