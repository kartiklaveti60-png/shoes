import React, { useState } from 'react';
import { Maximize2, X, Sparkles, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Lookbook: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; subtitle: string; details: string } | null>(null);

  const lookbookItems = [
    {
      id: 'chapter-01',
      chapter: 'CHAPTER 01',
      title: 'AIR JORDAN 1 HIGH "MONOCHROME SOLE"',
      subtitle: 'Black & White Leather / Outsole Perspective',
      description: 'Captured in high-contrast monochrome street aesthetic. Highlighting the classic wings emblem, premium tumbled leather construction, and the legendary star-pattern outsole traction pattern.',
      image: '/images/lookbook_monochrome.jpg',
      tags: ['GRAIL HEAT', 'MONOCHROME', 'HIGH-TOP', 'AUTHENTICATED'],
      specs: {
        silhouette: 'Air Jordan 1 High OG',
        colorway: 'Black / Sail / White',
        releaseYear: '2024 Editorial',
        craftsmanship: 'Tumbled Italian Calfskin'
      }
    },
    {
      id: 'chapter-02',
      chapter: 'CHAPTER 02',
      title: 'AIR JORDAN 1 HIGH "SHATTERED BACKBOARD"',
      subtitle: 'Starfish Orange / Shattered Glass Shot',
      description: 'An iconic tribute to Michael Jordan\'s legendary 1985 exhibition game backboard shatter in Trieste, Italy. Crafted from buttery Starfish orange leather, sitting atop real shattered glass element for high-fashion editorial imagery.',
      image: '/images/lookbook_shattered_backboard.jpg',
      tags: ['ICONIC GRAIL', 'STARFISH ORANGE', 'EDITORIAL', 'COLLECTOR ITEM'],
      specs: {
        silhouette: 'Air Jordan 1 Retro High OG',
        colorway: 'Starfish / Black / Sail',
        releaseYear: 'Collector Edition',
        craftsmanship: 'Full-Grain Soft Leather'
      }
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-24 px-6 md:px-12 lg:px-16 max-w-[1800px] mx-auto space-y-24">
      
      {/* Title */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#D52122]/10 border border-[#D52122]/30 px-4 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-[#D52122]" />
          <span className="text-xs font-black tracking-widest text-[#D52122] uppercase">EDITORIAL SS26 LOOKBOOK</span>
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-[#1A1008] tracking-tight">
          THE ON-FOOT ARCHIVE
        </h1>
        <p className="text-[#8C6E50] text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
          High-definition editorial curation showcasing rare grail silhouettes, tactile leather craftsmanship, and urban geometry in raw 100% full quality.
        </p>
      </div>

      {/* Editorial Spreads */}
      <div className="space-y-24">
        {lookbookItems.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={item.id} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 rounded-3xl bg-[#FFF0D0]/80 border border-[#E8D5B0] shadow-md hover:shadow-xl transition-all duration-500`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-7 relative group rounded-2xl overflow-hidden shadow-lg border border-[#E8D5B0] bg-black/5 ${isEven ? '' : 'lg:order-2'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[520px] sm:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
                  onClick={() => setSelectedImage({ src: item.image, title: item.title, subtitle: item.subtitle, details: item.description })}
                />
                
                {/* Full Resolution Overlay Button */}
                <button
                  onClick={() => setSelectedImage({ src: item.image, title: item.title, subtitle: item.subtitle, details: item.description })}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-[#D52122] text-white p-3 rounded-full backdrop-blur-md transition-all shadow-lg flex items-center gap-2 text-xs font-bold"
                  title="View Full Resolution Photo"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">VIEW FULL HD</span>
                </button>

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#D52122]" />
                  <span>100% Uncompressed Quality</span>
                </div>
              </div>

              {/* Text Details Column */}
              <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                <div className="space-y-2">
                  <span className="text-xs font-black tracking-widest text-[#D52122] uppercase">{item.chapter}</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#1A1008] leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-xs font-bold text-[#8C6E50] tracking-wide uppercase">{item.subtitle}</p>
                </div>

                <p className="text-sm text-[#1A1008] leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Specs Box */}
                <div className="bg-[#FFF7E5] rounded-2xl p-5 border border-[#E8D5B0] space-y-3 shadow-inner">
                  <span className="text-[11px] font-black uppercase text-[#8C6E50] tracking-wider block border-b border-[#E8D5B0] pb-2">EDITORIAL SPECIFICATIONS</span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#8C6E50] font-bold block text-[10px]">SILHOUETTE</span>
                      <span className="font-extrabold text-[#1A1008]">{item.specs.silhouette}</span>
                    </div>
                    <div>
                      <span className="text-[#8C6E50] font-bold block text-[10px]">COLORWAY</span>
                      <span className="font-extrabold text-[#1A1008]">{item.specs.colorway}</span>
                    </div>
                    <div>
                      <span className="text-[#8C6E50] font-bold block text-[10px]">CRAFT</span>
                      <span className="font-extrabold text-[#1A1008]">{item.specs.craftsmanship}</span>
                    </div>
                    <div>
                      <span className="text-[#8C6E50] font-bold block text-[10px]">STATUS</span>
                      <span className="font-extrabold text-[#D52122]">{item.specs.releaseYear}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-black bg-[#E8D5B0]/50 text-[#1A1008] px-3 py-1 rounded-full flex items-center gap-1 border border-[#E8D5B0]">
                      <Tag className="w-3 h-3 text-[#D52122]" /> {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex items-center gap-4">
                  <Link 
                    to="/shop" 
                    className="bg-[#D52122] hover:bg-[#B01A1B] text-[#FFF7E5] px-6 py-3 rounded-2xl font-bold text-xs transition-colors shadow-md flex items-center gap-2"
                  >
                    EXPLORE SIMILAR SILHOUETTES <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Full Resolution Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-10 flex flex-col justify-between items-center animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          {/* Header Bar */}
          <div className="w-full max-w-6xl flex justify-between items-center text-white pt-2 z-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="text-xs font-bold text-[#D52122] uppercase tracking-widest">FULL RESOLUTION LOOKBOOK PHOTO</span>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">{selectedImage.title}</h3>
            </div>
            <button 
              onClick={() => setSelectedImage(null)}
              className="bg-white/10 hover:bg-[#D52122] text-white p-3 rounded-full transition-colors shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Canvas */}
          <div className="w-full h-full max-w-6xl flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Footer Info */}
          <div className="w-full max-w-6xl text-center text-white/80 pb-2 z-10" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-medium text-gray-300 max-w-xl mx-auto">{selectedImage.details}</p>
          </div>
        </div>
      )}

    </div>
  );
};
