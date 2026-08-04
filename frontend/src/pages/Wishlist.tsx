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
    <div className="w-full min-h-screen bg-white text-black pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-[#E60023] fill-current" />
            MY SAVED VAULT
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-black">
            YOUR WISHLIST ({savedProducts.length})
          </h1>
        </div>

        <Link
          to="/shop"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#E60023] transition-colors"
        >
          DISCOVER MORE SNEAKERS <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Empty State */}
      {savedProducts.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center border border-black/10 bg-white max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl text-black uppercase">YOUR WISHLIST IS EMPTY</h3>
            <p className="text-xs text-gray-500 font-medium">
              Save your favorite grail sneakers by clicking the heart icon on any shoe.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-bold text-xs hover:bg-[#E60023] transition-colors shadow-lg"
          >
            EXPLORE CATALOG <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Wishlist Items Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {savedProducts.map((product) => (
            <div
              key={product._id}
              className="glass-panel rounded-3xl p-5 border border-black/10 hover:border-black transition-all bg-white shadow-sm hover:shadow-xl flex flex-col justify-between group"
            >
              {/* Product Visual */}
              <div>
                <div className="h-64 bg-gray-50 rounded-2xl p-4 flex items-center justify-center relative border border-gray-100 mb-4 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-red-600 hover:bg-red-50 transition-all border border-gray-200"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {product.isHyped && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                      HYPED GRAIL
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#E60023] uppercase tracking-wider">{product.brand}</span>
                  <Link to={`/product/${product.slug}`} className="block">
                    <h3 className="font-display font-black text-base text-black line-clamp-1 hover:text-[#E60023] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 font-medium line-clamp-1">{product.description}</p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">PRICE</span>
                  <span className="font-display font-black text-lg text-black">${product.price.toLocaleString()}</span>
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
                  className="bg-black hover:bg-[#E60023] text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
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
