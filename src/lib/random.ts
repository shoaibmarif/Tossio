/**
 * Cryptographically secure random number generation using Web Crypto API.
 * Falls back to Math.random() only if crypto is unavailable.
 */

export function getSecureRandomBoolean(): boolean {
  try {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % 2 === 0;
  } catch {
    return Math.random() < 0.5;
  }
}

export function getSecureRandomBooleans(count: number): boolean[] {
  const results: boolean[] = new Array(count);
  try {
    // Process in chunks of 65536 (max for getRandomValues)
    const chunkSize = 16384; // Uint32Array elements (each gives 32 bits)
    let remaining = count;
    let offset = 0;

    while (remaining > 0) {
      const batchSize = Math.min(remaining, chunkSize * 32);
      const arrayLen = Math.ceil(batchSize / 32);
      const array = new Uint32Array(arrayLen);
      crypto.getRandomValues(array);

      for (let i = 0; i < arrayLen && offset < count; i++) {
        const val = array[i];
        for (let bit = 0; bit < 32 && offset < count; bit++) {
          results[offset] = ((val >>> bit) & 1) === 1;
          offset++;
        }
      }
      remaining = count - offset;
    }
  } catch {
    for (let i = 0; i < count; i++) {
      results[i] = Math.random() < 0.5;
    }
  }
  return results;
}
