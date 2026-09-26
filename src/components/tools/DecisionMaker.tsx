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
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div className="border-b border-slate-100 dark:border-slate-700/60 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Decision Helper
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-purple-500" />
            Decision Coin Flip
          </h3>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5"
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
            : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
              Heads = Option A
            </label>
            {decision.lastSelected === 'A' && (
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Selected
              </span>
            )}
          </div>
          <input
            type="text"
            value={optA}
            placeholder="e.g. Go to restaurant"
            onChange={(e) => setOptA(e.target.value)}
            className="w-full px-3 py-2 text-base font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${
          decision.lastSelected === 'B'
            ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-400/30'
            : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase text-indigo-700 dark:text-indigo-400">
              Tails = Option B
            </label>
            {decision.lastSelected === 'B' && (
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Selected
              </span>
            )}
          </div>
          <input
            type="text"
            value={optB}
            placeholder="e.g. Cook at home"
            onChange={(e) => setOptB(e.target.value)}
            className="w-full px-3 py-2 text-base font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Decision Flip Trigger */}
      <button
        type="button"
        disabled={isFlipping || !optA.trim() || !optB.trim()}
        onClick={handleFlip}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-lg shadow-lg shadow-purple-500/25 transition-all active:scale-98 disabled:opacity-50"
      >
        {isFlipping ? 'CHOOSING DECISION...' : 'FLIP FOR DECISION'}
      </button>

      {/* Outcome announcement */}
      {decision.lastSelected && !isFlipping && (
        <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 rounded-2xl border border-purple-200 dark:border-purple-800/60 text-center space-y-1 animate-in fade-in duration-300">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            Selected Choice ({decision.lastFlipResult === 'heads' ? 'Heads' : 'Tails'})
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {selectedText}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            The application randomly selected between your options. It does not determine the objectively &quot;correct&quot; life choice.
          </p>
        </div>
      )}

      {/* Privacy note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Your custom decisions remain strictly private on this device. Nothing is sent to a server.</span>
      </div>
    </div>
  );
};
