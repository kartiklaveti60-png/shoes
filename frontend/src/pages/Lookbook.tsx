import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Lookbook: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-20 px-4 max-w-7xl mx-auto space-y-20">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold tracking-widest text-[#FF5A1F] uppercase">EDITORIAL SS26</span>
        <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-black">THE METROPOLIS</h1>
        <p className="text-gray-600 text-sm font-medium">
          A visual exploration of modern geometry, urban architecture, and high-performance sneaker engineering.
        </p>
      </div>

      {/* Editorial Spread 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 rounded-3xl overflow-hidden h-[500px] shadow-lg border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
            alt="Lookbook 1"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="md:col-span-5 space-y-4">
          <span className="text-xs font-bold text-[#FF5A1F] uppercase">CHAPTER 01</span>
          <h2 className="font-display text-3xl font-black uppercase text-black">NEO-TOKYO SILHOUETTES</h2>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Captured across late-night Shibuya crosswalks. The Cyber-X 01 reflects environmental light while maintaining absolute carbon fiber stability.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#FF5A1F]">
            SHOP THE LOOK <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Editorial Spread 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-4 order-2 md:order-1">
          <span className="text-xs font-bold text-[#FF5A1F] uppercase">CHAPTER 02</span>
          <h2 className="font-display text-3xl font-black uppercase text-black">QUANTUM ENDURANCE</h2>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Minimalist techwear meet marathon performance. Tested in sub-zero atmospheric chambers for ultimate durability.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#FF5A1F]">
            EXPLORE RUNNING VAULT <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="md:col-span-7 rounded-3xl overflow-hidden h-[500px] order-1 md:order-2 shadow-lg border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200"
            alt="Lookbook 2"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

    </div>
  );
};
