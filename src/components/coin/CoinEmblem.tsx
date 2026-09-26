import React from 'react';
import type { CoinStyle } from '../../types';

interface CoinEmblemProps {
  side: 'heads' | 'tails';
  symbol: string;
  label: string;
  style: CoinStyle;
}

export const CoinEmblem: React.FC<CoinEmblemProps> = ({ side, symbol, label, style }) => {
  // Theme styling gradients and colors
  const styleConfig = {
    gold: {
      rimOuter: '#78350f',
      rimMid: '#d97706',
      rimInner: '#fef3c7',
      faceGradStart: '#fbbf24',
      faceGradEnd: '#b45309',
      beadColor: '#92400e',
      symbolFill: '#fffbeb',
      symbolStroke: '#78350f',
      textFill: '#fef3c7',
      sheen: 'rgba(255, 255, 255, 0.45)',
    },
    silver: {
      rimOuter: '#334155',
      rimMid: '#94a3b8',
      rimInner: '#ffffff',
      faceGradStart: '#e2e8f0',
      faceGradEnd: '#64748b',
      beadColor: '#475569',
      symbolFill: '#ffffff',
      symbolStroke: '#334155',
      textFill: '#f8fafc',
      sheen: 'rgba(255, 255, 255, 0.6)',
    },
    bronze: {
      rimOuter: '#7c2d12',
      rimMid: '#c2410c',
      rimInner: '#ffedd5',
      faceGradStart: '#f97316',
      faceGradEnd: '#9a3412',
      beadColor: '#7c2d12',
      symbolFill: '#fff7ed',
      symbolStroke: '#7c2d12',
      textFill: '#ffedd5',
      sheen: 'rgba(255, 255, 255, 0.4)',
    },
    cyber: {
      rimOuter: '#083344',
      rimMid: '#06b6d4',
      rimInner: '#cffafe',
      faceGradStart: '#0891b2',
      faceGradEnd: '#164e63',
      beadColor: '#0e7490',
      symbolFill: '#ecfeff',
      symbolStroke: '#083344',
      textFill: '#a5f3fc',
      sheen: 'rgba(103, 232, 249, 0.5)',
    },
  }[style];

  return (
    <div className="w-full h-full rounded-full relative select-none shadow-2xl flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full filter drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Radial sheen highlight */}
          <linearGradient id={`faceGrad-${side}-${style}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={styleConfig.faceGradStart} />
            <stop offset="50%" stopColor={styleConfig.rimMid} />
            <stop offset="100%" stopColor={styleConfig.faceGradEnd} />
          </linearGradient>

          <linearGradient id={`sheen-${side}-${style}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={styleConfig.sheen} stopOpacity="0.8" />
            <stop offset="45%" stopColor={styleConfig.sheen} stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>

          <filter id={`emboss-${side}-${style}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="0.8" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Rim */}
        <circle cx="100" cy="100" r="97" fill={styleConfig.rimOuter} />
        <circle cx="100" cy="100" r="95" fill={styleConfig.rimMid} />
        <circle cx="100" cy="100" r="91" fill={styleConfig.rimOuter} />

        {/* Decorative Milled Edge Ridges */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 360) / 36;
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 91 * Math.cos(rad);
          const y1 = 100 + 91 * Math.sin(rad);
          const x2 = 100 + 95 * Math.cos(rad);
          const y2 = 100 + 95 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={styleConfig.rimInner}
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
          );
        })}

        {/* Inner Coin Face */}
        <circle cx="100" cy="100" r="88" fill={`url(#faceGrad-${side}-${style})`} />

        {/* Inner Beaded Ring */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={styleConfig.beadColor}
          strokeWidth="1.5"
          strokeDasharray="2.5 3.5"
          strokeOpacity="0.8"
        />

        {/* Original Emblem Graphics */}
        {side === 'heads' ? (
          <g filter={`url(#emboss-${side}-${style})`}>
            {/* Laurel branches */}
            <path
              d="M 60 140 C 45 115 50 85 70 65 C 65 78 70 95 80 102"
              fill="none"
              stroke={styleConfig.symbolFill}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 140 140 C 155 115 150 85 130 65 C 135 78 130 95 120 102"
              fill="none"
              stroke={styleConfig.symbolFill}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Central Sun Crown rays */}
            <polygon
              points="100,32 104,46 118,48 107,58 110,72 100,64 90,72 93,58 82,48 96,46"
              fill={styleConfig.symbolFill}
              opacity="0.9"
            />
          </g>
        ) : (
          <g filter={`url(#emboss-${side}-${style})`}>
            {/* Probability Scales / Crescent balance emblem */}
            <path
              d="M 50 100 A 50 50 0 0 0 150 100 A 42 42 0 0 1 50 100"
              fill={styleConfig.symbolFill}
              opacity="0.4"
            />
            <line
              x1="65"
              y1="68"
              x2="135"
              y2="68"
              stroke={styleConfig.symbolFill}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="100" cy="68" r="4" fill={styleConfig.symbolFill} />
            <polygon points="100,52 103,62 97,62" fill={styleConfig.symbolFill} />
            {/* Geometric stars */}
            <circle cx="65" cy="130" r="3" fill={styleConfig.symbolFill} opacity="0.8" />
            <circle cx="135" cy="130" r="3" fill={styleConfig.symbolFill} opacity="0.8" />
          </g>
        )}

        {/* Center Symbol Display */}
        <text
          x="100"
          y={side === 'heads' ? '118' : '116'}
          textAnchor="middle"
          fontSize="48"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill={styleConfig.symbolFill}
          stroke={styleConfig.symbolStroke}
          strokeWidth="1.2"
          filter={`url(#emboss-${side}-${style})`}
          className="tracking-wider"
        >
          {symbol}
        </text>

        {/* Curved Label along bottom */}
        <text
          x="100"
          y="166"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          letterSpacing="2.5"
          fill={styleConfig.textFill}
          filter={`url(#emboss-${side}-${style})`}
          className="uppercase"
        >
          {label}
        </text>

        {/* 3D Sheen overlay layer */}
        <circle cx="100" cy="100" r="88" fill={`url(#sheen-${side}-${style})`} />
      </svg>
    </div>
  );
};
