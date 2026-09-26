import { describe, it, expect } from 'vitest';
import {
  calculateConsistentPercentages,
  calculate5050Diff,
  formatSignedDiff,
  analyzeExperiments,
} from '../game/statistics';
import type { BatchExperimentRecord } from '../types';

describe('Statistics Calculations', () => {
  it('handles zero flips safely without NaN', () => {
    const { headsPercentage, tailsPercentage } = calculateConsistentPercentages(0, 0);
    expect(headsPercentage).toBe(0);
    expect(tailsPercentage).toBe(0);
  });

  it('guarantees percentages sum to exactly 100%', () => {
    // Tests various tricky fraction numbers: 1/3, 2/3, 51/100, 497/1000
    const cases = [
      [51, 49],
      [1, 2],
      [2, 1],
      [497, 503],
      [7, 3],
      [33, 67],
    ];

    for (const [h, t] of cases) {
      const { headsPercentage, tailsPercentage } = calculateConsistentPercentages(h, t);
      expect(Math.round((headsPercentage + tailsPercentage) * 10) / 10).toBe(100);
    }
  });

  it('correctly calculates difference from 50/50 benchmark', () => {
    expect(calculate5050Diff(50.3)).toBe(0.3);
    expect(calculate5050Diff(49.7)).toBe(-0.3);
    expect(calculate5050Diff(50.0)).toBe(0);
  });

  it('formats signed diff strings correctly', () => {
    expect(formatSignedDiff(0.3)).toBe('+0.3%');
    expect(formatSignedDiff(-0.5)).toBe('-0.5%');
    expect(formatSignedDiff(0.0)).toBe('0.0%');
  });

  it('identifies closest to 50/50 and largest deviation from experiments', () => {
    const mockExps: BatchExperimentRecord[] = [
      {
        id: '1',
        date: 'Test',
        timestamp: 1,
        totalFlips: 100,
        heads: 55,
        tails: 45,
        headsPercentage: 55,
        tailsPercentage: 45,
        headsDiff: 5,
        tailsDiff: -5,
        longestHeadsStreak: 3,
        longestTailsStreak: 3,
      },
      {
        id: '2',
        date: 'Test',
        timestamp: 2,
        totalFlips: 1000,
        heads: 501,
        tails: 499,
        headsPercentage: 50.1,
        tailsPercentage: 49.9,
        headsDiff: 0.1,
        tailsDiff: -0.1,
        longestHeadsStreak: 7,
        longestTailsStreak: 6,
      },
      {
        id: '3',
        date: 'Test',
        timestamp: 3,
        totalFlips: 50,
        heads: 35,
        tails: 15,
        headsPercentage: 70,
        tailsPercentage: 30,
        headsDiff: 20,
        tailsDiff: -20,
        longestHeadsStreak: 5,
        longestTailsStreak: 2,
      },
    ];

    const analysis = analyzeExperiments(mockExps);
    expect(analysis.closestTo5050?.id).toBe('2'); // 0.1% diff
    expect(analysis.largestDeviation?.id).toBe('3'); // 20% diff
    expect(analysis.totalFlipsAllExperiments).toBe(1150);
    expect(analysis.largestSingleExperiment?.id).toBe('2'); // 1000 flips
  });
});
