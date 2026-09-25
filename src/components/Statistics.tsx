import type { FlipStatistics } from '../games/coin-flip/types';
import './Statistics.css';

interface StatisticsProps {
  statistics: FlipStatistics;
  onReset: () => void;
}

export function Statistics({ statistics, onReset }: StatisticsProps) {
  const { totalFlips, heads, tails, headsPercentage, tailsPercentage } = statistics;

  return (
    <section className="statistics" aria-label="Flip Statistics">
      <h2 className="statistics__title">📊 Statistics</h2>
      <div className="statistics__grid">
        <div className="statistics__item">
          <span className="statistics__value">{totalFlips}</span>
          <span className="statistics__label">Total Flips</span>
        </div>
        <div className="statistics__item">
          <span className="statistics__value statistics__value--heads">{heads}</span>
          <span className="statistics__label">Heads ({headsPercentage}%)</span>
        </div>
        <div className="statistics__item">
          <span className="statistics__value statistics__value--tails">{tails}</span>
          <span className="statistics__label">Tails ({tailsPercentage}%)</span>
        </div>
      </div>

      {totalFlips > 0 && (
        <div className="statistics__bar" role="img" aria-label={`Heads ${headsPercentage}%, Tails ${tailsPercentage}%`}>
          <div
            className="statistics__bar-fill--heads"
            style={{ width: `${headsPercentage}%` }}
          />
          <div
            className="statistics__bar-fill--tails"
            style={{ width: `${tailsPercentage}%` }}
          />
        </div>
      )}

      {totalFlips > 0 && (
        <div className="statistics__actions">
          <button
            className="statistics__reset-btn"
            onClick={onReset}
            type="button"
            aria-label="Reset all statistics and history"
          >
            Reset All Data
          </button>
        </div>
      )}
    </section>
  );
}
