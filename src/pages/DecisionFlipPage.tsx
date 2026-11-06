import React from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { DecisionMaker } from '../components/tools/DecisionMaker';
import { Coin } from '../components/coin/Coin';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { appJsonLd } from '../seo/head';
import { getRouteMeta } from '../seo/routes';

const ROUTE = getRouteMeta('/decision-coin-flip')!;

export const DecisionFlipPage: React.FC = () => {
  const {
    state,
    coinState,
    latestResult,
    flipCoin,
    updateDecisionOptions,
  } = useCoinFlipGame();


  return (
    <>
      <SeoMeta canonicalPath="/decision-coin-flip" structuredData={appJsonLd('/decision-coin-flip', ROUTE.title, ROUTE.description)} />

      <div className="space-y-10 max-w-3xl mx-auto">
        <PageHeader title="Decision coin flip" intro="Stuck between two options? Type them in, flip, and the coin picks one. Heads is the first option, tails is the second." />

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
