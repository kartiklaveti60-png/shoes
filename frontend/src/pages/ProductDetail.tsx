import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Heart, Share2, Scan, CheckCircle2, RotateCw } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';
import { ThreeCanvas } from '../components/shared/ThreeCanvas';
import { FootScannerModal } from '../components/ai/FootScannerModal';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || 'US 10');
  const [scannerOpen, setScannerOpen] = useState(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);

  return (
    <div className="w-full min-h-screen bg-white text-black pt-24 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1700px] mx-auto">
      
      {/* Foot Scanner Modal */}
      <FootScannerModal isOpen={scannerOpen} onClose={() => setScannerOpen(false)} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-semibold">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <span>/</span>
        <span className="text-black font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Visual Showcase (2D Gallery & 3D Viewer) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual Box */}
          <div className="relative glass-panel rounded-3xl p-6 border border-black/10 overflow-hidden flex items-center justify-center min-h-[460px] bg-white shadow-sm">
            
            {/* View Mode Switcher */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <button
                onClick={() => setViewMode('2D')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === '2D' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                2D GALLERY
              </button>
              <button
                onClick={() => setViewMode('3D')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  viewMode === '3D' ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" /> 3D VIEWER
              </button>
            </div>

            {viewMode === '2D' ? (
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[380px] object-contain transition-all duration-300 transform hover:scale-105"
              />
            ) : (
              <ThreeCanvas className="w-full h-[420px]" />
            )}

            {/* Resell estimate badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-black/10 text-xs shadow-sm">
              <span className="text-gray-500 font-medium">Resell Projection: </span>
              <span className="text-green-600 font-extrabold">${product.resellEstimate || 650} (+91%)</span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImage(img);
                  setViewMode('2D');
                }}
                className={`h-24 glass-panel rounded-2xl overflow-hidden p-2 border transition-all ${
                  activeImage === img && viewMode === '2D' ? 'border-black bg-gray-100' : 'border-gray-200 hover:border-gray-400'
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
              <span className="font-bold text-[#FF5A1F] uppercase tracking-widest">{product.brand}</span>
              <span className="text-green-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> IN STOCK & READY TO SHIP
              </span>
            </div>

            <h1 className="font-display text-3xl font-black text-black uppercase">{product.name}</h1>

            <div className="flex items-center gap-4 mt-3">
              <span className="font-display font-black text-3xl text-black">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">${product.originalPrice}</span>
              )}
              <span className="bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
                ★ {product.rating} ({product.numReviews} Reviews)
              </span>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
              Color Variant: <span className="text-black">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {product.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${
                    selectedColor === col.name ? 'border-black scale-110' : 'border-gray-300 hover:scale-105'
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
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Select Size: <span className="text-[#FF5A1F]">{selectedSize}</span>
              </label>

              {/* Foot Scanner Trigger */}
              <button
                onClick={() => setScannerOpen(true)}
                className="text-xs text-black font-bold flex items-center gap-1 hover:underline"
              >
                <Scan className="w-3.5 h-3.5 text-[#FF5A1F]" /> AI SIZE SCANNER
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === s.size
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-black'
                  }`}
                >
                  {s.size}
                  <span className="block text-[9px] font-medium text-gray-400 mt-0.5">{s.stock} left</span>
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
              className="flex-1 bg-black text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#FF5A1F] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              ADD TO VAULT (${product.price})
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleWishlist(product._id)}
              className={`p-4 rounded-2xl border transition-colors ${
                inWishlist ? 'bg-black text-white border-black' : 'bg-gray-100 border-gray-200 text-gray-700 hover:text-black'
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Technology & Materials Card */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
            <h4 className="font-bold text-xs text-black uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FF5A1F]" /> PROPRIETARY ARCHITECTURE
            </h4>
            
            <div className="flex flex-wrap gap-1.5">
              {product.technology?.map((tech, i) => (
                <span key={i} className="text-[10px] font-bold bg-white text-gray-800 px-2.5 py-1 rounded-full border border-gray-200">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between text-xs text-gray-600">
              <span>Sustainability Score</span>
              <span className="text-green-600 font-bold">{product.sustainabilityScore}/100</span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= ARCHIVAL DETAIL GALLERY & SPECIFICATIONS ================= */}
      <section className="mt-20 pt-12 border-t border-gray-200 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" /> ARCHIVAL CERTIFICATION & DETAILS
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-black uppercase">
              HIGH-RESOLUTION DETAIL GALLERY
            </h2>
            <p className="text-sm text-gray-500 max-w-xl font-medium mt-1">
              {product.story || product.description}
            </p>
          </div>
          <div className="text-xs text-gray-500 font-semibold bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
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
                  setViewMode('2D');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group glass-panel rounded-3xl p-4 border border-gray-200 hover:border-black transition-all cursor-pointer bg-gray-50 hover:bg-white shadow-sm flex flex-col justify-between"
              >
                <div className="h-64 overflow-hidden rounded-2xl flex items-center justify-center bg-white p-2">
                  <img 
                    src={imgUrl} 
                    alt={caption} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-black uppercase tracking-tight">{caption}</span>
                  <span className="text-[10px] font-extrabold text-[#FF5A1F] uppercase group-hover:underline flex items-center gap-0.5">
                    VIEW <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      </div>
    </div>
  );
};
