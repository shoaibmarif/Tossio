import React, { useState } from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Coin } from '../components/coin/Coin';
import { CoinResult } from '../components/coin/CoinResult';
import { FlipControls } from '../components/flip/FlipControls';
import { QuickStats } from '../components/flip/QuickStats';
import { HistoryList } from '../components/flip/HistoryList';
import { CustomCoinDesigner } from '../components/tools/CustomCoinDesigner';
import { ExperimentModal } from '../components/experiments/ExperimentModal';
import { SEOHead } from '../components/seo/SEOHead';
import type { BatchExperimentRecord } from '../types';
import { Sparkles, HelpCircle, Shield, Cpu, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const {
    state,
    coinState,
    latestResult,
    latestFlipNumber,
    flipCoin,
    runExperiment,
    clearHistory,
    resetAllStats,
    setPrediction,
    updateSettings,
  } = useCoinFlipGame();

  const [activeExperiment, setActiveExperiment] = useState<BatchExperimentRecord | null>(null);

  // Keyboard shortcut binding
  useKeyboardControls({
    onFlip: () => {
      if (coinState !== 'FLIPPING') {
        flipCoin();
      }
    },
    onReset: resetAllStats,
    onPredict: setPrediction,
  });

  const handleBatchFlip = (count: number) => {
    const exp = runExperiment({ count });
    setActiveExperiment(exp);
  };

  const faqItems = [
    {
      q: 'Is this virtual coin flip genuinely random and fair?',
      a: 'Yes. Every toss uses the browser Web Cryptography API (crypto.getRandomValues()), which produces cryptographically secure entropy. Unlike basic Math.random(), each outcome is an authentic 50/50 probability event.',
    },
    {
      q: 'Why did I get 6 Heads in a row? Is the coin rigged?',
      a: 'No. In fair random processes, each flip is completely independent. A streak of 6 Heads has a probability of (1/2)^6 = 1.56% (approx 1 in 64 trials), which naturally happens during regular use.',
    },
    {
      q: 'What is the Gambler’s Fallacy?',
      a: 'The Gambler’s Fallacy is the mistaken belief that past flips influence future flips. A coin has no memory. If you flip 10 Heads in a row, the exact probability of Heads on flip #11 remains strictly 50%.',
    },
    {
      q: 'Can I simulate 10,000 or 1,000,000 flips at once?',
      a: 'Yes! Click "Batch Experiments" or "Custom..." to simulate up to 1,000,000 flips in milliseconds. The tool will calculate heads, tails, percentages, streaks, and deviation from 50/50 instantly.',
    },
  ];

  const homepageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'coinfliptool – Free Virtual Coin Flip & Probability Simulator',
    url: 'https://coinfliptool.netlify.app/',
    description:
      'Flip a coin online instantly with a realistic 3D animated coin. Powered by cryptographically secure random values (crypto.getRandomValues()), complete with batch experiments, streak tracking, and probability statistics.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <SEOHead
        title="Free Coin Flip Online – Heads or Tails Simulator"
        description="Flip a fair virtual coin online with realistic 3D animation, cryptographically secure randomness, live streak tracking, batch experiments, and probability stats."
        canonicalPath="/"
        jsonLd={homepageJsonLd}
      />

      <div className="space-y-12">
        {/* Top Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cryptographically Secure 50/50 Randomness</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Free Coin Flip Online
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            Toss a virtual coin for quick decisions, streak challenges, or batch experiments. Powered by browser cryptographic entropy for certified fairness.
          </p>
        </section>

        {/* Primary Interactive Coin Arena */}
        <section className="flex flex-col items-center gap-6" aria-label="Coin Flip Game">
          {/* 3D Coin Graphic */}
          <Coin
            coinState={coinState}
            latestResult={latestResult}
            settings={state.settings}
            onFlip={() => flipCoin()}
          />

          {/* Obvious Result Banner */}
          <CoinResult
            coinState={coinState}
            latestResult={latestResult}
            flipNumber={latestFlipNumber}
            customization={state.settings.customization}
          />

          {/* Interactive Flip Controls */}
          <FlipControls
            coinState={coinState}
            soundEnabled={state.settings.soundEnabled}
            onFlip={() => flipCoin()}
            onBatchFlip={handleBatchFlip}
            onToggleSound={() => updateSettings({ soundEnabled: !state.settings.soundEnabled })}
            onReset={resetAllStats}
            predictionSide={state.predictionStats.selectedPrediction}
            onSelectPrediction={setPrediction}
            isPredictionMode={true}
          />
        </section>

        {/* Quick Statistics & Streaks */}
        <section aria-label="Flip Statistics">
          <QuickStats
            stats={state.overallStats}
            customization={state.settings.customization}
          />
        </section>

        {/* Flip History & Sequence Ribbon */}
        <section aria-label="Flip History">
          <HistoryList
            history={state.history}
            customization={state.settings.customization}
            onClearHistory={clearHistory}
          />
        </section>

        {/* Custom Coin Studio Preview */}
        <section aria-label="Coin Studio">
          <CustomCoinDesigner
            customization={state.settings.customization}
            onChange={(updated) => updateSettings({ customization: { ...state.settings.customization, ...updated } })}
          />
        </section>

        {/* Educational Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              CSPRNG Random Engine
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every toss samples hardware-based entropy via <code>crypto.getRandomValues()</code>, eliminating the statistical clustering found in pseudo-random algorithms.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Law of Large Numbers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              While 10 flips can easily result in 70% Heads, simulating 10,000 flips quickly converges within fractions of a percent from the theoretical 50.0% benchmark.
            </p>
            <Link
              to="/coin-flip-probability"
              className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
            >
              Explore Probability Lab &rarr;
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No account creation, cookies, or remote databases. All streaks, history, custom decisions, and settings remain solely on your device.
            </p>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-4">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.q}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experiment Modal */}
        {activeExperiment && (
          <ExperimentModal
            experiment={activeExperiment}
            onClose={() => setActiveExperiment(null)}
          />
        )}
      </div>
    </>
  );
};
