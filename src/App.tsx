import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CoinFlipProvider } from './context/CoinFlipContext';
import { AppLayout } from './components/layout/AppLayout';
import './styles/global.css';

// Pages
import { Home } from './pages/Home';
import { ExperimentPage } from './pages/ExperimentPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { ProbabilityPage } from './pages/ProbabilityPage';
import { DecisionFlipPage } from './pages/DecisionFlipPage';
import { DailyChallengePage } from './pages/DailyChallengePage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  return (
    <CoinFlipProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {/* Primary & Alias Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/coin-flip" element={<Home />} />
            <Route path="/flip-a-coin" element={<Home />} />
            <Route path="/virtual-coin-flip" element={<Home />} />
            <Route path="/heads-or-tails" element={<Home />} />
            <Route path="/coin-flip-online" element={<Home />} />
            <Route path="/random-coin-flip" element={<Home />} />

            {/* Feature Routes */}
            <Route path="/coin-flip-experiment" element={<ExperimentPage />} />
            <Route path="/coin-flip-simulator" element={<ExperimentPage />} />
            <Route path="/coin-flip-statistics" element={<StatisticsPage />} />
            <Route path="/coin-flip-probability" element={<ProbabilityPage />} />
            <Route path="/how-coin-flipping-works" element={<ProbabilityPage />} />
            <Route path="/decision-coin-flip" element={<DecisionFlipPage />} />
            <Route path="/daily-coin-flip" element={<DailyChallengePage />} />

            {/* Informational & Legal */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </CoinFlipProvider>
  );
}
