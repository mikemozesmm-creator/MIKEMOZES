import React from 'react';
import { Target, Compass, Sparkles, BookOpen, Shield, HeartHandshake, Mic2, Music2 } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { initialLeaders } from '../data/initialContent';
import { CrestLogo } from './CrestLogo';

export const AboutSection: React.FC = () => {
  const { ministryInfo } = useMinistry();

  const pillars = [
    {
      title: "Prophetic Worship",
      desc: "Ministration that transcends entertainment, tuning into the rhythm of heaven to unlock spiritual liberty.",
      icon: Mic2
    },
    {
      title: "Biblical Purity",
      desc: "Every lyric, choral arrangement, and anthem is firmly rooted in uncompromised scripture.",
      icon: BookOpen
    },
    {
      title: "Atmosphere of Healing",
      desc: "Cultivating sacred space where the sick are healed, broken hearts restored, and burdens lifted in God's presence.",
      icon: Shield
    },
    {
      title: "Generational Transfer",
      desc: "Mentoring emerging psalmists, instrumentalists, and choirs to sustain kingdom worship across eras.",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0c0c0f] relative overflow-hidden border-t border-zinc-800/80">
      {/* Decorative Gold Accent Flares */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241e12] border border-[#d4af37]/40 text-xs font-semibold text-[#fce999] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#e6c364]" />
            <span>The Sacred Mandate</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-gold-gradient">De King's Family</span>
          </h2>
          <p className="text-[#a1a1aa] text-base sm:text-lg leading-relaxed">
            Founded with a divine burden to re-establish true worship altars, De King's Family Music Ministry has evolved into an international sanctuary of prophetic song, choral excellence, and generational revival.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Vision Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#161512] to-[#101013] border border-[#d4af37]/30 relative overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 rounded-xl bg-[#2a2312] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364] mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Our Vision
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed mb-6 font-light">
              {ministryInfo.vision}
            </p>
            <div className="p-4 rounded-xl bg-[#0d0c09] border border-zinc-800 text-xs text-[#e6c364] font-mono italic">
              "Thy kingdom come. Thy will be done in earth, as it is in heaven." — Matthew 6:10
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#161512] to-[#101013] border border-[#d4af37]/30 relative overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 rounded-xl bg-[#2a2312] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364] mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Our Mission
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed mb-6 font-light">
              {ministryInfo.mission}
            </p>
            <div className="p-4 rounded-xl bg-[#0d0c09] border border-zinc-800 text-xs text-[#e6c364] font-mono italic">
              "Let the word of Christ dwell in you richly... singing psalms, hymns and spiritual songs." — Colossians 3:16
            </div>
          </div>

        </div>

        {/* 4 Core Pillars of Ministration */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Pillars of Our <span className="text-gold-gradient">Ministration</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#121216] border border-zinc-800/80 hover:border-[#d4af37]/50 hover:bg-[#181611] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#221c0e] border border-[#d4af37]/30 flex items-center justify-center text-[#e6c364] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-[#fce999] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ministry Leadership Section */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 uppercase tracking-wider mb-3">
              Spiritual Shepherds & Directors
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Ministry <span className="text-gold-gradient">Leadership</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialLeaders.map((leader, i) => (
              <div
                key={i}
                className="bg-[#121217] rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col group shadow-lg"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#e6c364] font-semibold mb-1">
                      {leader.role}
                    </div>
                    <h4 className="font-cinzel text-xl font-bold text-white mb-3">
                      {leader.name}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
