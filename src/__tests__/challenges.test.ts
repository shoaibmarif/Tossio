import { describe, it, expect } from 'vitest';
import { generateDailyChallenge, evaluateAchievements } from '../game/challenges';
import { INITIAL_OVERALL_STATS } from '../game/statistics';
import type { OverallStats, PredictionState } from '../types';

describe('Daily Challenges & Achievements', () => {
  it('generates consistent deterministic challenge for the same date', () => {
    const ch1 = generateDailyChallenge('2026-09-27');
    const ch2 = generateDailyChallenge('2026-09-27');
    expect(ch1.challengeType).toBe(ch2.challengeType);
    expect(ch1.targetFlips).toBe(ch2.targetFlips);
    expect(ch1.targetGoalText).toBe(ch2.targetGoalText);
  });

  it('generates different or varied challenge for different dates', () => {
    // Generate across 10 distinct dates to ensure variety
    const dates = [
      '2026-01-01',
      '2026-01-02',
      '2026-01-03',
      '2026-01-04',
      '2026-01-05',
    ];
    const types = new Set(dates.map((d) => generateDailyChallenge(d).challengeType));
    expect(types.size).toBeGreaterThan(1);
  });

  it('evaluates achievement conditions accurately', () => {
    const unlockedMap: Record<string, number> = {};
    const overallStats: OverallStats = {
      ...INITIAL_OVERALL_STATS,
      totalFlips: 10,
      heads: 5,
      tails: 5,
      headsPercentage: 50,
      tailsPercentage: 50,
      streak: {
        currentStreak: 5,
        currentSide: 'heads',
        longestHeadsStreak: 5,
        longestTailsStreak: 2,
        longestOverallStreak: 5,
      },
    };

    const predictionStats: PredictionState = {
      totalPredictions: 1,
      correctPredictions: 1,
      incorrectPredictions: 0,
      currentStreak: 1,
      bestStreak: 1,
      score: 1,
      selectedPrediction: null,
    };

    const newUnlocked = evaluateAchievements({
      unlockedMap,
      overallStats,
      experiments: [],
      predictionStats,
    });

    // Should unlock first_flip, flips_10, streak_5, prediction_first
    expect(newUnlocked).toContain('first_flip');
    expect(newUnlocked).toContain('flips_10');
    expect(newUnlocked).toContain('streak_5');
    expect(newUnlocked).toContain('prediction_first');
    // Should NOT unlock flips_100
    expect(newUnlocked).not.toContain('flips_100');
  });
});
