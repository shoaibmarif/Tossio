import React from 'react';
import type { OverallStats, CoinCustomization } from '../../types';
import { Flame, Trophy, HelpCircle } from 'lucide-react';

interface QuickStatsProps {
  stats: OverallStats;
  customization: CoinCustomization;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ stats, customization }) => {
  const hasFlips = stats.totalFlips > 0;
  const { currentStreak, currentSide, longestHeadsStreak, longestTailsStreak, longestOverallStreak } =
    stats.streak;

  const currentStreakLabel =
    currentSide === 'heads'
      ? customization.headsLabel
      : currentSide === 'tails'
      ? customization.tailsLabel
      : '';

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      {/* Primary Counters */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total Flips
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalFlips.toLocaleString()}
          </span>
        </div>

        <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/40">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {customization.headsLabel}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
            {stats.heads.toLocaleString()}
          </span>
          <span className="block text-xs font-semibold text-amber-700/80 dark:text-amber-400/80 mt-0.5">
            {hasFlips ? `${stats.headsPercentage}%` : 'No flips yet'}
          </span>
        </div>

        <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
          <span className="block text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
            {customization.tailsLabel}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.tails.toLocaleString()}
          </span>
          <span className="block text-xs font-semibold text-indigo-700/80 dark:text-indigo-400/80 mt-0.5">
            {hasFlips ? `${stats.tailsPercentage}%` : 'No flips yet'}
          </span>
        </div>
      </div>

      {/* Observed Results Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
            Observed Distribution
            <span
              className="cursor-help text-slate-400"
              title="Actual outcome distribution from your flips. Over time, a fair coin converges toward 50%."
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Target Expected: 50% / 50%
          </span>
        </div>

        {hasFlips ? (
          <div className="h-6 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden flex shadow-inner relative">
            {/* Center 50% marker line */}
            <div
              className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-black/30 dark:bg-white/40 z-10"
              title="Theoretical 50% line"
            />
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 flex items-center justify-start px-2 text-[10px] font-black text-amber-950 select-none overflow-hidden"
              style={{ width: `${stats.headsPercentage}%` }}
              aria-label={`Heads observed: ${stats.headsPercentage}%`}
            >
              {stats.headsPercentage >= 15 ? `${stats.headsPercentage}%` : ''}
            </div>
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 flex items-center justify-end px-2 text-[10px] font-black text-indigo-50 select-none overflow-hidden"
              style={{ width: `${stats.tailsPercentage}%` }}
              aria-label={`Tails observed: ${stats.tailsPercentage}%`}
            >
              {stats.tailsPercentage >= 15 ? `${stats.tailsPercentage}%` : ''}
            </div>
          </div>
        ) : (
          <div className="h-6 w-full bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-500 font-medium">
            No flips yet to calculate observed distribution
          </div>
        )}
      </div>

      {/* Streaks Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="flex items-center gap-3 p-3 bg-orange-50/60 dark:bg-slate-900/60 rounded-2xl border border-orange-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Current Streak
            </div>
            <div className="text-base font-black text-slate-800 dark:text-slate-100">
              {currentStreak > 0 ? (
                <>
                  {currentStreak} {currentStreakLabel}
                </>
              ) : (
                'None'
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-amber-50/60 dark:bg-slate-900/60 rounded-2xl border border-amber-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Longest Streaks
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              🏆 Heads: {longestHeadsStreak} | Tails: {longestTailsStreak} (Best: {longestOverallStreak})
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Educational Note */}
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        💡 <strong>Statistical note:</strong> A fair coin has an expected probability of approximately 50% for each side over many independent flips. Actual short-run results can vary due to natural random fluctuation.
      </p>
    </div>
  );
};
