import { describe, it, expect } from 'vitest';
import { updateStreak, calculateStreaksFromSequence, INITIAL_STREAK_STATE } from '../game/streaks';

describe('Streak Tracking System', () => {
  it('starts first flip as streak of 1 on that side', () => {
    const s1 = updateStreak(INITIAL_STREAK_STATE, 'heads');
    expect(s1.currentStreak).toBe(1);
    expect(s1.currentSide).toBe('heads');
    expect(s1.longestHeadsStreak).toBe(1);
    expect(s1.longestTailsStreak).toBe(0);
    expect(s1.longestOverallStreak).toBe(1);
  });

  it('increments streak when consecutive flip matches previous outcome', () => {
    let s = updateStreak(INITIAL_STREAK_STATE, 'heads');
    s = updateStreak(s, 'heads');
    s = updateStreak(s, 'heads');

    expect(s.currentStreak).toBe(3);
    expect(s.currentSide).toBe('heads');
    expect(s.longestHeadsStreak).toBe(3);
    expect(s.longestOverallStreak).toBe(3);
  });

  it('resets streak to 1 on opposite side when result changes', () => {
    let s = updateStreak(INITIAL_STREAK_STATE, 'heads');
    s = updateStreak(s, 'heads'); // streak 2 heads
    s = updateStreak(s, 'tails'); // flips to tails

    expect(s.currentStreak).toBe(1);
    expect(s.currentSide).toBe('tails');
    expect(s.longestHeadsStreak).toBe(2);
    expect(s.longestTailsStreak).toBe(1);
    expect(s.longestOverallStreak).toBe(2);
  });

  it('tracks longest streaks accurately across alternating sequences', () => {
    // Sequence: H, H, H, H, T, T, H, H, H, H, H, T
    const sequence = [
      'heads',
      'heads',
      'heads',
      'heads',
      'tails',
      'tails',
      'heads',
      'heads',
      'heads',
      'heads',
      'heads',
      'tails',
    ] as const;

    const finalState = calculateStreaksFromSequence([...sequence]);
    expect(finalState.currentStreak).toBe(1);
    expect(finalState.currentSide).toBe('tails');
    expect(finalState.longestHeadsStreak).toBe(5);
    expect(finalState.longestTailsStreak).toBe(2);
    expect(finalState.longestOverallStreak).toBe(5);
  });
});
