import React, { useState } from 'react';
import type { DecisionOptions, CoinSide } from '../../types';
import { Shuffle, RotateCcw, CheckCircle, ShieldCheck } from 'lucide-react';

interface DecisionMakerProps {
  decision: DecisionOptions;
  onUpdate: (updated: Partial<DecisionOptions>) => void;
  onFlipDecision: () => Promise<CoinSide>;
  isFlipping: boolean;
}

export const DecisionMaker: React.FC<DecisionMakerProps> = ({
  decision,
  onUpdate,
  onFlipDecision,
  isFlipping,
}) => {
  const [optA, setOptA] = useState(decision.optionA || 'Go to restaurant');
  const [optB, setOptB] = useState(decision.optionB || 'Cook at home');

  const handleFlip = async () => {
    onUpdate({ optionA: optA, optionB: optB });
    await onFlipDecision();
  };

  const handleReset = () => {
    onUpdate({
      optionA: '',
      optionB: '',
      lastSelected: null,
      lastFlipResult: null,
    });
    setOptA('');
    setOptB('');
  };

  const selectedText = decision.lastSelected === 'A' ? optA : optB;

  return (
    <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
      <div className="border-b border-zinc-100 dark:border-zinc-700/60 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-tails-600 dark:text-tails-400">
            Decision Helper
          </span>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-tails-500" />
            Your two options
          </h3>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Options
        </button>
      </div>

      {/* Inputs for Option A and Option B */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`p-4 rounded-2xl border transition-all ${
          decision.lastSelected === 'A'
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/30'
            : 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              Heads
            </label>
            {decision.lastSelected === 'A' && (
              <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Selected
              </span>
            )}
          </div>
          <input
            type="text"
            value={optA}
            placeholder="e.g. Eat out"
            onChange={(e) => setOptA(e.target.value)}
            className="w-full px-3 py-2 text-base font-semibold rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${
          decision.lastSelected === 'B'
            ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-400/30'
            : 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">
              Tails
            </label>
            {decision.lastSelected === 'B' && (
              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Selected
              </span>
            )}
          </div>
          <input
            type="text"
            value={optB}
            placeholder="e.g. Cook at home"
            onChange={(e) => setOptB(e.target.value)}
            className="w-full px-3 py-2 text-base font-semibold rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Decision Flip Trigger */}
      <button
        type="button"
        disabled={isFlipping || !optA.trim() || !optB.trim()}
        onClick={handleFlip}
        className="w-full py-4 px-6 rounded-2xl bg-heads-400 hover:bg-heads-300 text-zinc-950 font-semibold text-lg shadow-sm transition-all active:scale-98 disabled:opacity-50"
      >
        {isFlipping ? 'CHOOSING DECISION...' : 'FLIP FOR DECISION'}
      </button>

      {/* Outcome announcement */}
      {decision.lastSelected && !isFlipping && (
        <div className="animate-fade-in-up rounded-xl border border-heads-200 bg-heads-50 p-5 text-center dark:border-heads-900 dark:bg-heads-950/40" aria-live="polite">
          <span className="text-sm text-heads-800 dark:text-heads-300">
            It landed on {decision.lastFlipResult === 'heads' ? 'heads' : 'tails'}, so the coin says:
          </span>
          <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
            {selectedText}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
            The coin chose at random. If you feel a little disappointed, that’s a good hint about what you really wanted.
          </p>
        </div>
      )}

      {/* Privacy note */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Your options are saved on this device only.</span>
      </div>
    </div>
  );
};
