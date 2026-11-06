import React, { useState } from 'react';
import { analyzePhysicalObservation } from '../../game/experiments';
import { formatSignedDiff } from '../../game/statistics';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';

export const FairnessTester: React.FC = () => {
  const [headsInput, setHeadsInput] = useState<string>('52');
  const [tailsInput, setTailsInput] = useState<string>('48');

  const heads = Math.max(0, parseInt(headsInput, 10) || 0);
  const tails = Math.max(0, parseInt(tailsInput, 10) || 0);

  const analysis = analyzePhysicalObservation(heads, tails);

  return (
    <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
      <div className="border-b border-zinc-100 dark:border-zinc-700/60 pb-4">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Educational Experiment
        </span>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-500" />
          Is your real coin fair?
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Flip a real coin a bunch of times, enter how many heads and tails you got, and see how far it is from 50/50.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5 p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/40">
          <label className="text-xs font-semibold text-amber-800 dark:text-amber-300">
            Observed Heads
          </label>
          <input
            type="number"
            min="0"
            max="100000"
            value={headsInput}
            onChange={(e) => setHeadsInput(e.target.value)}
            className="w-full px-3 py-2 text-xl font-mono font-semibold text-center rounded-xl bg-white dark:bg-zinc-800 border border-amber-200 dark:border-amber-800 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1.5 p-4 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
          <label className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
            Observed Tails
          </label>
          <input
            type="number"
            min="0"
            max="100000"
            value={tailsInput}
            onChange={(e) => setTailsInput(e.target.value)}
            className="w-full px-3 py-2 text-xl font-mono font-semibold text-center rounded-xl bg-white dark:bg-zinc-800 border border-indigo-200 dark:border-indigo-800 text-zinc-900 dark:text-white"
          />
        </div>
      </div>

      {/* Results Display */}
      {analysis.total > 0 && (
        <div className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="block text-xs font-semibold text-zinc-400">Total Trials</span>
              <span className="text-xl font-semibold text-zinc-900 dark:text-white">
                {analysis.total.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="block text-xs font-semibold text-amber-600 dark:text-amber-400">Heads %</span>
              <span className="text-xl font-semibold text-amber-600 dark:text-amber-400">
                {analysis.headsPercentage}%
              </span>
              <span className="block text-xs text-zinc-400">
                {formatSignedDiff(analysis.headsDiff)}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400">Tails %</span>
              <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                {analysis.tailsPercentage}%
              </span>
              <span className="block text-xs text-zinc-400">
                {formatSignedDiff(analysis.tailsDiff)}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>{analysis.sampleDescription}</span>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl text-xs text-zinc-500 dark:text-zinc-400 leading-normal flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <span>
              <strong>Descriptive result only:</strong> this shows how far your results are from an even split. It can’t prove a coin is biased; for that you’d need a lot of flips and a proper statistical test.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
