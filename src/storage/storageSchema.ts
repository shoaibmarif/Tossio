import type { AppStorageV1 } from '../types';
import { INITIAL_OVERALL_STATS } from '../game/statistics';

export const DEFAULT_APP_STORAGE: AppStorageV1 = {
  version: 'coinflip:v1',
  settings: {
    theme: 'light',
    soundEnabled: true,
    hapticsEnabled: true,
    animationMode: 'on',
    animationPreset: 'normal',
    customization: {
      headsLabel: 'HEADS',
      tailsLabel: 'TAILS',
      headsSymbol: 'H',
      tailsSymbol: 'T',
      style: 'gold',
    },
  },
  overallStats: INITIAL_OVERALL_STATS,
  history: [],
  experiments: [],
  achievements: {},
  predictionStats: {
    totalPredictions: 0,
    correctPredictions: 0,
    incorrectPredictions: 0,
    currentStreak: 0,
    bestStreak: 0,
    score: 0,
    selectedPrediction: null,
  },
  dailyChallengeProgress: {},
  decisionOptions: {
    optionA: '',
    optionB: '',
    lastSelected: null,
    lastFlipResult: null,
  },
};
