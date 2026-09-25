import { Header } from '../components/Header';
import { Coin } from '../components/Coin';
import { FlipButton } from '../components/FlipButton';
import { ResultDisplay } from '../components/ResultDisplay';
import { CoinOptions } from '../components/CoinOptions';
import { Statistics } from '../components/Statistics';
import { History } from '../components/History';
import { BatchFlip } from '../components/BatchFlip';
import { ProbabilityInfo } from '../components/ProbabilityInfo';
import { ContentSections } from '../components/ContentSections';
import { AdSlot } from '../components/AdSlot';
import { Footer } from '../components/Footer';
import { useFlipState } from '../hooks/useFlipState';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Home.css';

export function Home() {
  const {
    currentResult,
    isFlipping,
    statistics,
    history,
    coinType,
    lastBatchResult,
    flip,
    batchFlip,
    resetStats,
    clearHistory,
    setCoinType,
  } = useFlipState();

  const reducedMotion = useReducedMotion();

  return (
    <div className="home">
      <Header />
      <AdSlot slot="header" />

      <main>
        <section className="home__flipper" aria-label="Coin Flipper">
          <Coin result={currentResult} isFlipping={isFlipping} />
          <ResultDisplay result={currentResult} isFlipping={isFlipping} />
          <FlipButton onClick={() => flip(reducedMotion)} isFlipping={isFlipping} />
          <CoinOptions coinType={coinType} onCoinTypeChange={setCoinType} />
        </section>

        <div className="home__stats-grid">
          <Statistics statistics={statistics} onReset={resetStats} />
          <History history={history} onClear={clearHistory} />
        </div>

        <BatchFlip onBatchFlip={batchFlip} lastResult={lastBatchResult} />

        <AdSlot slot="mid-content" />

        <ProbabilityInfo />
        <ContentSections />
      </main>

      <Footer />
    </div>
  );
}
