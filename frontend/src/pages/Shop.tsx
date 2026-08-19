import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Zap, SlidersHorizontal, Check } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState(searchFilter);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const categories = ['All', 'Hyped', 'Limited Edition', 'Lifestyle', 'Running', 'Basketball'];
  const genders = ['All', 'Men', 'Women', 'Unisex'];

  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Hyped') {
        list = list.filter(p => p.isHyped === true || p.category === 'Hyped');
      } else {
        list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    if (selectedGender !== 'All') {
      list = list.filter(p => p.gender === selectedGender || p.gender === 'Unisex');
    }

    if (searchQuery.trim()) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedGender, searchQuery, sortBy]);

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1920px] mx-auto">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E8D5B0]">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#D52122] uppercase">THE CATALOGUE</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1 text-[#1A1008]">SNEAKER VAULT</h1>
        </div>
        <p className="text-xs text-[#8C6E50] mt-2 md:mt-0 font-bold">
          SHOWING {filteredProducts.length} LIMITED EDITION SILHOUETTES
        </p>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D52122] text-[#FFF7E5] shadow-md'
                  : 'bg-[#FFF0D0] text-[#8C6E50] hover:bg-[#D52122]/10 hover:text-[#1A1008] border border-[#E8D5B0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          
          {/* Search Input */}
          <div className="relative flex-1 lg:w-64">
            <input
              type="text"
              placeholder="Search vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-full pl-9 pr-4 py-2 text-xs text-[#1A1008] placeholder-[#8C6E50] focus:outline-none focus:border-[#D52122] transition-colors"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8C6E50]" />
          </div>

          {/* Gender Filter */}
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="bg-[#FFF0D0] border border-[#E8D5B0] rounded-full px-3 py-2 text-xs font-bold text-[#1A1008] focus:outline-none focus:border-[#D52122]"
          >
            {genders.map((g) => (
              <option key={g} value={g} className="bg-[#FFF7E5]">{g} Gender</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#FFF0D0] border border-[#E8D5B0] rounded-full px-3 py-2 text-xs font-bold text-[#1A1008] focus:outline-none focus:border-[#D52122]"
          >
            <option value="featured" className="bg-[#FFF7E5]">Featured</option>
            <option value="price-low" className="bg-[#FFF7E5]">Price: Low to High</option>
            <option value="price-high" className="bg-[#FFF7E5]">Price: High to Low</option>
            <option value="rating" className="bg-[#FFF7E5]">Highest Rated</option>
          </select>

        </div>

      </div>

      {/* Sneaker Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 glass-panel rounded-3xl p-8 border border-[#E8D5B0]">
          <p className="text-[#8C6E50] font-medium text-base">No sneakers match your exact query filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedGender('All');
              setSearchQuery('');
            }}
            className="mt-4 bg-[#D52122] text-[#FFF7E5] px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#B01A1B] transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const inWishlist = isInWishlist(product._id);
            return (
              <div
                key={product._id}
                className="group glass-panel rounded-3xl p-5 border border-[#E8D5B0] hover:border-[#D52122]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl"
              >
                <div>
                  {/* Image Container */}
                  <Link to={`/product/${product.slug}`} className="block relative h-72 bg-[#FFF0D0] rounded-2xl overflow-hidden p-6 border border-[#E8D5B0]">
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
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-colors ${
                        inWishlist ? 'bg-[#D52122] text-[#FFF7E5]' : 'bg-[#FFF7E5] text-[#1A1008] border border-[#E8D5B0] hover:bg-[#D52122] hover:text-[#FFF7E5]'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                    </button>

                    {/* Gender badge */}
                    <span className="absolute top-3 left-3 bg-[#1A1008] text-[#FFF7E5] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {product.gender}
                    </span>
                  </Link>

                  {/* Info */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#D52122] uppercase tracking-widest">{product.brand}</span>
                      <span className="text-[#1A1008] font-extrabold">★ {product.rating}</span>
                    </div>

                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-bold text-lg text-[#1A1008] group-hover:text-[#D52122] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#8C6E50] line-clamp-2 leading-relaxed font-medium">{product.story || product.description}</p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-6 pt-4 border-t border-[#E8D5B0] flex items-center justify-between">
                  <div>
                    <span className="font-display font-black text-xl text-[#1A1008]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-[#8C6E50] line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-xs font-bold text-[#8C6E50] hover:text-[#1A1008] px-3 py-2 rounded-xl bg-[#FFF0D0] border border-[#E8D5B0] transition-colors"
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
                      className="bg-[#D52122] text-[#FFF7E5] p-2.5 rounded-xl hover:bg-[#B01A1B] transition-all shadow-md"
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

      </div>
    </div>
  );
};
