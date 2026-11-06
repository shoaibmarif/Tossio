import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, FlaskConical, Shuffle } from 'lucide-react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Coin } from '../components/coin/Coin';
import { CoinResult } from '../components/coin/CoinResult';
import { FlipControls } from '../components/flip/FlipControls';
import { QuickStats } from '../components/flip/QuickStats';
import { HistoryList } from '../components/flip/HistoryList';
import { CustomCoinDesigner } from '../components/tools/CustomCoinDesigner';
import { ExperimentModal } from '../components/experiments/ExperimentModal';
import { SeoMeta } from '../components/seo/SeoMeta';
import { Accordion } from '../components/ui/Accordion';
import { FAQ_ITEMS } from '../data/faq';
import { appJsonLd } from '../seo/head';
import { getRouteMeta } from '../seo/routes';
import type { BatchExperimentRecord } from '../types';

const MORE = [
  {
    to: '/decision-coin-flip',
    icon: Shuffle,
    tint: 'bg-heads-100 text-heads-800 dark:bg-heads-900/40 dark:text-heads-200',
    title: 'Decision flip',
    body: 'Type your two options and let the coin pick. Great for settling who does the dishes.',
  },
  {
    to: '/daily-coin-flip',
    icon: Calendar,
    tint: 'bg-tails-100 text-tails-700 dark:bg-tails-900/40 dark:text-tails-200',
    title: 'Daily challenge',
    body: 'A new goal every day, plus a prediction game. Call it before you flip and build a streak.',
  },
  {
    to: '/coin-flip-experiment',
    icon: FlaskConical,
    tint: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
    title: 'Simulator',
    body: 'Flip up to a million coins at once and watch the results settle towards 50/50.',
  },
];

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
  const home = getRouteMeta('/')!;

  // Space/Enter flips, H/T predicts. (No reset shortcut: one stray key shouldn't wipe your stats.)
  useKeyboardControls({
    onFlip: () => {
      if (coinState !== 'FLIPPING') flipCoin();
    },
    onPredict: setPrediction,
  });

  const handleBatchFlip = (count: number) => setActiveExperiment(runExperiment({ count }));

  return (
    <div>
      <SeoMeta canonicalPath="/" structuredData={appJsonLd('/', 'Tossio', home.description)} />

      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Flip a coin: <span className="text-heads-600 dark:text-heads-400">heads</span> or{' '}
          <span className="text-tails-600 dark:text-tails-400">tails</span>?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Tap the coin or press Space. It’s a fair 50/50 every time, so you can settle a decision, start a game
          or just see how long your lucky streak lasts.
        </p>
      </section>

      <section aria-label="Coin flip" className="card mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 p-6 shadow-card sm:p-8">
        <Coin coinState={coinState} latestResult={latestResult} settings={state.settings} onFlip={() => flipCoin()} />
        <CoinResult
          coinState={coinState}
          latestResult={latestResult}
          flipNumber={latestFlipNumber}
          customization={state.settings.customization}
        />
        <FlipControls
          coinState={coinState}
          soundEnabled={state.settings.soundEnabled}
          onFlip={() => flipCoin()}
          onBatchFlip={handleBatchFlip}
          onToggleSound={() => updateSettings({ soundEnabled: !state.settings.soundEnabled })}
          onReset={resetAllStats}
          predictionSide={state.predictionStats.selectedPrediction}
          onSelectPrediction={setPrediction}
          isPredictionMode
        />
      </section>

      <div className="mx-auto mt-6 grid max-w-3xl gap-6">
        <section aria-label="Your flips">
          <QuickStats stats={state.overallStats} customization={state.settings.customization} />
        </section>
        <section aria-label="Flip history">
          <HistoryList history={state.history} customization={state.settings.customization} onClearHistory={clearHistory} />
        </section>
      </div>

      <section aria-labelledby="more-heading" className="mx-auto mt-20 max-w-5xl">
        <h2 id="more-heading" className="text-2xl font-semibold sm:text-3xl">
          More than one way to flip
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {MORE.map((m) => (
            <Link key={m.to} to={m.to} className="card group p-5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.tint}`}>
                <m.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-4 flex items-center justify-between font-medium">
                {m.title}
                <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{m.body}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Design your coin" className="mx-auto mt-20 max-w-5xl">
        <CustomCoinDesigner
          customization={state.settings.customization}
          onChange={(updated) => updateSettings({ customization: { ...state.settings.customization, ...updated } })}
        />
      </section>

      <section aria-labelledby="fair-heading" className="mx-auto mt-20 grid max-w-5xl gap-10 lg:grid-cols-2">
        <div>
          <h2 id="fair-heading" className="text-2xl font-semibold sm:text-3xl">
            Is it really 50/50?
          </h2>
          <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
            Yes. Each flip uses your browser’s cryptographic random number generator, the same kind used to
            create secure passwords. Nothing about earlier flips makes one side more likely.
          </p>
          <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
            That doesn’t mean results will look even. Ten flips can easily come out 7 to 3, and runs of five or
            six in a row are normal. Over thousands of flips, though, it settles very close to half and half.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <Link to="/coin-flip-probability" className="inline-flex items-center gap-1 text-tails-600 hover:text-tails-700 dark:text-tails-400">
              Coin flip probability <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/how-coin-flipping-works" className="inline-flex items-center gap-1 text-tails-600 hover:text-tails-700 dark:text-tails-400">
              How it works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">Questions</h2>
          <div className="mt-4">
            <Accordion items={FAQ_ITEMS.slice(0, 4)} variant="lines" />
          </div>
          <Link to="/faq" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tails-600 hover:text-tails-700 dark:text-tails-400">
            All questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {activeExperiment && <ExperimentModal experiment={activeExperiment} onClose={() => setActiveExperiment(null)} />}
    </div>
  );
};
