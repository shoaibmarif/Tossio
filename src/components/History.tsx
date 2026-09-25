import type { FlipResult } from '../games/coin-flip/types';
import './History.css';

interface HistoryProps {
  history: FlipResult[];
  onClear: () => void;
}

export function History({ history, onClear }: HistoryProps) {
  return (
    <section className="history" aria-label="Flip History">
      <div className="history__header">
        <h2 className="history__title">📜 Flip History</h2>
        {history.length > 0 && (
          <button
            className="history__clear-btn"
            onClick={onClear}
            type="button"
            aria-label="Clear flip history"
          >
            Clear
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="history__empty">No flips yet. Start flipping!</p>
      ) : (
        <ol className="history__list" aria-label="Recent flip results">
          {history.map((flip, index) => (
            <li
              key={flip.id}
              className={`history__item history__item--${flip.result}`}
            >
              <span aria-hidden="true">{flip.result === 'heads' ? '👑' : '🌿'}</span>
              <span>#{history.length - index}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
