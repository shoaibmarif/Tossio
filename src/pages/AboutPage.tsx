import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Info, Shield, Cpu, Zap, Globe, ExternalLink, User } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About coinfliptool & The Random Engine',
    description:
      'Learn about the engineering behind coinfliptool: Web Cryptography API random sampling, client-side execution, and offline PWA architecture developed by Shoaib Arif.',
    url: 'https://coinfliptool.netlify.app/about',
    author: {
      '@type': 'Person',
      name: 'Shoaib Arif',
      url: 'https://shoaibarif.vercel.app/',
      sameAs: [
        'https://github.com/shoaibmarif',
        'https://www.linkedin.com/in/shoaibmarif/',
        'https://shoaibarif.vercel.app/',
      ],
    },
  };

  return (
    <>
      <SEOHead
        title="About coinfliptool – Engineering, CSPRNG & Creator"
        description="Learn about our cryptographically secure virtual coin flip simulator, client-side architecture, and developer Shoaib Arif."
        keywords="about coinfliptool, Shoaib Arif, CSPRNG, Web Cryptography API, crypto getRandomValues, fair coin flip algorithm, random number generator"
        canonicalPath="/about"
        breadcrumbs={breadcrumbs}
        jsonLd={aboutJsonLd}
      />

      <div className="space-y-10 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            About the Application
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <Info className="w-8 h-8 text-amber-500" />
            About coinfliptool
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            A production-ready virtual coin flip simulator, statistical laboratory, and probability education engine.
          </p>
        </div>

        {/* Creator / Developer Card */}
        <div className="bg-gradient-to-br from-amber-500/10 via-slate-50 to-indigo-500/10 dark:from-amber-950/30 dark:via-slate-900 dark:to-indigo-950/30 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Lead Developer & Creator
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Shoaib Arif
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Engineered with a focus on statistical transparency, accessibility, performance, and complete client-side data privacy.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://shoaibarif.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 font-bold text-xs shadow-xs transition-colors"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Portfolio Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 font-bold text-xs shadow-xs transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub (@shoaibmarif)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-[#0A66C2] border border-slate-200 dark:border-slate-700 font-bold text-xs shadow-xs transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
              </svg>
              <span>LinkedIn (@shoaibmarif)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Engineering Content */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" />
            Engineering Principle: Cryptographic Randomness
          </h2>
          <p>
            Many standard web tools rely on <code>Math.random()</code>, which employs a pseudo-random number generator (PRNG) like Xoroshiro128+. While fast, traditional PRNGs are deterministic, exhibit slight periodicity, and cannot provide true unpredictability.
          </p>
          <p>
            coinfliptool utilizes the browser native <strong>Web Cryptography API</strong> (<code>crypto.getRandomValues()</code>). This accesses hardware-level entropy sources supplied by the underlying operating system kernel, guaranteeing that every single flip is an independent, non-manipulated Bernoulli trial with \(P = 0.5\).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pt-4">
            <Shield className="w-5 h-5 text-emerald-500" />
            Privacy-First Architecture
          </h2>
          <p>
            We believe your decisions and experimental records should belong solely to you:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>No user accounts, tracking cookies, or registration required.</li>
            <li>No remote database storage or backend transmission of flip data.</li>
            <li>All history, achievements, and settings reside in your browser&apos;s local storage.</li>
            <li>Full offline capability as an installable Progressive Web App (PWA).</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pt-4">
            <Zap className="w-5 h-5 text-indigo-500" />
            High Performance Batch Simulation
          </h2>
          <p>
            Testing statistical theories like the Law of Large Numbers requires analyzing hundreds of thousands of events. Our engine uses bitwise population count operations over 32-bit integer buffers, allowing you to run 1,000,000 flips in milliseconds without lag or freezing.
          </p>
        </div>
      </div>
    </>
  );
};
