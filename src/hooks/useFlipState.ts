import { useState, useCallback, useRef } from 'react';
import type { CoinSide, FlipResult, CoinType } from '../games/coin-flip/types';
import { flipCoin, batchFlipCoins, calculateStatistics, addToHistory } from '../games/coin-flip/logic';
import { storageGet, storageSet, storageClearAll } from '../lib/storage';
import { trackEvent } from '../lib/analytics';

interface FlipState {
  currentResult: CoinSide | null;
  isFlipping: boolean;
  heads: number;
  tails: number;
  history: FlipResult[];
  coinType: CoinType;
  lastBatchResult: { heads: number; tails: number; total: number } | null;
}

const HISTORY_MAX = 50;

function loadInitialState(): FlipState {
  return {
    currentResult: storageGet<CoinSide | null>('currentResult', null),
    isFlipping: false,
    heads: storageGet<number>('heads', 0),
    tails: storageGet<number>('tails', 0),
    history: storageGet<FlipResult[]>('history', []),
    coinType: storageGet<CoinType>('coinType', 'standard'),
    lastBatchResult: null,
  };
}

export function useFlipState() {
  const [state, setState] = useState<FlipState>(loadInitialState);
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistState = useCallback((updates: Partial<FlipState>) => {
    if ('heads' in updates) storageSet('heads', updates.heads);
    if ('tails' in updates) storageSet('tails', updates.tails);
    if ('history' in updates) storageSet('history', updates.history);
    if ('currentResult' in updates) storageSet('currentResult', updates.currentResult);
    if ('coinType' in updates) storageSet('coinType', updates.coinType);
  }, []);

  const doFlip = useCallback((reducedMotion: boolean) => {
    if (state.isFlipping) return;

    setState((prev) => ({ ...prev, isFlipping: true }));

    const result = flipCoin();
    const delay = reducedMotion ? 50 : 800;

    flipTimeoutRef.current = setTimeout(() => {
      setState((prev) => {
        const newHeads = prev.heads + (result === 'heads' ? 1 : 0);
        const newTails = prev.tails + (result === 'tails' ? 1 : 0);
        const newHistory = addToHistory(prev.history, result, HISTORY_MAX);
        const updates = {
          currentResult: result,
          isFlipping: false,
          heads: newHeads,
          tails: newTails,
          history: newHistory,
        };
        persistState(updates);
        return { ...prev, ...updates };
      });
      trackEvent('coin_flip', { result });
    }, delay);
  }, [state.isFlipping, persistState]);

  const doBatchFlip = useCallback((count: number) => {
    const batchResult = batchFlipCoins(count);
    setState((prev) => {
      const newHeads = prev.heads + batchResult.heads;
      const newTails = prev.tails + batchResult.tails;
      const updates = {
        heads: newHeads,
        tails: newTails,
        lastBatchResult: batchResult,
      };
      persistState(updates);
      return { ...prev, ...updates };
    });
    trackEvent('batch_flip', { count, heads: batchResult.heads, tails: batchResult.tails });
  }, [persistState]);

  const resetStats = useCallback(() => {
    storageClearAll();
    setState({
      currentResult: null,
      isFlipping: false,
      heads: 0,
      tails: 0,
      history: [],
      coinType: 'standard',
      lastBatchResult: null,
    });
    trackEvent('statistics_reset');
  }, []);

  const clearHistory = useCallback(() => {
    setState((prev) => {
      const updates = { history: [] as FlipResult[] };
      persistState(updates);
      return { ...prev, ...updates };
    });
    trackEvent('history_cleared');
  }, [persistState]);

  const setCoinType = useCallback((coinType: CoinType) => {
    setState((prev) => {
      persistState({ coinType });
      return { ...prev, coinType };
    });
  }, [persistState]);

  const statistics = calculateStatistics(state.heads, state.tails);

  return {
    currentResult: state.currentResult,
    isFlipping: state.isFlipping,
    statistics,
    history: state.history,
    coinType: state.coinType,
    lastBatchResult: state.lastBatchResult,
    flip: doFlip,
    batchFlip: doBatchFlip,
    resetStats,
    clearHistory,
    setCoinType,
  };
}
