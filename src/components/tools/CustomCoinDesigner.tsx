import React from 'react';
import type { CoinCustomization, CoinStyle } from '../../types';
import { CoinEmblem } from '../coin/CoinEmblem';
import { Palette, RotateCcw } from 'lucide-react';

interface CustomCoinDesignerProps {
  customization: CoinCustomization;
  onChange: (updated: Partial<CoinCustomization>) => void;
}

export const CustomCoinDesigner: React.FC<CustomCoinDesignerProps> = ({
  customization,
  onChange,
}) => {
  const styles: Array<{ id: CoinStyle; name: string; bg: string }> = [
    { id: 'gold', name: 'Classic Gold', bg: 'bg-amber-400' },
    { id: 'silver', name: 'Royal Silver', bg: 'bg-zinc-300' },
    { id: 'bronze', name: 'Antique Bronze', bg: 'bg-orange-600' },
    { id: 'cyber', name: 'Cyber Neon', bg: 'bg-cyan-500' },
  ];

  const presets: Array<{ name: string; hSym: string; tSym: string; hLab: string; tLab: string }> = [
    { name: 'Standard', hSym: 'H', tSym: 'T', hLab: 'HEADS', tLab: 'TAILS' },
    { name: 'Yes / No', hSym: 'Y', tSym: 'N', hLab: 'YES', tLab: 'NO' },
    { name: 'Sun / Moon', hSym: '☀️', tSym: '🌙', hLab: 'SUN', tLab: 'MOON' },
    { name: 'Crown / Star', hSym: '👑', tSym: '⭐', hLab: 'CROWN', tLab: 'STAR' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-700/60 pb-4">
        <div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Make it yours
          </span>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-500" />
            Design your coin
          </h3>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              headsLabel: 'HEADS',
              tailsLabel: 'TAILS',
              headsSymbol: 'H',
              tailsSymbol: 'T',
              style: 'gold',
            })
          }
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-amber-600 transition-colors p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700"
          title="Reset coin design"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Default
        </button>
      </div>

      {/* Live Preview of both sides */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Heads Face
          </span>
          <div className="w-32 h-32 rounded-full shadow-sm">
            <CoinEmblem
              side="heads"
              symbol={customization.headsSymbol}
              label={customization.headsLabel}
              style={customization.style}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Tails Face
          </span>
          <div className="w-32 h-32 rounded-full shadow-sm">
            <CoinEmblem
              side="tails"
              symbol={customization.tailsSymbol}
              label={customization.tailsLabel}
              style={customization.style}
            />
          </div>
        </div>
      </div>

      {/* Style selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Finish
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {styles.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onChange({ style: s.id })}
              className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                customization.style === s.id
                  ? 'border-amber-500 ring-2 ring-amber-400/40 bg-amber-50/50 dark:bg-amber-950/30 font-semibold'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full ${s.bg} shadow-inner shrink-0`} />
              <span className="text-xs">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() =>
                onChange({
                  headsSymbol: p.hSym,
                  tailsSymbol: p.tSym,
                  headsLabel: p.hLab,
                  tailsLabel: p.tLab,
                })
              }
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              {p.name} ({p.hSym} / {p.tSym})
            </button>
          ))}
        </div>
      </div>

      {/* Custom Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <span className="block text-xs font-semibold text-amber-600 dark:text-amber-400">
            Heads Configuration
          </span>
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Symbol (1 or 2 characters)</label>
            <input
              type="text"
              maxLength={2}
              value={customization.headsSymbol}
              onChange={(e) => onChange({ headsSymbol: e.target.value.toUpperCase() || 'H' })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-semibold text-center text-zinc-900 dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Edge Label:</label>
            <input
              type="text"
              maxLength={10}
              value={customization.headsLabel}
              onChange={(e) => onChange({ headsLabel: e.target.value.toUpperCase() || 'HEADS' })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-semibold text-center text-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <span className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Tails Configuration
          </span>
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Symbol (1 or 2 characters)</label>
            <input
              type="text"
              maxLength={2}
              value={customization.tailsSymbol}
              onChange={(e) => onChange({ tailsSymbol: e.target.value.toUpperCase() || 'T' })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-semibold text-center text-zinc-900 dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Edge Label:</label>
            <input
              type="text"
              maxLength={10}
              value={customization.tailsLabel}
              onChange={(e) => onChange({ tailsLabel: e.target.value.toUpperCase() || 'TAILS' })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-semibold text-center text-zinc-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
