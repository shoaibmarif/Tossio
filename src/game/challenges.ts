import type {
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
      goalText: 'Flip 50 times and observe your 50/50 balance.',
    },
    {
      type: 'streak',
      target: 5,
      goalText: 'Achieve a streak of at least 5 in a row today.',
    },
    {
      type: 'flips',
      target: 100,
      goalText: 'Complete 100 total flips today to test the Law of Large Numbers.',
    },
    {
      type: 'speed',
      target: 25,
      goalText: 'Perform 25 quick consecutive flips today.',
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
 * All Application Achievements
 */
export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_flip',
    title: 'First Toss',
    description: 'Flip your very first coin.',
    icon: '🪙',
    unlockedAt: null,
  },
  {
    id: 'flips_10',
    title: 'Getting Started',
    description: 'Complete 10 total flips.',
    icon: '✨',
    unlockedAt: null,
  },
  {
    id: 'flips_100',
    title: 'Centurion',
    description: 'Complete 100 total flips.',
    icon: '💯',
    unlockedAt: null,
  },
  {
    id: 'flips_1000',
    title: 'Probability Enthusiast',
    description: 'Reach 1,000 total flips.',
    icon: '⚡',
    unlockedAt: null,
  },
  {
    id: 'flips_10000',
    title: 'Grand Statistician',
    description: 'Achieve 10,000 flips across your journey.',
    icon: '🏛️',
    unlockedAt: null,
  },
  {
    id: 'heads_100',
    title: 'Heads Master',
    description: 'Accumulate 100 Heads results.',
    icon: '👑',
    unlockedAt: null,
  },
  {
    id: 'tails_100',
    title: 'Tails Master',
    description: 'Accumulate 100 Tails results.',
    icon: '🌟',
    unlockedAt: null,
  },
  {
    id: 'streak_5',
    title: 'Hot Streak',
    description: 'Hit a streak of 5 on either side.',
    icon: '🔥',
    unlockedAt: null,
  },
  {
    id: 'streak_10',
    title: 'Against the Odds',
    description: 'Hit a streak of 10 in a row (1 in 1,024 chance!).',
    icon: '🚀',
    unlockedAt: null,
  },
  {
    id: 'experiment_100',
    title: 'Lab Researcher',
    description: 'Run a batch experiment of at least 100 flips.',
    icon: '🔬',
    unlockedAt: null,
  },
  {
    id: 'experiment_1000',
    title: 'Big Data',
    description: 'Run a batch experiment of 1,000 or more flips.',
    icon: '📊',
    unlockedAt: null,
  },
  {
    id: 'daily_champion',
    title: 'Daily Challenger',
    description: 'Complete a Daily Challenge.',
    icon: '📅',
    unlockedAt: null,
  },
  {
    id: 'prediction_first',
    title: 'Mind Reader',
    description: 'Make your first correct prediction.',
    icon: '🔮',
    unlockedAt: null,
  },
  {
    id: 'prediction_10',
    title: 'Seer',
    description: 'Make 10 correct predictions in Prediction Mode.',
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
