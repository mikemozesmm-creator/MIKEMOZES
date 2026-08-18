import React, { useState } from 'react';
import { Flame, Heart, Globe, Sparkles, Quote, ChevronLeft, ChevronRight, Award, Music, Radio } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const WorshipImpactSection: React.FC = () => {
  const { testimonies } = useMinistry();
  const [activeTestimonyIndex, setActiveTestimonyIndex] = useState(0);

  const worshipDimensions = [
    {
      title: "Prophetic Exaltation",
      subtitle: "Heaven's Frequency",
      desc: "Flowing beyond predetermined setlists to usher the congregation into genuine encounter with the manifest presence of God.",
      stat: "150+ Nights of Glory",
      icon: Flame
    },
    {
      title: "Choral & Orchestral Splendor",
      subtitle: "Sacred Classical & Gospel Harmony",
      desc: "Blending rich 4-part choir harmonies with dynamic brass, strings, and organ arrangements consecrated to praise.",
      stat: "50-Voice Mass Choir",
      icon: Music
    },
    {
      title: "Healing & Deliverance Atmosphere",
      subtitle: "Miracles in His Presence",
      desc: "When praises rise, chains shatter. Countless testimonies of physical healing, emotional wholeness, and spiritual release.",
      stat: "Thousands Touched",
      icon: Heart
    },
    {
      title: "Global Reach & Digital Sanctuary",
      subtitle: "Broadcasting Hope Worldwide",
      desc: "Streaming live worship ministrations, releasing downloadable chord charts, and reaching believers across 35+ countries.",
      stat: "35+ Nations Reached",
      icon: Globe
    }
  ];

  const handleNextTestimony = () => {
    setActiveTestimonyIndex((prev) => (prev + 1) % testimonies.length);
  };

  const handlePrevTestimony = () => {
    setActiveTestimonyIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);
  };

  const currentTestimony = testimonies[activeTestimonyIndex];

  return (
    <section id="worship-legacy" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241e12] border border-[#d4af37]/40 text-xs font-semibold text-[#fce999] uppercase tracking-widest mb-4">
            <Radio className="w-3.5 h-3.5 text-[#e6c364]" />
            <span>Kingdom Footprint</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Worship, <span className="text-gold-gradient">Impact & Legacy</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            The legacy of De King's Family is recorded not merely in musical recordings, but in lives transformed, churches revived, and worshipers anchored in truth.
          </p>
        </div>

        {/* 4 Worship Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {worshipDimensions.map((dim, i) => {
            const Icon = dim.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#141419] to-[#0d0d11] border border-zinc-800 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#221c0e] border border-[#d4af37]/30 flex items-center justify-center text-[#e6c364] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#e6c364] mb-1">
                    {dim.subtitle}
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-white mb-3">
                    {dim.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {dim.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800/80 text-xs font-mono font-bold text-[#fce999]">
                  {dim.stat}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ministry Legacy & Testimonials Carousel */}
        <div className="bg-gradient-to-r from-[#17140e] via-[#1b1710] to-[#17140e] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Legacy Overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#fce999] font-bold">
                <Quote className="w-4 h-4 text-[#d4af37]" />
                <span>Enduring Testimony</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-snug">
                Echoes of Glory from Church Leaders & Worshipers
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Across cities, conferences, and intimate prayer vigils, God continues to confirm the ministration of De King's Family with power and deep reverence.
              </p>
              
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handlePrevTestimony}
                  className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-[#fce999] hover:border-[#d4af37] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous testimony"
                  id="prev-testimony-btn"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-zinc-400 font-mono">
                  {activeTestimonyIndex + 1} of {testimonies.length}
                </span>
                <button
                  onClick={handleNextTestimony}
                  className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-[#fce999] hover:border-[#d4af37] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next testimony"
                  id="next-testimony-btn"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Col: Active Testimony Card */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0e0e12]/90 border border-zinc-800 relative">
                <Quote className="w-10 h-10 text-[#d4af37]/20 absolute top-4 right-4" />
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#fce999] mb-4">
                  "{currentTestimony.title}"
                </h4>
                <p className="text-zinc-300 text-sm sm:text-base italic leading-relaxed mb-6 font-serif">
                  "{currentTestimony.story}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/80">
                  <img
                    src={currentTestimony.avatar}
                    alt={currentTestimony.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/50"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white font-cinzel">
                      {currentTestimony.name}
                    </h5>
                    <p className="text-xs text-zinc-400">
                      {currentTestimony.location} • <span className="text-[#e6c364]">{currentTestimony.eventOrTrack}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
