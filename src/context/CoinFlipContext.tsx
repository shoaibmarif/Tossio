import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type {
  AppStorageV1,
  CoinSide,
  CoinState,
  FlipRecord,
  BatchExperimentRecord,
  UserSettings,
  DecisionOptions,
} from '../types';
import { loadAppData, saveAppData } from '../storage/persistence';
import { flipFairCoin } from '../game/random';
import { updateStreak } from '../game/streaks';
import { calculateConsistentPercentages, INITIAL_OVERALL_STATS } from '../game/statistics';
import { runBatchExperiment, type RunBatchOptions } from '../game/experiments';
import {
  getTodayDateString,
  generateDailyChallenge,
  advanceDailyChallenge,
  evaluateAchievements,
  ACHIEVEMENTS_LIST,
} from '../game/challenges';
import { soundFx } from '../game/sound';
import { useTheme } from '../hooks/useTheme';

interface CoinFlipContextType {
  state: AppStorageV1;
  coinState: CoinState;
  latestResult: CoinSide | null;
  latestFlipNumber: number;
  screenReaderAnnouncement: string;
  newAchievementUnlocked: string | null;
  dismissAchievementToast: () => void;
  flipCoin: (options?: { isDecision?: boolean }) => Promise<CoinSide>;
  runExperiment: (options: RunBatchOptions) => BatchExperimentRecord;
  deleteExperiment: (id: string) => void;
  clearAllExperiments: () => void;
  clearHistory: () => void;
  resetAllStats: () => void;
  setPrediction: (side: CoinSide | null) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateDecisionOptions: (options: Partial<DecisionOptions>) => void;
}

const CoinFlipContext = createContext<CoinFlipContextType | null>(null);

