import React, { useState } from 'react';
import { X, Camera, Scan, CheckCircle2, Ruler } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const FootScannerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [footLength, setFootLength] = useState(27.2); // cm
  const [footWidth, setFootWidth] = useState(10.1); // cm
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [recommendedSize, setRecommendedSize] = useState('US 10');

  const { user } = useAuthStore();

  if (!isOpen) return null;

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);

      if (footLength < 25) setRecommendedSize('US 7.5');
      else if (footLength < 26) setRecommendedSize('US 8.5');
      else if (footLength < 27) setRecommendedSize('US 9.5');
      else if (footLength < 28) setRecommendedSize('US 10');
      else setRecommendedSize('US 11.5');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in" />

      <div className="relative w-full max-w-lg bg-white border border-black/10 rounded-3xl p-6 shadow-2xl z-10 text-black">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-[#FF5A1F] animate-pulse" />
            <h3 className="font-display font-black text-lg text-black">AI 3D FOOT SCANNER</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!scanComplete ? (
          <div className="mt-6 space-y-6">
            
            {/* Camera Viewfinder Mock */}
            <div className="relative h-48 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden flex flex-col items-center justify-center">
              {isScanning ? (
                <div className="absolute inset-0 bg-[#FF5A1F]/10 flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-[#FF5A1F] shadow-glow-orange animate-pulse" />
                  <p className="mt-4 text-xs font-bold text-black uppercase tracking-wider animate-pulse">
                    Mapping 14,000 Spatial Micro-Points...
                  </p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <Camera className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                  <p className="text-xs text-black font-bold">Place your foot next to a standard card</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Or manually adjust the precision sliders below</p>
                </div>
              )}
            </div>

            {/* Precision Sliders */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <div className="flex justify-between text-xs font-bold text-black mb-1">
                  <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5 text-[#FF5A1F]" /> Foot Length</span>
                  <span className="text-[#FF5A1F]">{footLength.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min="22.0"
                  max="32.0"
                  step="0.1"
                  value={footLength}
                  onChange={(e) => setFootLength(parseFloat(e.target.value))}
                  className="w-full accent-black"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-black mb-1">
                  <span>Foot Width (Ball of foot)</span>
                  <span className="text-[#FF5A1F]">{footWidth.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min="8.0"
                  max="13.0"
                  step="0.1"
                  value={footWidth}
                  onChange={(e) => setFootWidth(parseFloat(e.target.value))}
                  className="w-full accent-black"
                />
              </div>
            </div>

            {/* Scan Button */}
            <button
              onClick={handleStartScan}
              disabled={isScanning}
              className="w-full bg-black text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#FF5A1F] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isScanning ? 'ANALYZING 3D MESH...' : 'ANALYZE EXACT FIT'}
            </button>
          </div>
        ) : (
          /* Scan Result */
          <div className="mt-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-green-600 animate-in zoom-in-50" />
            
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Recommended Fit</p>
              <h2 className="font-display text-4xl font-black text-black mt-1">
                {recommendedSize}
              </h2>
              <p className="text-xs text-green-600 font-semibold mt-1">99.2% Predictive Fit Confidence</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl text-left text-xs space-y-2 border border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-500">EU Equivalent</span>
                <span className="font-bold text-black">EU 43</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Width Profile</span>
                <span className="font-bold text-black">{footWidth > 10.3 ? 'Slightly Wide (+0.5 size)' : 'Standard D Width'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Arch Strain Index</span>
                <span className="font-bold text-green-600">Low / Neutral Arch</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-black text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#FF5A1F] transition-all"
            >
              APPLY SIZING TO SHOPPING
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
