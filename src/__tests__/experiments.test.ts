import { describe, it, expect } from 'vitest';
import { runBatchExperiment, analyzePhysicalObservation } from '../game/experiments';

describe('Batch Experiments Engine', () => {
  it('runs batch of 1 flip correctly', () => {
    const exp = runBatchExperiment({ count: 1 });
    expect(exp.totalFlips).toBe(1);
    expect(exp.heads + exp.tails).toBe(1);
    expect(exp.headsPercentage + exp.tailsPercentage).toBe(100);
  });

  it('runs batch of 100 flips with valid streaks', () => {
    const exp = runBatchExperiment({ count: 100 });
    expect(exp.totalFlips).toBe(100);
    expect(exp.heads + exp.tails).toBe(100);
    expect(exp.longestHeadsStreak).toBeGreaterThan(0);
    expect(exp.longestTailsStreak).toBeGreaterThan(0);
  });

  it('runs large simulation of 50,000 flips within valid bounds', () => {
    const exp = runBatchExperiment({ count: 50000 });
    expect(exp.totalFlips).toBe(50000);
    expect(exp.heads + exp.tails).toBe(50000);
    // Fair coin: deviation across 50,000 flips should be within +/- 3%
    expect(Math.abs(exp.headsPercentage - 50)).toBeLessThan(3);
  });

  it('runs weighted simulation respecting target probability', () => {
    const exp = runBatchExperiment({
      count: 2000,
      isWeighted: true,
      headsProbabilityPct: 80,
    });
    expect(exp.totalFlips).toBe(2000);
    expect(exp.headsPercentage).toBeGreaterThan(70);
    expect(exp.expectedHeadsPct).toBe(80);
    expect(exp.isWeighted).toBe(true);
  });

  it('handles physical coin observation analysis with proper sample descriptions', () => {
    const smallSample = analyzePhysicalObservation(7, 3);
    expect(smallSample.total).toBe(10);
    expect(smallSample.headsPercentage).toBe(70);
    expect(smallSample.headsDiff).toBe(20);
    expect(smallSample.sampleDescription).toContain('Small sample size');

    const largeSample = analyzePhysicalObservation(502, 498);
    expect(largeSample.total).toBe(1000);
    expect(largeSample.headsPercentage).toBe(50.2);
    expect(largeSample.sampleDescription).toContain('Substantial sample size');
  });
});
