const TRACK = '/audio/2asuiu8t9i87srg4ou71.m4a';
const MASTER_VOLUME = 0.55;
const FADE_MS = 500;

let player: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let fadeTimer = 0;
let playing = false;
let fadeVolume = 0;

function getPlayer() {
  if (!player) {
    player = new Audio(TRACK);
    player.loop = true;
    player.preload = 'auto';
    player.volume = 0;
  }
  return player;
}

function clearFade() {
  window.clearInterval(fadeTimer);
}

function fadeTo(target: number, onDone?: () => void) {
  const audio = getPlayer();
  clearFade();
  const start = fadeVolume;
  const startedAt = performance.now();

  fadeTimer = window.setInterval(() => {
    const t = Math.min(1, (performance.now() - startedAt) / FADE_MS);
    fadeVolume = start + (target - start) * t;
    audio.volume = Math.min(1, Math.max(0, fadeVolume));
    if (t >= 1) {
      clearFade();
      onDone?.();
    }
  }, 32);
}

export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function startSoftMusic() {
  const audio = getPlayer();
  playing = true;
  const start = audio.play();
  if (start) start.catch(() => {});
  fadeTo(MASTER_VOLUME);
}

export function stopSoftMusic() {
  if (!player && !playing) return;
  playing = false;
  fadeTo(0, () => {
    player?.pause();
  });
}
