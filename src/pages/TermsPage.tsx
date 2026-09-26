import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { FileText, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service – Educational & Entertainment Disclaimers"
        description="Review the Terms of Service for CoinFlip.io. Educational and random choice simulator terms and statistical disclaimers."
        canonicalPath="/terms"
      />

      <div className="space-y-10 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Legal & Usage
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <FileText className="w-8 h-8 text-amber-500" />
            Terms of Use
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Terms governing the use of the CoinFlip.io web application.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Informational & Entertainment Purpose
            </h2>
            <p>
              CoinFlip.io provides virtual coin tossing, probability simulation, and statistical analysis tools intended for entertainment, educational study, and recreational decision-making.
            </p>
          </div>

          <div className="space-y-2 pt-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              2. Decision Disclaimer
            </h2>
            <p>
              The Decision Coin Flip mode randomly selects between user-provided options based on equal probability. The application does not assess the wisdom, safety, or objective correctness of any decision. Users remain solely responsible for any choices made.
            </p>
          </div>

          <div className="space-y-2 pt-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Randomness & Statistical Testing
            </h2>
            <p>
              While outcomes are generated using cryptographically strong browser entropy (<code>crypto.getRandomValues()</code>), descriptive statistics, sample deviations, and &quot;Is My Coin Fair?&quot; calculators are intended for demonstration and educational purposes, not certified scientific or legal verification.
            </p>
          </div>

          <div className="space-y-2 pt-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. As-Is Operation
            </h2>
            <p>
              The software is provided &quot;as is&quot; without warranties of any kind. You may use this tool free of charge without commercial restriction.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
