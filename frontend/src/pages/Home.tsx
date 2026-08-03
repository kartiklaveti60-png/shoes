import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Zap, Award, Play, CheckCircle2, Eye, TrendingUp } from 'lucide-react';
import { ThreeCanvas } from '../components/shared/ThreeCanvas';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export const Home: React.FC = () => {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [activeHypedTab, setActiveHypedTab] = useState<string>('All');
  const hypedCategories = ['All', 'Chicago Lost & Found', 'Reverse Mocha', 'Orange Lobster', 'Off-White Chicago'];

  // Filter products by selected tab strictly for Hyped items
  const displayedHypedProducts = useMemo(() => {
    const hypedItems = MOCK_PRODUCTS.filter(p => p.isHyped === true || p.category === 'Hyped');
    if (activeHypedTab === 'All') return hypedItems;
    if (activeHypedTab === 'Chicago Lost & Found') return hypedItems.filter(p => p._id === 'prod_aj1_lost_found');
    if (activeHypedTab === 'Reverse Mocha') return hypedItems.filter(p => p._id === 'prod_travis_scott_aj1');
    if (activeHypedTab === 'Orange Lobster') return hypedItems.filter(p => p._id === 'prod_nike_sb_dunk_orange_lobster');
    if (activeHypedTab === 'Off-White Chicago') return hypedItems.filter(p => p._id === 'prod_off_white_aj1_chicago');
    return hypedItems;
  }, [activeHypedTab]);

  // Countdown timer for next limited drop
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 22, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59, mins: prev.mins > 0 ? prev.mins - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden border-b border-black/10">
        
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-black tracking-widest text-black uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E60023]" />
              THE NEXT GENERATION OF FOOTWEAR
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-black">
              COP THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-[#E60023]">
                LEGIT'S.
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg font-normal max-w-lg leading-relaxed">
              Engineered with aerospace carbon fiber, nitrogen-infused foam, and AI-tailored size precision. Outperforming every standard sneaker on earth.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#E60023] transition-all shadow-lg flex items-center gap-2 group"
              >
                EXPLORE VAULT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/ai-stylist"
                className="glass-panel text-black px-6 py-4 rounded-full font-bold text-sm hover:bg-black/5 transition-all flex items-center gap-2 border border-black/10"
              >
                <Sparkles className="w-4 h-4 text-[#E60023]" />
                LAUNCH AI STYLIST
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/10">
              <div>
                <span className="font-display font-black text-2xl text-black">100%</span>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Authentic Verified</p>
              </div>
              <div>
                <span className="font-display font-black text-2xl text-[#E60023]">85%</span>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Energy Return</p>
              </div>
              <div>
                <span className="font-display font-black text-2xl text-black">4.98★</span>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Collector Rating</p>
              </div>
            </div>
          </div>

          {/* Right 3D Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="glass-panel rounded-3xl p-4 border border-black/10 relative overflow-hidden shadow-xl bg-white">
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-black border border-black/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E60023] animate-ping" />
                INTERACTIVE 3D MODEL
              </div>

              {/* R3F 3D Canvas */}
              <ThreeCanvas className="w-full h-[420px]" />

              <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-black/10 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="font-bold text-sm text-black">Air Jordan 1 Game-Worn</h4>
                  <p className="text-xs text-gray-500 font-medium">Original 1985 • Game-Worn & Signed</p>
                </div>
                <span className="font-display font-black text-lg text-black">$560,000</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HYPED SNEAKERS SECTION ================= */}
      <section className="py-20 px-4 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-black/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[11px] font-extrabold tracking-widest uppercase mb-3 shadow-md">
              <Flame className="w-3.5 h-3.5 text-[#E60023] animate-pulse" />
              MOST WANTED SILHOUETTES
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-black flex items-center gap-3">
              HYPED SNEAKERS
              <span className="text-xs bg-[#E60023] text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                LIVE MARKET
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium max-w-xl">
              Real-time trending footwear with highest demand scores, resell appreciation, and limited allocation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/shop?category=Hyped" 
              className="text-xs font-extrabold text-black hover:text-[#E60023] flex items-center gap-1.5 transition-colors uppercase tracking-wider px-5 py-3 rounded-full border border-black/20 hover:border-black bg-white"
            >
              EXPLORE ALL HYPED VAULT <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Category Pills Bar matching design */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {hypedCategories.map((cat) => {
            const isActive = activeHypedTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveHypedTab(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-gray-100/90 text-gray-700 hover:bg-gray-200 hover:text-black border border-gray-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sneaker Cards Grid */}
        {displayedHypedProducts.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl p-8 border border-black/10 bg-white">
            <p className="text-gray-500 font-medium text-sm">No hyped sneakers currently listed under "{activeHypedTab}".</p>
            <button
              onClick={() => setActiveHypedTab('All')}
              className="mt-4 bg-black text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#E60023]"
            >
              SHOW ALL HYPED SNEAKERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedHypedProducts.map((product) => {
              const inWishlist = isInWishlist(product._id);
              const hypeVal = product.hypeScore || 96;
              const viewers = product.liveViewers || 1240;

              return (
                <div 
                  key={product._id} 
                  className="group glass-panel rounded-3xl p-4 border border-black/10 hover:border-black transition-all duration-300 flex flex-col justify-between bg-white hover:shadow-2xl relative overflow-hidden"
                >
                  {/* Top Hype Pulse Banner */}
                  <div className="flex items-center justify-between text-[10px] font-extrabold uppercase px-3 py-1.5 bg-gray-50 rounded-xl mb-3 border border-gray-100">
                    <span className="flex items-center gap-1 text-[#E60023]">
                      <Flame className="w-3 h-3 fill-[#E60023]" />
                      Hype Level: {hypeVal}%
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-3 h-3 text-black" />
                      {viewers.toLocaleString()} Viewing
                    </span>
                  </div>

                  <div>
                    {/* Image Container */}
                    <Link to={`/product/${product.slug}`} className="block relative h-64 bg-gray-50 rounded-2xl overflow-hidden p-4 border border-gray-100 group-hover:bg-gray-100/50 transition-colors">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product._id);
                        }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-colors shadow-sm ${
                          inWishlist ? 'bg-black text-white' : 'bg-white/90 text-black hover:bg-black hover:text-white border border-black/10'
                        }`}
                      >
                        <Zap className="w-4 h-4" />
                      </button>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isHyped && (
                          <span className="bg-[#E60023] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-white" /> HYPED
                          </span>
                        )}
                        {product.isLimited && (
                          <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            LIMITED EDITION
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[11px] font-black text-[#E60023] uppercase tracking-widest">{product.brand}</span>
                        <span className="text-black font-extrabold">★ {product.rating}</span>
                      </div>

                      <Link to={`/product/${product.slug}`} className="block">
                        <h3 className="font-bold text-base text-black group-hover:text-[#E60023] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 line-clamp-1 font-medium">{product.description}</p>
                    </div>
                  </div>

                  {/* Footer Price & Action */}
                  <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                    <div>
                      <span className="font-display font-black text-xl text-black">${product.price.toLocaleString()}</span>
                      {product.resellEstimate && (
                        <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-extrabold">
                          <TrendingUp className="w-3 h-3" /> Resell: ${product.resellEstimate.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link 
                        to={`/product/${product.slug}`}
                        className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-black hover:text-white text-xs font-bold transition-all text-gray-800 border border-gray-200 uppercase tracking-wider"
                      >
                        DETAILS
                      </Link>

                      <button
                        onClick={() => addItem({
                          productId: product._id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          image: product.images[0],
                          size: product.sizes[0]?.size || 'US 10',
                          color: product.colors[0]?.name || 'Standard',
                          quantity: 1
                        })}
                        className="bg-black hover:bg-[#E60023] text-white p-2.5 rounded-xl transition-all shadow-md flex items-center justify-center"
                        title="Add to Vault"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= LIMITED DROP COUNTDOWN ================= */}
      <section className="py-16 px-4 bg-gray-50 border-y border-black/10">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase">
              <Flame className="w-3.5 h-3.5 text-[#E60023]" />
              NEXT HYPER-DROP INCOMING
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-black">
              Air Jordan 1 Game-Worn
            </h2>
            <p className="text-gray-600 text-sm max-w-xl font-medium">
              Strictly limited allocation. TITAN and LEGEND VIP members get early access priority queueing.
            </p>

            {/* Timer Box */}
            <div className="flex gap-4 pt-2">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINS', val: timeLeft.mins },
                { label: 'SECS', val: timeLeft.secs }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 p-3 sm:p-4 rounded-2xl min-w-[70px] sm:min-w-[85px] text-center shadow-sm">
                  <span className="font-display font-black text-2xl sm:text-3xl text-black">{item.val}</span>
                  <span className="block text-[10px] text-gray-500 font-bold mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-end">
            <div className="glass-panel p-6 rounded-3xl border border-black/10 text-center space-y-4 w-full max-w-md bg-white shadow-md">
              <h3 className="font-bold text-lg text-black uppercase">RESERVE EARLY ACCESS</h3>
              <p className="text-xs text-gray-500 font-medium">Receive SMS / Email notifications 30 minutes before drop goes live.</p>
              <input
                type="email"
                placeholder="Enter your VIP email..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs text-black placeholder-gray-500 focus:outline-none focus:border-black"
              />
              <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#E60023] transition-all shadow-md">
                NOTIFY ME ON LAUNCH
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= NIKE-KILLER AI FEATURES GRID ================= */}
      <section className="py-24 px-4 max-w-[1700px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#E60023] uppercase">PROPRIETARY TECHNOLOGY</span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-black">
            BEYOND STANDARD SHOPPING
          </h2>
          <p className="text-gray-600 text-sm font-medium">
            AI features engineered directly into your fashion workflow that traditional retail websites simply don't have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: AI Outfit Generator */}
          <div className="glass-panel rounded-3xl p-8 border border-black/10 hover:border-black transition-all group bg-white hover:shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-[#E60023]" />
            </div>
            <h3 className="font-display font-bold text-xl text-black mb-2">AI OUTFIT GENERATOR</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-6 font-medium">
              Upload or pick a sneaker, and our neural engine builds matching apparel layering based on weather, occasion, and color theory.
            </p>
            <Link to="/ai-stylist" className="text-xs font-bold text-black hover:text-[#E60023] flex items-center gap-1">
              TRY OUTFIT GENERATOR <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: 3D Foot Scanner */}
          <div className="glass-panel rounded-3xl p-8 border border-black/10 hover:border-black transition-all group bg-white hover:shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-[#E60023]" />
            </div>
            <h3 className="font-display font-bold text-xl text-black mb-2">3D FOOT SCANNER</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-6 font-medium">
              Zero return sizing. Maps foot length and width down to the millimeter to guarantee 99.8% accurate US & EU shoe fitting.
            </p>
            <Link to="/shop" className="text-xs font-bold text-black hover:text-[#E60023] flex items-center gap-1">
              SCAN YOUR FIT <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Resell Value Index */}
          <div className="glass-panel rounded-3xl p-8 border border-black/10 hover:border-black transition-all group bg-white hover:shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-[#E60023]" />
            </div>
            <h3 className="font-display font-bold text-xl text-black mb-2">RESELL VALUE PREDICTOR</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-6 font-medium">
              Track investment potential for every sneaker pair in real-time. Know whether to hold, wear, or trade based on market analytics.
            </p>
            <Link to="/account" className="text-xs font-bold text-black hover:text-[#E60023] flex items-center gap-1">
              VIEW TASTE GRAPH <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ================= COMMUNITY LOOKS ================= */}
      <section className="py-20 px-4 max-w-[1700px] mx-auto border-t border-black/10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#E60023] uppercase">COMMUNITY GALLERY</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase mt-1 text-black">ON-FOOT LOOKBOOK</h2>
          </div>
          <Link to="/community" className="text-sm font-bold text-gray-700 hover:text-black flex items-center gap-1">
            VIEW ALL LOOKS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800", user: "@kaito_tokyo", likes: "1.4k" },
            { img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800", user: "@sarah_berlin", likes: "2.1k" },
            { img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800", user: "@marcus_nyc", likes: "980" },
            { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800", user: "@elena_paris", likes: "3.2k" }
          ].map((look, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden h-80 group shadow-sm">
              <img src={look.img} alt={look.user} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-white">{look.user}</span>
                <span className="text-[11px] text-[#E60023] font-semibold">❤️ {look.likes} Likes</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
