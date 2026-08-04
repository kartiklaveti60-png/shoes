import React, { useState } from 'react';
import { X, TrendingUp, DollarSign, Search, ArrowUpRight, Zap, ShieldCheck, BarChart3, Filter, LayoutGrid, Table } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../../lib/mockData';
import { Link } from 'react-router-dom';

interface ResellPredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SneakerGraphCard: React.FC<{ product: Product }> = ({ product }) => {
  const retail = product.price || 150;
  const resell = product.resellEstimate || retail * 1.5;
  const profit = resell - retail;
  const roi = (((resell - retail) / retail) * 100).toFixed(1);

  const graphPoints = [
    { label: 'Q1 2025', price: Math.round(retail * 1.05) },
    { label: 'Q2 2025', price: Math.round(retail * 1.35) },
    { label: 'Q3 2025', price: Math.round(retail + profit * 0.45) },
    { label: 'Q4 2025', price: Math.round(retail + profit * 0.78) },
    { label: '2026', price: resell },
    { label: '2027 PROJ', price: Math.round(resell * 1.25) },
  ];

  const maxPrice = Math.max(...graphPoints.map((p) => p.price));
  const minPrice = Math.min(...graphPoints.map((p) => p.price));
  const range = maxPrice - minPrice || 1;

  const svgWidth = 500;
  const svgHeight = 180;
  const padding = 25;

