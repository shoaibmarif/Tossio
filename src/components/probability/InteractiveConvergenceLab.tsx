import React, { useState } from 'react';
import { generateBulkFairFlips, generateRandomBit } from '../../game/random';
import { calculateConsistentPercentages } from '../../game/statistics';
import { Play, TrendingUp, Info } from 'lucide-react';

interface ConvergencePoint {
  flips: number;
  headsPct: number;
}

export const InteractiveConvergenceLab: React.FC = () => {
  const [targetFlips, setTargetFlips] = useState<number>(1000);
  const [dataPoints, setDataPoints] = useState<ConvergencePoint[]>([]);
  const [finalResult, setFinalResult] = useState<{ heads: number; tails: number; total: number } | null>(
    null
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const sampleSizes = [10, 100, 1000, 10000, 50000];

  const runConvergenceSimulation = (totalCount: number) => {
    setIsRunning(true);
    setTargetFlips(totalCount);

    // Build intermediate sample checkpoints
    const checkpoints: number[] = [];
    let cur = 1;
    while (cur < totalCount) {
      checkpoints.push(cur);
      if (cur < 10) cur += 1;
      else if (cur < 100) cur += 10;
      else if (cur < 1000) cur += 100;
      else if (cur < 10000) cur += 1000;
      else cur += 5000;
    }
    checkpoints.push(totalCount);

    const points: ConvergencePoint[] = [];
    let cumulativeHeads = 0;
    let prevIndex = 0;

    for (let cp of checkpoints) {
      const flipsToAdd = cp - prevIndex;
      if (flipsToAdd <= 100) {
        for (let i = 0; i < flipsToAdd; i++) {
          if (generateRandomBit() === 0) cumulativeHeads++;
        }
      } else {
        const bulk = generateBulkFairFlips(flipsToAdd);
        cumulativeHeads += bulk.heads;
      }
      prevIndex = cp;
      const { headsPercentage } = calculateConsistentPercentages(cumulativeHeads, cp - cumulativeHeads);
      points.push({ flips: cp, headsPct: headsPercentage });
    }

    setDataPoints(points);
    setFinalResult({
      heads: cumulativeHeads,
      tails: totalCount - cumulativeHeads,
      total: totalCount,
    });
    setIsRunning(false);
  };

  // SVG Chart Dimensions
  const width = 560;
  const height = 220;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;


  // Map data points to SVG coordinates
  const svgPath = React.useMemo(() => {
    if (dataPoints.length === 0) return '';
    return dataPoints
      .map((p, idx) => {
        // Logarithmic or proportional X
        const x = padding.left + (idx / (dataPoints.length - 1)) * graphWidth;
        // Clamp Y between 20% and 80%
        const clampedPct = Math.max(20, Math.min(80, p.headsPct));
        const y = padding.top + graphHeight * (1 - (clampedPct - 20) / 60);
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [dataPoints, graphWidth, graphHeight]);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Interactive Probability Lab
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            Convergence & The Law of Large Numbers
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select a sample size and observe how Heads % converges toward the theoretical 50% line.
          </p>
        </div>

        {/* Preset sample buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {sampleSizes.map((count) => (
            <button
              key={count}
              type="button"
              disabled={isRunning}
              onClick={() => runConvergenceSimulation(count)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                targetFlips === count && dataPoints.length > 0
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-600'
              }`}
            >
              {count.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Convergence Chart */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center">
        {dataPoints.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xl mx-auto h-auto">
              {/* Grid lines */}
              {[30, 40, 50, 60, 70].map((level) => {
                const y = padding.top + graphHeight * (1 - (level - 20) / 60);
                const isFifty = level === 50;
                return (
                  <g key={level}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke={isFifty ? '#10b981' : '#94a3b8'}
                      strokeWidth={isFifty ? '2' : '0.8'}
                      strokeDasharray={isFifty ? '4 4' : '2 2'}
                      strokeOpacity={isFifty ? '0.9' : '0.4'}
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      className="fill-slate-400 font-mono"
                    >
                      {level}%
                    </text>
                  </g>
                );
              })}

              {/* Convergence Curve */}
              {svgPath && (
                <path
                  d={svgPath}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* End Point Dot */}
              {dataPoints.length > 0 && (
                <circle
                  cx={width - padding.right}
                  cy={
                    padding.top +
                    graphHeight *
                      (1 -
                        (Math.max(20, Math.min(80, dataPoints[dataPoints.length - 1].headsPct)) -
                          20) /
                          60)
                  }
                  r="5"
                  className="fill-amber-500 stroke-white dark:stroke-slate-900"
                  strokeWidth="2"
                />
              )}

              {/* X Axis labels */}
              <text
                x={padding.left}
                y={height - 8}
                fontSize="10"
                className="fill-slate-400 font-mono"
              >
                Flip #1
              </text>
              <text
                x={width - padding.right}
                y={height - 8}
                textAnchor="end"
                fontSize="10"
                className="fill-slate-400 font-mono"
              >
                Flip #{targetFlips.toLocaleString()}
              </text>
            </svg>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500">
            <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">Click any sample size above to launch the simulation</p>
          </div>
        )}

        {finalResult && (
          <div className="w-full mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 dark:text-slate-400">
              Final result after <strong>{finalResult.total.toLocaleString()}</strong> flips:
            </span>
            <div className="flex gap-4 font-mono font-bold">
              <span className="text-amber-600 dark:text-amber-400">
                Heads: {finalResult.heads.toLocaleString()} ({(finalResult.heads / finalResult.total * 100).toFixed(2)}%)
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">
                Tails: {finalResult.tails.toLocaleString()} ({(finalResult.tails / finalResult.total * 100).toFixed(2)}%)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Educational Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
            <Info className="w-4 h-4 text-amber-500" />
            Expected vs Observed Frequency
          </div>
          <p>
            <strong>Expected Probability:</strong> For a fair symmetrical coin, each side has an exact theoretical probability of \(P = 0.5\) (50%).
          </p>
          <p>
            <strong>Observed Frequency:</strong> In any small trial (e.g. 10 flips), getting 7 Heads and 3 Tails is completely normal. Randomness doesn&apos;t alternate predictably; variance occurs naturally in small samples.
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            The Law of Large Numbers
          </div>
          <p>
            As the number of independent flips grows into thousands and tens of thousands, the relative frequency of Heads inevitably stabilizes and converges toward 50%.
          </p>
          <p>
            <strong>Independence:</strong> A coin possesses no memory. Even after 5 Heads in a row, the exact probability of Heads on the 6th flip remains exactly 50%.
          </p>
        </div>
      </div>
    </div>
  );
};
