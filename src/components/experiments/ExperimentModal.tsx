import React from 'react';
import type { BatchExperimentRecord } from '../../types';
import { formatSignedDiff } from '../../game/statistics';
import { X, Share2, Check } from 'lucide-react';

interface ExperimentModalProps {
  experiment: BatchExperimentRecord | null;
  onClose: () => void;
}

export const ExperimentModal: React.FC<ExperimentModalProps> = ({ experiment, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!experiment) return null;

  const handleShare = async () => {
    const textToShare = `🪙 Coin Flip Experiment Results\nTotal Flips: ${experiment.totalFlips.toLocaleString()}\nHeads: ${experiment.heads.toLocaleString()} (${experiment.headsPercentage}%)\nTails: ${experiment.tails.toLocaleString()} (${experiment.tailsPercentage}%)\nDeviation from 50/50: Heads ${formatSignedDiff(experiment.headsDiff)}, Tails ${formatSignedDiff(experiment.tailsDiff)}\nLongest Streaks: Heads ${experiment.longestHeadsStreak}, Tails ${experiment.longestTailsStreak}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Coin Flip Experiment Results',
          text: textToShare,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Donut chart calculation
  const circumference = 2 * Math.PI * 40;
  const headsOffset = (experiment.headsPercentage / 100) * circumference;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experiment-modal-title"
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {experiment.isWeighted ? 'Weighted Simulation' : 'Batch Experiment'}
            </span>
            <h3 id="experiment-modal-title" className="text-xl font-black text-slate-900 dark:text-white">
              Experiment Results
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              {experiment.date}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close experiment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning if weighted */}
        {experiment.isWeighted && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs text-amber-800 dark:text-amber-200">
            ⚠️ <strong>Simulation Notice:</strong> This is a custom weighted simulation (Expected: {experiment.expectedHeadsPct}% H / {experiment.expectedTailsPct}% T) and does not represent a fair 50/50 coin.
          </div>
        )}

        {/* Main Overview Stat Boxes */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-2xl">
            <span className="block text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
              Heads
            </span>
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400">
              {experiment.heads.toLocaleString()}
            </span>
            <div className="text-sm font-bold text-amber-700/80 dark:text-amber-300 mt-1">
              {experiment.headsPercentage}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Diff: {formatSignedDiff(experiment.headsDiff)}
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
            <span className="block text-xs font-bold uppercase text-indigo-700 dark:text-indigo-400">
              Tails
            </span>
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {experiment.tails.toLocaleString()}
            </span>
            <div className="text-sm font-bold text-indigo-700/80 dark:text-indigo-300 mt-1">
              {experiment.tailsPercentage}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Diff: {formatSignedDiff(experiment.tailsDiff)}
            </div>
          </div>
        </div>

        {/* Visual Donut Chart and Streak breakdown */}
        <div className="flex items-center justify-around p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          {/* Accessible SVG Donut */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100" aria-hidden="true">
              {/* Tails Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="12"
              />
              {/* Heads Overlay Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeDasharray={`${headsOffset} ${circumference}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Flips</span>
              <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                {experiment.totalFlips >= 1000 ? `${(experiment.totalFlips / 1000).toFixed(1)}k` : experiment.totalFlips}
              </span>
            </div>
          </div>

          {/* Streaks breakdown */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-700 dark:text-slate-300">
              Experimental Streaks:
            </div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Longest Heads Streak: <strong>{experiment.longestHeadsStreak}</strong>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Longest Tails Streak: <strong>{experiment.longestTailsStreak}</strong>
            </div>
          </div>
        </div>

        {/* Textual Accessibility Summary */}
        <div className="sr-only">
          Experiment of {experiment.totalFlips} flips resulted in {experiment.heads} Heads ({experiment.headsPercentage}%), difference {formatSignedDiff(experiment.headsDiff)} from 50%. {experiment.tails} Tails ({experiment.tailsPercentage}%), difference {formatSignedDiff(experiment.tailsDiff)} from 50%. Longest Heads streak was {experiment.longestHeadsStreak}, and longest Tails streak was {experiment.longestTailsStreak}.
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Share Results'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-6 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
