import React from 'react';
import type { DailyChallengeState } from '../../types';
import { Calendar, CheckCircle2, Zap } from 'lucide-react';

interface DailyChallengeCardProps {
  challenge: DailyChallengeState;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({ challenge }) => {
  const pct = Math.min(
    100,
    Math.round(
      challenge.challengeType === 'streak'
        ? (challenge.streakRecord / challenge.targetFlips) * 100
        : (challenge.progress / challenge.targetFlips) * 100
    )
  );

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Daily Deterministic Challenge
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
          {challenge.dateString}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            {challenge.targetGoalText}
          </span>
          {challenge.isCompleted && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> Complete!
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>
              {challenge.challengeType === 'streak'
                ? `Best Streak: ${challenge.streakRecord} / ${challenge.targetFlips}`
                : `Progress: ${challenge.progress} / ${challenge.targetFlips} flips`}
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                challenge.isCompleted
                  ? 'bg-emerald-500'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal">
        🌐 <strong>Synchronized Worldwide:</strong> Today&apos;s challenge parameters are generated deterministically from today&apos;s date. Every player in the world shares the exact same objective today!
      </p>
    </div>
  );
};
