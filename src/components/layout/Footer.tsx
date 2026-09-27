import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, ShieldCheck, Globe, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <Link
              to="/"
              className="brand-logo inline-flex items-center gap-2 font-black text-xl text-white outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-none select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                <Coins className="w-4 h-4" />
              </div>
              <span>coinflip<span className="text-amber-400">tool</span></span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Fast, privacy-first, cryptographically fair virtual coin flip simulator & probability analysis engine. Works completely offline.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Private (No Tracking)</span>
            </div>

            {/* Developer Spotlight */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Created By Shoaib Arif
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <a
                  href="https://shoaibarif.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Portfolio</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="https://github.com/shoaibmarif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 font-semibold"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="https://www.linkedin.com/in/shoaibmarif/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 font-semibold"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                  </svg>
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Tools & Simulators */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Interactive Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Standard Coin Flip
                </Link>
              </li>
              <li>
                <Link to="/coin-flip-experiment" className="hover:text-amber-400 transition-colors">
                  Batch Simulator (up to 1M)
                </Link>
              </li>
              <li>
                <Link to="/coin-flip-probability" className="hover:text-amber-400 transition-colors">
                  Probability & Convergence
                </Link>
              </li>
              <li>
                <Link to="/decision-coin-flip" className="hover:text-amber-400 transition-colors">
                  Decision Coin Flip
                </Link>
              </li>
              <li>
                <Link to="/daily-coin-flip" className="hover:text-amber-400 transition-colors">
                  Daily Challenge
                </Link>
              </li>
            </ul>
          </div>

          {/* Insights & Learning */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Statistics & Guides
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/coin-flip-statistics" className="hover:text-amber-400 transition-colors">
                  Lifetime Statistics
                </Link>
              </li>
              <li>
                <Link to="/how-coin-flipping-works" className="hover:text-amber-400 transition-colors">
                  How Coin Flipping Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About Random Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Directory */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Directory & Legal
            </h4>
            <ul className="space-y-1.5 text-xs">
        

              <li>
                <Link to="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} coinfliptool by{' '}
            <a
              href="https://shoaibarif.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline font-bold"
            >
              Shoaib Arif
            </a>
            . Open source & certified 50/50 fair.
          </div>
   
        </div>
      </div>
    </footer>
  );
};
