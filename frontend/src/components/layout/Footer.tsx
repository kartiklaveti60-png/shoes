import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF7E5] text-[#1A1008] border-t border-[#E8D5B0] pt-20 pb-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1920px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E8D5B0]">
        
        {/* Brand Story */}
        <div className="md:col-span-5 space-y-4">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
            className="flex items-center gap-2 cursor-pointer group select-none"
            title="Return to Home Page"
          >
            <img src="/logo.png" alt="SOLE" className="h-11 sm:h-13 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-105" />
          </a>

          <p className="text-xs text-[#8C6E50] max-w-sm leading-relaxed font-medium">
            The world's premier luxury sneaker platform. Engineered with 3D spatial scanning, nitrogen-infused foam, and proprietary AI fashion intelligence.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-[#D52122] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#D52122]" /> 100% Authenticity Guaranteed • Global Express Delivery
          </div>
        </div>

        {/* Links 1 */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-display text-xs font-bold uppercase text-[#1A1008] tracking-wider">NAVIGATE</h4>
          <ul className="space-y-2 text-xs text-[#8C6E50] font-medium">
            <li><Link to="/shop" className="hover:text-[#D52122] transition-colors">All Sneakers</Link></li>
            <li><Link to="/drops" className="hover:text-[#D52122] transition-colors">Release Calendar</Link></li>
            <li><Link to="/community" className="hover:text-[#D52122] transition-colors">On-Foot Gallery</Link></li>
            <li><Link to="/lookbook" className="hover:text-[#D52122] transition-colors">Editorial Lookbook</Link></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-display text-xs font-bold uppercase text-[#1A1008] tracking-wider">SUPPORT</h4>
          <ul className="space-y-2 text-xs text-[#8C6E50] font-medium">
            <li><Link to="/account" className="hover:text-[#D52122] transition-colors">Track Order</Link></li>
            <li><span className="hover:text-[#D52122] transition-colors cursor-pointer">3D Size Guide</span></li>
            <li><span className="hover:text-[#D52122] transition-colors cursor-pointer">Returns & Exchanges</span></li>
            <li><span className="hover:text-[#D52122] transition-colors cursor-pointer">Member Services</span></li>
            <li><span className="hover:text-[#D52122] transition-colors cursor-pointer">Privacy Policy</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-display text-xs font-bold uppercase text-[#1A1008] tracking-wider">INNER CIRCLE</h4>
          <p className="text-xs text-[#8C6E50] font-medium">Subscribe for early access passcodes before limited drops release.</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address..."
              className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1008] placeholder-[#8C6E50] focus:outline-none focus:border-[#D52122] font-semibold transition-colors"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-[#D52122] hover:bg-[#B01A1B] px-3 rounded-lg text-[#FFF7E5] transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#8C6E50] font-medium">
        <p>© 2026 SOLE LABS INC. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 sm:mt-0">DESIGNED AT THE INTERSECTION OF LUXURY & FUTURE TECHNOLOGY.</p>
      </div>
    </footer>
  );
};
