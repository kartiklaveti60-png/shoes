import React, { useState } from 'react';
import { Flame, Bell, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Drops: React.FC = () => {
  const { user } = useAuthStore();
  const [subscribed, setSubscribed] = useState<string[]>([]);

  const dropsList = [
    {
      id: 'drop_1',
      title: "Air Jordan 1 Game-Worn",
      date: 'AUG 05, 2026 • 09:00 EST',
      retailPrice: 560000,
      resellEst: 650,
      tierRequired: 'TITAN & LEGEND',
      edition: 'Only 1 Pair Worldwide',
      image: '/images/air-jordan-1-game-worn.jpg',
      status: 'UPCOMING'
    },
    {
      id: 'drop_lv_af1',
      title: "Louis Vuitton x Nike Air Force 01",
      date: 'AUG 18, 2026 • 12:00 EST',
      retailPrice: 2750,
      resellEst: 325800,
      tierRequired: 'TITAN & LEGEND',
      edition: '200 Pairs Worldwide',
      image: '/images/louis-vuitton-nike-air-force-1.png',
      status: 'UPCOMING'
    }
  ];

  const handleNotify = (id: string) => {
    setSubscribed((prev) => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-[1800px] mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D52122] text-[#FFF7E5] text-xs font-bold uppercase">
          <Flame className="w-4 h-4 text-[#FFF7E5]" /> EXCLUSIVE RELEASE CALENDAR
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#1A1008]">HYPER DROPS</h1>
        <p className="text-[#8C6E50] text-sm font-medium">
          Guaranteed anti-bot queuing architecture. Priority release access determined by your SOLE membership tier.
        </p>
      </div>

      {/* Drops Grid */}
      <div className="space-y-8">
        {dropsList.map((drop) => {
          const isSub = subscribed.includes(drop.id);
          return (
            <div
              key={drop.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#E8D5B0] hover:border-[#D52122]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm hover:shadow-xl"
            >
              {/* Image */}
              <div className="lg:col-span-5 h-64 bg-[#FFF0D0] rounded-2xl overflow-hidden p-4 flex items-center justify-center relative border border-[#E8D5B0]">
                <img src={drop.image} alt={drop.title} className="w-full h-full object-contain" />
                <span className="absolute top-4 left-4 bg-[#1A1008] text-[#FFF7E5] px-3 py-1 rounded-full text-xs font-bold">
                  {drop.edition}
                </span>
              </div>

              {/* Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#D52122] tracking-widest">{drop.date}</span>
                  <span className="bg-[#FFF0D0] text-[#1A1008] text-[11px] font-bold px-3 py-1 rounded-full border border-[#E8D5B0]">
                    {drop.tierRequired}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1A1008]">{drop.title}</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <span className="text-[11px] text-[#8C6E50] block font-bold">RETAIL PRICE</span>
                    <span className="font-display font-black text-xl text-[#1A1008]">${drop.retailPrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C6E50] block font-bold">EST. RESELL VALUE</span>
                    <span className="font-display font-black text-xl text-green-600">${drop.resellEst.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C6E50] block font-bold">ALLOCATION</span>
                    <span className="font-bold text-xs text-[#1A1008]">RARE (PRIORITY)</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => handleNotify(drop.id)}
                    className={`px-6 py-3.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all ${
                      isSub
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-[#D52122] text-[#FFF7E5] hover:bg-[#B01A1B] shadow-lg'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    {isSub ? 'NOTIFIED FOR DROP' : 'SET DROP REMINDER'}
                  </button>

                  <span className="text-xs text-[#8C6E50] font-medium">
                    Your Tier ({user?.tier}) qualifies for early queue entry.
                  </span>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
