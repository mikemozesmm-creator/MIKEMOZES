/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MinistryProvider, useMinistry } from './context/MinistryContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WorshipImpactSection } from './components/WorshipImpactSection';
import { MusicShowcase } from './components/MusicShowcase';
import { EventsSection } from './components/EventsSection';
import { ScriptureVisionSection } from './components/ScriptureVisionSection';
import { BookingSection } from './components/BookingSection';
import { GivingSection } from './components/GivingSection';
import { Footer } from './components/Footer';
import { PersistentAudioPlayer } from './components/PersistentAudioPlayer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LyricsModal } from './components/LyricsModal';
import { ChordsModal } from './components/ChordsModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { ContentEditorModal } from './components/ContentEditorModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsModal } from './components/TermsModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AdBanner } from './components/AdBanner';
import { CheckCircle2, Bell } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useMinistry();
  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-[#1a1710] border border-[#d4af37]/70 text-[#fef08a] px-4 py-3 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center gap-3 text-xs sm:text-sm font-medium backdrop-blur-md max-w-sm sm:max-w-md">
        <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0 text-[#e6c364]">
          <Bell className="w-3.5 h-3.5" />
        </div>
        <span className="leading-snug">{toastMessage}</span>
      </div>
    </div>
  );
};

const MinistryApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* Fixed Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Content Flow */}
      <main className="flex-1">
        <Hero />
        
        {/* Top Google Ads Banner */}
        <AdBanner placement="top-banner" className="my-8" />

        <AboutSection />
        <WorshipImpactSection />
        <MusicShowcase />
        <EventsSection />

        {/* Mid-Section Google Ads Banner */}
        <AdBanner placement="mid-section" className="my-10" />

        <ScriptureVisionSection />
        <BookingSection />
        <GivingSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Worship Synthesizer & Audio Player */}
      <PersistentAudioPlayer />

      {/* Floating Hovering WhatsApp Hotline Button */}
      <FloatingWhatsApp />

      {/* Interactive Modals */}
      <LyricsModal />
      <ChordsModal />
      <BookingSuccessModal />
      <ContentEditorModal />
      <AdminLoginModal />
      <PrivacyPolicyModal />
      <TermsModal />

      {/* Cookie Consent Policy Banner */}
      <CookieConsentBanner />

      {/* Toast Notification Container */}
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <MinistryProvider>
      <MinistryApp />
    </MinistryProvider>
  );
}
