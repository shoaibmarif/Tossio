import type { AppStorageV1 } from '../types';
import { STORAGE_KEY_V1, STORAGE_LEGACY_KEYS } from './storageKeys';
import { DEFAULT_APP_STORAGE } from './storageSchema';

/**
 * Safely loads data from localStorage with full schema validation and fallback.
 */
export function loadAppData(): AppStorageV1 {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { ...DEFAULT_APP_STORAGE };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_V1);
    if (!raw) {
      // Check for legacy migration
      return migrateLegacyData();
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_APP_STORAGE };
    }

    // Deep merge with defaults to ensure all required fields exist
    return {
      version: 'coinflip:v1',
      settings: {
        ...DEFAULT_APP_STORAGE.settings,
        ...(parsed.settings || {}),
        customization: {
          ...DEFAULT_APP_STORAGE.settings.customization,
          ...(parsed.settings?.customization || {}),
        },
      },
      overallStats: {
        ...DEFAULT_APP_STORAGE.overallStats,
        ...(parsed.overallStats || {}),
        streak: {
          ...DEFAULT_APP_STORAGE.overallStats.streak,
          ...(parsed.overallStats?.streak || {}),
        },
      },
      history: Array.isArray(parsed.history) ? parsed.history.slice(0, 200) : [],
      experiments: Array.isArray(parsed.experiments) ? parsed.experiments.slice(0, 100) : [],
      achievements:
        parsed.achievements && typeof parsed.achievements === 'object' ? parsed.achievements : {},
      predictionStats: {
        ...DEFAULT_APP_STORAGE.predictionStats,
        ...(parsed.predictionStats || {}),
      },
      dailyChallengeProgress:
        parsed.dailyChallengeProgress && typeof parsed.dailyChallengeProgress === 'object'
          ? parsed.dailyChallengeProgress
          : {},
      decisionOptions: {
        ...DEFAULT_APP_STORAGE.decisionOptions,
        ...(parsed.decisionOptions || {}),
      },
    };
  } catch (err) {
    console.warn('Failed to load local storage, using defaults:', err);
    return { ...DEFAULT_APP_STORAGE };
  }
}

/**
 * Safely persists app data to localStorage.
 */
export function saveAppData(data: AppStorageV1): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    const payload = JSON.stringify(data);
    window.localStorage.setItem(STORAGE_KEY_V1, payload);
  } catch (err) {
    // Handle storage quota exceeded or disabled storage gracefully
    console.warn('Could not persist data to localStorage:', err);
  }
}

/**
 * Checks for and migrates older legacy keys if available.
 */
function migrateLegacyData(): AppStorageV1 {
  const result: AppStorageV1 = { ...DEFAULT_APP_STORAGE };

  try {
    const legacyStatsRaw = window.localStorage.getItem('coin_flip_stats');
    if (legacyStatsRaw) {
      const stats = JSON.parse(legacyStatsRaw);
      if (stats && typeof stats.totalFlips === 'number') {
        result.overallStats.totalFlips = stats.totalFlips;
        result.overallStats.heads = stats.heads || 0;
        result.overallStats.tails = stats.tails || 0;
        result.overallStats.headsPercentage = stats.headsPercentage || 0;
        result.overallStats.tailsPercentage = stats.tailsPercentage || 0;
      }
    }

    const legacyHistoryRaw = window.localStorage.getItem('coin_flip_history');
    if (legacyHistoryRaw) {
      const history = JSON.parse(legacyHistoryRaw);
      if (Array.isArray(history)) {
        result.history = history.slice(0, 50).map((item, idx) => ({
          id: `legacy-${idx}`,
          flipNumber: history.length - idx,
          result: item.result || 'heads',
          timestamp: item.timestamp || Date.now(),
        }));
      }
    }

    // Clean up legacy keys
    STORAGE_LEGACY_KEYS.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // Ignore migration parsing errors
  }

  return result;
}
