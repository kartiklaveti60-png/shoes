import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-black border-t border-gray-200 pt-20 pb-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1700px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-200">
        
        {/* Brand Story */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-3xl tracking-tighter text-black">SOLE</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] animate-pulse" />
          </Link>

          <p className="text-xs text-gray-600 max-w-sm leading-relaxed font-medium">
            The world's premier luxury sneaker platform. Engineered with 3D spatial scanning, nitrogen-infused foam, and proprietary AI fashion intelligence.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-green-700 font-bold">
            <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Authenticity Guaranteed • Global Express Delivery
          </div>
        </div>

        {/* Links 1 */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-display text-xs font-bold uppercase text-black tracking-wider">NAVIGATE</h4>
          <ul className="space-y-2 text-xs text-gray-600 font-medium">
            <li><Link to="/shop" className="hover:text-black transition-colors">All Sneakers</Link></li>
            <li><Link to="/drops" className="hover:text-black transition-colors">Release Calendar</Link></li>
            <li><Link to="/ai-stylist" className="hover:text-black transition-colors">AI Outfit Studio</Link></li>
            <li><Link to="/community" className="hover:text-black transition-colors">On-Foot Gallery</Link></li>
            <li><Link to="/lookbook" className="hover:text-black transition-colors">Editorial Lookbook</Link></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-display text-xs font-bold uppercase text-black tracking-wider">SUPPORT</h4>
          <ul className="space-y-2 text-xs text-gray-600 font-medium">
            <li><Link to="/account" className="hover:text-black transition-colors">Track Order</Link></li>
            <li><span className="hover:text-black transition-colors cursor-pointer">3D Size Guide</span></li>
            <li><span className="hover:text-black transition-colors cursor-pointer">Returns & Exchanges</span></li>
            <li><span className="hover:text-black transition-colors cursor-pointer">VIP Membership</span></li>
            <li><span className="hover:text-black transition-colors cursor-pointer">Privacy Policy</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-display text-xs font-bold uppercase text-black tracking-wider">INNER CIRCLE</h4>
          <p className="text-xs text-gray-600 font-medium">Subscribe for early access passcodes before limited drops release.</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address..."
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder-gray-500 focus:outline-none focus:border-black font-semibold"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-black px-3 rounded-lg text-white hover:bg-[#FF5A1F] transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-medium">
        <p>© 2026 SOLE LABS INC. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 sm:mt-0">DESIGNED AT THE INTERSECTION OF LUXURY & FUTURE TECHNOLOGY.</p>
      </div>
    </footer>
  );
};
