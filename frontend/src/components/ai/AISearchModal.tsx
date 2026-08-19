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
      <div onClick={onClose} className="fixed inset-0 bg-[#1A1008]/25 backdrop-blur-sm animate-in fade-in" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#FFF7E5] border border-[#E8D5B0] rounded-3xl p-6 shadow-2xl z-10 text-[#1A1008] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D5B0]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D52122] animate-pulse" />
            <h3 className="font-display font-black text-lg text-[#1A1008]">AI POWERED SEARCH</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#8C6E50] hover:text-[#D52122] transition-colors">
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
            className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-2xl pl-12 pr-24 py-4 text-sm text-[#1A1008] placeholder-[#8C6E50] focus:outline-none focus:border-[#D52122] transition-all"
            autoFocus
          />
          <Search className="w-5 h-5 absolute left-4 top-4 text-[#8C6E50]" />
          
          <div className="absolute right-3 top-2.5 flex items-center gap-1">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 rounded-xl border transition-all ${
                isListening ? 'bg-[#D52122] text-[#FFF7E5] animate-bounce border-[#D52122]' : 'bg-[#FFF0D0] text-[#8C6E50] hover:text-[#1A1008] border-[#E8D5B0]'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="bg-[#D52122] text-[#FFF7E5] p-2 rounded-xl hover:bg-[#B01A1B] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Visual Search Upload Zone */}
        <div className="mt-6 p-4 rounded-2xl border border-dashed border-[#E8D5B0] bg-[#FFF0D0] text-center hover:border-[#D52122] transition-colors cursor-pointer group">
          <Upload className="w-6 h-6 mx-auto text-[#8C6E50] group-hover:text-[#D52122] transition-colors" />
          <p className="text-xs font-bold text-[#1A1008] mt-2">Visual Image Search</p>
          <p className="text-[11px] text-[#8C6E50]">Drag & drop any outfit or sneaker photo to find exact matches</p>
        </div>

        {/* AI Suggested Prompts */}
        <div className="mt-6">
          <p className="text-xs font-bold text-[#8C6E50] uppercase tracking-wider mb-3">Trending AI Searches</p>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onClose();
                  navigate(`/shop?search=${encodeURIComponent(prompt)}`);
                }}
                className="text-xs bg-[#FFF0D0] hover:bg-[#D52122] hover:text-[#FFF7E5] text-[#8C6E50] px-3 py-1.5 rounded-full border border-[#E8D5B0] hover:border-[#D52122] transition-all text-left font-medium"
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
