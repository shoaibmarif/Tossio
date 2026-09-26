import type { CoinSide } from '../types';

/**
 * Deterministic PRNG (Mulberry32) for reproducible daily challenges & tests.
 */
export class SeededPRNG {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  /**
   * Generates a 32-bit unsigned float between 0 and 1
   */
  next(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generates a deterministic bit: 0 (heads) or 1 (tails)
   */
  nextBit(): 0 | 1 {
    return this.next() < 0.5 ? 0 : 1;
  }
}

// Global active seeded generator (when in deterministic mode)
let activeSeededPRNG: SeededPRNG | null = null;

export function setDeterministicSeed(seed: number | null): void {
  if (seed === null) {
    activeSeededPRNG = null;
  } else {
    activeSeededPRNG = new SeededPRNG(seed);
  }
}

export function isDeterministicMode(): boolean {
  return activeSeededPRNG !== null;
}

/**
 * Standard browser cryptographically secure random bit generator.
 * Returns:
 * 0 = Heads
 * 1 = Tails
 */
export function generateRandomBit(): 0 | 1 {
  if (activeSeededPRNG) {
    return activeSeededPRNG.nextBit();
  }

  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    try {
      const buffer = new Uint8Array(1);
      crypto.getRandomValues(buffer);
      // Bitwise check on lowest bit for fair 50/50
      return (buffer[0] & 1) === 0 ? 0 : 1;
    } catch {
      // Fall through to Math.random on restricted environments
    }
  }

  return Math.random() < 0.5 ? 0 : 1;
}

/**
 * Converts bit to CoinSide:
 * 0 -> 'heads'
 * 1 -> 'tails'
 */
export function bitToCoinSide(bit: 0 | 1): CoinSide {
  return bit === 0 ? 'heads' : 'tails';
}

/**
 * Single fair coin flip.
 */
export function flipFairCoin(): CoinSide {
  return bitToCoinSide(generateRandomBit());
}

/**
 * Generate a bit for a weighted probability coin.
 * @param headsProbability Decimal between 0.0 and 1.0 (e.g. 0.7 for 70% heads)
 * Returns 0 for Heads, 1 for Tails.
 */
export function generateWeightedBit(headsProbability: number): 0 | 1 {
  if (headsProbability <= 0) return 1;
  if (headsProbability >= 1) return 0;

  if (activeSeededPRNG) {
    return activeSeededPRNG.next() < headsProbability ? 0 : 1;
  }

  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    try {
      const buffer = new Uint32Array(1);
      crypto.getRandomValues(buffer);
      const randFloat = buffer[0] / (0xffffffff + 1);
      return randFloat < headsProbability ? 0 : 1;
    } catch {
      // Fall through
    }
  }

  return Math.random() < headsProbability ? 0 : 1;
}

/**
 * Fast bulk random bit generation using crypto 32-bit words.
 * Efficiently generates millions of flips in milliseconds.
 */
export function generateBulkFairFlips(count: number): { heads: number; tails: number } {
  let heads = 0;

  if (activeSeededPRNG) {
    for (let i = 0; i < count; i++) {
      if (activeSeededPRNG.nextBit() === 0) heads++;
    }
    return { heads, tails: count - heads };
  }

  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    try {
      const MAX_WORDS = 16384; // 65,536 bytes max per call in standard browsers
      const buffer = new Uint32Array(MAX_WORDS);
      let remainingBits = count;

      while (remainingBits > 0) {
        const wordsNeeded = Math.min(MAX_WORDS, Math.ceil(remainingBits / 32));
        const wordsToProcess = wordsNeeded === MAX_WORDS ? buffer : new Uint32Array(wordsNeeded);
        crypto.getRandomValues(wordsToProcess);

        for (let i = 0; i < wordsToProcess.length && remainingBits > 0; i++) {
          const word = wordsToProcess[i];
          const bitsInThisWord = Math.min(32, remainingBits);
          
          if (bitsInThisWord === 32) {
            // Count set bits (population count) for 1s (tails), remainder is 0s (heads)
            let v = word;
            v = v - ((v >>> 1) & 0x55555555);
            v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
            const tailsInWord = (((v + (v >>> 4)) & 0xf0f0f0f) * 0x1010101) >>> 24;
            heads += (32 - tailsInWord);
            remainingBits -= 32;
          } else {
            for (let b = 0; b < bitsInThisWord; b++) {
              if (((word >>> b) & 1) === 0) {
                heads++;
              }
              remainingBits--;
            }
          }
        }
      }

      return { heads, tails: count - heads };
    } catch {
      // Fallback
    }
  }

  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.5) heads++;
  }
  return { heads, tails: count - heads };
}

/**
 * Fast bulk weighted flips generation.
 */
export function generateBulkWeightedFlips(
  count: number,
  headsProbability: number
): { heads: number; tails: number } {
  if (headsProbability <= 0) return { heads: 0, tails: count };
  if (headsProbability >= 1) return { heads: count, tails: 0 };

  let heads = 0;
  // Chunking for performance
  const chunkSize = 20000;
  let remaining = count;

  while (remaining > 0) {
    const currentBatch = Math.min(remaining, chunkSize);
    for (let i = 0; i < currentBatch; i++) {
      if (generateWeightedBit(headsProbability) === 0) {
        heads++;
      }
    }
    remaining -= currentBatch;
  }

  return { heads, tails: count - heads };
}
