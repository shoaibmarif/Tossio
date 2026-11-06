import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BarChart3, ChevronDown, Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react';
import { Logo } from './Logo';
import { LEARN_NAV, PRIMARY_NAV, SITE_LINKS } from './nav';
import { useCoinFlipGame } from '../../context/CoinFlipContext';

const iconButton =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white';

const useIsDark = () => {
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains('dark'));
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return dark;
};

export const Header: React.FC = () => {
  const { state, updateSettings } = useCoinFlipGame();
  const { soundEnabled } = state.settings;
  const isDark = useIsDark();
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setLearnOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!learnOpen) return;
    const onClick = (e: MouseEvent) => {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) setLearnOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLearnOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [learnOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
    }`;
  const learnActive = LEARN_NAV.some((i) => i.to === location.pathname);
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const soundLabel = soundEnabled ? 'Turn sound off' : 'Turn sound on';

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-zinc-800 dark:bg-zinc-950/90 dark:supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <div ref={learnRef} className="relative">
            <button
              type="button"
              aria-expanded={learnOpen}
              aria-controls="menu-learn"
              onClick={() => setLearnOpen((o) => !o)}
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                learnOpen || learnActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Learn
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${learnOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {learnOpen && (
              <div id="menu-learn" className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-pop dark:border-zinc-800 dark:bg-zinc-900">
                <ul>
                  {LEARN_NAV.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        aria-current={location.pathname === item.to ? 'page' : undefined}
                        className="block rounded-lg px-3 py-2 hover:bg-zinc-100 aria-[current=page]:bg-zinc-100 dark:hover:bg-zinc-800 dark:aria-[current=page]:bg-zinc-800"
                      >
                        <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                        {item.desc && <span className="block text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/coin-flip-statistics" className={`${iconButton} hidden sm:inline-flex`} aria-label="Your statistics" title="Your statistics">
            <BarChart3 className="h-[18px] w-[18px]" />
          </Link>
          <button type="button" onClick={() => updateSettings({ soundEnabled: !soundEnabled })} className={iconButton} aria-label={soundLabel} title={soundLabel}>
            {soundEnabled ? <Volume2 className="h-[18px] w-[18px]" /> : <VolumeX className="h-[18px] w-[18px]" />}
          </button>
          <button type="button" onClick={() => updateSettings({ theme: isDark ? 'light' : 'dark' })} className={iconButton} aria-label={themeLabel} title={themeLabel}>
            {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <button type="button" onClick={() => setMobileOpen(true)} className={`${iconButton} md:hidden`} aria-label="Open menu" aria-expanded={mobileOpen}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="absolute inset-0 bg-zinc-950/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-pop dark:bg-zinc-950">
              <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
                <Logo onClick={() => setMobileOpen(false)} />
                <button type="button" onClick={() => setMobileOpen(false)} className={iconButton} aria-label="Close menu" autoFocus>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
                {[
                  { title: 'Flip', items: [{ to: '/', label: 'Flip a coin' }, ...PRIMARY_NAV.map((i) => ({ ...i, label: i.label === 'Decide' ? 'Decision flip' : i.label === 'Daily' ? 'Daily challenge' : i.label })), { to: '/coin-flip-statistics', label: 'Your statistics' }] },
                  { title: 'Learn', items: LEARN_NAV },
                  { title: 'More', items: SITE_LINKS },
                ].map((group) => (
                  <div key={group.title} className="mb-6">
                    <p className="eyebrow mb-2 px-1">{group.title}</p>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            aria-current={location.pathname === item.to ? 'page' : undefined}
                            className="block rounded-lg px-1 py-2 text-[15px] text-zinc-800 aria-[current=page]:font-semibold dark:text-zinc-200"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
