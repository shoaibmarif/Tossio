import React from 'react';
import type { BatchExperimentRecord } from '../../types';
import { formatSignedDiff, analyzeExperiments } from '../../game/statistics';
import { Trash2, Eye, Award, AlertTriangle, FlaskConical } from 'lucide-react';

interface SavedExperimentsProps {
  experiments: BatchExperimentRecord[];
  onView: (experiment: BatchExperimentRecord) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const SavedExperiments: React.FC<SavedExperimentsProps> = ({
  experiments,
  onView,
  onDelete,
  onClearAll,
}) => {
  const analysis = React.useMemo(() => analyzeExperiments(experiments), [experiments]);

  if (experiments.length === 0) {
    return (
      <div className="p-8 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
        <FlaskConical className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
        <h4 className="text-base font-bold text-slate-700 dark:text-slate-200">
          No Saved Experiments
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Run batch tests of 100, 1,000, or custom flip counts to observe statistical distributions and compare sample convergence.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Saved Experiments ({experiments.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Stored locally in your browser. Never sent to any external server.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Clear all saved batch experiments?')) {
              onClearAll();
            }
          }}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Analysis Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {analysis.closestTo5050 && (
          <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Closest to 50/50
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {analysis.closestTo5050.totalFlips.toLocaleString()} flips: {analysis.closestTo5050.headsPercentage}% H / {analysis.closestTo5050.tailsPercentage}% T
              </div>
              <div className="text-[11px] text-emerald-700/90 dark:text-emerald-400">
                Deviation: {formatSignedDiff(analysis.closestTo5050.headsDiff)}
              </div>
            </div>
          </div>
        )}

        {analysis.largestDeviation && (
          <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Largest Deviation
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {analysis.largestDeviation.totalFlips.toLocaleString()} flips: {analysis.largestDeviation.headsPercentage}% H / {analysis.largestDeviation.tailsPercentage}% T
              </div>
              <div className="text-[11px] text-amber-700/90 dark:text-amber-400">
                Deviation: {formatSignedDiff(analysis.largestDeviation.headsDiff)} (natural random sample variation)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Experiment List */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {exp.totalFlips.toLocaleString()} Flips
                </span>
                {exp.isWeighted && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    Weighted
                  </span>
                )}
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  {exp.date}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-3">
                <span className="text-amber-600 dark:text-amber-400">
                  H: {exp.heads.toLocaleString()} ({exp.headsPercentage}%)
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  T: {exp.tails.toLocaleString()} ({exp.tailsPercentage}%)
                </span>
                <span className="text-slate-400 dark:text-slate-500">
                  Diff: {formatSignedDiff(exp.headsDiff)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onView(exp)}
                className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                title="View full experiment chart"
                aria-label="View experiment"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(exp.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                title="Delete this experiment"
                aria-label="Delete experiment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
