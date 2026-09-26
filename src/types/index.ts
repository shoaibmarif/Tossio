export type CoinSide = 'heads' | 'tails';

export type CoinState = 'IDLE' | 'FLIPPING' | 'RESULT' | 'PAUSED' | 'DISABLED';

export type AnimationPreset = 'fast' | 'normal' | 'slow';
export type AnimationMode = 'on' | 'reduced' | 'off';

export type CoinStyle = 'gold' | 'silver' | 'bronze' | 'cyber';

export interface CoinCustomization {
  headsLabel: string;
  tailsLabel: string;
  headsSymbol: string;
  tailsSymbol: string;
  style: CoinStyle;
}

export interface FlipRecord {
  id: string;
  flipNumber: number;
  result: CoinSide;
  timestamp: number;
  prediction?: CoinSide;
  predictionWon?: boolean;
}

export interface StreakState {
  currentStreak: number;
  currentSide: CoinSide | null;
  longestHeadsStreak: number;
  longestTailsStreak: number;
  longestOverallStreak: number;
}

export interface OverallStats {
  totalFlips: number;
  heads: number;
  tails: number;
  headsPercentage: number;
  tailsPercentage: number;
  streak: StreakState;
}

export interface BatchExperimentRecord {
  id: string;
  date: string;
  timestamp: number;
  totalFlips: number;
  heads: number;
  tails: number;
  headsPercentage: number;
  tailsPercentage: number;
  headsDiff: number; // Difference from 50%
  tailsDiff: number;
  longestHeadsStreak: number;
  longestTailsStreak: number;
  isWeighted?: boolean;
  expectedHeadsPct?: number;
  expectedTailsPct?: number;
}

export interface PredictionState {
  totalPredictions: number;
  correctPredictions: number;
  incorrectPredictions: number;
  currentStreak: number;
  bestStreak: number;
  score: number;
  selectedPrediction: CoinSide | null;
}

export interface DailyChallengeState {
  dateString: string; // YYYY-MM-DD
  targetFlips: number;
  challengeType: 'streak' | 'balance' | 'speed' | 'flips';
  targetGoalText: string;
  progress: number;
  isCompleted: boolean;
  completedAt?: number;
  streakRecord: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
}

export interface DecisionOptions {
  optionA: string;
  optionB: string;
  lastSelected: 'A' | 'B' | null;
  lastFlipResult: CoinSide | null;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  animationMode: AnimationMode;
  animationPreset: AnimationPreset;
  customization: CoinCustomization;
}

export interface AppStorageV1 {
  version: 'coinflip:v1';
  settings: UserSettings;
  overallStats: OverallStats;
  history: FlipRecord[];
  experiments: BatchExperimentRecord[];
  achievements: Record<string, number>; // id -> timestamp
  predictionStats: PredictionState;
  dailyChallengeProgress: Record<string, DailyChallengeState>; // dateString -> state
  decisionOptions: DecisionOptions;
}
