import React, { useState } from 'react';
import { BookOpen, Sparkles, Copy, Check, RefreshCw, HeartHandshake, ShieldAlert, Share2 } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const ScriptureVisionSection: React.FC = () => {
  const { scriptures, showToast } = useMinistry();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const declarations = [
    "Today, I lift high praises to the King of Kings; every chain is broken and divine favor surrounds me like a shield.",
    "My heart is consecrated as an altar of fire; no darkness can abide where the pure praise of Jesus dwells.",
    "I worship in spirit and in truth; God is moving in my family, health, and purpose with unstoppable grace.",
    "Like the sound of a rushing mighty wind, the Holy Spirit fills my atmosphere with joy, healing, and resurrection power."
  ];

  const [currentDeclarationIndex, setCurrentDeclarationIndex] = useState(0);

  const handleCopyScripture = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast("Scripture verse copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleNextDeclaration = () => {
    setCurrentDeclarationIndex((prev) => (prev + 1) % declarations.length);
  };

  return (
    <section id="scripture" className="py-24 bg-[#0c0c0f] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Radiant golden backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241e12] border border-[#d4af37]/40 text-xs font-semibold text-[#fce999] uppercase tracking-widest mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#e6c364]" />
            <span>Biblical Foundation</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Scripture & <span className="text-gold-gradient">Prophetic Vision</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Our music is not built upon human intellect, but consecrated on the eternal, unshakeable Word of God.
          </p>
        </div>

        {/* Daily Praise Declaration Banner */}
        <div className="bg-gradient-to-r from-[#17140e] via-[#201a10] to-[#17140e] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-10 mb-16 shadow-[0_10px_35px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#fce999] font-bold mb-4">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>Daily Ministry Declaration of Faith</span>
          </div>

          <h3 className="font-cormorant italic text-2xl sm:text-3xl text-white font-normal max-w-4xl mx-auto mb-6 leading-relaxed">
            "{declarations[currentDeclarationIndex]}"
          </h3>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleNextDeclaration}
              className="px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Next Declaration</span>
            </button>

            <button
              onClick={() => handleCopyScripture(declarations[currentDeclarationIndex], 'dec')}
              className="px-4 py-2 rounded-xl bg-[#2a220e] hover:bg-[#382d12] border border-[#d4af37]/40 text-[#fce999] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedId === 'dec' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Declaration</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scripture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scriptures.map((scrip) => (
            <div
              key={scrip.id}
              className="p-8 rounded-2xl bg-[#121217] border border-zinc-800/80 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e6c364] bg-[#221c0e] border border-[#d4af37]/30 px-3 py-1 rounded-full">
                    {scrip.theme}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {scrip.version}
                  </span>
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white mb-4 group-hover:text-[#fce999] transition-colors">
                  {scrip.reference}
                </h3>

                <blockquote className="font-cormorant italic text-lg sm:text-xl text-zinc-300 leading-relaxed mb-6 border-l-2 border-[#d4af37] pl-4">
                  "{scrip.verse}"
                </blockquote>

                <div className="p-4 rounded-xl bg-[#0e0e12] border border-zinc-800/60 text-xs text-zinc-400 leading-relaxed mb-4">
                  <span className="font-semibold text-zinc-300 block mb-1">Ministry Reflection:</span>
                  {scrip.reflection}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end">
                <button
                  onClick={() => handleCopyScripture(`${scrip.reference} (${scrip.version}): "${scrip.verse}"`, scrip.id)}
                  className="text-xs text-zinc-400 hover:text-[#fce999] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy Scripture Passage"
                >
                  {copiedId === scrip.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Copy Scripture</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
