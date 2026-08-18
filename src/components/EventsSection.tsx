import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Download, Sparkles, CheckCircle2, Users } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { EventItem } from '../types';

export const EventsSection: React.FC = () => {
  const { events, showToast } = useMinistry();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resSeats, setResSeats] = useState('1');

  // Countdown timer for next upcoming event
  const nextEvent = events[0];
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 38,
    hours: 14,
    minutes: 22,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDownloadIcs = (event: EventItem) => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//De Kings Family Music Ministry//Events//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.tagline} - ${event.details}`,
      `LOCATION:${event.venue}, ${event.city}, ${event.country}`,
      `DTSTART:${event.date.replace(/-/g, '')}T183000Z`,
      `DTEND:${event.date.replace(/-/g, '')}T220000Z`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Calendar invitation downloaded for "${event.title}"`);
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resEmail) return;
    setReservationModalOpen(false);
    showToast(`Seat reserved for ${resName} (${resSeats} attendee${parseInt(resSeats) > 1 ? 's' : ''}) at "${selectedEvent?.title}"! Confirmation sent.`);
    setResName('');
    setResEmail('');
  };

  const openReservation = (event: EventItem) => {
    setSelectedEvent(event);
    setReservationModalOpen(true);
  };

  return (
    <section id="events" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Glow highlight */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241e12] border border-[#d4af37]/40 text-xs font-semibold text-[#fce999] uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#e6c364]" />
            <span>Sacred Assemblies & Tours</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Upcoming <span className="text-gold-gradient">Ministry Gatherings</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Experience the unfiltered presence of God live. Join us in worship, prophetic intercession, and holy convocations across cities worldwide.
          </p>
        </div>

        {/* Featured Next Event Countdown Banner */}
        {nextEvent && (
          <div className="bg-gradient-to-r from-[#1b1710] via-[#241e14] to-[#1b1710] border border-[#d4af37]/50 rounded-3xl p-8 sm:p-10 mb-16 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#3d3113] border border-[#d4af37]/60 text-xs font-bold uppercase tracking-wider text-[#fce999]">
                    Next Gathering Countdown
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">{nextEvent.eventType}</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {nextEvent.title}
                </h3>
                <p className="text-[#fce999] text-sm font-medium">
                  {nextEvent.tagline}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-zinc-300 pt-2">
                  <div className="flex items-center gap-1.5 bg-[#141418] px-3 py-1.5 rounded-lg border border-zinc-800">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    <span>{nextEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#141418] px-3 py-1.5 rounded-lg border border-zinc-800">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>{nextEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#141418] px-3 py-1.5 rounded-lg border border-zinc-800">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    <span>{nextEvent.venue}, {nextEvent.city}</span>
                  </div>
                </div>
              </div>

              {/* Countdown Digits */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6">
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  <div className="bg-[#121217] border border-[#d4af37]/40 rounded-xl p-3 sm:p-4 min-w-[64px] sm:min-w-[74px]">
                    <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fce999]">
                      {timeLeft.days}
                    </div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Days</div>
                  </div>
                  <div className="bg-[#121217] border border-[#d4af37]/40 rounded-xl p-3 sm:p-4 min-w-[64px] sm:min-w-[74px]">
                    <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fce999]">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Hours</div>
                  </div>
                  <div className="bg-[#121217] border border-[#d4af37]/40 rounded-xl p-3 sm:p-4 min-w-[64px] sm:min-w-[74px]">
                    <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fce999]">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Mins</div>
                  </div>
                  <div className="bg-[#121217] border border-[#d4af37]/40 rounded-xl p-3 sm:p-4 min-w-[64px] sm:min-w-[74px]">
                    <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#e6c364] animate-pulse">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Secs</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => openReservation(nextEvent)}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    Reserve Free Seat
                  </button>
                  <button
                    onClick={() => handleDownloadIcs(nextEvent)}
                    className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Add to Apple / Google / Outlook Calendar"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span className="hidden sm:inline">Add to Calendar</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* All Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#121216] border border-zinc-800/80 hover:border-[#d4af37]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e6c364] bg-[#221c0e] border border-[#d4af37]/30 px-3 py-1 rounded-full">
                    {event.eventType}
                  </span>
                  <button
                    onClick={() => handleDownloadIcs(event)}
                    className="text-zinc-400 hover:text-[#fce999] text-xs flex items-center gap-1 cursor-pointer"
                    title="Download Calendar (.ics) File"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>.ICS</span>
                  </button>
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#fce999] transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-[#fce999] mb-4 font-medium">
                  {event.tagline}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {event.details}
                </p>

                <div className="space-y-2 text-xs text-zinc-300 py-3 border-y border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    <span>{event.venue}, {event.city}, {event.country}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free Registration
                </span>
                <button
                  onClick={() => openReservation(event)}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-[#252013] border border-[#d4af37]/40 text-[#fce999] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Seat Reservation Modal */}
      {reservationModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121217] border border-[#d4af37]/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
              Reserve Seat for <span className="text-[#fce999]">{selectedEvent.title}</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              {selectedEvent.date} at {selectedEvent.venue} ({selectedEvent.city})
            </p>

            <form onSubmit={handleReserve} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  placeholder="e.g. Bro. Emmanuel Taylor"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={resEmail}
                  onChange={(e) => setResEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1">
                  Number of Seats
                </label>
                <select
                  value={resSeats}
                  onChange={(e) => setResSeats(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="1">1 Seat (Individual)</option>
                  <option value="2">2 Seats (Couple / Family)</option>
                  <option value="5">5 Seats (Small Group / Choir)</option>
                  <option value="10">10 Seats (Church Delegation)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setReservationModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-gradient text-[#09090b] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
