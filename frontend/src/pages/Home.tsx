import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Zap, Award, Play, CheckCircle2, Eye, TrendingUp, ShoppingBag } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { ResellPredictorModal } from '../components/ai/ResellPredictorModal';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [isPredictorOpen, setIsPredictorOpen] = useState(false);
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
    <div className="min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-20">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden border-b border-[#E8D5B0]">
        
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D52122]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1920px] mx-auto w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D52122]/8 border border-[#D52122]/20 text-xs font-black tracking-widest text-[#1A1008] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D52122]" />
              THE NEXT GENERATION OF FOOTWEAR
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-[#1A1008]">
              COP THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1008] via-[#8C6E50] to-[#D52122]">
                LEGIT'S.
              </span>
            </h1>

            <p className="text-[#8C6E50] text-base sm:text-lg font-normal max-w-lg leading-relaxed">
              Engineered with aerospace carbon fiber, nitrogen-infused foam, and AI-tailored size precision. Outperforming every standard sneaker on earth.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="bg-[#D52122] text-[#FFF7E5] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#B01A1B] transition-all shadow-lg flex items-center gap-2 group"
              >
                EXPLORE VAULT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#E8D5B0]">
              <div>
                <span className="font-display font-black text-2xl text-[#1A1008]">100%</span>
                <p className="text-xs text-[#8C6E50] mt-0.5 font-medium">Authentic Verified</p>
              </div>
              <div>
                <span className="font-display font-black text-2xl text-[#D52122]">85%</span>
                <p className="text-xs text-[#8C6E50] mt-0.5 font-medium">Energy Return</p>
              </div>
              <div>
                <span className="font-display font-black text-2xl text-[#1A1008]">4.98★</span>
                <p className="text-xs text-[#8C6E50] mt-0.5 font-medium">Collector Rating</p>
              </div>
            </div>
          </div>

          {/* Right Showcase Card: #1 Best Seller */}
          <div className="lg:col-span-6 relative">
            <div className="glass-panel rounded-3xl p-6 border border-[#E8D5B0] relative overflow-hidden shadow-xl space-y-6">
              
              {/* Badge */}
              <div className="flex items-center justify-between">
                <div className="bg-[#D52122] text-[#FFF7E5] px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                  <Flame className="w-3.5 h-3.5 text-[#FFF7E5]" />
                  #1 BEST SELLING SNEAKER IN OUR WEBSITE
                </div>
                <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  IN STOCK • VERIFIED AUTHENTIC
                </span>
              </div>

              {/* Product Image */}
              <Link
                to="/product/nike-air-jordan-1-high-chicago-lost-and-found"
                className="block h-64 sm:h-72 bg-[#FFF0D0] rounded-2xl overflow-hidden p-4 relative border border-[#E8D5B0] group"
              >
                <img
                  src="/images/aj1-chicago-lost-found.jpg"
                  alt="Air Jordan 1 High Chicago Lost and Found"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Product Details & Prices */}
              <div className="space-y-4">
                <div>
                  <Link to="/product/nike-air-jordan-1-high-chicago-lost-and-found" className="block group">
                    <h3 className="font-display font-black text-2xl text-[#1A1008] group-hover:text-[#D52122] transition-colors">
                      Air Jordan 1 High Chicago "Lost & Found"
                    </h3>
                  </Link>
                  <p className="text-xs text-[#8C6E50] font-medium mt-1">
                    Original 1985 Chicago Colorway • Vintage Cracked Leather Collar & Aged Midsole
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-[#FFF0D0] rounded-2xl border border-[#E8D5B0]">
                  <div>
                    <span className="text-[11px] text-[#8C6E50] font-bold block uppercase">RETAIL PRICE</span>
                    <span className="font-display font-black text-xl text-[#1A1008]">$180</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C6E50] font-bold block uppercase">EST. RESELL VALUE</span>
                    <span className="font-display font-black text-xl text-green-600">$300</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="flex items-center gap-3 pt-1">
                  <Link
                    to="/product/nike-air-jordan-1-high-chicago-lost-and-found"
                    className="w-full bg-[#D52122] hover:bg-[#B01A1B] text-[#FFF7E5] py-4 rounded-full font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    CHECK OUT NOW
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= HYPED SNEAKERS SECTION ================= */}
      <section className="py-20 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-[#E8D5B0] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D52122] text-[#FFF7E5] text-[11px] font-extrabold tracking-widest uppercase mb-3 shadow-md">
              <Flame className="w-3.5 h-3.5 text-[#FFF7E5] animate-pulse" />
              MOST WANTED SILHOUETTES
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#1A1008] flex items-center gap-3">
              HYPED SNEAKERS
              <span className="text-xs bg-[#D52122] text-[#FFF7E5] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                LIVE MARKET
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8C6E50] mt-2 font-medium max-w-xl">
              Real-time trending footwear with highest demand scores, resell appreciation, and limited allocation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/shop?category=Hyped" 
              className="text-xs font-extrabold text-[#D52122] hover:text-[#FFF7E5] hover:bg-[#D52122] flex items-center gap-1.5 transition-all uppercase tracking-wider px-5 py-3 rounded-full border border-[#D52122]/40 hover:border-[#D52122] bg-[#FFF7E5]"
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
                    ? 'bg-[#D52122] text-[#FFF7E5] shadow-lg scale-105'
                    : 'bg-[#FFF0D0] text-[#8C6E50] hover:bg-[#D52122]/10 hover:text-[#1A1008] border border-[#E8D5B0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sneaker Cards Grid */}
        {displayedHypedProducts.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl p-8 border border-[#E8D5B0]">
            <p className="text-[#8C6E50] font-medium text-sm">No hyped sneakers currently listed under "{activeHypedTab}".</p>
            <button
              onClick={() => setActiveHypedTab('All')}
              className="mt-4 bg-[#D52122] text-[#FFF7E5] px-6 py-2 rounded-full text-xs font-bold hover:bg-[#B01A1B]"
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
                  className="group glass-panel rounded-3xl p-4 border border-[#E8D5B0] hover:border-[#D52122]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl relative overflow-hidden"
                >
                  {/* Top Hype Pulse Banner */}
                  <div className="flex items-center justify-between text-[10px] font-extrabold uppercase px-3 py-1.5 bg-[#FFF0D0] rounded-xl mb-3 border border-[#E8D5B0]">
                    <span className="flex items-center gap-1 text-[#D52122]">
                      <Flame className="w-3 h-3 fill-[#D52122]" />
                      Hype Level: {hypeVal}%
                    </span>
                    <span className="flex items-center gap-1 text-[#8C6E50]">
                      <Eye className="w-3 h-3 text-[#1A1008]" />
                      {viewers.toLocaleString()} Viewing
                    </span>
                  </div>

                  <div>
                    {/* Image Container */}
                    <Link to={`/product/${product.slug}`} className="block relative h-64 bg-[#FFF0D0] rounded-2xl overflow-hidden p-4 border border-[#E8D5B0] group-hover:bg-[#FFE8B8]/50 transition-colors">
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
                          inWishlist ? 'bg-[#D52122] text-[#FFF7E5]' : 'bg-[#FFF7E5]/90 text-[#1A1008] hover:bg-[#D52122] hover:text-[#FFF7E5] border border-[#E8D5B0]'
                        }`}
                      >
                        <Zap className="w-4 h-4" />
                      </button>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isHyped && (
                          <span className="bg-[#D52122] text-[#FFF7E5] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-[#FFF7E5]" /> HYPED
                          </span>
                        )}
                        {product.isLimited && (
                          <span className="bg-[#1A1008] text-[#FFF7E5] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            LIMITED EDITION
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[11px] font-black text-[#D52122] uppercase tracking-widest">{product.brand}</span>
                        <span className="text-[#1A1008] font-extrabold">★ {product.rating}</span>
                      </div>

                      <Link to={`/product/${product.slug}`} className="block">
                        <h3 className="font-bold text-base text-[#1A1008] group-hover:text-[#D52122] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#8C6E50] line-clamp-1 font-medium">{product.description}</p>
                    </div>
                  </div>

                  {/* Footer Price & Action */}
                  <div className="mt-6 pt-4 border-t border-[#E8D5B0] flex items-center justify-between">
                    <div>
                      <span className="font-display font-black text-xl text-[#1A1008]">${product.price.toLocaleString()}</span>
                      {product.resellEstimate && (
                        <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-extrabold">
                          <TrendingUp className="w-3 h-3" /> Resell: ${product.resellEstimate.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link 
                        to={`/product/${product.slug}`}
                        className="px-3.5 py-2 rounded-xl bg-[#FFF0D0] hover:bg-[#D52122] hover:text-[#FFF7E5] text-xs font-bold transition-all text-[#8C6E50] border border-[#E8D5B0] uppercase tracking-wider"
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
                        className="bg-[#D52122] hover:bg-[#B01A1B] text-[#FFF7E5] p-2.5 rounded-xl transition-all shadow-md flex items-center justify-center"
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

      {/* ================= EDITORIAL LIFESTYLE CAMPAIGN BANNER ================= */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#E8D5B0] shadow-2xl group">
          {/* Campaign Image */}
          <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden bg-black">
            <img
              src="/images/timeless-pairs-endless-styling.png"
              alt="Timeless Pairs. Endless Styling."
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95"
            />
            {/* Dark Gradient Overlay covering bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Overlay Content & CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7E5]/90 backdrop-blur-md text-[#1A1008] text-[11px] font-black tracking-widest uppercase shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#D52122]" />
                SS26 EDITORIAL CAMPAIGN
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter text-white drop-shadow-md">
                TIMELESS PAIRS. ENDLESS STYLING.
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed max-w-lg">
                From iconic OG colorways to everyday streetwear grails. Discover timeless sneaker silhouettes curated for versatile luxury styling.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                to="/lookbook"
                className="bg-[#FFF7E5] hover:bg-[#D52122] hover:text-[#FFF7E5] text-[#1A1008] px-8 py-4 rounded-full font-black text-xs transition-all shadow-xl flex items-center gap-2 uppercase tracking-wider group/btn"
              >
                EXPLORE STYLING LOOKBOOK
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIMITED DROP COUNTDOWN ================= */}
      <section className="py-16 px-4 bg-[#FFF0D0] border-y border-[#E8D5B0]">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D52122] text-[#FFF7E5] text-xs font-bold uppercase">
              <Flame className="w-3.5 h-3.5 text-[#FFF7E5]" />
              NEXT HYPER-DROP INCOMING
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-[#1A1008]">
              Air Jordan 1 Game-Worn
            </h2>
            <p className="text-[#8C6E50] text-sm max-w-xl font-medium">
              Strictly limited allocation. Early access priority queueing available for registered members.
            </p>

            {/* Timer Box */}
            <div className="flex gap-4 pt-2">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINS', val: timeLeft.mins },
                { label: 'SECS', val: timeLeft.secs }
              ].map((item, i) => (
                <div key={i} className="bg-[#FFF7E5] border border-[#E8D5B0] p-3 sm:p-4 rounded-2xl min-w-[70px] sm:min-w-[85px] text-center shadow-sm">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#D52122]">{item.val}</span>
                  <span className="block text-[10px] text-[#8C6E50] font-bold mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-end">
            <div className="glass-panel p-6 rounded-3xl border border-[#E8D5B0] text-center space-y-4 w-full max-w-md shadow-md">
              <h3 className="font-bold text-lg text-[#1A1008] uppercase">RESERVE EARLY ACCESS</h3>
              <p className="text-xs text-[#8C6E50] font-medium">Receive SMS / Email notifications 30 minutes before drop goes live.</p>
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl px-4 py-3 text-xs text-[#1A1008] placeholder-[#8C6E50] focus:outline-none focus:border-[#D52122] transition-colors"
              />
              <button className="w-full bg-[#D52122] text-[#FFF7E5] py-3.5 rounded-xl font-bold text-xs hover:bg-[#B01A1B] transition-all shadow-md">
                NOTIFY ME ON LAUNCH
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= RESELL VALUE PREDICTOR SECTION ================= */}
      <section className="py-16 px-4 sm:px-8 max-w-[1700px] mx-auto my-12">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-[#E8D5B0] shadow-2xl bg-[#1A1008] text-white">
          {/* Full Quality Background Image Showcase */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/resell_predictor_bg.jpg"
              alt="Resell Market Vintage Jordan 1 Collection"
              className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000 ease-out opacity-90 brightness-95"
            />
            {/* Subtle Vignette & Dark Gradient only at edges for maximum text contrast & crystal clear image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 lg:p-16 space-y-12 max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#D52122] text-[#FFF7E5] px-4 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-[#FFF7E5]" />
                <span className="text-xs font-black tracking-widest uppercase">PROPRIETARY MARKET INTELLIGENCE</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight drop-shadow-md">
                RESELL VALUE PREDICTOR
              </h2>
              <p className="text-gray-200 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                Real-time market valuation engine tracking retail vs estimated resell value, ROI percentage curves, and price trajectory forecasts for iconic Jordan grails.
              </p>
            </div>

            {/* Resell Predictor Main Glass Card */}
            <div className="max-w-4xl mx-auto bg-black/65 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/15">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#D52122] text-[#FFF7E5] flex items-center justify-center shadow-lg shrink-0">
                    <Zap className="w-7 h-7 text-[#FFF7E5]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">MARKET INVESTMENT INDEX</h3>
                    <p className="text-xs text-gray-300 font-medium">Live market data tracking supply, demand, and projected sneaker appreciation.</p>
                  </div>
                </div>

                <Link
                  to="/resell-predictor"
                  className="bg-[#D52122] hover:bg-[#B01A1B] text-[#FFF7E5] px-7 py-3.5 rounded-full font-black text-xs transition-all shadow-xl flex items-center gap-2 uppercase tracking-wider shrink-0 hover:scale-105"
                >
                  <TrendingUp className="w-4 h-4 text-[#FFF7E5]" />
                  OPEN FULL GRAPH PREDICTOR
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Preview Ticker of Top Hyped & Limited Edition Sneakers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MOCK_PRODUCTS.filter(p => p.isHyped === true || p.isLimited === true).slice(0, 3).map((prod: Product) => {
                  const retail = prod.price || 150;
                  const resell = prod.resellEstimate || retail * 1.5;
                  const roi = (((resell - retail) / retail) * 100).toFixed(1);

                  return (
                    <Link
                      key={prod._id}
                      to={`/resell-predictor?product=${prod.slug}`}
                      className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all cursor-pointer group flex items-center gap-3 shadow-sm hover:shadow-md"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 object-contain rounded-xl bg-white/90 p-1 border border-white/20 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <span className="font-bold text-xs text-white truncate block">{prod.name}</span>
                        <div className="flex items-center gap-2 text-[11px] mt-0.5">
                          <span className="text-gray-300 font-medium">${retail} ➔</span>
                          <span className="font-black text-emerald-400">${resell.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-[#D52122] group-hover:underline flex items-center gap-0.5 mt-0.5">
                          +${(resell - retail).toLocaleString()} ({roi}%) <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY LOOKS ================= */}
      <section className="py-20 px-4 max-w-[1700px] mx-auto border-t border-[#E8D5B0]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#D52122] uppercase">EDITORIAL & COMMUNITY GALLERY</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase mt-1 text-[#1A1008]">ON-FOOT LOOKBOOK</h2>
          </div>
          <Link to="/lookbook" className="text-sm font-bold text-[#8C6E50] hover:text-[#D52122] flex items-center gap-1 transition-colors">
            EXPLORE FULL LOOKBOOK <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: "/images/lookbook_monochrome.jpg", user: "@monochrome_sole", label: "AJ1 OG Monochrome", likes: "3.2k" },
            { img: "/images/lookbook_shattered_backboard.jpg", user: "@shattered_backboard", label: "AJ1 Shattered Glass", likes: "4.5k" },
            { img: "/images/smart_kicks_community.jpg", user: "@smartkicks_official", label: "Grail Room Flex", likes: "1.4k" },
            { img: "/images/elena_rostova_community.jpg", user: "@elena_berlin", label: "Berlin Stairs Fit", likes: "2.8k" }
          ].map((look, i) => (
            <Link key={i} to="/lookbook" className="relative rounded-3xl overflow-hidden h-96 group shadow-md border border-[#E8D5B0] bg-[#FFF0D0]">
              <img src={look.img} alt={look.user} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] font-black text-[#D52122] uppercase tracking-widest">{look.label}</span>
                <span className="text-sm font-black text-[#FFF7E5] uppercase tracking-wider">{look.user}</span>
                <span className="text-xs text-[#FFF0D0] font-bold mt-1">❤️ {look.likes} Likes</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};
