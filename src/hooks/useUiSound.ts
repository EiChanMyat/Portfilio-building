import { useEffect, useState } from 'react';
import { getAudioContext, startSoftMusic, stopSoftMusic } from './softMusic';

const KEY = 'portfolio-os-sound';

function readEnabled() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEY) === '1';
}

let enabled = false;
if (typeof window !== 'undefined') enabled = readEnabled();

export function playUiBlip() {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    if (ctx.state === 'suspended') void ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 784;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.stop(now + 0.08);
  } catch {
    // Ignore browsers that block audio until a gesture.
  }
}

export function useUiSound() {
  const [isOn, setIsOn] = useState(readEnabled);

  useEffect(() => {
    enabled = isOn;
    localStorage.setItem(KEY, isOn ? '1' : '0');
    if (isOn) {
      startSoftMusic();
      return;
    }
    stopSoftMusic();
  }, [isOn]);

  useEffect(() => {
    if (!isOn) return;
    const unlock = () => {
      startSoftMusic();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [isOn]);

  return {
    enabled: isOn,
    toggle: () => {
      const nextValue = !isOn;
      setIsOn(nextValue);
      if (nextValue) {
        startSoftMusic();
        return;
      }
      stopSoftMusic();
    },
    play: playUiBlip,
  };
}
