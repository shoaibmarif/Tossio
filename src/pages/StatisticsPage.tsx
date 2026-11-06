import React from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { AchievementsGallery } from '../components/game/AchievementsGallery';
import { analyzeExperiments, formatSignedDiff } from '../game/statistics';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { BarChart3, Trophy, Flame, Award, AlertCircle } from 'lucide-react';

export const StatisticsPage: React.FC = () => {
  const { state } = useCoinFlipGame();
  const { overallStats, experiments, achievements } = state;
  const analysis = React.useMemo(() => analyzeExperiments(experiments), [experiments]);


  return (
    <>
      <SeoMeta canonicalPath="/coin-flip-statistics" />

      <div className="space-y-10 max-w-4xl mx-auto">
        <PageHeader title="Your statistics" intro="Every flip you’ve made on this device: totals, streaks, saved experiments and achievements." />

        {/* Lifetime Overall Summary Cards */}
        <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-700/60 pb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              All your flips
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <span className="block text-xs font-semibold text-zinc-400">Total Tosses</span>
              <span className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white">
                {overallStats.totalFlips.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/40">
              <span className="block text-xs font-semibold text-amber-600 dark:text-amber-400">
                Heads ({overallStats.headsPercentage}%)
              </span>
              <span className="text-2xl sm:text-3xl font-semibold text-amber-600 dark:text-amber-400">
                {overallStats.heads.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
              <span className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Tails ({overallStats.tailsPercentage}%)
              </span>
              <span className="text-2xl sm:text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {overallStats.tails.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-orange-50/70 dark:bg-orange-950/30 rounded-2xl border border-orange-100 dark:border-orange-900/40">
              <span className="block text-xs font-semibold text-orange-600 dark:text-orange-400">
                Longest Streak
              </span>
              <span className="text-2xl sm:text-3xl font-semibold text-orange-600 dark:text-orange-400">
                {overallStats.streak.longestOverallStreak}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Records & Streaks */}
        <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-700/60 pb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Your best streaks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center gap-3.5">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-700 rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                  Longest heads streak
                </span>
                <div className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {overallStats.streak.longestHeadsStreak} in a row
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 flex items-center gap-3.5">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
                  Longest tails streak
                </span>
                <div className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {overallStats.streak.longestTailsStreak} in a row
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-tails-50/50 dark:bg-tails-950/20 border border-tails-200 dark:border-tails-900/40 flex items-center gap-3.5">
              <div className="p-3 bg-tails-100 dark:bg-tails-900/50 text-tails-700 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-tails-800 dark:text-tails-300">
                  Biggest simulation
                </span>
                <div className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {analysis.largestSingleExperiment
                    ? `${analysis.largestSingleExperiment.totalFlips.toLocaleString()} flips`
                    : '0 flips'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experimental Convergence Records */}
        <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-700/60 pb-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              From your simulations
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Total batch experiments recorded: {experiments.length} ({analysis.totalFlipsAllExperiments.toLocaleString()} cumulative batch tosses).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.closestTo5050 ? (
              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 space-y-1.5">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Closest to 50/50
                </span>
                <div className="text-base font-semibold text-zinc-900 dark:text-white">
                  {analysis.closestTo5050.totalFlips.toLocaleString()} flips: {analysis.closestTo5050.headsPercentage}% H / {analysis.closestTo5050.tailsPercentage}% T
                </div>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                  Observed deviation: {formatSignedDiff(analysis.closestTo5050.headsDiff)} (Date: {analysis.closestTo5050.date}).
                </p>
                <p className="text-xs text-zinc-400 pt-1">
                  Just a result, not proof of anything. Luck plays a part.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                Run a simulation to see this.
              </div>
            )}

            {analysis.largestDeviation ? (
              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 space-y-1.5">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Furthest from 50/50
                </span>
                <div className="text-base font-semibold text-zinc-900 dark:text-white">
                  {analysis.largestDeviation.totalFlips.toLocaleString()} flips: {analysis.largestDeviation.headsPercentage}% H / {analysis.largestDeviation.tailsPercentage}% T
                </div>
                <p className="text-xs text-amber-800/80 dark:text-amber-300/80">
                  Observed deviation: {formatSignedDiff(analysis.largestDeviation.headsDiff)} (Date: {analysis.largestDeviation.date}).
                </p>
                <p className="text-xs text-zinc-400 pt-1">
                  Small runs often land far from 50/50. That’s normal.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                Run a simulation to see this.
              </div>
            )}
          </div>
        </div>

        {/* Achievements Gallery */}
        <AchievementsGallery unlockedMap={achievements} />
      </div>
    </>
  );
};
