import React, { useState, useMemo } from 'react';
import type { FlipRecord, CoinCustomization } from '../../types';
import { History as HistoryIcon, Trash2 } from 'lucide-react';

interface HistoryListProps {
  history: FlipRecord[];
  customization: CoinCustomization;
  onClearHistory: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  customization,
  onClearHistory,
}) => {
  const [filter, setFilter] = useState<'all' | 'heads' | 'tails'>('all');
  const [showSequence, setShowSequence] = useState<boolean>(true);

  const filteredHistory = useMemo(() => {
    if (filter === 'heads') return history.filter((item) => item.result === 'heads');
    if (filter === 'tails') return history.filter((item) => item.result === 'tails');
    return history;
  }, [history, filter]);

  if (history.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 text-center">
        <HistoryIcon className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No flips recorded yet</h4>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Your individual flip outcomes and streaks will be logged here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div className="flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recent Flip History
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
            {history.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('heads')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filter === 'heads'
                  ? 'bg-amber-500 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-amber-600 dark:text-slate-400'
              }`}
            >
              {customization.headsSymbol}
            </button>
            <button
              type="button"
              onClick={() => setFilter('tails')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filter === 'tails'
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-indigo-400 dark:text-slate-400'
              }`}
            >
              {customization.tailsSymbol}
            </button>
          </div>

          {/* Clear button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Clear all recorded flip history?')) {
                onClearHistory();
              }
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title="Clear history"
            aria-label="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Sequence Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Sequence Ribbon (Newest First)</span>
          <button
            type="button"
            onClick={() => setShowSequence(!showSequence)}
            className="text-amber-600 dark:text-amber-400 hover:underline"
          >
            {showSequence ? 'Hide Ribbon' : 'Show Ribbon'}
          </button>
        </div>

        {showSequence && (
          <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 max-h-28 overflow-y-auto">
            {history.slice(0, 80).map((item) => (
              <span
                key={item.id}
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs ${
                  item.result === 'heads'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800'
                    : 'bg-indigo-100 text-indigo-900 border border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-800'
                }`}
                title={`Flip #${item.flipNumber}: ${item.result === 'heads' ? customization.headsLabel : customization.tailsLabel}`}
              >
                {item.result === 'heads' ? customization.headsSymbol : customization.tailsSymbol}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Paginated list of recent results */}
      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
        {filteredHistory.map((item) => {
          const isHeads = item.result === 'heads';
          return (
            <div
              key={item.id}
              className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-sm border border-slate-100 dark:border-slate-800/60"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500 w-12">
                  #{item.flipNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase ${
                    isHeads
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                  }`}
                >
                  {isHeads ? customization.headsLabel : customization.tailsLabel}
                </span>

                {item.prediction && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.predictionWon
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}
                  >
                    {item.predictionWon ? '✓ Predicted' : '✗ Missed'}
                  </span>
                )}
              </div>

              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                {new Date(item.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
