import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Heart, Share2, Scan, CheckCircle2, RotateCw } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';
import { ThreeCanvas } from '../components/shared/ThreeCanvas';
import { FootScannerModal } from '../components/ai/FootScannerModal';
import { ResellPredictorModal } from '../components/ai/ResellPredictorModal';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || 'US 10');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [predictorOpen, setPredictorOpen] = useState(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-24 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1920px] mx-auto">
      
      {/* Foot Scanner Modal */}
      <FootScannerModal isOpen={scannerOpen} onClose={() => setScannerOpen(false)} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#8C6E50] mb-6 font-semibold">
        <Link to="/" className="hover:text-[#D52122] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#D52122] transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-[#1A1008] font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Visual Showcase */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual Box */}
          <div className="relative glass-panel rounded-3xl p-6 border border-[#E8D5B0] overflow-hidden flex items-center justify-center min-h-[460px] shadow-sm">
            
            <img
              src={activeImage}
              alt={product.name}
              className="max-h-[400px] object-contain transition-all duration-300 transform hover:scale-105"
            />

            {/* Resell estimate badge */}
            <div className="absolute bottom-4 left-4 bg-[#FFF7E5]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E8D5B0] text-xs shadow-sm">
              <span className="text-[#8C6E50] font-medium">Resell Projection: </span>
              <span className="text-green-600 font-extrabold">${product.resellEstimate || 650} (+91%)</span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`h-24 glass-panel rounded-2xl overflow-hidden p-2 border transition-all ${
                  activeImage === img ? 'border-[#D52122] bg-[#FFF0D0]' : 'border-[#E8D5B0] hover:border-[#D52122]/40'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Specifications & Checkout */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#D52122] uppercase tracking-widest">{product.brand}</span>
              <span className="text-green-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> IN STOCK & READY TO SHIP
              </span>
            </div>

            <h1 className="font-display text-3xl font-black text-[#1A1008] uppercase">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="font-display font-black text-3xl text-[#1A1008]">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-[#8C6E50] line-through">${product.originalPrice}</span>
              )}
              <span className="bg-[#D52122] text-[#FFF7E5] text-xs font-bold px-2.5 py-1 rounded-full">
                ★ {product.rating} ({product.numReviews} Reviews)
              </span>
            </div>

            {/* Resell Value Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-[#FFF0D0] border border-[#E8D5B0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div>
                <span className="text-[10px] font-extrabold text-[#D52122] uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> RESELL VALUE PREDICTOR
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-[#8C6E50] font-medium">Est. Resell Value:</span>
                  <span className="font-mono font-black text-lg text-emerald-600">
                    ${(product.resellEstimate || product.price * 1.5).toLocaleString()}
                  </span>
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    +${((product.resellEstimate || product.price * 1.5) - product.price).toLocaleString()} (+{((((product.resellEstimate || product.price * 1.5) - product.price) / product.price) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <Link
                to={`/resell-predictor?product=${product.slug}`}
                className="text-xs font-bold text-[#1A1008] hover:text-[#D52122] border border-[#E8D5B0] hover:border-[#D52122]/40 bg-[#FFF7E5] px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-sm hover:shadow-md"
              >
                VIEW MARKET GRAPH <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="text-xs font-bold text-[#8C6E50] uppercase tracking-wider block mb-2">
              Color Variant: <span className="text-[#1A1008]">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {product.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${
                    selectedColor === col.name ? 'border-[#D52122] scale-110' : 'border-[#E8D5B0] hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#8C6E50] uppercase tracking-wider">
                Select Size: <span className="text-[#D52122]">{selectedSize}</span>
              </label>

              <button
                onClick={() => setScannerOpen(true)}
                className="text-xs text-[#1A1008] font-bold flex items-center gap-1 hover:text-[#D52122] transition-colors"
              >
                <Scan className="w-3.5 h-3.5 text-[#D52122]" /> AI SIZE SCANNER
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === s.size
                      ? 'bg-[#D52122] text-[#FFF7E5] border-[#D52122] shadow-md'
                      : 'bg-[#FFF0D0] text-[#8C6E50] border-[#E8D5B0] hover:border-[#D52122]/40'
                  }`}
                >
                  {s.size}
                  <span className="block text-[9px] font-medium mt-0.5 opacity-70">{s.stock} left</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => addItem({
                productId: product._id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: activeImage,
                size: selectedSize,
                color: selectedColor,
                quantity: 1
              })}
              className="flex-1 bg-[#D52122] text-[#FFF7E5] py-4 rounded-2xl font-bold text-sm hover:bg-[#B01A1B] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              ADD TO VAULT (${product.price})
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleWishlist(product._id)}
              className={`p-4 rounded-2xl border transition-colors ${
                inWishlist ? 'bg-[#D52122] text-[#FFF7E5] border-[#D52122]' : 'bg-[#FFF0D0] border-[#E8D5B0] text-[#8C6E50] hover:text-[#D52122] hover:border-[#D52122]/40'
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Technology & Materials Card */}
          <div className="bg-[#FFF0D0] p-5 rounded-2xl border border-[#E8D5B0] space-y-3">
            <h4 className="font-bold text-xs text-[#1A1008] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#D52122]" /> PROPRIETARY ARCHITECTURE
            </h4>
            
            <div className="flex flex-wrap gap-1.5">
              {product.technology?.map((tech, i) => (
                <span key={i} className="text-[10px] font-bold bg-[#FFF7E5] text-[#8C6E50] px-2.5 py-1 rounded-full border border-[#E8D5B0]">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8D5B0] flex justify-between text-xs text-[#8C6E50]">
              <span>Sustainability Score</span>
              <span className="text-green-600 font-bold">{product.sustainabilityScore}/100</span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= ARCHIVAL DETAIL GALLERY ================= */}
      <section className="mt-20 pt-12 border-t border-[#E8D5B0] space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D52122]/10 text-[#D52122] text-xs font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" /> ARCHIVAL CERTIFICATION & DETAILS
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1A1008] uppercase">
              HIGH-RESOLUTION DETAIL GALLERY
            </h2>
            <p className="text-sm text-[#8C6E50] max-w-xl font-medium mt-1">
              {product.story || product.description}
            </p>
          </div>
          <div className="text-xs text-[#8C6E50] font-semibold bg-[#FFF0D0] px-4 py-2 rounded-xl border border-[#E8D5B0]">
            AUTHENTICATED VIA MEARS & PSA/DNA • 100% GUARANTEED
          </div>
        </div>

        {/* Detail Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.images.map((imgUrl, i) => {
            const labels = [
              "Full Lateral Profile & Vintage Finish",
              "Authentic Michael Jordan Signed Collar",
              "Top-Down Insoles & Tongue Tag Spec",
              "Original 1985 Outsole & Wear Pattern"
            ];
            const caption = labels[i] || `Detail Spec Shot #${i + 1}`;

            return (
              <div 
                key={i} 
                onClick={() => {
                  setActiveImage(imgUrl);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group glass-panel rounded-3xl p-4 border border-[#E8D5B0] hover:border-[#D52122]/40 transition-all cursor-pointer bg-[#FFF0D0] hover:bg-[#FFF7E5] shadow-sm flex flex-col justify-between"
              >
                <div className="h-64 overflow-hidden rounded-2xl flex items-center justify-center bg-[#FFF7E5] p-2">
                  <img 
                    src={imgUrl} 
                    alt={caption} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1008] uppercase tracking-tight">{caption}</span>
                  <span className="text-[10px] font-extrabold text-[#D52122] uppercase group-hover:underline flex items-center gap-0.5">
                    VIEW <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Resell Predictor Modal */}
      <ResellPredictorModal isOpen={predictorOpen} onClose={() => setPredictorOpen(false)} />

      </div>
    </div>
  );
};
