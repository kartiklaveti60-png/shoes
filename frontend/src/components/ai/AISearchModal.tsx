import React, { useState } from 'react';
import { X, Search, Mic, Upload, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AISearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions] = useState<string[]>([
    "Futuristic black high-top with carbon fiber",
    "Lightweight marathon running sneakers under 200g",
    "Limited edition retro Jordan colorways",
    "Waterproof technical storm sneakers"
  ]);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setQuery("Cyberpunk futuristic orange sneaker");
      setIsListening(false);
    }, 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white border border-black/10 rounded-3xl p-6 shadow-2xl z-10 text-black animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF5A1F] animate-pulse" />
            <h3 className="font-display font-black text-lg text-black">AI POWERED SEARCH</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-6 relative">
          <input
            type="text"
            placeholder="Describe any sneaker, aesthetic, or vibe (e.g. 'cyberpunk running shoe')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-2xl pl-12 pr-24 py-4 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-black transition-all"
            autoFocus
          />
          <Search className="w-5 h-5 absolute left-4 top-4 text-gray-500" />
          
          <div className="absolute right-3 top-2.5 flex items-center gap-1">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 rounded-xl border transition-all ${
                isListening ? 'bg-[#FF5A1F] text-white animate-bounce border-[#FF5A1F]' : 'bg-gray-100 text-gray-700 hover:text-black border-gray-300'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="bg-black text-white p-2 rounded-xl hover:bg-[#FF5A1F] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Visual Search Upload Zone */}
        <div className="mt-6 p-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center hover:border-black transition-colors cursor-pointer group">
          <Upload className="w-6 h-6 mx-auto text-gray-500 group-hover:text-black transition-colors" />
          <p className="text-xs font-bold text-black mt-2">Visual Image Search</p>
          <p className="text-[11px] text-gray-500">Drag & drop any outfit or sneaker photo to find exact matches</p>
        </div>

        {/* AI Suggested Prompts */}
        <div className="mt-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Trending AI Searches</p>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(prompt)}
                className="text-xs bg-gray-100 hover:bg-black hover:text-white text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 transition-all text-left"
              >
                ✦ {prompt}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
