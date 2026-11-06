import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import type { BatchExperimentRecord } from '../../types';
import { formatSignedDiff } from '../../game/statistics';
import { Modal } from '../ui/Modal';
import { SITE } from '../../seo/site';

interface ExperimentModalProps {
  experiment: BatchExperimentRecord | null;
  onClose: () => void;
}

const compact = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : n >= 1000 ? `${(n / 1000).toFixed(n % 1000 ? 1 : 0)}k` : String(n);

export const ExperimentModal: React.FC<ExperimentModalProps> = ({ experiment, onClose }) => {
  const [copied, setCopied] = useState(false);
  if (!experiment) return null;

  const e = experiment;
  const handleShare = async () => {
    const text = [
      `I flipped ${e.totalFlips.toLocaleString()} coins on ${SITE.name}:`,
      `Heads ${e.heads.toLocaleString()} (${e.headsPercentage}%)`,
      `Tails ${e.tails.toLocaleString()} (${e.tailsPercentage}%)`,
      `Longest streak: ${Math.max(e.longestHeadsStreak, e.longestTailsStreak)} in a row`,
    ].join('\n');
    const url = `${SITE.url}/coin-flip-experiment`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${SITE.name} simulation`, text, url });
        return;
      } catch {
        // fall through to the clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; nothing else to do
    }
  };

  // Donut: heads arc drawn over a tails ring.
  const circumference = 2 * Math.PI * 40;
  const headsArc = (e.headsPercentage / 100) * circumference;

  return (
    <Modal
      open
      onClose={onClose}
      title={`${e.totalFlips.toLocaleString()} flips`}
      subtitle={`${e.isWeighted ? 'Weighted coin' : 'Fair coin'} · ${e.date}`}
    >
      {e.isWeighted && (
        <p className="mb-4 rounded-lg border border-heads-200 bg-heads-50 px-3 py-2 text-sm text-heads-900 dark:border-heads-900 dark:bg-heads-950/40 dark:text-heads-100">
          This coin was set to land heads {e.expectedHeadsPct}% of the time, so don’t expect 50/50.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl border border-heads-200 bg-heads-50 p-4 dark:border-heads-900/60 dark:bg-heads-950/30">
          <span className="block text-sm text-heads-800 dark:text-heads-300">Heads</span>
          <span className="block text-3xl font-semibold tabular-nums text-heads-700 dark:text-heads-300">{e.heads.toLocaleString()}</span>
          <span className="block text-sm tabular-nums text-heads-800 dark:text-heads-300">{e.headsPercentage}%</span>
          <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">{formatSignedDiff(e.headsDiff)} from expected</span>
        </div>
        <div className="rounded-xl border border-tails-200 bg-tails-50 p-4 dark:border-tails-900/60 dark:bg-tails-950/30">
          <span className="block text-sm text-tails-700 dark:text-tails-300">Tails</span>
          <span className="block text-3xl font-semibold tabular-nums text-tails-700 dark:text-tails-300">{e.tails.toLocaleString()}</span>
          <span className="block text-sm tabular-nums text-tails-700 dark:text-tails-300">{e.tailsPercentage}%</span>
          <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">{formatSignedDiff(e.tailsDiff)} from expected</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-6 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="relative h-24 w-24 shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="12" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#fbbf24" strokeWidth="12" strokeDasharray={`${headsArc} ${circumference}`} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums">
            {compact(e.totalFlips)}
          </span>
        </div>
        <dl className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-heads-400" aria-hidden="true" />
            <dt className="text-zinc-600 dark:text-zinc-400">Longest heads streak</dt>
            <dd className="font-semibold tabular-nums">{e.longestHeadsStreak}</dd>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-tails-500" aria-hidden="true" />
            <dt className="text-zinc-600 dark:text-zinc-400">Longest tails streak</dt>
            <dd className="font-semibold tabular-nums">{e.longestTailsStreak}</dd>
          </div>
        </dl>
      </div>

      <p className="sr-only">
        {e.totalFlips} flips: {e.heads} heads ({e.headsPercentage}%), {e.tails} tails ({e.tailsPercentage}%). Longest heads
        streak {e.longestHeadsStreak}, longest tails streak {e.longestTailsStreak}.
      </p>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={handleShare}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-heads-400 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-heads-300"
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? 'Copied' : 'Share'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-lg border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
