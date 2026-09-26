import React from 'react';
import type { CoinSide, CoinState, UserSettings } from '../../types';
import { CoinEmblem } from './CoinEmblem';

interface CoinProps {
  coinState: CoinState;
  latestResult: CoinSide | null;
  settings: UserSettings;
  onFlip: () => void;
  disabled?: boolean;
}

export const Coin: React.FC<CoinProps> = ({
  coinState,
  latestResult,
  settings,
  onFlip,
  disabled = false,
}) => {
  const isFlipping = coinState === 'FLIPPING';
  const showTails = latestResult === 'tails';

  // Animation timing
  const { animationMode, animationPreset, customization } = settings;

  let animDuration = 750;
  if (animationPreset === 'fast') animDuration = 400;
  if (animationPreset === 'slow') animDuration = 1200;
  if (animationMode === 'reduced') animDuration = 250;
  if (animationMode === 'off') animDuration = 0;

  // Rotation angles:
  // Heads ends at multiple of 360 (e.g. 1440deg)
  // Tails ends at multiple of 360 + 180 (e.g. 1620deg)
  // When flipping: dynamic CSS keyframe or transition
  const finalRotation = showTails ? 180 : 0;

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* 3D Coin Container */}
      <div
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 cursor-pointer select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 rounded-full"
        style={{ perspective: '1000px' }}
        onClick={() => {
          if (!isFlipping && !disabled) {
            onFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Interactive coin. Current side: ${latestResult ? (latestResult === 'heads' ? customization.headsLabel : customization.tailsLabel) : 'Ready to flip'}. Click or press space to flip.`}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !isFlipping && !disabled) {
            e.preventDefault();
            onFlip();
          }
        }}
      >
        <div
          className={`w-full h-full relative rounded-full transition-transform ${
            isFlipping ? 'coin-flipping-active' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipping
              ? undefined
              : `rotateX(${finalRotation}deg)`,
            transition:
              animationMode === 'off'
                ? 'none'
                : animationMode === 'reduced'
                ? 'transform 200ms ease-out'
                : isFlipping
                ? 'none'
                : 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Front Face: HEADS */}
          <div
            className="absolute inset-0 w-full h-full rounded-full"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateX(0deg)',
            }}
          >
            <CoinEmblem
              side="heads"
              symbol={customization.headsSymbol}
              label={customization.headsLabel}
              style={customization.style}
            />
          </div>

          {/* Back Face: TAILS (rotated 180 deg around horizontal axis) */}
          <div
            className="absolute inset-0 w-full h-full rounded-full"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }}
          >
            <CoinEmblem
              side="tails"
              symbol={customization.tailsSymbol}
              label={customization.tailsLabel}
              style={customization.style}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Flip Animation CSS definition */}
      <style>{`
        @keyframes coin-flip-animation-heads {
          0% {
            transform: translateY(0px) rotateX(0deg) scale(1);
          }
          20% {
            transform: translateY(-56px) rotateX(360deg) scale(1.06);
          }
          50% {
            transform: translateY(-80px) rotateX(900deg) scale(1.12);
          }
          80% {
            transform: translateY(-20px) rotateX(1260deg) scale(1.03);
          }
          95% {
            transform: translateY(4px) rotateX(1445deg) scale(0.98);
          }
          100% {
            transform: translateY(0px) rotateX(1440deg) scale(1);
          }
        }

        @keyframes coin-flip-animation-tails {
          0% {
            transform: translateY(0px) rotateX(0deg) scale(1);
          }
          20% {
            transform: translateY(-56px) rotateX(360deg) scale(1.06);
          }
          50% {
            transform: translateY(-80px) rotateX(900deg) scale(1.12);
          }
          80% {
            transform: translateY(-20px) rotateX(1260deg) scale(1.03);
          }
          95% {
            transform: translateY(4px) rotateX(1625deg) scale(0.98);
          }
          100% {
            transform: translateY(0px) rotateX(1620deg) scale(1);
          }
        }

        @keyframes coin-flip-reduced {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(0.85) translateY(-20px);
            opacity: 0.6;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .coin-flipping-active {
          animation: ${
            animationMode === 'off'
              ? 'none'
              : animationMode === 'reduced'
              ? `coin-flip-reduced ${animDuration}ms ease-in-out infinite`
              : `${showTails ? 'coin-flip-animation-tails' : 'coin-flip-animation-heads'} ${animDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards`
          };
        }
      `}</style>

      {/* Shadow underneath coin with dynamic scale during lift */}
      <div
        className={`w-36 sm:w-44 h-4 rounded-full bg-black/25 dark:bg-black/60 blur-md mt-4 transition-all duration-300 ${
          isFlipping ? 'scale-75 opacity-40' : 'scale-100 opacity-90'
        }`}
      />
    </div>
  );
};
