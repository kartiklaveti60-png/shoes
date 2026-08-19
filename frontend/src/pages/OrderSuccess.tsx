import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';

export const OrderSuccess: React.FC = () => {
  const { addXP } = useAuthStore();
  const location = useLocation();
  const orderId = location.state?.orderId || 'SOLE-984210';

  useEffect(() => {
    addXP(150);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D52122', '#FFF7E5', '#B01A1B', '#FFF0D0']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-32 pb-20 px-4 max-w-xl mx-auto text-center">
      
      <div className="glass-panel rounded-3xl p-8 border border-[#E8D5B0] space-y-6 shadow-lg">
        <CheckCircle2 className="w-16 h-16 text-[#D52122] mx-auto animate-bounce" />
        
        <div>
          <span className="text-xs font-bold text-[#D52122] uppercase tracking-widest">+150 COLLECTOR XP EARNED!</span>
          <h1 className="font-display text-3xl font-black uppercase text-[#1A1008] mt-1">ORDER CONFIRMED</h1>
          <p className="text-xs text-[#8C6E50] mt-2 font-medium">
            Your tracking ID <strong className="text-[#1A1008] font-bold">#{orderId}</strong> has been generated and dispatched to your email.
          </p>
        </div>

        <div className="bg-[#FFF0D0] p-4 rounded-2xl border border-[#E8D5B0] text-xs text-left space-y-2 font-medium">
          <div className="flex justify-between text-[#8C6E50]">
            <span>Carrier</span>
            <span className="text-[#1A1008] font-bold">DHL Cyber-Express</span>
          </div>
          <div className="flex justify-between text-[#8C6E50]">
            <span>Estimated Delivery</span>
            <span className="text-green-600 font-bold">2-3 Business Days</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/account"
            className="flex-1 bg-[#D52122] text-[#FFF7E5] py-3.5 rounded-2xl font-bold text-xs hover:bg-[#B01A1B] transition-colors shadow-md"
          >
            TRACK ORDER STATUS
          </Link>
          <Link
            to="/shop"
            className="flex-1 bg-[#FFF0D0] text-[#1A1008] py-3.5 rounded-2xl font-bold text-xs hover:bg-[#E8D5B0] border border-[#E8D5B0] transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </div>

      </div>

    </div>
  );
};
