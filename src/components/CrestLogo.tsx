import React from 'react';

interface CrestLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`} id="crest-logo-container">
      {/* Outer Golden Glow Circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4af37]/30 to-[#f5e6a8]/10 blur-[4px]" />
      
      {/* SVG Royal Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)]"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="40%" stopColor="#E2B842" />
            <stop offset="70%" stopColor="#C69526" />
            <stop offset="100%" stopColor="#8A600B" />
          </linearGradient>
          <linearGradient id="shieldBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C1810" />
            <stop offset="100%" stopColor="#0B0A08" />
          </linearGradient>
        </defs>

        {/* Shield Border & Background */}
        <path
          d="M50 8 L84 20 C84 55 50 88 50 88 C50 88 16 55 16 20 Z"
          fill="url(#shieldBg)"
          stroke="url(#goldGradient)"
          strokeWidth="2.5"
        />

        {/* Inner Filigree Contour */}
        <path
          d="M50 14 L78 24 C78 50 50 78 50 78 C50 78 22 50 22 24 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          strokeDasharray="2 1.5"
          opacity="0.75"
        />

        {/* The Royal Crown */}
        <path
          d="M34 38 L37 28 L43 33 L50 24 L57 33 L63 28 L66 38 Z"
          fill="url(#goldGradient)"
        />
        <circle cx="50" cy="22" r="2.2" fill="#FFF2B2" />
        <circle cx="37" cy="26" r="1.5" fill="#FFF2B2" />
        <circle cx="63" cy="26" r="1.5" fill="#FFF2B2" />

        {/* The Golden Lyre / Harp & Cross Motif */}
        {/* Central Cross */}
        <rect x="48" y="42" width="4" height="24" rx="1" fill="url(#goldGradient)" />
        <rect x="42" y="47" width="16" height="3.5" rx="1" fill="url(#goldGradient)" />

        {/* Harp Curved Arms */}
        <path
          d="M36 44 C34 54 38 64 46 68"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M64 44 C66 54 62 64 54 68"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Harp Strings */}
        <line x1="41" y1="46" x2="44" y2="66" stroke="url(#goldGradient)" strokeWidth="0.8" opacity="0.85" />
        <line x1="59" y1="46" x2="56" y2="66" stroke="url(#goldGradient)" strokeWidth="0.8" opacity="0.85" />

        {/* Stars of Excellence */}
        <circle cx="50" cy="74" r="1.8" fill="#FFF2B2" />
      </svg>
    </div>
  );
};
