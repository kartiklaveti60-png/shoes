import React from 'react';

export const Lookbook: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-[1800px] mx-auto space-y-20">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold tracking-widest text-[#E60023] uppercase">EDITORIAL SS26</span>
        <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-black">THE METROPOLIS</h1>
        <p className="text-gray-600 text-sm font-medium">
          A visual exploration of modern geometry, urban architecture, and high-performance sneaker engineering.
        </p>
      </div>

      {/* Editorial Spread 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 rounded-3xl overflow-hidden h-[500px] shadow-lg border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"
            alt="Urban Grail Curation"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="md:col-span-5 space-y-4">
          <span className="text-xs font-bold text-[#E60023] uppercase">CHAPTER 01</span>
          <h2 className="font-display text-3xl font-black uppercase text-black">URBAN GRAIL CURATION</h2>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Captured across high-contrast cityscapes. Featuring hyper-exclusive silhouettes, premium leather craftsmanship, and iconic colorways that define modern street culture.
          </p>
        </div>
      </div>

      {/* Editorial Spread 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-4 order-2 md:order-1">
          <span className="text-xs font-bold text-[#E60023] uppercase">CHAPTER 02</span>
          <h2 className="font-display text-3xl font-black uppercase text-black">LIMITED EDITION SILHOUETTES</h2>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            A celebration of rare drops and high-appreciation grails. Meticulously sourced for collectors who demand 100% authenticity and timeless footwear design.
          </p>
        </div>
        <div className="md:col-span-7 rounded-3xl overflow-hidden h-[500px] order-1 md:order-2 shadow-lg border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&q=80&w=1200"
            alt="Limited Edition Silhouettes"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

    </div>
  );
};
