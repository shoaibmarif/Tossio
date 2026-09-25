import './BatchFlip.css';

interface BatchFlipProps {
  onBatchFlip: (count: number) => void;
  lastResult: { heads: number; tails: number; total: number } | null;
}

const BATCH_OPTIONS = [10, 20, 50, 100, 1000] as const;

export function BatchFlip({ onBatchFlip, lastResult }: BatchFlipProps) {
  return (
    <section className="batch-flip" aria-label="Batch Flip">
      <h2 className="batch-flip__title">⚡ Flip Multiple Times</h2>
      <div className="batch-flip__buttons" role="group" aria-label="Batch flip options">
        {BATCH_OPTIONS.map((count) => (
          <button
            key={count}
            className="batch-flip__btn"
            onClick={() => onBatchFlip(count)}
            type="button"
            aria-label={`Flip coin ${count.toLocaleString()} times`}
          >
            {count.toLocaleString()}×
          </button>
        ))}
      </div>
      {lastResult && (
        <div className="batch-flip__result" role="status">
          <p className="batch-flip__result-title">
            Last batch: {lastResult.total.toLocaleString()} flips
          </p>
          <div className="batch-flip__result-stats">
            <div className="batch-flip__result-item">
              <span className="batch-flip__result-value batch-flip__result-value--heads">
                {lastResult.heads.toLocaleString()}
              </span>
              <span className="batch-flip__result-label">Heads</span>
            </div>
            <div className="batch-flip__result-item">
              <span className="batch-flip__result-value batch-flip__result-value--tails">
                {lastResult.tails.toLocaleString()}
              </span>
              <span className="batch-flip__result-label">Tails</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
