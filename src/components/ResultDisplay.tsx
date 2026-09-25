import type { CoinSide } from '../games/coin-flip/types';
import './ResultDisplay.css';

interface ResultDisplayProps {
  result: CoinSide | null;
  isFlipping: boolean;
}

export function ResultDisplay({ result, isFlipping }: ResultDisplayProps) {
  return (
    <div className="result-display" aria-live="polite" aria-atomic="true">
      {isFlipping ? (
        <span className="result-display__placeholder">Flipping…</span>
      ) : result ? (
        <span
          className={`result-display__text result-display__text--${result}`}
          role="status"
        >
          {result === 'heads' ? '👑 ' : '🌿 '}
          {result.charAt(0).toUpperCase() + result.slice(1)}
        </span>
      ) : (
        <span className="result-display__placeholder">Click Flip Coin to start</span>
      )}
    </div>
  );
}
