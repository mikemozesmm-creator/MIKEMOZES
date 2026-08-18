import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Users, Send, Heart, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { BookingFormData, PrayerRequestData } from '../types';

export const BookingSection: React.FC = () => {
  const { ministryInfo, submitBooking, submitPrayerRequest, showToast } = useMinistry();
  const [activeTab, setActiveTab] = useState<'booking' | 'prayer'>('booking');

  // Booking Form State
  const [bookingData, setBookingData] = useState<BookingFormData>({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: 'Sunday Worship Ministration',
    eventDate: '',
    eventTime: '',
    venueName: '',
    cityState: '',
    expectedAttendance: '200 - 500 Attendees',
    soundProvided: 'Full Pro Audio',
    ministersRequested: 'Full Choir & Band',
    specialNotes: ''
  });

  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Prayer Request Form State
  const [prayerData, setPrayerData] = useState<PrayerRequestData>({
    name: '',
    email: '',
    phone: '',
    prayerSubject: '',
    details: '',
    isConfidential: true
  });
  const [isSubmittingPrayer, setIsSubmittingPrayer] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    try {
      await submitBooking(bookingData);
      setBookingData({
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        eventType: 'Sunday Worship Ministration',
        eventDate: '',
        eventTime: '',
        venueName: '',
        cityState: '',
        expectedAttendance: '200 - 500 Attendees',
        soundProvided: 'Full Pro Audio',
        ministersRequested: 'Full Choir & Band',
        specialNotes: ''
      });
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingPrayer(true);
    try {
      await submitPrayerRequest(prayerData);
      setPrayerData({
        name: '',
        email: '',
        phone: '',
        prayerSubject: '',
        details: '',
        isConfidential: true
      });
    } finally {
      setIsSubmittingPrayer(false);
    }
  };

  const handleDownloadRider = () => {
    const riderText = `
DE KING'S FAMILY MUSIC MINISTRY
OFFICIAL MINISTRATION RIDER & GENERAL PROTOCOL

1. SPIRITUAL ALIGNMENT
   - All ministry engagements are preceded by intercession and consecrated fasting.
   - The ministry seeks to serve the local pastor's spiritual vision.

2. ENSEMBLE SPECIFICATIONS
   - Full Choir: 12-18 Vocalists + 4-Piece Band (Keys, Bass, Drums, Lead Guitar/Sax).
   - Acoustic Encounter: 4 Vocalists + Acoustic Guitar / Grand Piano.

3. AUDIO & STAGE REQUIREMENTS
   - Front of House: High-definition digital console (Behringer X32 / Allen & Heath / Yamaha).
   - In-Ear Monitors (IEM) or dedicated stage monitor mixes.
   - 6-8 Wireless Handheld Vocal Microphones (Shure Beta 58A or equivalent).
   - Direct Boxes (DIs) for keyboard rigs and acoustic instruments.

4. HOSPITALITY & LOGISTICS
   - Clean, quiet prayer/green room with water and light refreshments.
   - Hotel accommodation for out-of-state/international engagements.

For inquiries: ${ministryInfo.email} | Phone: ${ministryInfo.phone}
`.trim();

    const blob = new Blob([riderText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "dekings_ministry_rider_protocol.txt";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded Ministry Technical Rider & Protocol guidelines.");
  };

  return (
    <section id="booking" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Decorative Glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241e12] border border-[#d4af37]/40 text-xs font-semibold text-[#fce999] uppercase tracking-widest mb-4">
            <Phone className="w-3.5 h-3.5 text-[#e6c364]" />
            <span>Connect With Us</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Contact & <span className="text-gold-gradient">Ministration Booking</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Invite De King's Family Music Ministry to lead worship at your church conference, revival, concert, or special praise encounter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Details & Ministry Rider */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ministry Contact Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121217] border border-zinc-800 space-y-6 shadow-lg">
              <h3 className="font-cinzel text-xl font-bold text-white border-b border-zinc-800 pb-4">
                Ministry Office
              </h3>

              <div className="space-y-4 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#221c0e] border border-[#d4af37]/30 flex items-center justify-center text-[#e6c364] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">General Inquiries</div>
                    <div className="text-white font-medium">{ministryInfo.phone}</div>
                    <div className="text-xs text-zinc-400">{ministryInfo.altPhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">WhatsApp Booking & Prayer</div>
                    <a
                      href="https://wa.me/2348039675034?text=Hello%20De%20King's%20Family%20Music%20Ministry,%20I%20would%20like%20to%20connect%20with%20you."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-300 font-mono font-medium block"
                    >
                      08039675034
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#221c0e] border border-[#d4af37]/30 flex items-center justify-center text-[#e6c364] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Email Bookings</div>
                    <a href={`mailto:${ministryInfo.email}`} className="text-[#fce999] hover:underline">
                      {ministryInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#221c0e] border border-[#d4af37]/30 flex items-center justify-center text-[#e6c364] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Sanctuary & Studio</div>
                    <div className="text-zinc-300">{ministryInfo.address}</div>
                    <div className="text-xs text-zinc-400">{ministryInfo.cityCountry}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-red-400 uppercase tracking-wider font-semibold">24/7 Prayer Line</div>
                    <div className="text-white font-medium">{ministryInfo.emergencyPrayerLine}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ministry Technical Rider Download Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b1710] to-[#12110c] border border-[#d4af37]/40 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-[#e6c364]" />
                <h4 className="font-cinzel text-lg font-bold text-white">
                  Technical Rider & Protocol
                </h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Review our complete sound specifications, stage setup requirements, and hospitality guidelines for event planners.
              </p>
              <button
                onClick={handleDownloadRider}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#d4af37]/50 text-[#fce999] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="download-rider-btn"
              >
                <Download className="w-4 h-4" />
                <span>Download Rider (.TXT)</span>
              </button>
            </div>

          </div>

          {/* Right Column: Tabbed Booking & Prayer Form */}
          <div className="lg:col-span-8">
            <div className="bg-[#121217] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
              
              {/* Form Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 mb-8 max-w-md">
                <button
                  type="button"
                  onClick={() => setActiveTab('booking')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'booking'
                      ? 'bg-gold-gradient text-[#09090b] shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  id="tab-booking-form"
                >
                  Ministration Booking
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('prayer')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'prayer'
                      ? 'bg-gold-gradient text-[#09090b] shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  id="tab-prayer-form"
                >
                  Prayer Request
                </button>
              </div>

              {activeTab === 'booking' ? (
                /* Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-6" id="ministry-booking-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Host Organization / Church *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.organizationName}
                        onChange={(e) => setBookingData({ ...bookingData, organizationName: e.target.value })}
                        placeholder="e.g. Grace Cathedral International"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Contact Person & Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.contactPerson}
                        onChange={(e) => setBookingData({ ...bookingData, contactPerson: e.target.value })}
                        placeholder="e.g. Pastor James Wilson"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        placeholder="contact@church.org"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Type of Event *
                      </label>
                      <select
                        value={bookingData.eventType}
                        onChange={(e) => setBookingData({ ...bookingData, eventType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Sunday Worship Ministration">Sunday Worship Ministration</option>
                        <option value="Revival & Fire Conference">Revival & Fire Conference</option>
                        <option value="Gospel Praise Concert">Gospel Praise Concert</option>
                        <option value="Youth & Young Adult Encounter">Youth & Young Adult Encounter</option>
                        <option value="Worship Workshop & Masterclass">Worship Workshop & Masterclass</option>
                        <option value="Other Kingdom Gathering">Other Kingdom Gathering</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Proposed Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingData.eventDate}
                        onChange={(e) => setBookingData({ ...bookingData, eventDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Expected Attendance
                      </label>
                      <select
                        value={bookingData.expectedAttendance}
                        onChange={(e) => setBookingData({ ...bookingData, expectedAttendance: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Under 200 Attendees">Under 200 Attendees</option>
                        <option value="200 - 500 Attendees">200 - 500 Attendees</option>
                        <option value="500 - 1,500 Attendees">500 - 1,500 Attendees</option>
                        <option value="1,500 - 5,000 Attendees">1,500 - 5,000 Attendees</option>
                        <option value="5,000+ Stadium / Mega Gathering">5,000+ Stadium / Mega Gathering</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Venue & City, Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.cityState}
                        onChange={(e) => setBookingData({ ...bookingData, cityState: e.target.value })}
                        placeholder="e.g. Main Auditorium, Houston TX"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Ministers Ensemble Requested
                      </label>
                      <select
                        value={bookingData.ministersRequested}
                        onChange={(e) => setBookingData({ ...bookingData, ministersRequested: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Full Choir & Band">Full Choir & Band (14-20 Members)</option>
                        <option value="Acoustic Worship Team">Acoustic Worship Team (4-6 Members)</option>
                        <option value="Lead Vocalist & Director">Lead Vocalist & Director (2-3 Members)</option>
                        <option value="Custom Ensemble">Custom Ensemble (Discuss with Office)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Special Theme, Scripture or Prayer Focus
                    </label>
                    <textarea
                      rows={3}
                      value={bookingData.specialNotes}
                      onChange={(e) => setBookingData({ ...bookingData, specialNotes: e.target.value })}
                      placeholder="Share details about your conference theme, expectations, or special songs requested..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full py-4 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-sm uppercase tracking-widest hover:brightness-110 shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    id="submit-booking-btn"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmittingBooking ? 'Transmitting Request...' : 'Submit Ministration Inquiry'}</span>
                  </button>
                </form>
              ) : (
                /* Prayer Request Form */
                <form onSubmit={handlePrayerSubmit} className="space-y-6" id="ministry-prayer-form">
                  <div className="p-4 rounded-xl bg-[#221c0e] border border-[#d4af37]/30 text-xs text-[#fce999] leading-relaxed flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-[#e6c364]" />
                    <span>
                      Every prayer request submitted is held in sacred confidentiality. Our ministry intercessors pray over each request during our dawn watch.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={prayerData.name}
                        onChange={(e) => setPrayerData({ ...prayerData, name: e.target.value })}
                        placeholder="Sister / Brother..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={prayerData.email}
                        onChange={(e) => setPrayerData({ ...prayerData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Prayer Subject / Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={prayerData.prayerSubject}
                      onChange={(e) => setPrayerData({ ...prayerData, prayerSubject: e.target.value })}
                      placeholder="e.g. Healing, Family Breakthrough, Spiritual Fire, Child Consecration"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Details of Prayer Request *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={prayerData.details}
                      onChange={(e) => setPrayerData({ ...prayerData, details: e.target.value })}
                      placeholder="Describe your situation in faith. 'For where two or three gather in my name, there am I with them.' (Matthew 18:20)"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="confidential-chk"
                      checked={prayerData.isConfidential}
                      onChange={(e) => setPrayerData({ ...prayerData, isConfidential: e.target.checked })}
                      className="w-4 h-4 accent-[#d4af37] rounded"
                    />
                    <label htmlFor="confidential-chk" className="text-xs text-zinc-400">
                      Keep this request confidential for the pastoral intercessory team only.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingPrayer}
                    className="w-full py-4 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-sm uppercase tracking-widest hover:brightness-110 shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{isSubmittingPrayer ? 'Submitting Prayer...' : 'Submit Prayer Request'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
