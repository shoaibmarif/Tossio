import React from 'react';
import type { CoinSide, CoinState, CoinCustomization } from '../../types';

interface CoinResultProps {
  coinState: CoinState;
  latestResult: CoinSide | null;
  flipNumber: number;
  customization: CoinCustomization;
}

export const CoinResult: React.FC<CoinResultProps> = ({
  coinState,
  latestResult,
  flipNumber,
  customization,
}) => {
  const isFlipping = coinState === 'FLIPPING';

  if (!latestResult && flipNumber === 0) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-4 px-6 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm">
        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Ready when you are
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Tap the coin or press <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-xs font-mono">Space</kbd> / <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-xs font-mono">Enter</kbd> to flip.
        </p>
      </div>
    );
  }

  const resultLabel =
    latestResult === 'heads' ? customization.headsLabel : customization.tailsLabel;
  const resultColor =
    latestResult === 'heads'
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-indigo-600 dark:text-indigo-400';
  const badgeBg =
    latestResult === 'heads'
      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';

  return (
    <div
      className={`w-full max-w-md mx-auto text-center py-4 px-6 bg-white dark:bg-zinc-800/90 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-md transition-all duration-300 ${
        isFlipping ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      role="region"
      aria-label="Latest flip outcome"
    >
      <div className="flex items-center justify-center gap-3">
        <span
          className={`text-2xl sm:text-3xl font-semibold tracking-wider uppercase transition-transform ${resultColor}`}
        >
          {isFlipping ? 'Flipping...' : resultLabel}
        </span>
        {!isFlipping && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeBg}`}
          >
            Flip #{flipNumber}
          </span>
        )}
      </div>
    </div>
  );
};