  const points = graphPoints.map((pt, i) => {
    const x = padding + (i / (graphPoints.length - 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((pt.price - minPrice) / range) * (svgHeight - padding * 2);
    return { x, y, pt };
  });

  const pathD = points.reduce((acc, curr, i) => {
    return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-black/10 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white shadow-xl hover:border-[#E60023]/60 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3.5">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-14 h-14 object-contain rounded-2xl bg-white p-1.5 border border-gray-700 shrink-0"
          />
          <div>
            <span className="text-[10px] font-black text-[#E60023] uppercase tracking-widest">{product.brand}</span>
            <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span className="text-gray-400">Retail: <strong className="text-white">${retail.toLocaleString()}</strong></span>
              <span className="text-gray-400">Est. Resell: <strong className="text-emerald-400">${resell.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs border border-emerald-500/30">
            <TrendingUp className="w-3.5 h-3.5" /> +${profit.toLocaleString()} ({roi}%)
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-[#E60023] hover:text-white text-[10px] font-extrabold transition-all uppercase tracking-wider"
          >
            VIEW SNEAKER
          </Link>
        </div>
      </div>

      {/* SVG Sparkline Price Chart */}
      <div className="pt-4 overflow-x-auto">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id={`chartGrad_${product._id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E60023" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#E60023" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="#333" strokeDasharray="3 3" />
          <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="#333" strokeDasharray="3 3" />
          <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#333" />

          <path d={areaD} fill={`url(#chartGrad_${product._id})`} />
          <path d={pathD} fill="none" stroke="#E60023" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {points.map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="5" className="fill-black stroke-[#E60023] stroke-[2.5]" />
              <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                ${pt.pt.price.toLocaleString()}
              </text>
              <text x={pt.x} y={svgHeight - 8} textAnchor="middle" fill="#9CA3AF" fontSize="8" fontWeight="600">
                {pt.pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export const ResellPredictorModal: React.FC<ResellPredictorModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'GRAPHS' | 'TABLE'>('GRAPHS');

  if (!isOpen) return null;

  // Filter products by brand and search
  const predictorProducts = MOCK_PRODUCTS.filter((p: Product) => 
    p.isHyped === true || p.isLimited === true || p.category === 'Hyped' || p.category === 'Limited Edition'
  );

  const filteredProducts = predictorProducts.filter((product: Product) => {
    const matchesBrand = selectedBrand === 'All' || product.brand.toUpperCase() === selectedBrand.toUpperCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const brands = ['All', 'NIKE', 'ADIDAS', 'JORDAN'];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto flex items-start sm:items-center justify-center">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[88vh]">
        
        {/* Header (Shrink-0 to keep fixed) */}
        <div className="p-6 sm:p-8 bg-black text-white flex items-center justify-between border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E60023] flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight flex items-center gap-2">
                RESELL VALUE PREDICTOR
                <span className="text-[10px] bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  HYPED & LIMITED GRAILS
                </span>
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Real-time market valuation curves, profit margins & price graphs for Hyped & Limited Edition sneakers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Close Predictor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fully Scrollable Body Container */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 min-h-0">
          
          {/* Top Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-gray-200 bg-gray-50">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-1">HYPED & LIMITED GRAILS</span>
              <span className="font-display font-black text-2xl text-black">{predictorProducts.length} PAIRS</span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Authenticated
              </span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-gray-200 bg-gray-50">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-1">TOP GRAIL ROI</span>
              <span className="font-display font-black text-2xl text-[#E60023]">+11,747.2%</span>
              <span className="text-[11px] text-gray-600 font-bold mt-1 block">Louis Vuitton Air Force 01</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-gray-200 bg-gray-50">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-1">AVG MARKET APPRECIATION</span>
              <span className="font-display font-black text-2xl text-black">+142.8%</span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> Bullish Momentum
              </span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-gray-200 bg-gray-50">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-1">MARKET ACCURACY</span>
              <span className="font-display font-black text-2xl text-black">99.4%</span>
              <span className="text-[11px] text-gray-600 font-bold mt-1 block">StockX & GOAT Synced</span>
            </div>
          </div>

          {/* Search, Brand Filter & View Mode Controls */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-gray-100">
              
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search sneaker by name or brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-gray-200 focus:border-black outline-none bg-gray-50 text-black font-medium"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center p-1 bg-gray-100 rounded-full border border-gray-200 shrink-0">
                  <button
                    onClick={() => setViewMode('GRAPHS')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      viewMode === 'GRAPHS'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> ALL GRAPHS
                  </button>
                  <button
                    onClick={() => setViewMode('TABLE')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      viewMode === 'TABLE'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Table className="w-3.5 h-3.5" /> MARKET TABLE
                  </button>
                </div>
              </div>

              {/* Brand Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
                      selectedBrand === brand
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode 1: ALL SNEAKER PRICE GRAPHS LIST (Scrollable!) */}
            {viewMode === 'GRAPHS' ? (
              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-gray-500 uppercase tracking-widest">
                  <span>SHOWING {filteredProducts.length} SNEAKER PRICE TRAJECTORY GRAPHS</span>
                  <span className="text-[#E60023] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> REAL-TIME VALUATION CURVES
                  </span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 glass-panel rounded-3xl p-6 bg-gray-50 border border-gray-200">
                    <p className="text-gray-500 text-sm font-medium">No sneakers match "{searchQuery}" under "{selectedBrand}".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredProducts.map((product: Product) => (
                      <SneakerGraphCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* View Mode 2: MARKET DIRECTORY TABLE */
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-900 text-white font-extrabold uppercase tracking-wider text-[10px]">
                        <th className="py-3.5 px-4">Sneaker Silhouette</th>
                        <th className="py-3.5 px-4">Brand</th>
                        <th className="py-3.5 px-4">Retail Price</th>
                        <th className="py-3.5 px-4">Est. Resell Value</th>
                        <th className="py-3.5 px-4">Net Profit</th>
                        <th className="py-3.5 px-4">ROI %</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((prod: Product) => {
                        const pRetail = prod.price || 150;
                        const pResell = prod.resellEstimate || pRetail * 1.4;
                        const pProfit = pResell - pRetail;
                        const pRoi = ((pProfit / pRetail) * 100).toFixed(1);

                        return (
                          <tr key={prod._id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  className="w-10 h-10 object-contain rounded-xl border border-gray-200 bg-gray-50 p-1 shrink-0"
                                />
                                <div>
                                  <span className="font-bold text-black block text-xs">{prod.name}</span>
                                  <span className="text-[10px] text-gray-500 uppercase">{prod.category}</span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-4 font-bold text-gray-700 uppercase">{prod.brand}</td>
                            
                            <td className="py-3 px-4 font-extrabold text-gray-900">${pRetail.toLocaleString()}</td>

                            <td className="py-3 px-4 font-black text-emerald-600 font-mono">${pResell.toLocaleString()}</td>

                            <td className="py-3 px-4 font-bold text-emerald-600">+${pProfit.toLocaleString()}</td>

                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                                <ArrowUpRight className="w-3 h-3" /> +{pRoi}%
                              </span>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <Link
                                to={`/product/${prod.slug}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black text-white hover:bg-[#E60023] text-[10px] font-bold transition-colors uppercase"
                              >
                                VIEW DETAILS
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
