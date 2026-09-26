import type { OverallStats, BatchExperimentRecord } from '../types';
import { INITIAL_STREAK_STATE } from './streaks';

export const INITIAL_OVERALL_STATS: OverallStats = {
  totalFlips: 0,
  heads: 0,
  tails: 0,
  headsPercentage: 0,
  tailsPercentage: 0,
  streak: INITIAL_STREAK_STATE,
};

/**
 * Calculates consistent percentages that always add up to 100% (or 0% when empty).
 */
export function calculateConsistentPercentages(heads: number, tails: number): {
  headsPercentage: number;
  tailsPercentage: number;
} {
  const total = heads + tails;
  if (total === 0) {
    return { headsPercentage: 0, tailsPercentage: 0 };
  }
  const rawHeadsPct = (heads / total) * 100;
  const headsPercentage = Math.round(rawHeadsPct * 10) / 10;
  const tailsPercentage = Math.round((100 - headsPercentage) * 10) / 10;

  return { headsPercentage, tailsPercentage };
}

/**
 * Calculates difference from 50/50 benchmark.
 * E.g. 50.3% -> +0.3%, 49.7% -> -0.3%
 */
export function calculate5050Diff(pct: number): number {
  return Math.round((pct - 50) * 10) / 10;
}

/**
 * Formats a signed percentage difference string, e.g. "+0.3%" or "-0.3%" or "0.0%"
 */
export function formatSignedDiff(diff: number): string {
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff.toFixed(1)}%`;
}

export interface SummaryStatsAnalysis {
  closestTo5050: BatchExperimentRecord | null;
  largestDeviation: BatchExperimentRecord | null;
  totalFlipsAllExperiments: number;
  largestSingleExperiment: BatchExperimentRecord | null;
}

/**
 * Analyzes a list of experiments to find closest to 50/50, largest deviation, etc.
 */
export function analyzeExperiments(experiments: BatchExperimentRecord[]): SummaryStatsAnalysis {
  if (experiments.length === 0) {
    return {
      closestTo5050: null,
      largestDeviation: null,
      totalFlipsAllExperiments: 0,
      largestSingleExperiment: null,
    };
  }

  let closest: BatchExperimentRecord = experiments[0];
  let largestDev: BatchExperimentRecord = experiments[0];
  let largestSize: BatchExperimentRecord = experiments[0];
  let totalAll = 0;

  for (const exp of experiments) {
    totalAll += exp.totalFlips;

    // Closest to 50/50 has smallest absolute headsDiff
    if (Math.abs(exp.headsDiff) < Math.abs(closest.headsDiff)) {
      closest = exp;
    }

    // Largest deviation has largest absolute headsDiff
    if (Math.abs(exp.headsDiff) > Math.abs(largestDev.headsDiff)) {
      largestDev = exp;
    }

    if (exp.totalFlips > largestSize.totalFlips) {
      largestSize = exp;
    }
  }

  return {
    closestTo5050: closest,
    largestDeviation: largestDev,
    totalFlipsAllExperiments: totalAll,
    largestSingleExperiment: largestSize,
  };
}
