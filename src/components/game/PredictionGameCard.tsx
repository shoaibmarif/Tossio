import React from 'react';
import type { PredictionState } from '../../types';
import { Sparkles, Target, AlertTriangle } from 'lucide-react';

interface PredictionGameCardProps {
  predictionStats: PredictionState;
}

export const PredictionGameCard: React.FC<PredictionGameCardProps> = ({ predictionStats }) => {
  const accuracy =
    predictionStats.totalPredictions > 0
      ? Math.round((predictionStats.correctPredictions / predictionStats.totalPredictions) * 100)
      : 0;

  return (
    <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
            Your predictions
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-full border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-semibold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Score: {predictionStats.score} pts
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-100 dark:border-zinc-800">
          <span className="block text-xs font-semibold text-zinc-400">Predictions</span>
          <span className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            {predictionStats.totalPredictions}
          </span>
        </div>

        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
          <span className="block text-xs font-semibold text-emerald-700 dark:text-emerald-400">Correct</span>
          <span className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            {predictionStats.correctPredictions}
          </span>
        </div>

        <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
          <span className="block text-xs font-semibold text-indigo-700 dark:text-indigo-400">Accuracy</span>
          <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            {accuracy}%
          </span>
        </div>

        <div className="p-3 bg-orange-50/70 dark:bg-orange-950/30 rounded-xl border border-orange-100 dark:border-orange-900/40">
          <span className="block text-xs font-semibold text-orange-700 dark:text-orange-400">Best Streak</span>
          <span className="text-xl font-semibold text-orange-600 dark:text-orange-400">
            {predictionStats.bestStreak}
          </span>
        </div>
      </div>

      {/* Reminder that predictions are luck */}
      <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>
          Nobody can predict a fair coin, so long winning streaks are pure luck. Enjoy them while they last.
        </span>
      </div>
    </div>
  );
};
