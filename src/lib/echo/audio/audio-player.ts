// ─────────────────────────────────────────────────────────────────────────────
// ECHO Audio Player — pre-recorded file playback (future use)
// Wraps HTMLAudioElement with a Promise-based API.
// ─────────────────────────────────────────────────────────────────────────────

let _current: HTMLAudioElement | null = null;

/**
 * Play an audio file from `url`.
 * Stops any currently playing audio first.
 * Returns a Promise that resolves when playback ends.
 */
export function playAudio(url: string, volume = 1.0): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  stopAudio();

  return new Promise<void>((resolve, reject) => {
    const audio = new Audio(url);
    audio.volume = Math.min(Math.max(volume, 0), 1);
    _current = audio;

    audio.onended = () => { _current = null; resolve(); };
    audio.onerror = () => { _current = null; reject(new Error("audio-error")); };

    audio.play().catch((err) => {
      _current = null;
      reject(err);
    });
  });
}

/** Pause playback (resumable). */
export function pauseAudio(): void {
  _current?.pause();
}

/** Resume a paused audio element. */
export function resumeAudio(): void {
  _current?.play().catch(() => {/* ignore */});
}

/** Stop and discard the current audio element. */
export function stopAudio(): void {
  if (_current) {
    _current.pause();
    _current.src = "";
    _current = null;
  }
}

/** Set volume on the currently playing audio (0.0 – 1.0). */
export function setVolume(v: number): void {
  if (_current) _current.volume = Math.min(Math.max(v, 0), 1);
}

/** True if an audio element is loaded and not ended. */
export function isPlaying(): boolean {
  return _current !== null && !_current.paused && !_current.ended;
}
