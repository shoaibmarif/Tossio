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
      <div className="p-8 bg-white dark:bg-zinc-800/90 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center space-y-3">
        <FlaskConical className="w-10 h-10 mx-auto text-zinc-300 dark:text-zinc-600" />
        <h4 className="text-base font-semibold text-zinc-700 dark:text-zinc-200">
          No simulations yet
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
          Run a simulation above and it’ll be saved here, so you can compare runs of different sizes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-700/60 pb-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
            Saved Experiments ({experiments.length})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Saved in your browser only.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Clear all saved batch experiments?')) {
              onClearAll();
            }
          }}
          className="text-xs font-semibold text-heads-600 hover:text-heads-700 dark:text-heads-400 dark:hover:text-heads-300 px-3 py-1.5 rounded-xl border border-heads-200 dark:border-heads-900/50 hover:bg-heads-50 dark:hover:bg-heads-950/40 transition-colors"
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
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Closest to 50/50
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                {analysis.closestTo5050.totalFlips.toLocaleString()} flips: {analysis.closestTo5050.headsPercentage}% H / {analysis.closestTo5050.tailsPercentage}% T
              </div>
              <div className="text-xs text-emerald-700/90 dark:text-emerald-400">
                Deviation: {formatSignedDiff(analysis.closestTo5050.headsDiff)}
              </div>
            </div>
          </div>
        )}

        {analysis.largestDeviation && (
          <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                Largest Deviation
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                {analysis.largestDeviation.totalFlips.toLocaleString()} flips: {analysis.largestDeviation.headsPercentage}% H / {analysis.largestDeviation.tailsPercentage}% T
              </div>
              <div className="text-xs text-amber-700/90 dark:text-amber-400">
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
            className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {exp.totalFlips.toLocaleString()} Flips
                </span>
                {exp.isWeighted && (
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    Weighted
                  </span>
                )}
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                  {exp.date}
                </span>
              </div>

              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-3">
                <span className="text-amber-600 dark:text-amber-400">
                  H: {exp.heads.toLocaleString()} ({exp.headsPercentage}%)
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  T: {exp.tails.toLocaleString()} ({exp.tailsPercentage}%)
                </span>
                <span className="text-zinc-400 dark:text-zinc-500">
                  Diff: {formatSignedDiff(exp.headsDiff)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onView(exp)}
                className="p-2 rounded-xl text-zinc-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-zinc-800 transition-colors"
                title="Show details"
                aria-label="Show details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(exp.id)}
                className="p-2 rounded-xl text-zinc-400 hover:text-heads-500 hover:bg-heads-50 dark:hover:bg-zinc-800 transition-colors"
                title="Delete"
                aria-label="Delete"
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
