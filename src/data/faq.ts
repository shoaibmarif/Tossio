export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is an online coin flip really random?',
    answer:
      'Tossio uses your browser’s built-in cryptographic random number generator (the same one used for things like secure passwords), so every flip is a genuine 50/50. Nothing about past flips, the time or your device makes one side more likely.',
  },
  {
    question: 'I got heads six times in a row. Is something wrong?',
    answer:
      'No, that’s just how randomness feels. The chance of six heads in a row is 1 in 64, so if you flip a lot it will happen now and then. Streaks are actually a sign the coin is fair: a perfectly alternating pattern would be the suspicious one.',
  },
  {
    question: 'After a run of heads, is tails more likely?',
    answer:
      'No. A coin has no memory, so the next flip is always 50/50, whatever came before. Believing otherwise is called the gambler’s fallacy, and it catches almost everyone at some point.',
  },
  {
    question: 'Is a real coin flip 50/50?',
    answer:
      'Almost, but not quite. Studies of real coin tosses found a small bias towards the side that was facing up when the coin was flipped, roughly 51 to 49. Tossio doesn’t have that problem: both sides are exactly as likely.',
  },
  {
    question: 'Can a coin land on its edge?',
    answer:
      'A real one can, very rarely. For a US nickel it’s estimated at around 1 in 6,000 tosses. Tossio’s coin always lands on heads or tails.',
  },
  {
    question: 'How many coins can I flip at once?',
    answer:
      'The simulator handles up to 1,000,000 flips in one go, and it takes well under a second. It’s a good way to see how the results settle closer to 50% the more you flip.',
  },
  {
    question: 'Can I use it to make a decision?',
    answer:
      'Yes, that’s what the decision flip is for. Type your two options, flip, and the coin picks one. A handy tip: if you feel disappointed by the result, that tells you what you actually wanted.',
  },
  {
    question: 'Are my flips saved anywhere?',
    answer:
      'Only in your own browser, on this device. Nothing is uploaded and there’s no account. Clearing your browser data, or using the reset button on the statistics page, deletes it.',
  },
  {
    question: 'Does it work on my phone, or offline?',
    answer:
      'It works on any phone or computer. You can add it to your home screen, and once it has loaded it keeps working without a connection.',
  },
  {
    question: 'Are there keyboard shortcuts?',
    answer:
      'Yes. Press Space or Enter to flip. On the home page, press H or T to predict heads or tails before you flip.',
  },
];
