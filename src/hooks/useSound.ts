import { useCallback } from 'react';
import { soundFx } from '../game/sound';

export function useSound(soundEnabled: boolean) {
  soundFx.enabled = soundEnabled;

  const playFlip = useCallback(() => {
    soundFx.playFlipStart();
  }, []);

  const playSpin = useCallback(() => {
    soundFx.playSpinTick();
  }, []);

  const playLand = useCallback(() => {
    soundFx.playCoinLanding();
  }, []);

  const playSuccess = useCallback(() => {
    soundFx.playSuccessFanfare();
  }, []);

  const playAchievement = useCallback(() => {
    soundFx.playAchievementFanfare();
  }, []);

  return {
    playFlip,
    playSpin,
    playLand,
    playSuccess,
    playAchievement,
  };
}
