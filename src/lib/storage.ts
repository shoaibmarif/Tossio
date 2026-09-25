/**
 * Type-safe localStorage wrapper with graceful error handling.
 * Never throws — returns defaults on failure.
 */

const STORAGE_PREFIX = 'coinflip_';

function getKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function storageGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(getKey(key));
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(getKey(key), JSON.stringify(value));
  } catch {
    // Silently fail — quota exceeded or private browsing
  }
}

export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(getKey(key));
  } catch {
    // Silently fail
  }
}

export function storageClearAll(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Silently fail
  }
}
