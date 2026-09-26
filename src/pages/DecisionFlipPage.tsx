import React from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { DecisionMaker } from '../components/tools/DecisionMaker';
import { Coin } from '../components/coin/Coin';
import { SEOHead } from '../components/seo/SEOHead';
import { Shuffle } from 'lucide-react';

export const DecisionFlipPage: React.FC = () => {
  const {
    state,
    coinState,
    latestResult,
    flipCoin,
    updateDecisionOptions,
  } = useCoinFlipGame();

  const decisionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Decision Coin Flip – Choose Between Two Options',
    description:
      'Stuck between two choices? Flip a coin online to randomly decide between Option A and Option B. Completely private, fast, and unbiased.',
    applicationCategory: 'UtilityApplication',
  };

  return (
    <>
      <SEOHead
        title="Decision Coin Flip – Flip a Coin to Choose Between Two Options"
        description="Can't decide? Assign Option A to Heads and Option B to Tails. Flip a coin online for a fast, completely unbiased decision."
        canonicalPath="/decision-coin-flip"
        jsonLd={decisionJsonLd}
      />

      <div className="space-y-10 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Unbiased 50/50 Decision Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <Shuffle className="w-8 h-8 text-purple-500" />
            Decision Coin Flip
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Break analysis paralysis. Enter two choices, flip the coin, and let unbiased probability make the call.
          </p>
        </div>

        {/* 3D Coin Animation Display */}
        <div className="flex flex-col items-center">
          <Coin
            coinState={coinState}
            latestResult={latestResult}
            settings={state.settings}
            onFlip={() => flipCoin({ isDecision: true })}
          />
        </div>

        {/* Decision Maker Controls */}
        <DecisionMaker
          decision={state.decisionOptions}
          onUpdate={updateDecisionOptions}
          onFlipDecision={() => flipCoin({ isDecision: true })}
          isFlipping={coinState === 'FLIPPING'}
        />
      </div>
    </>
  );
};
