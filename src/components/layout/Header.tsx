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
          <span className="flex items-center gap-1">
            CoinFlip<span className="text-amber-500">.io</span>
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

        {/* Quick Utilities & Theme */}
        <div className="flex items-center gap-2">
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

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Theme: {theme}</span>
            <span>Sound: {soundEnabled ? 'Enabled' : 'Muted'}</span>
          </div>
        </div>
      )}
    </header>
  );
};
