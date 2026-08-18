import React, { useState } from 'react';
import { X, Copy, Download, Music, Plus, Minus, Check } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const ChordsModal: React.FC = () => {
  const { isChordsModalOpen, setIsChordsModalOpen, chordsTrack, showToast } = useMinistry();
  const [transposeOffset, setTransposeOffset] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  if (!isChordsModalOpen || !chordsTrack) return null;

  const chromaticScale = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  const transposeChord = (chord: string, offset: number): string => {
    if (offset === 0) return chord;
    return chord.replace(/([A-G][b#]?)/g, (match) => {
      let idx = chromaticScale.indexOf(match);
      if (idx === -1) {
        if (match === 'Db') idx = chromaticScale.indexOf('C#');
        else if (match === 'D#') idx = chromaticScale.indexOf('Eb');
        else if (match === 'Gb') idx = chromaticScale.indexOf('F#');
        else if (match === 'G#') idx = chromaticScale.indexOf('Ab');
        else if (match === 'A#') idx = chromaticScale.indexOf('Bb');
      }
      if (idx === -1) return match;
      const newIdx = (idx + offset + 24) % 12;
      return chromaticScale[newIdx];
    });
  };

  const transposedChords = transposeChord(chordsTrack.chords, transposeOffset);

  const handleCopyChords = () => {
    if (navigator.clipboard) {
      const fullText = `CHORD CHART: ${chordsTrack.title}\nKey: ${chordsTrack.key} (Transpose: ${transposeOffset >= 0 ? '+' : ''}${transposeOffset})\nBPM: ${chordsTrack.bpm}\n\n${transposedChords}`;
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      showToast("Chord chart copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadChords = () => {
    const fullText = `DE KING'S FAMILY MUSIC MINISTRY - CHORD SHEET
SONG: ${chordsTrack.title}
ORIGINAL KEY: ${chordsTrack.key}
TRANSPOSED OFFSET: ${transposeOffset >= 0 ? '+' : ''}${transposeOffset}
TEMPO / BPM: ${chordsTrack.bpm}
SCRIPTURE REFERENCE: ${chordsTrack.scriptureReference}

---------------------------------------------------
CHORD PROGRESSIONS & ARRANGEMENT
---------------------------------------------------

${transposedChords}

All Rights Reserved © De King's Family Music Ministry
`;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chordsTrack.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_chords.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded chord chart for "${chordsTrack.title}"`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111116] border border-[#d4af37]/50 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-[#17140e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2a220e] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364]">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {chordsTrack.title} — Chords
              </h3>
              <p className="text-xs text-zinc-400">
                Original Key: <span className="text-[#fce999] font-mono">{chordsTrack.key}</span> • {chordsTrack.bpm} BPM
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsChordsModalOpen(false);
              setTransposeOffset(0);
            }}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transposition Control Ribbon */}
        <div className="px-6 py-3 bg-[#1c180e] border-b border-[#d4af37]/30 flex items-center justify-between gap-4 text-xs">
          <div className="text-zinc-300 font-medium">
            Transpose Semitones:
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTransposeOffset(prev => prev - 1)}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer"
              title="Step Down (-1)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 bg-zinc-900 rounded-lg border border-zinc-800 font-mono font-bold text-[#fce999]">
              {transposeOffset > 0 ? `+${transposeOffset}` : transposeOffset}
            </span>
            <button
              onClick={() => setTransposeOffset(prev => prev + 1)}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer"
              title="Step Up (+1)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            {transposeOffset !== 0 && (
              <button
                onClick={() => setTransposeOffset(0)}
                className="text-[10px] text-zinc-400 hover:text-white underline ml-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Chords Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#0b0b0e]">
          <pre className="font-mono text-sm sm:text-base text-[#fef08a] bg-[#141418] border border-zinc-800/80 rounded-2xl p-6 leading-relaxed whitespace-pre-wrap selection:bg-[#d4af37]/40">
            {transposedChords}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#0d0d11] flex items-center justify-between text-xs">
          <button
            onClick={handleCopyChords}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#d4af37]" />
                <span>Copy Chords</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadChords}
            className="px-4 py-2 rounded-xl bg-gold-gradient text-[#09090b] font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download Chart (.TXT)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
