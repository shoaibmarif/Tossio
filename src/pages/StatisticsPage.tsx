import React from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { AchievementsGallery } from '../components/game/AchievementsGallery';
import { analyzeExperiments, formatSignedDiff } from '../game/statistics';
import { SEOHead } from '../components/seo/SEOHead';
import { BarChart3, Trophy, Flame, Award, AlertCircle } from 'lucide-react';

export const StatisticsPage: React.FC = () => {
  const { state } = useCoinFlipGame();
  const { overallStats, experiments, achievements } = state;
  const analysis = React.useMemo(() => analyzeExperiments(experiments), [experiments]);

  const statsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: 'Coin Flip Lifetime Statistics & Probability Records',
    description:
      'View your complete virtual coin flip analytics, overall heads vs tails distribution, streak records, closest-to-50/50 experiments, and achievement progress.',
  };

  return (
    <>
      <SEOHead
        title="Coin Flip Statistics & Streak Records Dashboard"
        description="Comprehensive coin flip statistics, streak records, closest-to-50/50 experiments, largest sample deviations, and achievement milestones."
        canonicalPath="/coin-flip-statistics"
        jsonLd={statsJsonLd}
      />

      <div className="space-y-10 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Analytics & Lifetime History
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Coin Flip Statistics Dashboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Review your lifetime flip counts, empirical deviations, streak milestones, and unlocked achievements.
          </p>
        </div>

        {/* Lifetime Overall Summary Cards */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Lifetime Single-Flip Totals
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="block text-xs font-bold text-slate-400 uppercase">Total Tosses</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {overallStats.totalFlips.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/40">
              <span className="block text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">
                Heads ({overallStats.headsPercentage}%)
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                {overallStats.heads.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
              <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                Tails ({overallStats.tailsPercentage}%)
              </span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {overallStats.tails.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-orange-50/70 dark:bg-orange-950/30 rounded-2xl border border-orange-100 dark:border-orange-900/40">
              <span className="block text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">
                Longest Streak
              </span>
              <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">
                {overallStats.streak.longestOverallStreak}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Records & Streaks */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Personal Streak Records
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center gap-3.5">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-700 rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">
                  Longest Heads Streak
                </span>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {overallStats.streak.longestHeadsStreak} in a row
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 flex items-center gap-3.5">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase">
                  Longest Tails Streak
                </span>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {overallStats.streak.longestTailsStreak} in a row
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 flex items-center gap-3.5">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-700 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase">
                  Largest Batch Flips
                </span>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {analysis.largestSingleExperiment
                    ? `${analysis.largestSingleExperiment.totalFlips.toLocaleString()} flips`
                    : '0 flips'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experimental Convergence Records */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Experimental Records Across Saved Batches
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total batch experiments recorded: {experiments.length} ({analysis.totalFlipsAllExperiments.toLocaleString()} cumulative batch tosses).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.closestTo5050 ? (
              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Closest Result to 50/50
                </span>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {analysis.closestTo5050.totalFlips.toLocaleString()} flips: {analysis.closestTo5050.headsPercentage}% H / {analysis.closestTo5050.tailsPercentage}% T
                </div>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                  Observed deviation: {formatSignedDiff(analysis.closestTo5050.headsDiff)} (Date: {analysis.closestTo5050.date}).
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  *Observed experiment result rather than proof of randomness quality.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Run batch experiments to see your closest 50/50 test.
              </div>
            )}

            {analysis.largestDeviation ? (
              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Largest Sample Deviation
                </span>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {analysis.largestDeviation.totalFlips.toLocaleString()} flips: {analysis.largestDeviation.headsPercentage}% H / {analysis.largestDeviation.tailsPercentage}% T
                </div>
                <p className="text-xs text-amber-800/80 dark:text-amber-300/80">
                  Observed deviation: {formatSignedDiff(analysis.largestDeviation.headsDiff)} (Date: {analysis.largestDeviation.date}).
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  *Deviations naturally occur in random samples, particularly in smaller trial sizes.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Run batch experiments to see maximum sample variations.
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
