import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Phone, CheckCheck } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const { ministryInfo } = useMinistry();

  const rawNumber = "2348039675034";
  const displayPhone = "08039675034";

  const quickPrompts = [
    "I would like to book the choir for an upcoming worship event.",
    "I need prayers and spiritual counseling.",
    "Inquiring about song ministrations and chord sheets.",
    "I want to partner with De King's Family Music Ministry."
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customMsg || "Hello De King's Family Music Ministry, I would like to connect with you.";
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${rawNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#121217] border border-emerald-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.85)] overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-[#121217] border-b border-emerald-500/30 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-zinc-950 font-bold shadow-md">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#121217]" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-white leading-tight">
                  De King's Family
                </h4>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1 font-mono">
                  <span>WhatsApp: {displayPhone}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-zinc-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#0a0a0d] space-y-3">
            
            {/* Ministry Welcome Bubble */}
            <div className="bg-[#17171e] border border-zinc-800 rounded-2xl rounded-tl-sm p-3 text-xs text-zinc-200 space-y-1 max-w-[90%] shadow-sm">
              <p className="font-medium text-[#fce999]">
                Praise the Lord! 👋
              </p>
              <p className="leading-relaxed">
                Welcome to De King's Family Music Ministry WhatsApp line. How may we minister to you today?
              </p>
              <div className="text-[10px] text-zinc-500 flex items-center justify-end gap-1">
                <span>Online</span>
                <CheckCheck className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Select Quick Inquiry:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs px-3 py-2 rounded-xl bg-zinc-900 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-300 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-2">{prompt}</span>
                    <Send className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="relative">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center transition-all cursor-pointer shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs shadow-[0_8px_30px_rgba(16,185,129,0.45)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        id="floating-whatsapp-btn"
        aria-label="Chat with De King's Family Ministry on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 blur-sm group-hover:opacity-75 animate-pulse" />

        <div className="relative z-10 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="hidden sm:inline-block font-sans font-semibold tracking-wide">
            WhatsApp Hotline: <span className="font-mono text-emerald-100">{displayPhone}</span>
          </span>
          <span className="sm:hidden font-sans font-semibold">
            WhatsApp
          </span>
        </div>

        <span className="relative z-10 w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping" />
      </button>

    </div>
  );
};
