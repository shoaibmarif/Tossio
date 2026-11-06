import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../../seo/site';

export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-7 w-7' }) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
    <g transform="rotate(-24 16 16)">
      <circle cx="16" cy="16" r="14" fill="#F59E0B" />
      <path d="M16 2a14 14 0 0 1 0 28z" fill="#4F46E5" />
      <circle cx="16" cy="16" r="9.5" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" />
      <path d="M16 2v28" stroke="#fff" strokeWidth="1.4" />
    </g>
  </svg>
);

export const Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Link to="/" onClick={onClick} className="flex items-center gap-2 rounded-md text-zinc-900 dark:text-white" aria-label={`${SITE.name} home`}>
    <LogoMark />
    <span className="text-[17px] font-semibold tracking-tight">{SITE.name}</span>
  </Link>
);
