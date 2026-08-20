import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, Sparkles, ArrowRight, Eye, EyeOff, CheckCircle2, Zap } from 'lucide-react';
import { useAuthStore, UserProfile } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const storeIsOpen = useAuthStore((state) => state.isAuthModalOpen);
  const storeClose = useAuthStore((state) => state.closeAuthModal);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const isOpen = propIsOpen !== undefined ? propIsOpen : storeIsOpen;
  const handleClose = propOnClose || storeClose;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleDemoLogin = (tier: 'TITAN' | 'LEGEND' | 'SHADOW' = 'TITAN') => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const demoUser: UserProfile = {
        id: 'usr_titan_alex',
        name: tier === 'TITAN' ? 'Alex Mercer' : tier === 'LEGEND' ? 'Marcus Vance' : 'Jordan Hayes',
        email: 'alex.mercer@future.sole',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        xp: tier === 'TITAN' ? 1450 : tier === 'LEGEND' ? 3200 : 750,
        tier: tier,
        coins: tier === 'TITAN' ? 480 : 1200,
        badges: ['EARLY_ADOPTER', 'SNEAKERHEAD_SUPREME', 'TOP_STYLIST']
      };
      
      login(demoUser, 'mock_jwt_token_2026');
      setLoading(false);
      setSuccess(`Logged in successfully as ${demoUser.name} (${demoUser.tier} Member)!`);
      
      setTimeout(() => {
        handleClose();
        navigate('/account');
      }, 600);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (mode === 'register' && !name) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Create user object
      const userProfile: UserProfile = {
        id: `usr_${Date.now()}`,
        name: mode === 'register' ? name : (email.split('@')[0] || 'Sneakerhead'),
        email,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        xp: mode === 'register' ? 250 : 1450,
        tier: mode === 'register' ? 'GHOST' : 'TITAN',
        coins: mode === 'register' ? 100 : 480,
        badges: ['NEW_MEMBER']
      };

      login(userProfile, 'token_' + Date.now());
      setLoading(false);
      setSuccess(mode === 'login' ? 'Welcome back! Sign in successful.' : 'Account created successfully!');

      setTimeout(() => {
        handleClose();
        navigate('/account');
      }, 700);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1008]/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#FFF7E5] rounded-3xl border border-[#E8D5B0] shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8C6E50] hover:text-[#1A1008] hover:bg-[#E8D5B0]/40 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#D52122]/10 border border-[#D52122]/30 mb-3 text-[#D52122]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-black uppercase text-[#1A1008] tracking-tight">
            {mode === 'login' ? 'Client Sign In' : 'Create SOLE Account'}
          </h2>
          <p className="text-xs text-[#8C6E50] mt-1 font-medium">
            {mode === 'login'
              ? 'Access your exclusive sneaker drops & account status'
              : 'Join the premier luxury sneaker marketplace & unlock rewards'}
          </p>
        </div>

        {/* Toggle Login / Register */}
        <div className="flex bg-[#FFF0D0] p-1 rounded-2xl border border-[#E8D5B0] mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-[#D52122] text-[#FFF7E5] shadow-sm'
                : 'text-[#8C6E50] hover:text-[#1A1008]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-[#D52122] text-[#FFF7E5] shadow-sm'
                : 'text-[#8C6E50] hover:text-[#1A1008]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Success / Error Banners */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-300 text-red-700 text-xs font-semibold flex items-center gap-2">
            <X className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 border border-green-300 text-green-700 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#1A1008] uppercase mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6E50]" />
                <input
                  type="text"
                  placeholder="Alex Mercer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FFF0D0] border border-[#E8D5B0] text-xs font-semibold text-[#1A1008] placeholder-[#8C6E50]/60 focus:outline-none focus:border-[#D52122] transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#1A1008] uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6E50]" />
              <input
                type="email"
                placeholder="client@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FFF0D0] border border-[#E8D5B0] text-xs font-semibold text-[#1A1008] placeholder-[#8C6E50]/60 focus:outline-none focus:border-[#D52122] transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#1A1008] uppercase">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to email.')}
                  className="text-[11px] font-semibold text-[#D52122] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6E50]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#FFF0D0] border border-[#E8D5B0] text-xs font-semibold text-[#1A1008] placeholder-[#8C6E50]/60 focus:outline-none focus:border-[#D52122] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6E50] hover:text-[#1A1008]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#8C6E50] font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D52122] focus:ring-[#D52122] border-[#E8D5B0]"
                />
                Remember me on this browser
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#D52122] text-[#FFF7E5] text-xs font-black uppercase tracking-wider hover:bg-[#B8191A] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D52122]/20 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-[#E8D5B0] flex-1" />
          <span className="text-[10px] font-bold uppercase text-[#8C6E50]">Quick Client Access</span>
          <div className="h-px bg-[#E8D5B0] flex-1" />
        </div>

        {/* Quick Demo Login Preset Button */}
        <button
          type="button"
          onClick={() => handleDemoLogin('TITAN')}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#FFF0D0] hover:bg-[#FFE6B8] border border-[#E8D5B0] text-xs font-bold text-[#1A1008] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#D52122]" />
            <span>Instant Demo Login</span>
          </div>
          <span className="bg-[#D52122] text-[#FFF7E5] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
            1-Click
          </span>
        </button>

      </div>
    </div>
  );
};
