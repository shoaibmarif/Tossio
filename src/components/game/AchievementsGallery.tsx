import React from 'react';
import { ACHIEVEMENTS_LIST } from '../../game/challenges';
import { Award, Check, Lock } from 'lucide-react';

interface AchievementsGalleryProps {
  unlockedMap: Record<string, number>;
}

export const AchievementsGallery: React.FC<AchievementsGalleryProps> = ({ unlockedMap }) => {
  const totalCount = ACHIEVEMENTS_LIST.length;
  const unlockedCount = Object.keys(unlockedMap).length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Player Milestones
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Achievements ({unlockedCount} / {totalCount})
          </h3>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3">
          <div className="w-28 h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ACHIEVEMENTS_LIST.map((ach) => {
          const isUnlocked = Boolean(unlockedMap[ach.id]);
          const unlockedTime = unlockedMap[ach.id];

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                isUnlocked
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 shadow-xs'
                  : 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs ${
                  isUnlocked
                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-400" />}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {ach.title}
                  </h4>
                  {isUnlocked && <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {ach.description}
                </p>
                {isUnlocked && unlockedTime && (
                  <span className="block text-[10px] text-amber-700/80 dark:text-amber-400/80 font-mono pt-1">
                    Unlocked {new Date(unlockedTime).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
