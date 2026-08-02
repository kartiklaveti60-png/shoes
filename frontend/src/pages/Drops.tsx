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
      tierRequired: 'TITAN & LEGEND VIP',
      edition: '1,000 Pairs Worldwide',
      image: '/images/air-jordan-1-game-worn.jpg',
      status: 'UPCOMING'
    },
    {
      id: 'drop_2',
      title: "AEROSPACE QUANTUM RUNNER 'SOLAR'",
      date: 'AUG 12, 2026 • 12:00 EST',
      retailPrice: 280,
      resellEst: 420,
      tierRequired: 'ALL MEMBERS',
      edition: '2,500 Pairs Worldwide',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
      status: 'UPCOMING'
    },
    {
      id: 'drop_3',
      title: "JORDAN MONOLITH RETRO HIGH 'OBSIDIAN'",
      date: 'AUG 20, 2026 • 15:00 EST',
      retailPrice: 450,
      resellEst: 950,
      tierRequired: 'LEGEND ONLY',
      edition: '500 Numbered Units',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200',
      status: 'LOCKED'
    }
  ];

  const handleNotify = (id: string) => {
    setSubscribed((prev) => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold uppercase">
          <Flame className="w-4 h-4 text-[#FF5A1F]" /> EXCLUSIVE RELEASE CALENDAR
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-black">HYPER DROPS</h1>
        <p className="text-gray-600 text-sm font-medium">
          Guaranteed anti-bot queuing architecture. Priority release access determined by your SOLE VIP Tier.
        </p>
      </div>

      {/* Drops Grid */}
      <div className="space-y-8">
        {dropsList.map((drop) => {
          const isSub = subscribed.includes(drop.id);
          return (
            <div
              key={drop.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 hover:border-black transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white shadow-sm hover:shadow-xl"
            >
              {/* Image */}
              <div className="lg:col-span-5 h-64 bg-gray-50 rounded-2xl overflow-hidden p-4 flex items-center justify-center relative border border-gray-100">
                <img src={drop.image} alt={drop.title} className="w-full h-full object-contain" />
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                  {drop.edition}
                </span>
              </div>

              {/* Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#FF5A1F] tracking-widest">{drop.date}</span>
                  <span className="bg-gray-100 text-black text-[11px] font-bold px-3 py-1 rounded-full border border-gray-300">
                    {drop.tierRequired}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-black">{drop.title}</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <span className="text-[11px] text-gray-500 block font-bold">RETAIL PRICE</span>
                    <span className="font-display font-black text-xl text-black">${drop.retailPrice}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block font-bold">EST. RESELL VALUE</span>
                    <span className="font-display font-black text-xl text-green-600">${drop.resellEst}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block font-bold">ALLOCATION</span>
                    <span className="font-bold text-xs text-black">RARE (PRIORITY)</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => handleNotify(drop.id)}
                    className={`px-6 py-3.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all ${
                      isSub
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-black text-white hover:bg-[#FF5A1F] shadow-lg'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    {isSub ? 'NOTIFIED FOR DROP' : 'SET DROP REMINDER'}
                  </button>

                  <span className="text-xs text-gray-600 font-medium">
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
