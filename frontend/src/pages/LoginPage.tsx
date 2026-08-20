import React, { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, ArrowRight, Eye, EyeOff, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { useAuthStore, UserProfile } from '../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setSuccess(`Welcome back, ${demoUser.name}!`);
      
      setTimeout(() => {
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
      setSuccess(mode === 'login' ? 'Welcome back! Login successful.' : 'Account registered successfully!');

      setTimeout(() => {
        navigate('/account');
      }, 700);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      
      <div className="max-w-4xl w-full glass-panel rounded-3xl border border-[#E8D5B0] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Brand Image Showcase */}
        <div className="relative p-8 sm:p-12 bg-gradient-to-br from-[#1A1008] to-[#2D1B0E] text-[#FFF7E5] flex flex-col justify-between overflow-hidden hidden md:flex">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800')" }} />
          
          <div className="relative z-10">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo.png" alt="SOLE" className="h-10 w-auto filter drop-shadow-md brightness-200 invert" />
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D52122]/30 border border-[#D52122] text-[#FFF7E5] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-[#D52122]" /> Member Portal
            </span>

            <h1 className="font-display text-3xl font-black uppercase tracking-tight leading-none mb-4">
              Step Into <br /> <span className="text-[#D52122]">The Vault</span>
            </h1>

            <p className="text-xs text-[#E8D5B0] font-medium leading-relaxed max-w-sm">
              Unlock priority raffle access, AI resell predictions, and tier rewards including TITAN & LEGEND member perks.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D52122]/20 flex items-center justify-center text-[#D52122]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#FFF7E5]">Early Drop Priority Access</h4>
                <p className="text-[10px] text-[#E8D5B0]">Get 30-minute advance queueing on high-heat releases.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Header */}
          <div className="text-center md:text-left mb-6">
            <h2 className="font-display text-2xl font-black uppercase text-[#1A1008] tracking-tight">
              {mode === 'login' ? 'Client Sign In' : 'Join SOLE Vault'}
            </h2>
            <p className="text-xs text-[#8C6E50] mt-1 font-medium">
              {mode === 'login'
                ? 'Enter your credentials or use quick client demo access.'
                : 'Create your luxury collector profile in seconds.'}
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

          {/* Success / Error Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-300 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-100 border border-green-300 text-green-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-[#D52122] text-[#FFF7E5] text-xs font-black uppercase tracking-wider hover:bg-[#B8191A] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D52122]/20 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Account' : 'Create Profile'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Button */}
          <div className="mt-6 pt-5 border-t border-[#E8D5B0]">
            <span className="text-[10px] font-bold uppercase text-[#8C6E50] block text-center mb-2">
              Instant Client Testing
            </span>
            <button
              type="button"
              onClick={() => handleDemoLogin('TITAN')}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#FFF0D0] hover:bg-[#FFE6B8] border border-[#E8D5B0] text-xs font-bold text-[#1A1008] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D52122]" />
                <span>Quick Demo Login</span>
              </div>
              <span className="bg-[#D52122] text-[#FFF7E5] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                1-Click
              </span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
