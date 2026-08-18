import React, { useState } from 'react';
import { Heart, Landmark, Copy, Check, Sparkles, Shield, Gift, ArrowRight } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const GivingSection: React.FC = () => {
  const { ministryInfo, showToast } = useMinistry();
  const [copiedBank, setCopiedBank] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState<string>('');

  const handleCopyAccount = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Bank: ${ministryInfo.banking.bankName}\nAccount Name: ${ministryInfo.banking.accountName}\nAccount No: ${ministryInfo.banking.accountNumber}\nSort Code: ${ministryInfo.banking.sortCode || ''}\nSWIFT: ${ministryInfo.banking.swiftCode || ''}`
      );
      setCopiedBank(true);
      showToast("Bank giving details copied to clipboard!");
      setTimeout(() => setCopiedBank(false), 3000);
    }
  };

  const givingPillars = [
    {
      title: "Global Worship Outreaches",
      desc: "Funding free praise nights, city-wide crusades, and bringing the gospel into neglected regions.",
      icon: Sparkles
    },
    {
      title: "Anthem & Sound Production",
      desc: "Enabling the recording of spirit-breathed music, mass choir arrangements, and chord chart distribution.",
      icon: Gift
    },
    {
      title: "Youth Worship Academy",
      desc: "Sponsoring musical instruments, vocal training, and discipleship for underprivileged young psalmists.",
      icon: Shield
    }
  ];

  const handleGivingClick = (method: string) => {
    const amount = customAmount || selectedSeed || '50';
    showToast(`Redirecting to secure ${method} portal for $${amount} seed...`);
  };

  return (
    <section id="giving" className="py-24 bg-[#0c0c0f] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Golden glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241e12] border border-[#d4af37]/40 text-xs font-semibold text-[#fce999] uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 text-[#e6c364]" />
            <span>Kingdom Partnership</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Partner With <span className="text-gold-gradient">The Sound</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            "Give, and it will be given to you. A good measure, pressed down, shaken together and running over..." — Luke 6:38
          </p>
        </div>

        {/* Giving Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {givingPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#221c0e] border border-[#d4af37]/30 flex items-center justify-center text-[#e6c364] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banking & Online Seed Container */}
        <div className="bg-gradient-to-r from-[#17140e] via-[#1f1a12] to-[#17140e] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Col: Bank Wire Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <Landmark className="w-6 h-6 text-[#e6c364]" />
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  Direct Bank Giving Details
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e0e12] border border-zinc-800 space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Bank Name:</span>
                  <span className="text-white font-semibold">{ministryInfo.banking.bankName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Account Name:</span>
                  <span className="text-[#fce999] font-semibold truncate max-w-[200px] sm:max-w-none text-right">
                    {ministryInfo.banking.accountName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Account Number:</span>
                  <span className="text-white font-bold text-sm tracking-wider">{ministryInfo.banking.accountNumber}</span>
                </div>
                {ministryInfo.banking.sortCode && (
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">Sort Code:</span>
                    <span className="text-zinc-300">{ministryInfo.banking.sortCode}</span>
                  </div>
                )}
                {ministryInfo.banking.swiftCode && (
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">SWIFT / BIC:</span>
                    <span className="text-zinc-300">{ministryInfo.banking.swiftCode}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-500">Reference / Purpose:</span>
                  <span className="text-emerald-400 font-sans text-xs">{ministryInfo.banking.purpose}</span>
                </div>
              </div>

              <button
                onClick={handleCopyAccount}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#d4af37]/40 text-[#fce999] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="copy-bank-details-btn"
              >
                {copiedBank ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Bank Details Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy All Bank Account Details</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Col: Instant Seed Selector */}
            <div className="lg:col-span-6 space-y-6 lg:border-l lg:border-zinc-800/80 lg:pl-10">
              <h4 className="font-cinzel text-xl font-bold text-white">
                Sow an Online Seed of Faith
              </h4>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Select an amount to sow into De King's Family Music Ministry outreaches, student choir sponsorships, and live worship albums.
              </p>

              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {[25, 50, 100, 250].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedSeed(amt);
                      setCustomAmount('');
                    }}
                    className={`py-3 rounded-xl font-mono text-sm font-bold transition-all cursor-pointer ${
                      selectedSeed === amt && !customAmount
                        ? 'bg-gold-gradient text-[#09090b] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-[#121217] border border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Or Enter Custom Seed ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedSeed(null);
                    }}
                    placeholder="Enter amount (e.g. 500)"
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleGivingClick('Stripe / Card')}
                  className="flex-1 py-3.5 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Give via Card / Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleGivingClick('PayPal')}
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  PayPal
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
