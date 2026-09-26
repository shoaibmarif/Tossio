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
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Prediction Mode Scoreboard
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-full border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-black text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Score: {predictionStats.score} pts
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="block text-[11px] font-bold text-slate-400 uppercase">Predictions</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">
            {predictionStats.totalPredictions}
          </span>
        </div>

        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
          <span className="block text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Correct</span>
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {predictionStats.correctPredictions}
          </span>
        </div>

        <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
          <span className="block text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase">Accuracy</span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            {accuracy}%
          </span>
        </div>

        <div className="p-3 bg-orange-50/70 dark:bg-orange-950/30 rounded-xl border border-orange-100 dark:border-orange-900/40">
          <span className="block text-[11px] font-bold text-orange-700 dark:text-orange-400 uppercase">Best Streak</span>
          <span className="text-xl font-black text-orange-600 dark:text-orange-400">
            {predictionStats.bestStreak}
          </span>
        </div>
      </div>

      {/* Mandatory Statistical Clarity Notice */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong>Scientific Principle:</strong> A fair coin flip is mathematically memoryless and independent. High prediction streaks or accuracy rates are due to chance and variance, not clairvoyance or pattern predictability.
        </span>
      </div>
    </div>
  );
};
