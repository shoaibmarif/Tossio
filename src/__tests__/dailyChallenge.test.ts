import { describe, it, expect } from 'vitest';
import { advanceDailyChallenge, generateDailyChallenge } from '../game/challenges';
import type { DailyChallengeState } from '../types';

const streakChallenge = (): DailyChallengeState => ({
  ...generateDailyChallenge('2026-01-01'),
  challengeType: 'streak',
  targetFlips: 5,
  progress: 0,
  streakRecord: 0,
  isCompleted: false,
});

describe('advanceDailyChallenge', () => {
  it('only counts runs made today for the streak challenge', () => {
    let c = streakChallenge();
    for (const side of ['heads', 'heads', 'tails', 'tails', 'tails'] as const) c = advanceDailyChallenge(c, side);
    expect(c.streakRecord).toBe(3);
    expect(c.isCompleted).toBe(false);
    c = advanceDailyChallenge(c, 'tails');
    c = advanceDailyChallenge(c, 'tails');
    expect(c.streakRecord).toBe(5);
    expect(c.isCompleted).toBe(true);
    expect(c.completedAt).toBeTypeOf('number');
  });

  it('counts flips for the other challenge types', () => {
    let c: DailyChallengeState = { ...streakChallenge(), challengeType: 'flips', targetFlips: 3 };
    c = advanceDailyChallenge(c, 'heads');
    c = advanceDailyChallenge(c, 'tails');
    expect(c.isCompleted).toBe(false);
    c = advanceDailyChallenge(c, 'heads');
    expect(c.isCompleted).toBe(true);
  });

  it('does nothing once completed', () => {
    const done = { ...streakChallenge(), isCompleted: true, progress: 5 };
    expect(advanceDailyChallenge(done, 'heads')).toBe(done);
  });

  it('gives everyone the same challenge on the same day', () => {
    expect(generateDailyChallenge('2026-11-06')).toEqual(generateDailyChallenge('2026-11-06'));
  });
});
