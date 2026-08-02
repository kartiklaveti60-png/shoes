import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';

export const OrderSuccess: React.FC = () => {
  const { addXP } = useAuthStore();

  useEffect(() => {
    addXP(150);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-4 max-w-xl mx-auto text-center">
      
      <div className="glass-panel rounded-3xl p-8 border border-black/10 space-y-6 bg-white shadow-lg">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
        
        <div>
          <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">+150 VIP COLLECTOR XP EARNED!</span>
          <h1 className="font-display text-3xl font-black uppercase text-black mt-1">ORDER CONFIRMED</h1>
          <p className="text-xs text-gray-600 mt-2 font-medium">
            Your tracking ID <strong className="text-black font-bold">#SOLE-984210</strong> has been generated and dispatched to your email.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs text-left space-y-2 font-medium">
          <div className="flex justify-between text-gray-600">
            <span>Carrier</span>
            <span className="text-black font-bold">DHL Cyber-Express</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Estimated Delivery</span>
            <span className="text-green-600 font-bold">2-3 Business Days</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/account"
            className="flex-1 bg-black text-white py-3.5 rounded-2xl font-bold text-xs hover:bg-[#FF5A1F] transition-colors shadow-md"
          >
            TRACK ORDER STATUS
          </Link>
          <Link
            to="/shop"
            className="flex-1 bg-gray-100 text-black py-3.5 rounded-2xl font-bold text-xs hover:bg-gray-200 border border-gray-300 transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </div>

      </div>

    </div>
  );
};
