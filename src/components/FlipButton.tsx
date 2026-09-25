import './FlipButton.css';

interface FlipButtonProps {
  onClick: () => void;
  isFlipping: boolean;
}

export function FlipButton({ onClick, isFlipping }: FlipButtonProps) {
  return (
    <button
      className="flip-button"
      onClick={onClick}
      disabled={isFlipping}
      aria-label="Flip the coin"
      type="button"
    >
      {isFlipping ? (
        <>
          <span className="flip-button__spinner" aria-hidden="true" />
          Flipping…
        </>
      ) : (
        '🪙 Flip Coin'
      )}
    </button>
  );
}
