import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { MOCK_PRODUCTS } from '../lib/mockData';

export const Wishlist: React.FC = () => {
  const { wishlistIds, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const savedProducts = MOCK_PRODUCTS.filter(p => wishlistIds.includes(p._id));

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E8D5B0]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D52122] text-[#FFF7E5] text-xs font-bold uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-[#FFF7E5] fill-current" />
            MY SAVED VAULT
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#1A1008]">
            YOUR WISHLIST ({savedProducts.length})
          </h1>
        </div>

        <Link
          to="/shop"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#8C6E50] hover:text-[#D52122] transition-colors"
        >
          DISCOVER MORE SNEAKERS <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Empty State */}
      {savedProducts.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center border border-[#E8D5B0] max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF0D0] flex items-center justify-center mx-auto text-[#D52122]">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl text-[#1A1008] uppercase">YOUR WISHLIST IS EMPTY</h3>
            <p className="text-xs text-[#8C6E50] font-medium">
              Save your favorite grail sneakers by clicking the heart icon on any shoe.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#D52122] text-[#FFF7E5] px-8 py-3.5 rounded-full font-bold text-xs hover:bg-[#B01A1B] transition-colors shadow-lg"
          >
            EXPLORE CATALOG <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {savedProducts.map((product) => (
            <div
              key={product._id}
              className="glass-panel rounded-3xl p-5 border border-[#E8D5B0] hover:border-[#D52122]/40 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group"
            >
              {/* Product Visual */}
              <div>
                <div className="h-64 bg-[#FFF0D0] rounded-2xl p-4 flex items-center justify-center relative border border-[#E8D5B0] mb-4 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-[#FFF7E5]/90 backdrop-blur-md shadow-md text-[#D52122] hover:bg-[#D52122] hover:text-[#FFF7E5] transition-all border border-[#E8D5B0]"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {product.isHyped && (
                    <span className="absolute top-3 left-3 bg-[#D52122] text-[#FFF7E5] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                      HYPED GRAIL
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#D52122] uppercase tracking-wider">{product.brand}</span>
                  <Link to={`/product/${product.slug}`} className="block">
                    <h3 className="font-display font-black text-base text-[#1A1008] line-clamp-1 hover:text-[#D52122] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#8C6E50] font-medium line-clamp-1">{product.description}</p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-4 border-t border-[#E8D5B0] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-[#8C6E50] font-bold block uppercase">PRICE</span>
                  <span className="font-display font-black text-lg text-[#1A1008]">${product.price.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => addItem({
                    productId: product._id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    image: product.images[0],
                    size: product.sizes[0]?.size || 'US 10',
                    color: product.colors[0]?.name || 'Default',
                    quantity: 1
                  })}
                  className="bg-[#D52122] hover:bg-[#B01A1B] text-[#FFF7E5] px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO CART
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
