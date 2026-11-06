import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CoinFlipProvider } from './context/CoinFlipContext';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { REDIRECTS } from './seo/routes';

// Route-level code splitting keeps the first load small.
const named = <K extends string>(loader: () => Promise<Record<K, React.ComponentType>>, key: K) =>
  lazy(() => loader().then((m) => ({ default: m[key] })));

const DecisionFlipPage = named(() => import('./pages/DecisionFlipPage'), 'DecisionFlipPage');
const DailyChallengePage = named(() => import('./pages/DailyChallengePage'), 'DailyChallengePage');
const ExperimentPage = named(() => import('./pages/ExperimentPage'), 'ExperimentPage');
const ProbabilityPage = named(() => import('./pages/ProbabilityPage'), 'ProbabilityPage');
const HowCoinFlippingWorksPage = named(() => import('./pages/HowCoinFlippingWorksPage'), 'HowCoinFlippingWorksPage');
const StatisticsPage = named(() => import('./pages/StatisticsPage'), 'StatisticsPage');
const FAQPage = named(() => import('./pages/FAQPage'), 'FAQPage');
const AboutPage = named(() => import('./pages/AboutPage'), 'AboutPage');
const ContactPage = named(() => import('./pages/ContactPage'), 'ContactPage');
const PrivacyPage = named(() => import('./pages/PrivacyPage'), 'PrivacyPage');
const TermsPage = named(() => import('./pages/TermsPage'), 'TermsPage');
const HTMLSitemapPage = named(() => import('./pages/HTMLSitemapPage'), 'HTMLSitemapPage');
const NotFoundPage = named(() => import('./pages/NotFoundPage'), 'NotFoundPage');

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CoinFlipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout>
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/decision-coin-flip" element={<DecisionFlipPage />} />
              <Route path="/daily-coin-flip" element={<DailyChallengePage />} />
              <Route path="/coin-flip-experiment" element={<ExperimentPage />} />
              <Route path="/coin-flip-probability" element={<ProbabilityPage />} />
              <Route path="/how-coin-flipping-works" element={<HowCoinFlippingWorksPage />} />
              <Route path="/coin-flip-statistics" element={<StatisticsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/sitemap" element={<HTMLSitemapPage />} />

              {/* Retired duplicate URLs (also 308-redirected by Vercel) */}
              {Object.entries(REDIRECTS).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </CoinFlipProvider>
  );
}
