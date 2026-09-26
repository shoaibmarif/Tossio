import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { ShieldCheck, HardDrive, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy – Client-Side Privacy Commitment"
        description="Learn about our privacy commitment: CoinFlip.io operates 100% in your browser. No personal data, decisions, or flip history are ever transmitted to a server."
        canonicalPath="/privacy"
      />

      <div className="space-y-10 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Privacy First
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Your data is yours alone. CoinFlip.io is engineered as a zero-telemetry, pure frontend utility.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-amber-500" />
              1. Local Browser Storage Only
            </h2>
            <p>
              All application state—including your total flips, Heads/Tails counts, streaks, batch experiments, achievements, custom decision choices, and visual theme preferences—is stored exclusively in your browser&apos;s local storage (<code>localStorage</code>).
            </p>
            <p>
              This data never leaves your device and is never uploaded to any remote server or third-party database.
            </p>
          </div>

          <div className="space-y-2 pt-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-indigo-500" />
              2. Private Decisions
            </h2>
            <p>
              When you use the Decision Coin Flip tool to decide between personal choices (e.g. Option A vs Option B), your inputs are kept in local memory only. We do not inspect, log, or track your decisions.
            </p>
          </div>

          <div className="space-y-2 pt-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Data Deletion
            </h2>
            <p>
              You can wipe all stored data at any time by clearing your browser cache and cookies, or by clicking the &quot;Reset&quot; and &quot;Clear All&quot; buttons inside the application.
            </p>
          </div>

          <div className="space-y-2 pt-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Offline Availability
            </h2>
            <p>
              Because this website does not depend on an external API or remote backend, it can be cached via service workers to function completely offline without internet connectivity.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
