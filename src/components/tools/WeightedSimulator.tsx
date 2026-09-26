import React, { useState } from 'react';
import type { BatchExperimentRecord } from '../../types';
import { runBatchExperiment } from '../../game/experiments';
import { formatSignedDiff } from '../../game/statistics';
import { Sliders, AlertCircle, Play } from 'lucide-react';

interface WeightedSimulatorProps {
  onSimulationComplete: (record: BatchExperimentRecord) => void;
}

export const WeightedSimulator: React.FC<WeightedSimulatorProps> = ({ onSimulationComplete }) => {
  const [headsPct, setHeadsPct] = useState<number>(70);
  const [flipCount, setFlipCount] = useState<number>(1000);
  const [result, setResult] = useState<BatchExperimentRecord | null>(null);

  const tailsPct = 100 - headsPct;

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault();
    const exp = runBatchExperiment({
      count: flipCount,
      isWeighted: true,
      headsProbabilityPct: headsPct,
    });
    setResult(exp);
    onSimulationComplete(exp);
  };

  const expectedHeads = Math.round(flipCount * (headsPct / 100));
  const expectedTails = flipCount - expectedHeads;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Advanced Probability Lab
        </span>
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-rose-500" />
          Weighted Coin Simulation Mode
        </h3>
      </div>

      {/* Prominent Disclaimer Requirement */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold mb-0.5">Important Simulation Notice:</strong>
          This is a probability simulation and does not represent a fair coin. The standard Coin Flip mode in this application always remains strictly fair (50/50).
        </div>
      </div>

      {/* Form Controls */}
      <form onSubmit={handleRun} className="space-y-6">
        {/* Sliders */}
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-amber-600 dark:text-amber-400">
              Heads Probability: {headsPct}%
            </span>
            <span className="text-indigo-600 dark:text-indigo-400">
              Tails Probability: {tailsPct}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={headsPct}
            onChange={(e) => setHeadsPct(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>0% Heads (100% Tails)</span>
            <span>50% (Fair)</span>
            <span>100% Heads (0% Tails)</span>
          </div>
        </div>

        {/* Flips Count presets & input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Number of Simulated Flips:
          </label>
          <div className="flex flex-wrap gap-2">
            {[100, 500, 1000, 10000, 50000].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setFlipCount(num)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  flipCount === num
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                }`}
              >
                {num.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 text-white font-black text-base shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>RUN WEIGHTED SIMULATION</span>
        </button>
      </form>

      {/* Comparison: Expected vs Observed */}
      {result && (
        <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Comparison: Theoretical Model vs Observed Outcomes
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Heads</span>
              <div className="text-xs text-slate-500">
                Expected: ~{expectedHeads.toLocaleString()} ({headsPct}%)
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white">
                Observed: {result.heads.toLocaleString()} ({result.headsPercentage}%)
              </div>
              <div className="text-xs font-semibold text-slate-400">
                Diff: {formatSignedDiff(result.headsPercentage - headsPct)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Tails</span>
              <div className="text-xs text-slate-500">
                Expected: ~{expectedTails.toLocaleString()} ({tailsPct}%)
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white">
                Observed: {result.tails.toLocaleString()} ({result.tailsPercentage}%)
              </div>
              <div className="text-xs font-semibold text-slate-400">
                Diff: {formatSignedDiff(result.tailsPercentage - tailsPct)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
