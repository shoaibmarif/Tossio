import React from 'react';
import { InteractiveConvergenceLab } from '../components/probability/InteractiveConvergenceLab';
import { FairnessTester } from '../components/tools/FairnessTester';
import { SEOHead } from '../components/seo/SEOHead';
import { TrendingUp, BookOpen, Brain, HelpCircle } from 'lucide-react';

export const ProbabilityPage: React.FC = () => {
  const probabilityJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Coin Flip Probability & The Law of Large Numbers Explained',
    description:
      'Learn how coin flip probability works, why independent trials stay fair at 50/50, and explore an interactive simulation demonstrating convergence and sample variance.',
    author: {
      '@type': 'Organization',
      name: 'CoinFlip.io',
    },
  };

  return (
    <>
      <SEOHead
        title="Coin Flip Probability, Statistics & Law of Large Numbers"
        description="Understand coin toss mathematics, the Law of Large Numbers, trial independence, and test physical coin fairness in our interactive probability lab."
        canonicalPath="/coin-flip-probability"
        jsonLd={probabilityJsonLd}
      />

      <div className="space-y-12 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Educational Science Lab
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Coin Flip Probability & Convergence
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Discover the mathematics of randomness, why streaks happen, and how large samples inevitably converge toward 50%.
          </p>
        </div>

        {/* Interactive Convergence Lab */}
        <InteractiveConvergenceLab />

        {/* Deep Dive Educational Content */}
        <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
          <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Core Principles of Coin Toss Probability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-500" />
                1. What Probability Means
              </h3>
              <p>
                Probability measures the likelihood of an outcome occurring out of all possible equally likely scenarios. For a fair physical or digital coin with two outcomes (Heads or Tails):
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl font-mono text-xs border border-slate-200 dark:border-slate-800">
                P(Heads) = 1 / 2 = 0.50 (50%)<br />
                P(Tails) = 1 / 2 = 0.50 (50%)
              </div>
              <p>
                This indicates that over an infinite series of tosses, exactly half are expected to land on Heads.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                2. Statistical Independence & Gambler&apos;s Fallacy
              </h3>
              <p>
                A crucial attribute of a coin flip is <strong>independence</strong>. The coin possesses no memory of previous results.
              </p>
              <p>
                The common belief that after a run of 5 Heads, Tails is &quot;due&quot; is called the <strong>Gambler&apos;s Fallacy</strong>. In reality, the 6th flip still has an exact 50% chance of landing Heads.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500" />
                3. Why Short Experiments Look Uneven
              </h3>
              <p>
                In a brief session of 10 flips, getting 7 Heads (70%) and 3 Tails (30%) is statistically normal. The margin of error is inversely proportional to the square root of the sample size:
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl font-mono text-xs border border-slate-200 dark:border-slate-800">
                Margin of Error ≈ 1 / √N
              </div>
              <p>
                For N = 100, deviation can easily be ±10 percentage points. For N = 10,000, deviation drops to ±1 percentage point.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                4. The Law of Large Numbers
              </h3>
              <p>
                Formulated by mathematician Jacob Bernoulli, the Law of Large Numbers guarantees that as sample size \(N \to \infty\), the observed relative frequency converges almost surely to the true expected theoretical value.
              </p>
              <p>
                Our simulation tool allows you to watch this phenomenon occur live in your browser using millions of cryptographically secure tosses.
              </p>
            </div>
          </div>
        </section>

        {/* Physical Coin Fairness Tester */}
        <FairnessTester />
      </div>
    </>
  );
};
