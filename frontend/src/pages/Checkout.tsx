import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

export const Checkout: React.FC = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'Stripe' | 'Razorpay' | 'ApplePay'>('Stripe');
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Mercer',
    email: user?.email || 'alex.mercer@future.sole',
    street: '100 Cyberpunk Blvd, Suite 400',
    city: 'Tokyo',
    state: 'Kanto',
    postalCode: '100-0001',
    country: 'Japan'
  });
  const [processing, setProcessing] = useState(false);

  const total = getTotal();

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-20 px-4 max-w-7xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-black">EXPRESS FAST CHECKOUT</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">256-Bit Encrypted Secure Checkout</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Address */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 space-y-4 bg-white shadow-sm">
            <h3 className="font-display font-bold text-sm text-black uppercase">1. SHIPPING ADDRESS</h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black focus:outline-none focus:border-black font-semibold"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black focus:outline-none focus:border-black font-semibold"
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-700 font-bold block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black focus:outline-none focus:border-black font-semibold"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black focus:outline-none focus:border-black font-semibold"
                />
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black focus:outline-none focus:border-black font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 space-y-4 bg-white shadow-sm">
            <h3 className="font-display font-bold text-sm text-black uppercase">2. PAYMENT GATEWAY</h3>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Stripe', label: 'Credit Card (Stripe)' },
                { id: 'Razorpay', label: 'Razorpay / UPI' },
                { id: 'ApplePay', label: 'Apple Pay' }
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-4 rounded-2xl border text-xs font-bold transition-all text-center ${
                    paymentMethod === pm.id
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:text-black hover:border-black'
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 space-y-6 h-fit bg-white shadow-sm">
          <h3 className="font-display font-bold text-sm text-black uppercase">ORDER SUMMARY</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-xl bg-gray-50 border border-gray-200 p-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-black line-clamp-1">{item.name}</h4>
                  <p className="text-gray-500 font-medium">{item.size} • Qty {item.quantity}</p>
                </div>
                <span className="font-bold text-black">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-black/10 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600 font-medium">
              <span>Express Shipping</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-black/10">
              <span>TOTAL DUE</span>
              <span className="font-display text-xl text-black">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing || items.length === 0}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#FF5A1F] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {processing ? 'AUTHORIZING PAYMENT...' : `PAY $${total.toFixed(2)} NOW`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
