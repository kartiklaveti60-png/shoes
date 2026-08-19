import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Sparkles, User, Menu, X, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';

export const Navbar: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const { toggleCart, items } = useCartStore();
  const { wishlistIds } = useWishlistStore();
  const { user } = useAuthStore();

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = wishlistIds.length;

  const navLinks: Array<{ label: string; path: string; badge?: string; icon?: React.ElementType }> = [
    { label: 'Shop', path: '/shop' },
    { label: 'Drops', path: '/drops', badge: 'HOT' },
    { label: 'Resell Predictor', path: '/resell-predictor', badge: 'AI' },
    { label: 'Community', path: '/community' },
    { label: 'Lookbook', path: '/lookbook' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 py-2.5 transition-all duration-300">
      <nav className="max-w-[1920px] w-full mx-auto glass-panel rounded-full px-5 py-2 flex items-center justify-between border border-[#E8D5B0] shadow-md">
        
        {/* Brand Logo */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="flex items-center cursor-pointer select-none py-0.5"
          title="Return to Home Page"
        >
          <img
            src="/logo.png"
            alt="SOLE"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform hover:scale-105"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive ? 'text-[#D52122] font-extrabold' : 'text-[#8C6E50] hover:text-[#1A1008]'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-[#D52122]" />}
                {link.label}
                {link.badge && (
                  <span className="text-[10px] bg-[#D52122] text-[#FFF7E5] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D52122] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#8C6E50] hover:text-[#D52122] rounded-full hover:bg-[#D52122]/8 transition-colors"
            title="AI Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-[#8C6E50] hover:text-[#D52122] rounded-full hover:bg-[#D52122]/8 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D52122] text-[#FFF7E5] text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-[#8C6E50] hover:text-[#D52122] rounded-full hover:bg-[#D52122]/8 transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D52122] text-[#FFF7E5] text-[10px] font-bold flex items-center justify-center shadow-glow-red">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account */}
          <Link
            to="/account"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D52122]/8 hover:bg-[#D52122]/15 border border-[#E8D5B0] transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
              alt={user?.name}
              className="w-6 h-6 rounded-full object-cover border border-[#D52122]/30"
            />
            <span className="text-xs font-bold tracking-wider text-[#1A1008] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D52122]" />
              {user?.tier || 'TITAN'}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1008] hover:text-[#D52122] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 glass-panel rounded-3xl p-6 border border-[#E8D5B0] flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold text-[#1A1008] hover:text-[#D52122] transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#E8D5B0] flex items-center justify-between">
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-sm font-bold text-[#1A1008]"
            >
              <User className="w-5 h-5 text-[#D52122]" />
              My Account ({user?.tier})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
