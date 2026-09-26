import type { CoinSide, StreakState } from '../types';

export const INITIAL_STREAK_STATE: StreakState = {
  currentStreak: 0,
  currentSide: null,
  longestHeadsStreak: 0,
  longestTailsStreak: 0,
  longestOverallStreak: 0,
};

/**
 * Updates streak tracking state given a new flip outcome.
 *
 * Rules:
 * - If no previous flip (currentSide is null), currentStreak becomes 1 on that side.
 * - If new result equals currentSide, currentStreak increments by 1.
 * - If new result differs, streak resets to 1 on the new side.
 * - Longest streaks for each side and overall are updated accordingly.
 */
export function updateStreak(prev: StreakState, result: CoinSide): StreakState {
  let newCurrentStreak: number;
  const newCurrentSide: CoinSide = result;

  if (prev.currentSide === result) {
    newCurrentStreak = prev.currentStreak + 1;
  } else {
    newCurrentStreak = 1;
  }

  const newLongestHeads =
    result === 'heads'
      ? Math.max(prev.longestHeadsStreak, newCurrentStreak)
      : prev.longestHeadsStreak;

  const newLongestTails =
    result === 'tails'
      ? Math.max(prev.longestTailsStreak, newCurrentStreak)
      : prev.longestTailsStreak;

  const newLongestOverall = Math.max(newLongestHeads, newLongestTails);

  return {
    currentStreak: newCurrentStreak,
    currentSide: newCurrentSide,
    longestHeadsStreak: newLongestHeads,
    longestTailsStreak: newLongestTails,
    longestOverallStreak: newLongestOverall,
  };
}

/**
 * Calculates streaks from an array of flip results in chronological order.
 */
export function calculateStreaksFromSequence(results: CoinSide[]): StreakState {
  let state = { ...INITIAL_STREAK_STATE };
  for (const r of results) {
    state = updateStreak(state, r);
  }
  return state;
}
