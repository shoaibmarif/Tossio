import { useEffect } from 'react';
import type { CoinSide } from '../types';

interface KeyboardControlsOptions {
  onFlip: () => void;
  onReset?: () => void;
  onEscape?: () => void;
  onPredict?: (side: CoinSide) => void;
  disabled?: boolean;
}

export function useKeyboardControls({
  onFlip,
  onReset,
  onEscape,
  onPredict,
  disabled = false,
}: KeyboardControlsOptions) {
  useEffect(() => {
    if (disabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger shortcuts if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Space or Enter -> Flip
      if (e.code === 'Space' || e.key === 'Enter') {
        // Prevent default spacebar scrolling
        e.preventDefault();
        onFlip();
      } else if (e.key === 'r' || e.key === 'R') {
        if (onReset) {
          e.preventDefault();
          onReset();
        }
      } else if (e.key === 'Escape') {
        if (onEscape) {
          e.preventDefault();
          onEscape();
        }
      } else if (e.key === 'h' || e.key === 'H') {
        if (onPredict) {
          e.preventDefault();
          onPredict('heads');
        }
      } else if (e.key === 't' || e.key === 'T') {
        if (onPredict) {
          e.preventDefault();
          onPredict('tails');
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFlip, onReset, onEscape, onPredict, disabled]);
}
