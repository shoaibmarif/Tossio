import type { CoinType } from '../games/coin-flip/types';
import './CoinOptions.css';

interface CoinOptionsProps {
  coinType: CoinType;
  onCoinTypeChange: (type: CoinType) => void;
}

const COIN_TYPES: { value: CoinType; label: string }[] = [
  { value: 'standard', label: '🪙 Standard Coin' },
  { value: 'custom', label: '✨ Custom Coin' },
];

export function CoinOptions({ coinType, onCoinTypeChange }: CoinOptionsProps) {
  return (
    <div className="coin-options" role="group" aria-label="Coin type selection">
      {COIN_TYPES.map(({ value, label }) => (
        <button
          key={value}
          className={`coin-options__btn ${coinType === value ? 'coin-options__btn--active' : ''}`}
          onClick={() => onCoinTypeChange(value)}
          type="button"
          aria-pressed={coinType === value}
          disabled={value === 'custom'}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
