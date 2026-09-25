import './ProbabilityInfo.css';

export function ProbabilityInfo() {
  return (
    <section className="probability-info" aria-label="Probability Information">
      <h2 className="probability-info__title">🎲 Coin Flip Probability</h2>
      <p className="probability-info__text">
        A fair coin has an equal chance of landing on either side:
      </p>
      <p className="probability-info__text">
        <span className="probability-info__highlight">👑 Heads: 50%</span>{' '}
        <span className="probability-info__highlight">🌿 Tails: 50%</span>
      </p>
      <p className="probability-info__text">
        In practice, short-term results may deviate from this.
        For example, flipping a coin 10 times might give 7 Heads and 3 Tails —
        that's perfectly normal. Over thousands of flips, the results tend to
        converge toward 50/50.
      </p>
      <p className="probability-info__note">
        Each flip is independent — previous results never influence future flips.
      </p>
    </section>
  );
}
