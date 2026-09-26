import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useCoinFlipGame } from '../../context/CoinFlipContext';
import { Award, X } from 'lucide-react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { screenReaderAnnouncement, newAchievementUnlocked, dismissAchievementToast } =
    useCoinFlipGame();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Screen Reader ARIA Live Status Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {screenReaderAnnouncement}
      </div>

      {/* Achievement Toast */}
      {newAchievementUnlocked && (
        <div
          role="alert"
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="p-2 rounded-xl bg-white/20 text-white">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-amber-100">
              Achievement Unlocked!
            </div>
            <div className="text-sm font-black">{newAchievementUnlocked}</div>
          </div>
          <button
            type="button"
            onClick={dismissAchievementToast}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white ml-2"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
