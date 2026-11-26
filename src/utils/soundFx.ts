let audioCtx: AudioContext | null = null;
let isMuted = false;

function getCtx(): AudioContext | null {
  if (isMuted || typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean): void {
  isMuted = muted;
}

export function getSoundMuted(): boolean {
  return isMuted;
}

export function playTone(freq: number, duration = 0.08, type: OscillatorType = 'sine', gainVal = 0.06): void {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio context restrictions
  }
}

export function playPlaceFx(): void {
  playTone(520, 0.07, 'triangle', 0.06);
}

export function playRotateFx(): void {
  playTone(660, 0.05, 'sine', 0.04);
}

export function playSuccessFx(): void {
  playTone(523.25, 0.1, 'triangle', 0.07);
  setTimeout(() => playTone(659.25, 0.12, 'triangle', 0.07), 90);
  setTimeout(() => playTone(783.99, 0.18, 'triangle', 0.08), 180);
}

export function playWarningFx(): void {
  playTone(260, 0.12, 'sawtooth', 0.04);
}
