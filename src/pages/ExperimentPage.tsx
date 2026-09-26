import React, { useState } from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { WeightedSimulator } from '../components/tools/WeightedSimulator';
import { SavedExperiments } from '../components/experiments/SavedExperiments';
import { ExperimentModal } from '../components/experiments/ExperimentModal';
import { SEOHead } from '../components/seo/SEOHead';
import type { BatchExperimentRecord } from '../types';
import { Play, Sparkles } from 'lucide-react';

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

  const experimentJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Coin Flip Simulator & Batch Experiment Tool',
    description:
      'Simulate up to 1,000,000 virtual coin flips instantly. Analyze heads and tails distribution, deviation from 50/50, and streak lengths with interactive visualizations.',
    applicationCategory: 'UtilityApplication',
  };

  return (
    <>
      <SEOHead
        title="Coin Flip Simulator – Batch Tosses up to 1,000,000 Flips"
        description="Run large-scale coin flip simulations up to 1 million tosses instantly. Track exact distributions, deviations from 50/50, and longest streaks with visual charts."
        canonicalPath="/coin-flip-experiment"
        jsonLd={experimentJsonLd}
      />

      <div className="space-y-10 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            High-Performance Monte Carlo Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Coin Flip Batch Experiments
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Simulate from 100 up to 1,000,000 coin tosses in milliseconds. Compare empirical outcomes with mathematical models.
          </p>
        </div>

        {/* Quick Batch Launcher */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Launch Standard Fair Coin Simulation
            </h2>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Quick Presets:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[100, 1000, 10000, 100000].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleQuickBatch(num)}
                  className="py-3 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-800 dark:text-slate-200 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
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
                Custom number of flips
              </label>
              <input
                id="custom-flip-count"
                type="number"
                min="1"
                max="1000000"
                value={batchCountInput}
                onChange={(e) => setBatchCountInput(e.target.value)}
                placeholder="Enter flips (1 to 1,000,000)"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-md transition-all whitespace-nowrap"
            >
              Run Custom Batch
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
