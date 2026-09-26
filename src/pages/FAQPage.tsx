import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does this coin flip generate its random numbers?',
      a: 'We use the browser native Web Cryptography API via crypto.getRandomValues(). It pulls entropy directly from the underlying operating system and hardware noise generators. This guarantees unbiased, non-deterministic 50/50 outcomes, unlike pseudo-random software algorithms like basic Math.random().',
    },
    {
      q: 'Can this tool simulate 100,000 or 1,000,000 flips quickly without crashing?',
      a: 'Yes! Our bulk generation engine samples 32-bit random integers and performs hardware population-count bit manipulation. Simulating 1,000,000 coin tosses takes mere milliseconds and never locks the user interface.',
    },
    {
      q: 'What is the Gambler’s Fallacy in coin tossing?',
      a: 'The Gambler’s Fallacy is the incorrect belief that if an event has occurred more frequently than normal in the past, it is less likely to happen in the future (or vice versa). In truth, a coin flip is memoryless. Regardless of past outcomes, each independent toss remains exactly 50% Heads and 50% Tails.',
    },
    {
      q: 'Is my data or flip history sent to any server?',
      a: 'No. This application is 100% frontend-only and runs entirely within your web browser. All statistics, streaks, achievements, custom coin labels, and decision choices are stored locally using browser localStorage. Nothing leaves your device.',
    },
    {
      q: 'Can I install this app on my phone and use it offline?',
      a: 'Yes. CoinFlip is a Progressive Web App (PWA). You can tap "Install App" or "Add to Home Screen" on iOS and Android. Once loaded, it works completely offline without an internet connection.',
    },
    {
      q: 'What are the keyboard shortcuts?',
      a: 'Press Space or Enter to flip the coin. Press R to reset statistics and history. Press H to predict Heads, T to predict Tails, and Escape to dismiss open modals.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions – Coin Flip & Probability FAQ"
        description="Find answers to common questions about online coin flips, cryptographic randomness, simulation limits, Gambler's Fallacy, and keyboard controls."
        canonicalPath="/faq"
        jsonLd={faqJsonLd}
      />

      <div className="space-y-10 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <HelpCircle className="w-8 h-8 text-amber-500" />
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Everything you need to know about our cryptographic randomness engine, privacy model, and probability math.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2"
            >
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {faq.q}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
