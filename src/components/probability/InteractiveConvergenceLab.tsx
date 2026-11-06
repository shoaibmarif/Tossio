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
    <div className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-700/60 pb-4">
        <div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Try it
          </span>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            Watch it even out
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Pick a number of flips and watch the share of heads drift towards 50%.
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                targetFlips === count && dataPoints.length > 0
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-amber-100 dark:hover:bg-zinc-600'
              }`}
            >
              {count.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Convergence Chart */}
      <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center">
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
                      className="fill-zinc-400 font-mono"
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
                  className="fill-amber-500 stroke-white dark:stroke-zinc-900"
                  strokeWidth="2"
                />
              )}

              {/* X Axis labels */}
              <text
                x={padding.left}
                y={height - 8}
                fontSize="10"
                className="fill-zinc-400 font-mono"
              >
                Flip #1
              </text>
              <text
                x={width - padding.right}
                y={height - 8}
                textAnchor="end"
                fontSize="10"
                className="fill-zinc-400 font-mono"
              >
                Flip #{targetFlips.toLocaleString()}
              </text>
            </svg>
          </div>
        ) : (
          <div className="py-12 text-center text-zinc-400 dark:text-zinc-500">
            <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">Pick a number of flips above to start</p>
          </div>
        )}

        {finalResult && (
          <div className="w-full mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-zinc-600 dark:text-zinc-400">
              Final result after <strong>{finalResult.total.toLocaleString()}</strong> flips:
            </span>
            <div className="flex gap-4 font-mono font-semibold">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-2">
          <div className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5 text-sm">
            <Info className="w-4 h-4 text-amber-500" />
            Expected vs what you get
          </div>
          <p>
            <strong>Expected Probability:</strong> On a fair coin, each side has a probability of exactly 0.5, or 50%.
          </p>
          <p>
            <strong>Observed Frequency:</strong> In a short run, like 10 flips, getting 7 heads and 3 tails is completely normal. Random doesn’t mean neatly alternating.
          </p>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-2">
          <div className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            The law of large numbers
          </div>
          <p>
            Once you’re into thousands of flips, the share of heads settles very close to 50%.
          </p>
          <p>
            <strong>Independence:</strong> A coin has no memory. Even after five heads in a row, the next flip is still 50/50.
          </p>
        </div>
      </div>
    </div>
  );
};
