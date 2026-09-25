import type { CoinSide } from '../games/coin-flip/types';
import './Coin.css';

interface CoinProps {
  result: CoinSide | null;
  isFlipping: boolean;
}

export function Coin({ result, isFlipping }: CoinProps) {
  const side = result ?? 'heads';

  const coinClass = [
    'coin',
    isFlipping ? 'coin--flipping' : '',
    `coin--${side}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="coin-container" aria-hidden="true">
      <div className={coinClass}>
        <div className="coin-face coin-face--heads">
          <div className="coin-face__inner">
            <span className="coin-face__icon">👑</span>
            <span className="coin-face__label">Heads</span>
          </div>
        </div>
        <div className="coin-face coin-face--tails">
          <div className="coin-face__inner">
            <span className="coin-face__icon">🌿</span>
            <span className="coin-face__label">Tails</span>
          </div>
        </div>
      </div>
    </div>
  );
}
