import React from 'react';
import { X, Copy, Download, BookOpen, Music, Check } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const LyricsModal: React.FC = () => {
  const { isLyricsModalOpen, setIsLyricsModalOpen, lyricsTrack, showToast } = useMinistry();
  const [copied, setCopied] = React.useState(false);

  if (!isLyricsModalOpen || !lyricsTrack) return null;

  const handleCopyLyrics = () => {
    if (navigator.clipboard) {
      const fullText = `${lyricsTrack.title.toUpperCase()}\n${lyricsTrack.subtitle}\nKey: ${lyricsTrack.key}\nScripture: ${lyricsTrack.scriptureReference}\n\n${lyricsTrack.lyrics.join('\n')}`;
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      showToast(`Lyrics for "${lyricsTrack.title}" copied to clipboard!`);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadLyrics = () => {
    const fullText = `DE KING'S FAMILY MUSIC MINISTRY
TITLE: ${lyricsTrack.title}
ALBUM: ${lyricsTrack.album} (${lyricsTrack.releaseYear})
KEY: ${lyricsTrack.key} | BPM: ${lyricsTrack.bpm}
SCRIPTURE FOCUS: ${lyricsTrack.scriptureReference}
LEAD VOCAL: ${lyricsTrack.featuredLead}

---------------------------------------------------
LYRICS
---------------------------------------------------

${lyricsTrack.lyrics.join('\n')}

All Rights Reserved © De King's Family Music Ministry
Website: dekingsfamilymusic.org
`;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lyricsTrack.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_lyrics.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded lyrics sheet for "${lyricsTrack.title}"`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111116] border border-[#d4af37]/50 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 bg-[#17140e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#d4af37]/40 shrink-0">
              <img
                src={lyricsTrack.coverImage}
                alt={lyricsTrack.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {lyricsTrack.title}
              </h3>
              <p className="text-xs text-zinc-400">
                {lyricsTrack.subtitle} • Key {lyricsTrack.key}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLyricsModalOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scripture & Meta info banner */}
        <div className="px-6 py-3 bg-[#1e190f] border-b border-[#d4af37]/30 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#fce999]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Scripture Anchor: <strong>{lyricsTrack.scriptureReference}</strong></span>
          </div>
          <div className="text-zinc-400">
            Lead: <span className="text-zinc-200">{lyricsTrack.featuredLead}</span>
          </div>
        </div>

        {/* Lyrics Body Scroll Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4 font-cormorant text-lg sm:text-xl text-zinc-200 leading-relaxed">
          {lyricsTrack.lyrics.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.startsWith('[')
                  ? 'font-sans font-bold text-xs uppercase tracking-widest text-[#e6c364] pt-3 pb-1'
                  : line === ''
                  ? 'h-2'
                  : 'text-zinc-100'
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-[#0d0d11] flex items-center justify-between text-xs">
          <button
            onClick={handleCopyLyrics}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied Lyrics</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#d4af37]" />
                <span>Copy Lyrics</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadLyrics}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-[#09090b] font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Lyrics (.TXT)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
