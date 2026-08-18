import React from 'react';
import { X, CheckCircle2, Calendar, MapPin, Users, Phone, Mail, Download } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const BookingSuccessModal: React.FC = () => {
  const { isBookingSuccessModalOpen, setIsBookingSuccessModalOpen, lastBookingSubmission, ministryInfo, showToast } = useMinistry();

  if (!isBookingSuccessModalOpen || !lastBookingSubmission) return null;

  const referenceCode = `DKF-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleDownloadConfirmation = () => {
    const text = `
DE KING'S FAMILY MUSIC MINISTRY
MINISTRATION INQUIRY CONFIRMATION SLIP

Reference Code: ${referenceCode}
Date Submitted: ${new Date().toLocaleDateString()}

Host Organization: ${lastBookingSubmission.organizationName}
Contact Person: ${lastBookingSubmission.contactPerson}
Email: ${lastBookingSubmission.email}
Phone: ${lastBookingSubmission.phone}

Event Category: ${lastBookingSubmission.eventType}
Event Date: ${lastBookingSubmission.eventDate}
Location: ${lastBookingSubmission.cityState}
Ministers Requested: ${lastBookingSubmission.ministersRequested}
Expected Attendance: ${lastBookingSubmission.expectedAttendance}
Special Notes: ${lastBookingSubmission.specialNotes || 'None'}

Status: Received & Under Pastoral Review
Our administration will contact you within 24-48 business hours.

Ministry Office: ${ministryInfo.email} | ${ministryInfo.phone}
`.trim();

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking_confirmation_${referenceCode}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded booking confirmation slip.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121217] border border-[#d4af37]/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={() => setIsBookingSuccessModalOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#272010] border border-[#d4af37]/50 flex items-center justify-center text-[#e6c364] mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#fce999] font-bold">
            Inquiry Transmitted Successfully
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
            Thank You, {lastBookingSubmission.contactPerson}
          </h3>
          <p className="text-xs text-zinc-400 mt-2">
            Reference: <span className="font-mono text-[#e6c364] font-bold">{referenceCode}</span>
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-[#0a0a0d] border border-zinc-800 space-y-2 text-xs text-zinc-300 mb-6">
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Host Church/Org:</span>
            <span className="text-white font-medium">{lastBookingSubmission.organizationName}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Event Type:</span>
            <span className="text-[#fce999]">{lastBookingSubmission.eventType}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Date & Location:</span>
            <span className="text-white">{lastBookingSubmission.eventDate} • {lastBookingSubmission.cityState}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-zinc-500">Ensemble:</span>
            <span className="text-[#e6c364]">{lastBookingSubmission.ministersRequested}</span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center mb-6 leading-relaxed">
          A ministry administrator will review your proposed dates and sound requirements, then follow up via email at <strong className="text-zinc-200">{lastBookingSubmission.email}</strong>.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadConfirmation}
            className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#d4af37]/40 text-[#fce999] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Slip</span>
          </button>
          <button
            onClick={() => setIsBookingSuccessModalOpen(false)}
            className="flex-1 py-3 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
