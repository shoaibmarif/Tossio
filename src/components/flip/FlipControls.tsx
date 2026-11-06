import React, { useState } from 'react';
import type { CoinState, CoinSide } from '../../types';
import { RotateCcw } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface FlipControlsProps {
  coinState: CoinState;
  /** @deprecated sound is toggled from the header */
  soundEnabled?: boolean;
  onFlip: () => void;
  onBatchFlip: (count: number) => void;
  /** @deprecated sound is toggled from the header */
  onToggleSound?: () => void;
  onReset: () => void;
  predictionSide: CoinSide | null;
  onSelectPrediction: (side: CoinSide | null) => void;
  isPredictionMode?: boolean;
}

export const FlipControls: React.FC<FlipControlsProps> = ({
  coinState,
  onFlip,
  onBatchFlip,
  onReset,
  predictionSide,
  onSelectPrediction,
  isPredictionMode = false,
}) => {
  const isFlipping = coinState === 'FLIPPING';
  const [customInput, setCustomInput] = useState<string>('50');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  const presets = [5, 10, 25, 50, 100, 500, 1000];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(customInput, 10);
    if (!isNaN(count) && count > 0 && count <= 1000000) {
      onBatchFlip(count);
      setShowCustomModal(false);
    }
  };

  const pill = (active: boolean, side: CoinSide) =>
    `h-10 rounded-lg border px-4 text-sm font-medium transition-colors disabled:opacity-50 ${
      active
        ? side === 'heads'
          ? 'border-heads-500 bg-heads-400 text-zinc-950'
          : 'border-tails-600 bg-tails-600 text-white'
        : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800'
    }`;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
      {isPredictionMode && (
        <div className="flex w-full flex-col items-center gap-2" role="group" aria-label="Predict the result">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Want to call it first?</span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isFlipping}
              aria-pressed={predictionSide === 'heads'}
              onClick={() => onSelectPrediction(predictionSide === 'heads' ? null : 'heads')}
              className={pill(predictionSide === 'heads', 'heads')}
            >
              I say heads
            </button>
            <button
              type="button"
              disabled={isFlipping}
              aria-pressed={predictionSide === 'tails'}
              onClick={() => onSelectPrediction(predictionSide === 'tails' ? null : 'tails')}
              className={pill(predictionSide === 'tails', 'tails')}
            >
              I say tails
            </button>
          </div>
          {predictionSide && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              You picked {predictionSide}. Now flip to find out.
            </span>
          )}
        </div>
      )}

      <div className="flex w-full items-center justify-center gap-2">
        <button
          type="button"
          disabled={isFlipping}
          onClick={onFlip}
          className="flex h-14 max-w-sm flex-1 items-center justify-center gap-2 rounded-xl bg-heads-400 px-8 text-lg font-semibold text-zinc-950 shadow-card transition-colors hover:bg-heads-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tails-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:bg-zinc-200 disabled:text-zinc-500 dark:disabled:bg-zinc-800"
        >
          {isFlipping ? 'Flipping…' : 'Flip the coin'}
        </button>
        <button
          type="button"
          disabled={isFlipping}
          onClick={() => {
            if (window.confirm('Reset your flip count and streaks? This can’t be undone.')) onReset();
          }}
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          title="Reset count and streaks"
          aria-label="Reset count and streaks"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Or flip lots at once</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {presets.map((count) => (
            <button
              key={count}
              type="button"
              disabled={isFlipping}
              onClick={() => onBatchFlip(count)}
              className="h-8 rounded-lg border border-zinc-200 bg-white px-3 text-sm tabular-nums text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {count.toLocaleString()}
            </button>
          ))}
          <button
            type="button"
            disabled={isFlipping}
            onClick={() => setShowCustomModal(true)}
            className="h-8 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Other…
          </button>
        </div>
      </div>

      <Modal open={showCustomModal} onClose={() => setShowCustomModal(false)} title="How many flips?" subtitle="Any number from 1 to 1,000,000." maxWidth="sm">
        <form onSubmit={handleCustomSubmit} className="flex flex-col gap-4">
          <input
            type="number"
            min="1"
            max="1000000"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            aria-label="Number of flips"
            className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 font-mono text-base dark:border-zinc-700 dark:bg-zinc-950"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCustomModal(false)}
              className="h-10 rounded-lg px-4 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button type="submit" className="h-10 rounded-lg bg-heads-400 px-4 text-sm font-medium text-zinc-950 hover:bg-heads-300">
              Flip them
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
