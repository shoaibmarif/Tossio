import React, { useState } from 'react';
import type { CoinState, CoinSide } from '../../types';
import { Play, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';

interface FlipControlsProps {
  coinState: CoinState;
  soundEnabled: boolean;
  onFlip: () => void;
  onBatchFlip: (count: number) => void;
  onToggleSound: () => void;
  onReset: () => void;
  predictionSide: CoinSide | null;
  onSelectPrediction: (side: CoinSide | null) => void;
  isPredictionMode?: boolean;
}

export const FlipControls: React.FC<FlipControlsProps> = ({
  coinState,
  soundEnabled,
  onFlip,
  onBatchFlip,
  onToggleSound,
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

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-5">
      {/* Prediction Mode Selector */}
      {isPredictionMode && (
        <div className="w-full bg-indigo-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
            Predict Before Flipping
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              disabled={isFlipping}
              onClick={() => onSelectPrediction(predictionSide === 'heads' ? null : 'heads')}
              className={`px-5 py-2 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                predictionSide === 'heads'
                  ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-slate-600'
              }`}
            >
              👑 Predict Heads
            </button>
            <button
              type="button"
              disabled={isFlipping}
              onClick={() => onSelectPrediction(predictionSide === 'tails' ? null : 'tails')}
              className={`px-5 py-2 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                predictionSide === 'tails'
                  ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-300'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-indigo-50 dark:hover:bg-slate-600'
              }`}
            >
              🌟 Predict Tails
            </button>
          </div>
          {predictionSide && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Prediction locked! Flip now to see if you win.
            </span>
          )}
        </div>
      )}

      {/* Main Large Flip Button */}
      <div className="w-full flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={isFlipping}
          onClick={onFlip}
          className={`flex-1 max-w-sm py-4 px-8 rounded-2xl font-black text-xl tracking-wider text-white shadow-xl transition-all duration-150 transform active:scale-95 flex items-center justify-center gap-3 min-h-[56px] focus:outline-none focus:ring-4 focus:ring-amber-400/50 ${
            isFlipping
              ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed shadow-none opacity-80'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 shadow-amber-500/25 hover:shadow-amber-500/40'
          }`}
          aria-label={isFlipping ? 'Flipping coin...' : 'Flip coin'}
        >
          <Sparkles className={`w-6 h-6 ${isFlipping ? 'animate-spin' : ''}`} />
          <span>{isFlipping ? 'FLIPPING...' : 'FLIP COIN'}</span>
        </button>

        {/* Quick Sound Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[56px] min-w-[56px] flex items-center justify-center"
          title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          aria-label={soundEnabled ? 'Sound is on, click to mute' : 'Sound is muted, click to unmute'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-600 dark:text-amber-400" /> : <VolumeX className="w-5 h-5 opacity-60" />}
        </button>

        {/* Reset Button */}
        <button
          type="button"
          disabled={isFlipping}
          onClick={() => {
            if (window.confirm('Reset current flip counter and streaks?')) {
              onReset();
            }
          }}
          className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[56px] min-w-[56px] flex items-center justify-center"
          title="Reset stats & counter (R)"
          aria-label="Reset statistics and counter"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Multiple Quick Batch Presets */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Play className="w-3.5 h-3.5" />
          <span>Batch Experiments</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {presets.map((count) => (
            <button
              key={count}
              type="button"
              disabled={isFlipping}
              onClick={() => onBatchFlip(count)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
            >
              +{count.toLocaleString()}
            </button>
          ))}
          <button
            type="button"
            disabled={isFlipping}
            onClick={() => setShowCustomModal(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
          >
            Custom...
          </button>
        </div>
      </div>

      {/* Custom Batch Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Custom Batch Experiment
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Enter number of flips to run instantly (1 to 1,000,000):
            </p>
            <form onSubmit={handleCustomSubmit} className="flex flex-col gap-4">
              <input
                type="number"
                min="1"
                max="1000000"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all"
                >
                  Run Experiment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
