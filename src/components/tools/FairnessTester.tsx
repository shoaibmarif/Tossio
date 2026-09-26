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
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div className="border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Educational Experiment
        </span>
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-500" />
          Is My Physical Coin Fair?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Enter observed results from flipping a real physical coin to evaluate descriptive statistics.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5 p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/40">
          <label className="text-xs font-bold uppercase text-amber-800 dark:text-amber-300">
            Observed Heads
          </label>
          <input
            type="number"
            min="0"
            max="100000"
            value={headsInput}
            onChange={(e) => setHeadsInput(e.target.value)}
            className="w-full px-3 py-2 text-xl font-mono font-bold text-center rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="space-y-1.5 p-4 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
          <label className="text-xs font-bold uppercase text-indigo-800 dark:text-indigo-300">
            Observed Tails
          </label>
          <input
            type="number"
            min="0"
            max="100000"
            value={tailsInput}
            onChange={(e) => setTailsInput(e.target.value)}
            className="w-full px-3 py-2 text-xl font-mono font-bold text-center rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Results Display */}
      {analysis.total > 0 && (
        <div className="space-y-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-[11px] font-bold text-slate-400 uppercase">Total Trials</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {analysis.total.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Heads %</span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                {analysis.headsPercentage}%
              </span>
              <span className="block text-[10px] text-slate-400">
                {formatSignedDiff(analysis.headsDiff)}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Tails %</span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                {analysis.tailsPercentage}%
              </span>
              <span className="block text-[10px] text-slate-400">
                {formatSignedDiff(analysis.tailsDiff)}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>{analysis.sampleDescription}</span>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 leading-normal flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Descriptive result only:</strong> This calculation illustrates sample proportions and deviations. It does not constitute a certified scientific hypothesis test for physical coin bias.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
