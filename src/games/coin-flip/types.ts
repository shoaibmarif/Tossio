export type CoinSide = 'heads' | 'tails';

export type CoinType = 'standard' | 'custom';

export interface FlipResult {
  id: number;
  result: CoinSide;
  timestamp: number;
}

export interface FlipStatistics {
  totalFlips: number;
  heads: number;
  tails: number;
  headsPercentage: number;
  tailsPercentage: number;
}

export interface BatchFlipResult {
  heads: number;
  tails: number;
  total: number;
}

export interface CoinFlipState {
  currentResult: CoinSide | null;
  isFlipping: boolean;
  statistics: FlipStatistics;
  history: FlipResult[];
  coinType: CoinType;
}
