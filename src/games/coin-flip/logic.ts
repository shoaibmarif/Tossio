import type { CoinSide, FlipResult, FlipStatistics, BatchFlipResult } from './types';
import { getSecureRandomBoolean, getSecureRandomBooleans } from '../../lib/random';

export function flipCoin(): CoinSide {
  return getSecureRandomBoolean() ? 'heads' : 'tails';
}

export function batchFlipCoins(count: number): BatchFlipResult {
  const results = getSecureRandomBooleans(count);
  let heads = 0;
  for (const r of results) {
    if (r) heads++;
  }
  return {
    heads,
    tails: count - heads,
    total: count,
  };
}

export function calculateStatistics(heads: number, tails: number): FlipStatistics {
  const totalFlips = heads + tails;
  return {
    totalFlips,
    heads,
    tails,
    headsPercentage: totalFlips === 0 ? 0 : Math.round((heads / totalFlips) * 1000) / 10,
    tailsPercentage: totalFlips === 0 ? 0 : Math.round((tails / totalFlips) * 1000) / 10,
  };
}

export function addToHistory(
  history: FlipResult[],
  result: CoinSide,
  maxSize: number = 50
): FlipResult[] {
  const newEntry: FlipResult = {
    id: Date.now() + Math.random(),
    result,
    timestamp: Date.now(),
  };
  const updated = [newEntry, ...history];
  return updated.length > maxSize ? updated.slice(0, maxSize) : updated;
}
