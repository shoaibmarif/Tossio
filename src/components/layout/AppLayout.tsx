import React, { useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useCoinFlipGame } from '../../context/CoinFlipContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { screenReaderAnnouncement, newAchievementUnlocked, dismissAchievementToast } = useCoinFlipGame();

  // Achievement toasts close on their own after a few seconds.
  useEffect(() => {
    if (!newAchievementUnlocked) return;
    const t = setTimeout(dismissAchievementToast, 5000);
    return () => clearTimeout(t);
  }, [newAchievementUnlocked, dismissAchievementToast]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {screenReaderAnnouncement}
      </div>

      <Header />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>
      <Footer />

      {newAchievementUnlocked && (
        <div
          role="alert"
          className="animate-fade-in-up fixed bottom-4 right-4 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-pop dark:border-zinc-800 dark:bg-zinc-900"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-heads-100 text-heads-700 dark:bg-heads-900/40 dark:text-heads-300">
            <Award className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs text-zinc-500">Achievement unlocked</span>
            <span className="block text-sm font-semibold">{newAchievementUnlocked}</span>
          </span>
          <button
            type="button"
            onClick={dismissAchievementToast}
            className="ml-2 rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
