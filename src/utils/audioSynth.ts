/**
 * Web Audio Synthesizer for ambient worship pads and piano resonance.
 * Allows smooth, soothing playback for each track even without remote audio files.
 */

class WorshipAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private activeOscillators: OscillatorNode[] = [];
  private activeGains: GainNode[] = [];
  private currentTrackId: string | null = null;
  private currentFreqs: number[] = [];
  private intervalId: number | null = null;

  // Chord frequencies mapping based on root key (Hz)
  private keyChords: Record<string, number[][]> = {
    'C Major': [
      [261.63, 329.63, 392.00, 523.25], // C - E - G - C
      [220.00, 261.63, 329.63, 440.00], // Am - C - E - A
      [174.61, 220.00, 261.63, 349.23], // F - A - C - F
      [196.00, 246.94, 293.66, 392.00], // G - B - D - G
    ],
    'D Major': [
      [293.66, 369.99, 440.00, 587.33], // D - F# - A - D
      [246.94, 293.66, 369.99, 493.88], // Bm
      [196.00, 246.94, 293.66, 392.00], // G
      [220.00, 277.18, 329.63, 440.00], // A
    ],
    'E Major': [
      [329.63, 415.30, 493.88, 659.25], // E - G# - B - E
      [277.18, 329.63, 415.30, 554.37], // C#m
      [220.00, 277.18, 329.63, 440.00], // A
      [246.94, 311.13, 369.99, 493.88], // B
    ],
    'F Major': [
      [174.61, 220.00, 261.63, 349.23], // F - A - C - F
      [220.00, 261.63, 329.63, 440.00], // Dm
      [233.08, 293.66, 349.23, 466.16], // Bb
      [261.63, 329.63, 392.00, 523.25], // C
    ],
    'G Major': [
      [196.00, 246.94, 293.66, 392.00], // G - B - D - G
      [164.81, 196.00, 246.94, 329.63], // Em
      [261.63, 329.63, 392.00, 523.25], // C
      [293.66, 369.99, 440.00, 587.33], // D
    ],
    'A Major': [
      [220.00, 277.18, 329.63, 440.00], // A - C# - E - A
      [185.00, 220.00, 277.18, 369.99], // F#m
      [293.66, 369.99, 440.00, 587.33], // D
      [329.63, 415.30, 493.88, 659.25], // E
    ],
    'Bb Major': [
      [233.08, 293.66, 349.23, 466.16], // Bb - D - F - Bb
      [196.00, 233.08, 293.66, 392.00], // Gm
      [174.61, 220.00, 261.63, 349.23], // Eb / F
      [261.63, 329.63, 392.00, 523.25], // F
    ],
    'Eb Major': [
      [155.56, 196.00, 233.08, 311.13], // Eb - G - Bb - Eb
      [207.65, 261.63, 311.13, 415.30], // Ab
      [233.08, 293.66, 349.23, 466.16], // Bb
      [196.00, 246.94, 293.66, 392.00], // Cm
    ]
  };

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setTargetAtTime(clamped * 0.35, this.ctx.currentTime, 0.05);
    }
  }

  public playTrack(trackId: string, keyName: string = 'G Major') {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.currentTrackId = trackId;
    this.isPlaying = true;

    const progression = this.keyChords[keyName] || this.keyChords['G Major'];
    let chordIndex = 0;

    const playChord = (chordFreqs: number[]) => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Smoothly ramp down old oscillators
      this.activeGains.forEach(gain => {
        try {
          gain.gain.setTargetAtTime(0.0001, now, 0.4);
        } catch {
          // ignore
        }
      });

      const newGains: GainNode[] = [];
      const newOscs: OscillatorNode[] = [];

      chordFreqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        
        // Warm dual oscillators for lush stereo-like worship pads
        const osc = this.ctx.createOscillator();
        const oscDetune = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm lowpass filter for reverby pad sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 + (idx * 250), now);
        filter.Q.setValueAtTime(2.0, now);

        osc.type = idx === 0 ? 'triangle' : 'sine';
        oscDetune.type = 'triangle';

        osc.frequency.setValueAtTime(freq, now);
        oscDetune.frequency.setValueAtTime(freq * 1.002, now); // subtle chorusing

        gainNode.gain.setValueAtTime(0.0001, now);
        // Swell in like a church organ / worship pad
        gainNode.gain.exponentialRampToValueAtTime(0.12 / (chordFreqs.length * 0.7), now + 1.2);

        osc.connect(filter);
        oscDetune.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        osc.start(now);
        oscDetune.start(now);

        newOscs.push(osc, oscDetune);
        newGains.push(gainNode);
      });

      this.activeOscillators = newOscs;
      this.activeGains = newGains;
    };

    // Play first chord
    playChord(progression[0]);

    // Transition chords every 5.5 seconds smoothly
    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      chordIndex = (chordIndex + 1) % progression.length;
      playChord(progression[chordIndex]);
    }, 5500);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx && this.activeGains.length > 0) {
      const now = this.ctx.currentTime;
      this.activeGains.forEach(gain => {
        try {
          gain.gain.setTargetAtTime(0.0001, now, 0.2);
        } catch {
          // ignore
        }
      });
      setTimeout(() => {
        this.activeOscillators.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.activeOscillators = [];
        this.activeGains = [];
      }, 300);
    }
  }

  public pause() {
    this.stop();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const worshipAudio = new WorshipAudioEngine();