export const CoinFlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppStorageV1>(() => loadAppData());
  const [coinState, setCoinState] = useState<CoinState>('IDLE');
  const [latestResult, setLatestResult] = useState<CoinSide | null>(null);
  const [latestFlipNumber, setLatestFlipNumber] = useState<number>(0);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>('');
  const [newAchievementUnlocked, setNewAchievementUnlocked] = useState<string | null>(null);

  // Keep a ref to data to avoid stale closures in callbacks
  const dataRef = useRef(data);
  dataRef.current = data;

  const isFlippingRef = useRef(false);

  // Apply active theme
  useTheme(data.settings.theme);

  // Sync sound manager enabled flag
  useEffect(() => {
    soundFx.enabled = data.settings.soundEnabled;
  }, [data.settings.soundEnabled]);

  // Persist state changes
  useEffect(() => {
    saveAppData(data);
  }, [data]);

  // Initialize today's daily challenge if missing
  useEffect(() => {
    const today = getTodayDateString();
    if (!data.dailyChallengeProgress[today]) {
      const newChallenge = generateDailyChallenge(today);
      setData((prev) => ({
        ...prev,
        dailyChallengeProgress: {
          ...prev.dailyChallengeProgress,
          [today]: newChallenge,
        },
      }));
    }
  }, [data.dailyChallengeProgress]);

  // Handle achievement dismissal
  const dismissAchievementToast = useCallback(() => {
    setNewAchievementUnlocked(null);
  }, []);

  // Update Settings
  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
        customization: {
          ...prev.settings.customization,
          ...(newSettings.customization || {}),
        },
      },
    }));
  }, []);

  // Update Decision Options
  const updateDecisionOptions = useCallback((options: Partial<DecisionOptions>) => {
    setData((prev) => ({
      ...prev,
      decisionOptions: {
        ...prev.decisionOptions,
        ...options,
      },
    }));
  }, []);

  // Set Prediction Side
  const setPrediction = useCallback((side: CoinSide | null) => {
    setData((prev) => ({
      ...prev,
      predictionStats: {
        ...prev.predictionStats,
        selectedPrediction: side,
      },
    }));
  }, []);

  // Perform single flip
  const flipCoin = useCallback(
    async (options?: { isDecision?: boolean }): Promise<CoinSide> => {
      if (isFlippingRef.current) {
        return latestResult || 'heads';
      }

      isFlippingRef.current = true;
      setCoinState('FLIPPING');

      // 1. Determine outcome immediately from crypto random engine
      const outcome = flipFairCoin();
      const nextFlipNum = dataRef.current.overallStats.totalFlips + 1;

      // Play flip sound
      soundFx.playFlipStart();

      // Calculate animation duration
      const mode = dataRef.current.settings.animationMode;
      let durationMs = 750;
      if (mode === 'off') {
        durationMs = 20;
      } else if (mode === 'reduced') {
        durationMs = 250;
      } else {
        const preset = dataRef.current.settings.animationPreset;
        durationMs = preset === 'fast' ? 400 : preset === 'slow' ? 1200 : 750;
      }

      // Schedule spin tick sound in the middle if animation is long enough
      if (durationMs > 300) {
        setTimeout(() => {
          soundFx.playSpinTick();
        }, durationMs / 2);
      }

      // Wait for visual animation to land
      await new Promise((resolve) => setTimeout(resolve, durationMs));

      // 2. Play landing sound
      soundFx.playCoinLanding();

      // 3. Update state, statistics, streaks, history, predictions, achievements
      const prevData = dataRef.current;
      const newStreak = updateStreak(prevData.overallStats.streak, outcome);
      const newHeads = prevData.overallStats.heads + (outcome === 'heads' ? 1 : 0);
      const newTails = prevData.overallStats.tails + (outcome === 'tails' ? 1 : 0);
      const { headsPercentage, tailsPercentage } = calculateConsistentPercentages(newHeads, newTails);

      // Prediction scoring if active
      let predStats = { ...prevData.predictionStats };
      let predictionWon: boolean | undefined = undefined;

      if (predStats.selectedPrediction) {
        predictionWon = predStats.selectedPrediction === outcome;
        const newTotalPred = predStats.totalPredictions + 1;
        const newCorrect = predStats.correctPredictions + (predictionWon ? 1 : 0);
        const newIncorrect = predStats.incorrectPredictions + (predictionWon ? 0 : 1);
        const newCurStreak = predictionWon ? predStats.currentStreak + 1 : 0;
        const newBestStreak = Math.max(predStats.bestStreak, newCurStreak);

        // Scoring rules: +1 per win, streak bonus at 3, 5, 10
        let scoreGain = predictionWon ? 1 : 0;
        if (newCurStreak === 3) scoreGain += 2;
        if (newCurStreak === 5) scoreGain += 5;
        if (newCurStreak === 10) scoreGain += 10;

        predStats = {
          totalPredictions: newTotalPred,
          correctPredictions: newCorrect,
          incorrectPredictions: newIncorrect,
          currentStreak: newCurStreak,
          bestStreak: newBestStreak,
          score: predStats.score + scoreGain,
          selectedPrediction: null, // Clear after flip
        };

        if (predictionWon) {
          soundFx.playSuccessFanfare();
        }
      }

      // Daily Challenge progress
      const today = getTodayDateString();
      const currentChallenge = prevData.dailyChallengeProgress[today] || generateDailyChallenge(today);
      const updatedChallenge = advanceDailyChallenge(currentChallenge, outcome);
      if (updatedChallenge.isCompleted && !currentChallenge.isCompleted) {
        soundFx.playAchievementFanfare();
      }

      // History record
      const historyItem: FlipRecord = {
        id: `flip-${Date.now()}-${nextFlipNum}`,
        flipNumber: nextFlipNum,
        result: outcome,
        timestamp: Date.now(),
        prediction: prevData.predictionStats.selectedPrediction || undefined,
        predictionWon,
      };

      const updatedHistory = [historyItem, ...prevData.history].slice(0, 200);

      const nextOverallStats = {
        totalFlips: nextFlipNum,
        heads: newHeads,
        tails: newTails,
        headsPercentage,
        tailsPercentage,
        streak: newStreak,
      };

      // Decision update if in decision mode
      let nextDecision = { ...prevData.decisionOptions };
      if (options?.isDecision) {
        nextDecision = {
          ...nextDecision,
          lastFlipResult: outcome,
          lastSelected: outcome === 'heads' ? 'A' : 'B',
        };
      }

      // Check achievements
      const newlyUnlocked = evaluateAchievements({
        unlockedMap: prevData.achievements,
        overallStats: nextOverallStats,
        experiments: prevData.experiments,
        predictionStats: predStats,
        dailyChallenge: updatedChallenge,
      });

      const nextAchievements = { ...prevData.achievements };
      if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach((id) => {
          nextAchievements[id] = Date.now();
        });
        const firstAch = ACHIEVEMENTS_LIST.find((a) => a.id === newlyUnlocked[0]);
        if (firstAch) {
          setNewAchievementUnlocked(firstAch.title);
          soundFx.playAchievementFanfare();
        }
      }

      // Commit state
      setData((prev) => ({
        ...prev,
        overallStats: nextOverallStats,
        history: updatedHistory,
        predictionStats: predStats,
        dailyChallengeProgress: {
          ...prev.dailyChallengeProgress,
          [today]: updatedChallenge,
        },
        decisionOptions: nextDecision,
        achievements: nextAchievements,
      }));

      setLatestResult(outcome);
      setLatestFlipNumber(nextFlipNum);
      setCoinState('RESULT');
      setScreenReaderAnnouncement(`Coin result: ${outcome === 'heads' ? 'Heads' : 'Tails'}. Flip number ${nextFlipNum}.`);

      isFlippingRef.current = false;
      return outcome;
    },
    [latestResult]
  );

  // Run Batch Experiment
  const runExperiment = useCallback(
    (options: RunBatchOptions): BatchExperimentRecord => {
      const exp = runBatchExperiment(options);
      const prev = dataRef.current;
      const nextExperiments = [exp, ...prev.experiments].slice(0, 100);
      const newlyUnlocked = evaluateAchievements({
        unlockedMap: prev.achievements,
        overallStats: prev.overallStats,
        experiments: nextExperiments,
        predictionStats: prev.predictionStats,
      });
      const now = Date.now();

      // Pure state update; sounds and toasts happen outside it.
      setData((cur) => {
        const achievements = { ...cur.achievements };
        newlyUnlocked.forEach((id) => {
          if (!achievements[id]) achievements[id] = now;
        });
        return { ...cur, experiments: [exp, ...cur.experiments].slice(0, 100), achievements };
      });

      if (newlyUnlocked.length > 0) {
        const firstAch = ACHIEVEMENTS_LIST.find((a) => a.id === newlyUnlocked[0]);
        if (firstAch) {
          setNewAchievementUnlocked(firstAch.title);
          soundFx.playAchievementFanfare();
        }
      }

      soundFx.playSuccessFanfare();
      return exp;
    },
    []
  );

  const deleteExperiment = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experiments: prev.experiments.filter((e) => e.id !== id),
    }));
  }, []);

  const clearAllExperiments = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experiments: [],
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setData((prev) => ({
      ...prev,
      history: [],
    }));
  }, []);

  const resetAllStats = useCallback(() => {
    setData((prev) => ({
      ...prev,
      overallStats: INITIAL_OVERALL_STATS,
      history: [],
    }));
    setLatestResult(null);
    setLatestFlipNumber(0);
    setCoinState('IDLE');
  }, []);

  return (
    <CoinFlipContext.Provider
      value={{
        state: data,
        coinState,
        latestResult,
        latestFlipNumber,
        screenReaderAnnouncement,
        newAchievementUnlocked,
        dismissAchievementToast,
        flipCoin,
        runExperiment,
        deleteExperiment,
        clearAllExperiments,
        clearHistory,
        resetAllStats,
        setPrediction,
        updateSettings,
        updateDecisionOptions,
      }}
    >
      {children}
    </CoinFlipContext.Provider>
  );
};

export function useCoinFlipGame() {
  const ctx = useContext(CoinFlipContext);
  if (!ctx) {
    throw new Error('useCoinFlipGame must be used within CoinFlipProvider');
  }
  return ctx;
}
