import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginModalOpen, setIsAdminLoginModalOpen, loginAdmin } = useMinistry();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(password);
    if (!success) {
      setErrorMsg('Invalid admin password. Access denied.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121217] border border-[#d4af37]/70 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAdminLoginModalOpen(false);
            setErrorMsg('');
            setPassword('');
          }}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-800/80 transition-colors cursor-pointer"
          aria-label="Close Admin Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Lock Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2a220e] to-[#12110c] border border-[#d4af37]/60 flex items-center justify-center text-[#e6c364] mx-auto mb-4 shadow-[0_0_25px_rgba(212,175,55,0.35)]">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#fce999] font-bold">
            Restricted Access
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
            Ministry Admin Portal
          </h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Please enter the administrator password to manage songs, events, contacts, and ministry information.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter password..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-900 border border-zinc-700/90 text-white text-sm focus:outline-none focus:border-[#d4af37] placeholder-zinc-600 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Unlock Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 text-center">
          URL Mode Active: <span className="text-[#fce999] font-mono font-bold">/#admin</span>
        </div>

      </div>
    </div>
  );
};
