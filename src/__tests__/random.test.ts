import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  generateRandomBit,
  flipFairCoin,
  setDeterministicSeed,
  generateWeightedBit,
  generateBulkFairFlips,
  generateBulkWeightedFlips,
} from '../game/random';

describe('Randomness & PRNG Engine', () => {
  beforeEach(() => {
    setDeterministicSeed(null);
  });

  afterEach(() => {
    setDeterministicSeed(null);
  });

  it('generates only valid bits (0 or 1)', () => {
    for (let i = 0; i < 200; i++) {
      const bit = generateRandomBit();
      expect(bit === 0 || bit === 1).toBe(true);
    }
  });

  it('flips fair coin returning only "heads" or "tails"', () => {
    for (let i = 0; i < 200; i++) {
      const outcome = flipFairCoin();
      expect(outcome === 'heads' || outcome === 'tails').toBe(true);
    }
  });

  it('produces deterministic output when seeded', () => {
    setDeterministicSeed(123456789);
    const seq1 = [generateRandomBit(), generateRandomBit(), generateRandomBit(), generateRandomBit()];

    setDeterministicSeed(123456789);
    const seq2 = [generateRandomBit(), generateRandomBit(), generateRandomBit(), generateRandomBit()];

    expect(seq1).toEqual(seq2);
  });

  it('respects boundary values for weighted generator', () => {
    // 100% heads probability must always yield 0 (heads)
    for (let i = 0; i < 50; i++) {
      expect(generateWeightedBit(1.0)).toBe(0);
    }

    // 0% heads probability must always yield 1 (tails)
    for (let i = 0; i < 50; i++) {
      expect(generateWeightedBit(0.0)).toBe(1);
    }
  });

  it('bulk fair flips generator produces exact counts', () => {
    const counts = [1, 10, 100, 1000, 15000];
    for (const count of counts) {
      const res = generateBulkFairFlips(count);
      expect(res.heads + res.tails).toBe(count);
      expect(res.heads).toBeGreaterThanOrEqual(0);
      expect(res.tails).toBeGreaterThanOrEqual(0);
    }
  });

  it('bulk weighted generator produces exact totals', () => {
    const res = generateBulkWeightedFlips(1000, 0.7);
    expect(res.heads + res.tails).toBe(1000);
    // Over 1000 flips with 70% heads, heads should be approximately 600-800
    expect(res.heads).toBeGreaterThan(500);
  });
});
