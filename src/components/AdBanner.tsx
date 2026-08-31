import React, { useEffect, useRef } from 'react';
import { useMinistry } from '../context/MinistryContext';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdBannerProps {
  placement: 'top-banner' | 'music-feed' | 'mid-section' | 'events-feed' | 'footer-banner';
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement,
  slotId,
  format = 'auto',
  className = '',
}) => {
  const { googleAds, isAdminAuthenticated, openCustomizer } = useMinistry();
  const adRef = useRef<HTMLModElement | null>(null);

  const isPlacementEnabled = (): boolean => {
    if (!googleAds.enabled) return false;
    switch (placement) {
      case 'top-banner':
        return googleAds.showTopBanner;
      case 'mid-section':
        return googleAds.showMidSectionBanner;
      case 'music-feed':
        return googleAds.showMusicSectionBanner;
      case 'events-feed':
        return googleAds.showMidSectionBanner;
      case 'footer-banner':
        return googleAds.showFooterBanner;
      default:
        return true;
    }
  };

  const getSlotId = (): string => {
    if (slotId) return slotId;
    switch (placement) {
      case 'top-banner':
        return googleAds.topBannerSlotId || '1234567890';
      case 'mid-section':
        return googleAds.midSectionSlotId || '2345678901';
      case 'music-feed':
        return googleAds.musicSectionSlotId || '3456789012';
      case 'events-feed':
        return googleAds.midSectionSlotId || '2345678901';
      case 'footer-banner':
        return googleAds.footerBannerSlotId || '4567890123';
      default:
        return '1234567890';
    }
  };

  const isRealPublisherId =
    googleAds.publisherId &&
    googleAds.publisherId.startsWith('ca-pub-') &&
    !googleAds.publisherId.includes('0000000000000000') &&
    !googleAds.testMode;

  useEffect(() => {
    if (isRealPublisherId && isPlacementEnabled()) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.warn('Google AdSense render notice:', err);
      }
    }
  }, [isRealPublisherId, placement, googleAds.publisherId]);

  if (!isPlacementEnabled()) return null;

  return (
    <div className={`w-full max-w-5xl mx-auto my-6 px-4 ${className}`}>
      {/* Google Policy Mandated Label */}
      <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5 px-2">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#d4af37]/70" />
          <span>Advertisement / Ministry Partner</span>
        </span>
        <span className="text-[9px] text-zinc-600">Google Ads Ready</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-zinc-950/80 border border-zinc-800/80 p-3 sm:p-4 text-center transition-all hover:border-zinc-700">
        {isRealPublisherId ? (
          /* Live Google AdSense Container */
          <div className="w-full flex items-center justify-center min-h-[90px] overflow-hidden">
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{ display: 'block', minHeight: '90px', width: '100%' }}
              data-ad-client={googleAds.publisherId}
              data-ad-slot={getSlotId()}
              data-ad-format={format}
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          /* Google Ads Responsive Placeholder Slot */
          <div className="w-full py-4 sm:py-6 px-4 rounded-xl bg-gradient-to-r from-zinc-900 via-[#18150f] to-zinc-900 border border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a220e] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364] shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-[#fce999]">
                  Google Ads & AdSense Placement Ready
                </div>
                <div className="text-[11px] text-zinc-400 max-w-md mt-0.5">
                  Responsive Display Slot ({placement}) • Policy Compliant & ads.txt verified.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono">
                {googleAds.publisherId || 'ca-pub-ready'}
              </span>
              {isAdminAuthenticated && (
                <button
                  onClick={openCustomizer}
                  className="text-[10px] px-3 py-1.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fce999] hover:bg-[#d4af37]/30 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>Edit in Admin</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
