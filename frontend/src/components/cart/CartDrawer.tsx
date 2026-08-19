import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer: React.FC = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeItem, 
    updateQuantity, 
    applyCoupon, 
    couponCode, 
    discountPercent, 
    getSubtotal, 
    getTotal 
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(inputCoupon);
    if (!success) {
      setCouponError('Invalid code. Try "FUTURE15" for 15% off.');
    } else {
      setCouponError('');
      setInputCoupon('');
    }
  };

  const subtotal = getSubtotal();
  const total = getTotal();
  const discountAmount = (subtotal * discountPercent) / 100;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        onClick={closeCart} 
        className="fixed inset-0 bg-[#1A1008]/30 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FFF7E5] text-[#1A1008] h-full border-l border-[#E8D5B0] p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#E8D5B0]">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-black tracking-tight text-[#1A1008]">YOUR VAULT</h2>
              <span className="bg-[#D52122] text-[#FFF7E5] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {items.length} ITEMS
              </span>
            </div>
            <button 
              onClick={closeCart}
              className="p-2 text-[#8C6E50] hover:text-[#D52122] rounded-full hover:bg-[#D52122]/8 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#8C6E50] font-medium">Your Vault is currently empty.</p>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="mt-4 inline-flex items-center gap-2 bg-[#D52122] text-[#FFF7E5] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#B01A1B] transition-all shadow-md"
                >
                  EXPLORE COLLECTIONS
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 bg-[#FFF0D0] rounded-2xl border border-[#E8D5B0] hover:border-[#D52122]/40 transition-all"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-contain rounded-xl bg-[#FFF7E5] border border-[#E8D5B0]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1008] line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-[#8C6E50] mt-0.5">{item.color} • {item.size}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-[#1A1008]">${item.price}</span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#FFF7E5] px-2 py-1 rounded-lg border border-[#E8D5B0]">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-[#8C6E50] hover:text-[#D52122]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-[#1A1008]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-[#8C6E50] hover:text-[#D52122]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[#8C6E50] hover:text-[#D52122] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="pt-6 border-t border-[#E8D5B0] space-y-4">
            
            {/* Coupon Code Box */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-3 text-[#8C6E50]" />
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. FUTURE15)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl pl-9 pr-3 py-2 text-xs uppercase tracking-wider text-[#1A1008] focus:outline-none focus:border-[#D52122] transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="bg-[#D52122] text-[#FFF7E5] hover:bg-[#B01A1B] px-4 rounded-xl text-xs font-bold uppercase transition-colors"
              >
                APPLY
              </button>
            </form>
            {couponError && <p className="text-[11px] text-[#D52122] font-medium">{couponError}</p>}
            {couponCode && <p className="text-[11px] text-green-600 font-bold">✓ Coupon {couponCode} Applied ({discountPercent}% Off)</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#8C6E50]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1A1008] font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Member Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span className="text-green-600 font-bold">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1A1008] pt-2 border-t border-[#E8D5B0]">
                <span>TOTAL</span>
                <span className="font-display text-xl text-[#D52122]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
              className="w-full bg-[#D52122] text-[#FFF7E5] py-4 rounded-2xl font-bold tracking-wider text-sm hover:bg-[#B01A1B] transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              PROCEED TO FAST CHECKOUT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C6E50]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D52122]" />
              Encrypted 256-bit Checkout • Authenticity Guaranteed
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
