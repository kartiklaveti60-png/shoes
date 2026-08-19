import React from 'react';
import { ShieldCheck, Zap, Award, Package, MapPin, Settings, Flame } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Account: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto">
      
      {/* Profile Banner */}
      <div className="glass-panel rounded-3xl p-8 border border-[#E8D5B0] flex flex-col md:flex-row items-center justify-between gap-6 mb-10 shadow-sm">
        <div className="flex items-center gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#D52122] shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#1A1008]">{user?.name}</h1>
              <span className="bg-[#D52122] text-[#FFF7E5] text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFF7E5]" /> {user?.tier} MEMBER
              </span>
            </div>
            <p className="text-xs text-[#8C6E50] mt-1 font-medium">{user?.email} • Member since 2026</p>
          </div>
        </div>

        {/* XP & Coins Stats */}
        <div className="flex items-center gap-6 bg-[#FFF0D0] p-4 rounded-2xl border border-[#E8D5B0]">
          <div className="text-center px-4">
            <span className="text-[10px] font-bold text-[#8C6E50] block uppercase">COLLECTOR XP</span>
            <span className="font-display font-black text-2xl text-[#1A1008]">{user?.xp} XP</span>
          </div>
          <div className="h-8 w-px bg-[#E8D5B0]" />
          <div className="text-center px-4">
            <span className="text-[10px] font-bold text-[#8C6E50] block uppercase">SOLE COINS</span>
            <span className="font-display font-black text-2xl text-[#D52122]">{user?.coins} 🪙</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-[#E8D5B0] space-y-6 shadow-sm">
          <h3 className="font-display font-bold text-lg text-[#1A1008] uppercase flex items-center gap-2">
            <Package className="w-5 h-5 text-[#D52122]" /> ORDER HISTORY & TRACKING
          </h3>

          <div className="space-y-4">
            {[
              {
                id: 'SOLE-984210',
                date: 'JUL 28, 2026',
                sneaker: "Air Jordan 1 Game-Worn",
                price: '$560,000',
                status: 'Out For Delivery',
                image: '/images/air-jordan-1-game-worn.jpg'
              },
              {
                id: 'SOLE-741299',
                date: 'JUN 14, 2026',
                sneaker: "AEROSPACE QUANTUM RUNNER",
                price: '$280',
                status: 'Delivered',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200'
              }
            ].map((order) => (
              <div key={order.id} className="p-4 rounded-2xl bg-[#FFF0D0] border border-[#E8D5B0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={order.image} alt="order" className="w-16 h-16 object-contain rounded-xl bg-[#FFF7E5] border border-[#E8D5B0] p-1" />
                  <div>
                    <span className="text-[10px] font-bold text-[#8C6E50] block">{order.id} • {order.date}</span>
                    <h4 className="text-xs font-bold text-[#1A1008]">{order.sneaker}</h4>
                    <span className="text-xs font-black text-[#1A1008]">{order.price}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-[#D52122]/10 text-[#D52122] border-[#D52122]/30'
                  }`}>
                    ● {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Badges & Tier Progress */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-[#E8D5B0] space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-sm text-[#1A1008] uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D52122]" /> COLLECTOR BADGES
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {user?.badges.map((badge, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#FFF0D0] border border-[#E8D5B0] text-center">
                  <Flame className="w-6 h-6 mx-auto text-[#D52122] mb-1" />
                  <span className="text-[10px] font-bold text-[#1A1008] block uppercase tracking-wider">{badge.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
