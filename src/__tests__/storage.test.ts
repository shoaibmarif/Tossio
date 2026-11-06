import { describe, it, expect, beforeEach } from 'vitest';
import { loadAppData, saveAppData } from '../storage/persistence';
import { STORAGE_KEY_V1 } from '../storage/storageKeys';
import { DEFAULT_APP_STORAGE } from '../storage/storageSchema';

describe('Storage Persistence & Resilience', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('loads default schema when storage is completely empty', () => {
    const data = loadAppData();
    expect(data.version).toBe('coinflip:v1');
    expect(data.overallStats.totalFlips).toBe(0);
    expect(data.settings.theme).toBe('light');
  });

  it('survives corrupted JSON without crashing', () => {
    window.localStorage.setItem(STORAGE_KEY_V1, '{ invalid JSON malformed !!! }');
    const data = loadAppData();
    expect(data).toBeDefined();
    expect(data.version).toBe('coinflip:v1');
    expect(data.overallStats.totalFlips).toBe(0);
  });

  it('saves and loads valid data accurately', () => {
    const toSave = {
      ...DEFAULT_APP_STORAGE,
      overallStats: {
        ...DEFAULT_APP_STORAGE.overallStats,
        totalFlips: 42,
        heads: 22,
        tails: 20,
      },
    };

    saveAppData(toSave);
    const loaded = loadAppData();
    expect(loaded.overallStats.totalFlips).toBe(42);
    expect(loaded.overallStats.heads).toBe(22);
    expect(loaded.overallStats.tails).toBe(20);
  });

  it('merges missing fields gracefully when older schema objects are loaded', () => {
    // Partial object without customization or predictionStats
    const partialData = {
      version: 'coinflip:v1',
      overallStats: {
        totalFlips: 5,
        heads: 3,
        tails: 2,
        headsPercentage: 60,
        tailsPercentage: 40,
        streak: {
          currentStreak: 1,
          currentSide: 'heads',
          longestHeadsStreak: 2,
          longestTailsStreak: 1,
          longestOverallStreak: 2,
        },
      },
    };

    window.localStorage.setItem(STORAGE_KEY_V1, JSON.stringify(partialData));
    const loaded = loadAppData();

    expect(loaded.overallStats.totalFlips).toBe(5);
    // Filled in missing fields:
    expect(loaded.settings.customization.headsLabel).toBe('HEADS');
    expect(loaded.predictionStats.totalPredictions).toBe(0);
    expect(Array.isArray(loaded.history)).toBe(true);
  });
});
