import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCoinFlipGame } from '../../context/CoinFlipContext';
import {
  Coins,
  FlaskConical,
  BarChart3,
  TrendingUp,
  Shuffle,
  Calendar,
  Menu,
  X,
  Sun,
  Moon,
  Laptop,
  Volume2,
  VolumeX,
  Globe,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { state, updateSettings } = useCoinFlipGame();
  const { theme, soundEnabled } = state.settings;

  const navLinks = [
    { to: '/', label: 'Flip Coin', icon: Coins },
    { to: '/coin-flip-experiment', label: 'Experiments', icon: FlaskConical },
    { to: '/coin-flip-statistics', label: 'Statistics', icon: BarChart3 },
    { to: '/coin-flip-probability', label: 'Probability Lab', icon: TrendingUp },
    { to: '/decision-coin-flip', label: 'Decision Flip', icon: Shuffle },
    { to: '/daily-coin-flip', label: 'Daily Challenge', icon: Calendar },
  ];

  const cycleTheme = () => {
    if (theme === 'system') updateSettings({ theme: 'light' });
    else if (theme === 'light') updateSettings({ theme: 'dark' });
    else updateSettings({ theme: 'system' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-black text-xl tracking-tight text-slate-900 dark:text-white group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Coins className="w-5 h-5" />
          </div>
          <span className="flex items-center">
            coinfliptool
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Utilities, Socials & Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Portfolio Link */}
          <a
            href="https://shoaibarif.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Shoaib Arif Portfolio"
            aria-label="Shoaib Arif Portfolio Website"
          >
            <Globe className="w-4 h-4 text-emerald-500" />
          </a>

          {/* GitHub Profile */}
          <a
            href="https://github.com/shoaibmarif"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="GitHub @shoaibmarif"
            aria-label="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/shoaibmarif/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="LinkedIn @shoaibmarif"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-4 h-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
            </svg>
          </a>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => updateSettings({ soundEnabled: !soundEnabled })}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            aria-label={soundEnabled ? 'Sound is on, click to mute' : 'Sound is muted, click to unmute'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-50" />
            )}
          </button>

          {/* Theme Cycler */}
          <button
            type="button"
            onClick={cycleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Current theme: ${theme}. Click to switch.`}
            aria-label={`Current theme: ${theme}. Click to switch theme.`}
          >
            {theme === 'light' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : theme === 'dark' ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Laptop className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm ${
                  isActive
                    ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-500" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around py-2">
            <a
              href="https://shoaibarif.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 p-2"
            >
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 p-2"
            >
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#0A66C2] flex items-center gap-1.5 p-2"
            >
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
