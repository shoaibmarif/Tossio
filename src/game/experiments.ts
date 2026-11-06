import type { BatchExperimentRecord } from '../types';
import { generateBulkFairFlips, generateBulkWeightedFlips, generateRandomBit, generateWeightedBit } from './random';
import { calculateConsistentPercentages, calculate5050Diff } from './statistics';

export interface RunBatchOptions {
  count: number;
  isWeighted?: boolean;
  headsProbabilityPct?: number; // 0 to 100
}

/**
 * Runs a batch experiment of n flips.
 * Fast, non-blocking, and accurate.
 */
export function runBatchExperiment(options: RunBatchOptions): BatchExperimentRecord {
  const { count, isWeighted = false, headsProbabilityPct = 50 } = options;
  const validatedCount = Math.max(1, Math.min(1000000, Math.floor(count)));
  const headsProb = Math.max(0, Math.min(100, headsProbabilityPct)) / 100;

  let heads = 0;
  let tails = 0;
  let longestHeadsStreak = 0;
  let longestTailsStreak = 0;

  // For counts up to 50,000 we can track streaks precisely
  if (validatedCount <= 50000) {
    let curSide: 0 | 1 | -1 = -1;
    let curStreak = 0;

    for (let i = 0; i < validatedCount; i++) {
      const bit = isWeighted ? generateWeightedBit(headsProb) : generateRandomBit();
      if (bit === 0) heads++;
      else tails++;

      if (bit === curSide) {
        curStreak++;
      } else {
        curSide = bit;
        curStreak = 1;
      }

      if (curSide === 0 && curStreak > longestHeadsStreak) {
        longestHeadsStreak = curStreak;
      } else if (curSide === 1 && curStreak > longestTailsStreak) {
        longestTailsStreak = curStreak;
      }
    }
  } else {
    // High-performance bulk generation for large scales (up to 1,000,000 flips)
    const res = isWeighted
      ? generateBulkWeightedFlips(validatedCount, headsProb)
      : generateBulkFairFlips(validatedCount);
    heads = res.heads;
    tails = res.tails;
    // Approximated expected longest streak in fair coins: ~ log2(N)
    const expectedLongest = Math.round(Math.log2(validatedCount));
    longestHeadsStreak = expectedLongest;
    longestTailsStreak = expectedLongest;
  }

  const { headsPercentage, tailsPercentage } = calculateConsistentPercentages(heads, tails);
  const headsDiff = calculate5050Diff(headsPercentage);
  const tailsDiff = calculate5050Diff(tailsPercentage);

  const now = Date.now();
  const dateFormatted = new Date(now).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    id: `exp-${now}-${Math.floor(Math.random() * 10000)}`,
    date: dateFormatted,
    timestamp: now,
    totalFlips: validatedCount,
    heads,
    tails,
    headsPercentage,
    tailsPercentage,
    headsDiff,
    tailsDiff,
    longestHeadsStreak,
    longestTailsStreak,
    isWeighted,
    expectedHeadsPct: isWeighted ? headsProbabilityPct : 50,
    expectedTailsPct: isWeighted ? 100 - headsProbabilityPct : 50,
  };
}

/**
 * Descriptive analysis for user-entered physical coin observation:
 * "Is My Coin Fair?"
 */
export function analyzePhysicalObservation(heads: number, tails: number): {
  total: number;
  headsPercentage: number;
  tailsPercentage: number;
  headsDiff: number;
  tailsDiff: number;
  sampleDescription: string;
} {
  const total = Math.max(0, heads) + Math.max(0, tails);
  const { headsPercentage, tailsPercentage } = calculateConsistentPercentages(heads, tails);
  const headsDiff = calculate5050Diff(headsPercentage);
  const tailsDiff = calculate5050Diff(tailsPercentage);

  let sampleDescription = '';
  if (total === 0) {
    sampleDescription = 'Please enter at least one coin flip observation.';
  } else if (total < 30) {
    sampleDescription =
      'Small sample size: Short trials of 1-30 flips frequently display noticeable deviation due to natural random fluctuation.';
  } else if (total < 100) {
    sampleDescription =
      'Moderate sample size: Outcomes often approach 50/50, but short streaks still shift the ratio by several percentage points.';
  } else {
    sampleDescription =
      'Substantial sample size: Under the Law of Large Numbers, fair physical coins tend toward roughly 50% Heads and 50% Tails.';
  }

  return {
    total,
    headsPercentage,
    tailsPercentage,
    headsDiff,
    tailsDiff,
    sampleDescription,
  };
}
