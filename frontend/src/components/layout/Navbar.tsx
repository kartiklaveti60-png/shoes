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

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Drops', path: '/drops', badge: 'HOT' },
    { label: 'AI Stylist', path: '/ai-stylist', icon: Sparkles },
    { label: 'Community', path: '/community' },
    { label: 'Lookbook', path: '/lookbook' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 transition-all duration-300">
      <nav className="max-w-[1700px] w-full mx-auto glass-panel rounded-full px-6 py-3.5 flex items-center justify-between border border-black/10 shadow-lg">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display font-bold text-2xl tracking-tighter text-black group-hover:text-[#FF5A1F] transition-colors">
            SOLE
          </span>
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse shadow-glow-orange" />
        </Link>

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
                  isActive ? 'text-black font-extrabold' : 'text-gray-600 hover:text-black'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-[#FF5A1F]" />}
                {link.label}
                {link.badge && (
                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full" />
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
            className="p-2 text-gray-700 hover:text-black rounded-full hover:bg-black/5 transition-colors"
            title="AI Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-gray-700 hover:text-black rounded-full hover:bg-black/5 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-black rounded-full hover:bg-black/5 transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF5A1F] text-white text-[10px] font-bold flex items-center justify-center shadow-glow-orange">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / VIP Tier */}
          <Link
            to="/account"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
              alt={user?.name}
              className="w-6 h-6 rounded-full object-cover border border-black"
            />
            <span className="text-xs font-bold tracking-wider text-black flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
              {user?.tier || 'TITAN'}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-black"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 glass-panel rounded-3xl p-6 border border-black/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold text-gray-800 hover:text-black transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-black/10 flex items-center justify-between">
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-sm font-bold text-black"
            >
              <User className="w-5 h-5 text-[#FF5A1F]" />
              My Account ({user?.tier})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
