import React from 'react';
import { ShieldCheck, Zap, Award, Package, MapPin, Settings, Flame } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Account: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Profile Banner */}
      <div className="glass-panel rounded-3xl p-8 border border-black/10 flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white shadow-sm">
        <div className="flex items-center gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-black shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-black uppercase text-black">{user?.name}</h1>
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" /> {user?.tier} VIP MEMBER
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 font-medium">{user?.email} • Member since 2026</p>
          </div>
        </div>

        {/* XP & Coins Stats */}
        <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <div className="text-center px-4">
            <span className="text-[10px] font-bold text-gray-500 block uppercase">COLLECTOR XP</span>
            <span className="font-display font-black text-2xl text-black">{user?.xp} XP</span>
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="text-center px-4">
            <span className="text-[10px] font-bold text-gray-500 block uppercase">SOLE COINS</span>
            <span className="font-display font-black text-2xl text-[#FF5A1F]">{user?.coins} 🪙</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-black/10 space-y-6 bg-white shadow-sm">
          <h3 className="font-display font-bold text-lg text-black uppercase flex items-center gap-2">
            <Package className="w-5 h-5 text-black" /> ORDER HISTORY & TRACKING
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
              <div key={order.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={order.image} alt="order" className="w-16 h-16 object-contain rounded-xl bg-white border border-gray-200 p-1" />
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 block">{order.id} • {order.date}</span>
                    <h4 className="text-xs font-bold text-black">{order.sneaker}</h4>
                    <span className="text-xs font-black text-black">{order.price}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-orange-100 text-orange-700 border-orange-300'
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
          
          <div className="glass-panel rounded-3xl p-6 border border-black/10 space-y-4 bg-white shadow-sm">
            <h3 className="font-display font-bold text-sm text-black uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-black" /> COLLECTOR BADGES
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {user?.badges.map((badge, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-center">
                  <Flame className="w-6 h-6 mx-auto text-[#FF5A1F] mb-1" />
                  <span className="text-[10px] font-bold text-black block uppercase tracking-wider">{badge.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
