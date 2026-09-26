import React from 'react';
import { useCoinFlipGame } from '../context/CoinFlipContext';
import { DailyChallengeCard } from '../components/game/DailyChallengeCard';
import { PredictionGameCard } from '../components/game/PredictionGameCard';
import { Coin } from '../components/coin/Coin';
import { CoinResult } from '../components/coin/CoinResult';
import { FlipControls } from '../components/flip/FlipControls';
import { SEOHead } from '../components/seo/SEOHead';
import { getTodayDateString, generateDailyChallenge } from '../game/challenges';
import { Calendar } from 'lucide-react';

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

  const dailyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Daily Coin Flip Challenge & Prediction Mini-Game',
    description:
      'Complete today’s synchronized global coin toss challenge. Test your prediction accuracy, accumulate bonus streaks, and unlock achievements.',
  };

  return (
    <>
      <SEOHead
        title="Daily Coin Flip Challenge & Prediction Game"
        description="Take on today's deterministic coin flip challenge, test your prediction instincts, track streaks, and climb the scoreboard."
        canonicalPath="/daily-coin-flip"
        jsonLd={dailyJsonLd}
      />

      <div className="space-y-10 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Mini-Game & Challenges
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <Calendar className="w-8 h-8 text-amber-500" />
            Daily Challenge & Prediction
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Test yourself with a synchronized daily objective or play Prediction Mode to test your intuition against pure randomness.
          </p>
        </div>

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
