import type {
  CoinSide,
  DailyChallengeState,
  Achievement,
  OverallStats,
  BatchExperimentRecord,
  PredictionState,
} from '../types';

/**
 * Generates a deterministic 32-bit hash from a string.
 */
function hashDateString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Returns today's formatted local date string: YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generates the deterministic daily challenge for any given date string.
 */
export function generateDailyChallenge(dateString: string): DailyChallengeState {
  const hash = hashDateString(dateString);

  const challengeTypes: Array<{
    type: DailyChallengeState['challengeType'];
    target: number;
    goalText: string;
  }> = [
    {
      type: 'balance',
      target: 50,
      goalText: 'Flip 50 times today and see how close you get to half and half.',
    },
    {
      type: 'streak',
      target: 5,
      goalText: 'Get the same side 5 times in a row today.',
    },
    {
      type: 'flips',
      target: 100,
      goalText: 'Flip 100 times today. Does it even out?',
    },
    {
      type: 'speed',
      target: 25,
      goalText: 'Flip 25 times today.',
    },
  ];

  const selected = challengeTypes[hash % challengeTypes.length];

  return {
    dateString,
    targetFlips: selected.target,
    challengeType: selected.type,
    targetGoalText: selected.goalText,
    progress: 0,
    isCompleted: false,
    streakRecord: 0,
  };
}

/**
 * Applies one flip to a daily challenge and returns the updated challenge.
 * The streak challenge only counts runs made today, so a streak carried over
 * from yesterday can't complete today's challenge.
 */
export function advanceDailyChallenge(challenge: DailyChallengeState, outcome: CoinSide): DailyChallengeState {
  if (challenge.isCompleted) return challenge;
  const next: DailyChallengeState = { ...challenge };

  if (next.challengeType === 'streak') {
    next.runLength = next.runSide === outcome ? (next.runLength ?? 0) + 1 : 1;
    next.runSide = outcome;
    next.streakRecord = Math.max(next.streakRecord, next.runLength);
    next.progress = next.streakRecord;
    if (next.streakRecord >= next.targetFlips) next.isCompleted = true;
  } else {
    next.progress += 1;
    if (next.progress >= next.targetFlips) next.isCompleted = true;
  }

  if (next.isCompleted) next.completedAt = Date.now();
  return next;
}

/**
 * All Application Achievements
 */
export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_flip',
    title: 'First Toss',
    description: 'Flip your first coin.',
    icon: '🪙',
    unlockedAt: null,
  },
  {
    id: 'flips_10',
    title: 'Getting Started',
    description: 'Flip 10 times.',
    icon: '✨',
    unlockedAt: null,
  },
  {
    id: 'flips_100',
    title: 'Centurion',
    description: 'Flip 100 times.',
    icon: '💯',
    unlockedAt: null,
  },
  {
    id: 'flips_1000',
    title: 'Committed',
    description: 'Flip 1,000 times.',
    icon: '⚡',
    unlockedAt: null,
  },
  {
    id: 'flips_10000',
    title: 'Ten thousand',
    description: 'Flip 10,000 times. Really?',
    icon: '🏛️',
    unlockedAt: null,
  },
  {
    id: 'heads_100',
    title: 'Heads fan',
    description: 'Land on heads 100 times.',
    icon: '👑',
    unlockedAt: null,
  },
  {
    id: 'tails_100',
    title: 'Tails fan',
    description: 'Land on tails 100 times.',
    icon: '🌟',
    unlockedAt: null,
  },
  {
    id: 'streak_5',
    title: 'Hot Streak',
    description: 'Get the same side 5 times in a row.',
    icon: '🔥',
    unlockedAt: null,
  },
  {
    id: 'streak_10',
    title: 'Against the Odds',
    description: 'Get the same side 10 times in a row. About a 1 in 500 chance from any given flip.',
    icon: '🚀',
    unlockedAt: null,
  },
  {
    id: 'experiment_100',
    title: 'Curious',
    description: 'Run a simulation of 100 flips or more.',
    icon: '🔬',
    unlockedAt: null,
  },
  {
    id: 'experiment_1000',
    title: 'Big Data',
    description: 'Run a simulation of 1,000 flips or more.',
    icon: '📊',
    unlockedAt: null,
  },
  {
    id: 'daily_champion',
    title: 'Daily player',
    description: 'Finish a daily challenge.',
    icon: '📅',
    unlockedAt: null,
  },
  {
    id: 'prediction_first',
    title: 'Lucky guess',
    description: 'Call a flip correctly.',
    icon: '🔮',
    unlockedAt: null,
  },
  {
    id: 'prediction_10',
    title: 'On a roll',
    description: 'Call 10 flips correctly.',
    icon: '🎯',
    unlockedAt: null,
  },
];

/**
 * Checks all conditions and returns any newly unlocked achievement IDs.
 */
export function evaluateAchievements(params: {
  unlockedMap: Record<string, number>;
  overallStats: OverallStats;
  experiments: BatchExperimentRecord[];
  predictionStats: PredictionState;
  dailyChallenge?: DailyChallengeState;
}): string[] {
  const { unlockedMap, overallStats, experiments, predictionStats, dailyChallenge } = params;
  const newlyUnlocked: string[] = [];

  function check(id: string, condition: boolean) {
    if (condition && !unlockedMap[id]) {
      newlyUnlocked.push(id);
    }
  }

  check('first_flip', overallStats.totalFlips >= 1);
  check('flips_10', overallStats.totalFlips >= 10);
  check('flips_100', overallStats.totalFlips >= 100);
  check('flips_1000', overallStats.totalFlips >= 1000);
  check('flips_10000', overallStats.totalFlips >= 10000);

  check('heads_100', overallStats.heads >= 100);
  check('tails_100', overallStats.tails >= 100);

  check('streak_5', overallStats.streak.longestOverallStreak >= 5);
  check('streak_10', overallStats.streak.longestOverallStreak >= 10);

  check(
    'experiment_100',
    experiments.some((e) => e.totalFlips >= 100)
  );
  check(
    'experiment_1000',
    experiments.some((e) => e.totalFlips >= 1000)
  );

  check('daily_champion', Boolean(dailyChallenge?.isCompleted));

  check('prediction_first', predictionStats.correctPredictions >= 1);
  check('prediction_10', predictionStats.correctPredictions >= 10);

  return newlyUnlocked;
}
