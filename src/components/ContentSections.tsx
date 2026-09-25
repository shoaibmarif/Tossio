import './ContentSections.css';

export function ContentSections() {
  return (
    <div className="content-sections">
      <h2>What Is a Coin Flip?</h2>
      <p>
        A coin flip (also called a coin toss) is one of the simplest and most
        widely used methods for making a random decision between two options.
        One side of the coin is designated as "Heads" and the other as "Tails."
        The coin is tossed into the air and the result is determined by which
        side lands face up.
      </p>
      <p>
        Coin flips have been used for centuries in games, sports, and everyday
        decision-making. They provide a quick, fair, and unbiased way to choose
        between two equally valid options.
      </p>

      <h2>How to Flip a Coin Online</h2>
      <p>
        Using our virtual coin flipper is simple:
      </p>
      <ol>
        <li>Click the <strong>Flip Coin</strong> button.</li>
        <li>Watch the coin animate as it flips in the air.</li>
        <li>The result — <strong>Heads</strong> or <strong>Tails</strong> — will be displayed.</li>
      </ol>
      <p>
        You can flip as many times as you like. Your results are saved
        automatically so you can track your flip history and statistics.
      </p>

      <h2>Is a Coin Flip 50/50?</h2>
      <p>
        Yes — a fair coin flip gives each outcome (Heads or Tails) an equal
        probability of 50%. Our virtual coin flipper uses cryptographically
        secure randomness to ensure each flip is truly fair and independent.
      </p>
      <p>
        However, in small samples, you may see uneven results. Flipping 10
        coins and getting 7 Heads is statistically normal. Over many flips,
        the results tend to converge toward the expected 50/50 split. This
        is known as the Law of Large Numbers.
      </p>

      <h2>Coin Flip Statistics</h2>
      <p>
        When you flip a coin many times, the ratio of Heads to Tails tends to
        approach 50/50. However, the exact count will rarely be perfectly even.
        For example, in 1,000 flips you might get 512 Heads and 488 Tails —
        close to 50/50 but not exactly equal.
      </p>
      <p>
        The more flips you perform, the closer the percentages typically get to
        50%. This is a fundamental principle of probability and statistics.
      </p>

      <h3>Frequently Asked Questions</h3>

      <details className="faq__item">
        <summary>How does an online coin flip work?</summary>
        <p>
          Our coin flipper uses your browser's built-in cryptographic random
          number generator to produce a fair result. Each flip generates a
          random value that determines whether the result is Heads or Tails.
          No server or external API is involved.
        </p>
      </details>

      <details className="faq__item">
        <summary>Is the coin flip truly random?</summary>
        <p>
          Yes. We use the Web Crypto API (<code>crypto.getRandomValues()</code>),
          which provides cryptographically secure random numbers. This is the
          same technology used for generating encryption keys and secure tokens.
        </p>
      </details>

      <details className="faq__item">
        <summary>Is Heads or Tails more likely?</summary>
        <p>
          Neither. Each flip has an equal 50% chance of landing on Heads or
          Tails. Previous results do not influence future flips in any way.
        </p>
      </details>

      <details className="faq__item">
        <summary>Can I flip a coin multiple times?</summary>
        <p>
          Absolutely! You can flip one at a time by clicking the Flip button,
          or use the Batch Flip feature to flip 10, 20, 50, 100, or even 1,000
          coins at once and see the combined results instantly.
        </p>
      </details>

      <details className="faq__item">
        <summary>Can I flip a coin 100 times?</summary>
        <p>
          Yes! Use the Batch Flip section and click "100×" to flip 100 coins
          instantly. The results and statistics will be calculated and displayed
          immediately.
        </p>
      </details>

      <details className="faq__item">
        <summary>Can I use this coin flipper for making decisions?</summary>
        <p>
          Yes, our coin flipper is perfect for making fair, unbiased decisions
          between two options. Whether you're settling a friendly dispute,
          choosing where to eat, or just having fun, a coin flip provides a
          quick and fair answer.
        </p>
      </details>
    </div>
  );
}
