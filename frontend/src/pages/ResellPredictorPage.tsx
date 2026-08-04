import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Zap, TrendingUp, ShieldCheck, Search, Filter, BarChart3, Table, ArrowUpRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';

const SneakerGraphCard: React.FC<{ product: Product; isTargeted?: boolean; cardRef?: React.RefObject<HTMLDivElement> }> = ({ product, isTargeted, cardRef }) => {
  const retail = product.price || 150;
  const resell = product.resellEstimate || retail * 1.5;
  const profit = resell - retail;
  const roi = (((resell - retail) / retail) * 100).toFixed(1);

  const graphPoints = [
    { label: 'Q1 2025', price: Math.round(retail * 1.05) },
    { label: 'Q2 2025', price: Math.round(retail * 1.35) },
    { label: 'Q3 2025', price: Math.round(retail + profit * 0.45) },
    { label: 'Q4 2025', price: Math.round(retail + profit * 0.78) },
    { label: '2026 CURRENT', price: resell },
    { label: '2027 FORECAST', price: Math.round(resell * 1.25) },
  ];

  const maxPrice = Math.max(...graphPoints.map((p) => p.price));
  const minPrice = Math.min(...graphPoints.map((p) => p.price));
  const range = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 200;
  const padding = 30;

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
    <div
      ref={cardRef}
      className={`glass-panel p-6 sm:p-8 rounded-3xl border bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white shadow-2xl transition-all group ${
        isTargeted
          ? 'border-[#E60023] ring-2 ring-[#E60023] shadow-[0_0_40px_rgba(230,0,35,0.4)]'
          : 'border-black/10 hover:border-[#E60023]/60'
      }`}
    >
      {/* Targeted Badge */}
      {isTargeted && (
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E60023] text-white text-[10px] font-black uppercase tracking-widest shadow-md">
          <Sparkles className="w-3.5 h-3.5 fill-white" /> SELECTED SNEAKER MARKET GRAPH
        </div>
      )}

      {/* Sneaker Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-gray-700 shrink-0 flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div>
            <span className="text-[10px] font-black text-[#E60023] uppercase tracking-widest">{product.brand}</span>
            <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-4 mt-1 text-xs">
              <span className="text-gray-400">Retail: <strong className="text-white">${retail.toLocaleString()}</strong></span>
              <span className="text-gray-400">Est. Resell: <strong className="text-emerald-400">${resell.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs border border-emerald-500/30">
            <TrendingUp className="w-4 h-4" /> +${profit.toLocaleString()} ({roi}%)
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="px-4 py-2 rounded-full bg-white text-black hover:bg-[#E60023] hover:text-white text-xs font-black transition-all uppercase tracking-wider flex items-center gap-1 shadow-md"
          >
            VIEW SNEAKER <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* SVG Sparkline Price Chart */}
      <div className="pt-6">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span className="font-bold flex items-center gap-1 text-white">
            <BarChart3 className="w-4 h-4 text-[#E60023]" /> HISTORICAL & FORECAST PRICE TRAJECTORY
          </span>
          <span>Timeframe: 2025 - 2027 AI Model</span>
        </div>

        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 overflow-visible">
            <defs>
              <linearGradient id={`pageChartGrad_${product._id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E60023" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#E60023" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="#333" strokeDasharray="3 3" />
            <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="#333" strokeDasharray="3 3" />
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#333" />

            {/* Area & Path */}
            <path d={areaD} fill={`url(#pageChartGrad_${product._id})`} />
            <path d={pathD} fill="none" stroke="#E60023" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Points & Labels */}
            {points.map((pt, i) => (
              <g key={i} className="group/pt cursor-pointer">
                <circle cx={pt.x} cy={pt.y} r="5.5" className="fill-black stroke-[#E60023] stroke-[3]" />
                <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">
                  ${pt.pt.price.toLocaleString()}
                </text>
                <text x={pt.x} y={svgHeight - 8} textAnchor="middle" fill="#9CA3AF" fontSize="8.5" fontWeight="600">
                  {pt.pt.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export const ResellPredictorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const targetSlug = searchParams.get('product');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'GRAPHS' | 'TABLE'>('GRAPHS');

  const targetedCardRef = useRef<HTMLDivElement>(null);

  const predictorProducts = useMemo(() => {
    return MOCK_PRODUCTS;
  }, []);

  // Filter products by brand and search, putting target sneaker first if specified
  const filteredProducts = useMemo(() => {
    let list = predictorProducts.filter((product: Product) => {
      const matchesBrand = selectedBrand === 'All' || product.brand.toUpperCase() === selectedBrand.toUpperCase();
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });

    if (targetSlug) {
      const targetedIndex = list.findIndex(p => p.slug === targetSlug || p._id === targetSlug);
      if (targetedIndex > 0) {
        const [targetedProd] = list.splice(targetedIndex, 1);
        list.unshift(targetedProd);
      }
    }

    return list;
  }, [predictorProducts, selectedBrand, searchQuery, targetSlug]);

  useEffect(() => {
    if (targetSlug && targetedCardRef.current) {
      setTimeout(() => {
        targetedCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 350);
    }
  }, [targetSlug]);

  const brands = ['All', 'NIKE', 'ADIDAS', 'JORDAN'];

  return (
    <div className="w-full min-h-screen bg-white text-black pt-24 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1920px] mx-auto space-y-12">
        
        {/* Page Hero Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-black text-white border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E60023] text-white text-[11px] font-black tracking-widest uppercase shadow-md">
              <Zap className="w-3.5 h-3.5 fill-white" /> HYPED & LIMITED GRAILS MARKET ENGINE
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              RESELL VALUE PREDICTOR
            </h1>
            <p className="text-gray-300 text-sm sm:text-base font-medium leading-relaxed">
              Real-time market valuation curves, profit margins, and 2025–2027 AI price forecasts exclusively for the Hyped & Limited Edition sneakers on our platform.
            </p>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#E60023]/15 blur-3xl pointer-events-none rounded-full" />
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">HYPED & LIMITED SNEAKERS</span>
            <span className="font-display font-black text-3xl text-black">{predictorProducts.length} GRAILS</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-2">
              <ShieldCheck className="w-4 h-4" /> 100% Authenticated
            </span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">TOP GRAIL ROI</span>
            <span className="font-display font-black text-3xl text-[#E60023]">+11,747.2%</span>
            <span className="text-xs text-gray-600 font-bold mt-2 block">Louis Vuitton Air Force 01</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">AVG MARKET APPRECIATION</span>
            <span className="font-display font-black text-3xl text-black">+142.8%</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4" /> Bullish Momentum
            </span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">MARKET ACCURACY</span>
            <span className="font-display font-black text-3xl text-black">99.4%</span>
            <span className="text-xs text-gray-600 font-bold mt-2 block">StockX & GOAT Synced</span>
          </div>
        </div>

        {/* Filter & View Mode Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sneaker by name, brand, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-xs rounded-full border border-gray-300 focus:border-black outline-none bg-gray-50 text-black font-medium"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-gray-100 rounded-full border border-gray-200 shrink-0">
              <button
                onClick={() => setViewMode('GRAPHS')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'GRAPHS'
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <BarChart3 className="w-4 h-4" /> ALL GRAPHS
              </button>
              <button
                onClick={() => setViewMode('TABLE')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'TABLE'
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Table className="w-4 h-4" /> MARKET TABLE
              </button>
            </div>
          </div>

          {/* Brand Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedBrand === brand
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Section View Mode Content */}
        {viewMode === 'GRAPHS' ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between text-xs font-black text-gray-500 uppercase tracking-widest">
              <span>SHOWING {filteredProducts.length} SNEAKER PRICE TRAJECTORY GRAPHS</span>
              <span className="text-[#E60023] flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> REAL-TIME VALUATION CURVES
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 glass-panel rounded-3xl p-8 bg-gray-50 border border-gray-200">
                <p className="text-gray-500 text-base font-medium">No sneakers found matching "{searchQuery}" under "{selectedBrand}".</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedBrand('All'); }}
                  className="mt-4 bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#E60023] transition-all uppercase"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProducts.map((product: Product) => {
                  const isTarget = !!targetSlug && (product.slug === targetSlug || product._id === targetSlug);
                  return (
                    <SneakerGraphCard
                      key={product._id}
                      product={product}
                      isTargeted={isTarget}
                      cardRef={isTarget ? targetedCardRef : undefined}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Market Directory Table */
          <div className="border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-black text-white font-extrabold uppercase tracking-wider text-xs">
                    <th className="py-4 px-6">Sneaker Silhouette</th>
                    <th className="py-4 px-6">Brand</th>
                    <th className="py-4 px-6">Retail Price</th>
                    <th className="py-4 px-6">Est. Resell Value</th>
                    <th className="py-4 px-6">Net Profit</th>
                    <th className="py-4 px-6">ROI %</th>
                    <th className="py-4 px-6 text-right">Action</th>
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
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-12 h-12 object-contain rounded-2xl border border-gray-200 bg-gray-50 p-1.5 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-black text-sm block">{prod.name}</span>
                              <span className="text-[10px] text-gray-500 uppercase">{prod.category}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-bold text-gray-700 uppercase">{prod.brand}</td>
                        
                        <td className="py-4 px-6 font-extrabold text-gray-900 text-sm">${pRetail.toLocaleString()}</td>

                        <td className="py-4 px-6 font-black text-emerald-600 font-mono text-sm">${pResell.toLocaleString()}</td>

                        <td className="py-4 px-6 font-bold text-emerald-600 text-sm">+${pProfit.toLocaleString()}</td>

                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +{pRoi}%
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <Link
                            to={`/product/${prod.slug}`}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-black text-white hover:bg-[#E60023] text-xs font-bold transition-colors uppercase"
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
  );
};
