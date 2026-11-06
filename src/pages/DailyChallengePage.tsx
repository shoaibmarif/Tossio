import React from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { DailyChallengeCard } from '../components/game/DailyChallengeCard';
import { PredictionGameCard } from '../components/game/PredictionGameCard';
import { Coin } from '../components/coin/Coin';
import { CoinResult } from '../components/coin/CoinResult';
import { FlipControls } from '../components/flip/FlipControls';
import { SeoMeta } from '../components/seo/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { appJsonLd } from '../seo/head';
import { getRouteMeta } from '../seo/routes';
import { getTodayDateString, generateDailyChallenge } from '../game/challenges';

const ROUTE = getRouteMeta('/daily-coin-flip')!;

export const DailyChallengePage: React.FC = () => {
  const {
    state,
    coinState,
    latestResult,
    latestFlipNumber,
    flipCoin,
    runExperiment,
    resetAllStats,
    setPrediction,
    updateSettings,
  } = useCoinFlipGame();

  const today = getTodayDateString();
  const currentChallenge =
    state.dailyChallengeProgress[today] || generateDailyChallenge(today);


  return (
    <>
      <SeoMeta canonicalPath="/daily-coin-flip" structuredData={appJsonLd('/daily-coin-flip', ROUTE.title, ROUTE.description)} />

      <div className="space-y-10 max-w-3xl mx-auto">
        <PageHeader title="Daily coin flip challenge" intro="Everyone gets the same goal each day. Below it, the prediction game: call heads or tails before you flip and see how long you can keep guessing right." />

        {/* Daily Deterministic Challenge Card */}
        <DailyChallengeCard challenge={currentChallenge} />

        {/* Interactive Prediction Game Arena */}
        <div className="flex flex-col items-center gap-6">
          <Coin
            coinState={coinState}
            latestResult={latestResult}
            settings={state.settings}
            onFlip={() => flipCoin()}
          />

          <CoinResult
            coinState={coinState}
            latestResult={latestResult}
            flipNumber={latestFlipNumber}
            customization={state.settings.customization}
          />

          <FlipControls
            coinState={coinState}
            soundEnabled={state.settings.soundEnabled}
            onFlip={() => flipCoin()}
            onBatchFlip={(count) => runExperiment({ count })}
            onToggleSound={() => updateSettings({ soundEnabled: !state.settings.soundEnabled })}
            onReset={resetAllStats}
            predictionSide={state.predictionStats.selectedPrediction}
            onSelectPrediction={setPrediction}
            isPredictionMode={true}
          />
        </div>

        {/* Prediction Game Scoreboard */}
        <PredictionGameCard predictionStats={state.predictionStats} />
      </div>
    </>
  );
};
