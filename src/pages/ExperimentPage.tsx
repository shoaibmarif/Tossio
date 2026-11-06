import React, { useState } from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { WeightedSimulator } from '../components/tools/WeightedSimulator';
import { SavedExperiments } from '../components/experiments/SavedExperiments';
import { ExperimentModal } from '../components/experiments/ExperimentModal';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { appJsonLd } from '../seo/head';
import { getRouteMeta } from '../seo/routes';
import type { BatchExperimentRecord } from '../types';
import { Play, Sparkles } from 'lucide-react';

const ROUTE = getRouteMeta('/coin-flip-experiment')!;

export const ExperimentPage: React.FC = () => {
  const { state, runExperiment, deleteExperiment, clearAllExperiments } = useCoinFlipGame();
  const [activeExperiment, setActiveExperiment] = useState<BatchExperimentRecord | null>(null);
  const [batchCountInput, setBatchCountInput] = useState<string>('1000');

  const handleQuickBatch = (count: number) => {
    const exp = runExperiment({ count });
    setActiveExperiment(exp);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(batchCountInput, 10);
    if (!isNaN(count) && count > 0 && count <= 1000000) {
      handleQuickBatch(count);
    }
  };


  return (
    <>
      <SeoMeta canonicalPath="/coin-flip-experiment" structuredData={appJsonLd('/coin-flip-experiment', ROUTE.title, ROUTE.description)} />

      <div className="space-y-10 max-w-4xl mx-auto">
        <PageHeader title="Coin flip simulator" intro="Flip hundreds, thousands or even a million coins in one go and see how close you get to 50/50. Your last 100 runs are saved below." />

        {/* Quick Batch Launcher */}
        <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-700/60 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Fair coin
            </h2>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Quick Presets:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[100, 1000, 10000, 100000].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleQuickBatch(num)}
                  className="py-3 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 text-zinc-800 dark:text-zinc-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-card"
                >
                  <Play className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{num.toLocaleString()} Flips</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Flips Form */}
          <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="flex-1">
              <label htmlFor="custom-flip-count" className="sr-only">
                Or choose your own number
              </label>
              <input
                id="custom-flip-count"
                type="number"
                min="1"
                max="1000000"
                value={batchCountInput}
                onChange={(e) => setBatchCountInput(e.target.value)}
                placeholder="1 to 1,000,000"
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-8 rounded-2xl bg-heads-400 hover:bg-heads-300 text-zinc-950 font-semibold text-sm shadow-md transition-all whitespace-nowrap"
            >
              Flip
            </button>
          </form>
        </div>

        {/* Weighted Coin Simulation Mode */}
        <WeightedSimulator
          onSimulationComplete={(exp) => setActiveExperiment(exp)}
        />

        {/* Saved Experiments Table & Highlights */}
        <SavedExperiments
          experiments={state.experiments}
          onView={(exp) => setActiveExperiment(exp)}
          onDelete={deleteExperiment}
          onClearAll={clearAllExperiments}
        />

        {/* Active Modal */}
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
