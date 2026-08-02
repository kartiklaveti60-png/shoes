import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw, Shirt, CheckCircle2, ShieldCheck, Sun, CloudRain, Flame } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';
import axios from 'axios';

export const AIStylistPage: React.FC = () => {
  const [selectedSneaker, setSelectedSneaker] = useState(MOCK_PRODUCTS[0]);
  const [occasion, setOccasion] = useState('Metropolitan Streetwear');
  const [weather, setWeather] = useState('Autumn Cool (18°C)');
  const [generating, setGenerating] = useState(false);
  
  const [outfitResult, setOutfitResult] = useState<any>({
    sneaker: "Air Jordan 1 Game-Worn",
    matchScore: 99.4,
    layers: {
      top: { item: "Over-sized Heavyweight Cyber-Fleece Hoodie", color: "Matte Charcoal", brand: "SOLE LABS Studio" },
      bottom: { item: "Technical Cargo Trousers with Magnetic Buckles", color: "Obsidian Black", brand: "Acronym Ref" },
      outerwear: { item: "Reflective Modular Windshell Jacket", color: "Cyber Orange accents", brand: "SOLE LABS Studio" },
      accessories: ["Matte Titanium Carabiner Watch", "Minimalist Sling Bag"]
    },
    colorPalette: ["#0A0A0A", "#1C1C1C", "#FF5A1F", "#E5E5E5"],
    stylistNote: "This outfit creates a high-contrast silhouette emphasizing the sole geometry while protecting against chilly urban climate."
  });

  const handleGenerateOutfit = async () => {
    setGenerating(true);
    try {
      const res = await axios.post('/api/v1/ai/outfit', {
        sneakerId: selectedSneaker._id,
        occasion,
        weather
      });
      if (res.data.outfit) setOutfitResult(res.data.outfit);
    } catch (e) {
      // Keep fallback
    } finally {
      setTimeout(() => setGenerating(false), 800);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold uppercase">
          <Sparkles className="w-4 h-4 text-[#FF5A1F]" /> AI STYLIST STUDIO
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-black">OUTFIT GENERATOR</h1>
        <p className="text-gray-600 text-sm font-medium">
          Select any sneaker and climate conditions. Our neural engine generates high-fashion apparel pairings tailored to your exact taste profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Configuration */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 space-y-6 bg-white shadow-sm">
          
          <h3 className="font-display font-bold text-lg text-black uppercase flex items-center gap-2">
            <Shirt className="w-5 h-5 text-[#FF5A1F]" /> STYLING PARAMETERS
          </h3>

          {/* Sneaker Selection */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Target Sneaker</label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {MOCK_PRODUCTS.map((prod) => (
                <button
                  key={prod._id}
                  onClick={() => setSelectedSneaker(prod)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    selectedSneaker._id === prod._id
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-gray-50 border-gray-200 hover:border-black text-black'
                  }`}
                >
                  <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 object-contain rounded-xl bg-white border border-gray-200" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold truncate">{prod.name}</h4>
                    <p className={`text-[10px] ${selectedSneaker._id === prod._id ? 'text-gray-300' : 'text-gray-500'}`}>${prod.price} • {prod.brand}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Occasion Vibe</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs text-black focus:outline-none focus:border-black font-semibold"
            >
              <option value="Metropolitan Streetwear" className="bg-white">Metropolitan Streetwear</option>
              <option value="High Fashion Gala" className="bg-white">High Fashion Gala</option>
              <option value="Casual Minimalist" className="bg-white">Casual Minimalist</option>
              <option value="Techwear Utility" className="bg-white">Techwear Utility</option>
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Climate Condition</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs text-black focus:outline-none focus:border-black font-semibold"
            >
              <option value="Autumn Cool (18°C)" className="bg-white">Autumn Cool (18°C)</option>
              <option value="Summer Warm (28°C)" className="bg-white">Summer Warm (28°C)</option>
              <option value="Winter Frost (4°C)" className="bg-white">Winter Frost (4°C)</option>
              <option value="Rainy Cyberpunk" className="bg-white">Rainy Cyberpunk</option>
            </select>
          </div>

          {/* CTA Generate */}
          <button
            onClick={handleGenerateOutfit}
            disabled={generating}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#FF5A1F] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> GENERATING NEURAL OUTFIT...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FF5A1F]" /> GENERATE COMPLETE OUTFIT
              </>
            )}
          </button>

        </div>

        {/* Right Column: AI Outfit Output */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 relative bg-white shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-black/10">
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">AI MATCH CONFIDENCE</span>
                <h3 className="font-display font-black text-3xl text-green-600 mt-0.5">{outfitResult.matchScore}%</h3>
              </div>
              <div className="flex gap-1.5">
                {outfitResult.colorPalette?.map((hex: string, idx: number) => (
                  <div key={idx} className="w-6 h-6 rounded-full border border-gray-300" style={{ backgroundColor: hex }} title={hex} />
                ))}
              </div>
            </div>

            {/* Layer Breakdown */}
            <div className="mt-6 space-y-4">
              
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#FF5A1F] font-bold uppercase tracking-wider block">FOOTWEAR ANCHOR</span>
                  <h4 className="text-sm font-bold text-black">{selectedSneaker.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">${selectedSneaker.price} • {selectedSneaker.brand}</p>
                </div>
                <img src={selectedSneaker.images[0]} alt="sneaker" className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-gray-100" />
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">RECOMMENDED LAYERING</span>
                
                <div className="text-xs space-y-1">
                  <p className="text-black"><strong className="text-gray-500">Outerwear:</strong> {outfitResult.layers?.outerwear?.item} ({outfitResult.layers?.outerwear?.color})</p>
                  <p className="text-black"><strong className="text-gray-500">Hoodie/Top:</strong> {outfitResult.layers?.top?.item} ({outfitResult.layers?.top?.color})</p>
                  <p className="text-black"><strong className="text-gray-500">Bottoms:</strong> {outfitResult.layers?.bottom?.item} ({outfitResult.layers?.bottom?.color})</p>
                </div>
              </div>

              {/* Stylist Note */}
              <div className="p-4 rounded-2xl bg-gray-100 border border-gray-300 text-xs text-gray-800 leading-relaxed font-medium">
                <span className="font-bold text-black block mb-1">ARCHITECT STYLIST NOTE:</span>
                "{outfitResult.stylistNote}"
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
