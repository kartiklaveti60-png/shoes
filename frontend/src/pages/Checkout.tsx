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
    if (items.length === 0) return;
    setProcessing(true);

    const newOrderId = `SOLE-${Math.floor(100000 + Math.random() * 900000)}`;
    const sneakerNames = items.map(i => i.name).join(', ');

    const newOrder = {
      id: newOrderId,
      user: formData.name || 'Customer',
      sneaker: sneakerNames || 'Sneaker Order',
      price: total,
      date: 'Just now',
      status: 'Processing'
    };

    // Send to backend API for admin real-time sync across ports
    fetch('http://localhost:5000/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(err => console.log('Backend API offline, saved locally', err));

    try {
      const existing = JSON.parse(localStorage.getItem('sole_orders') || '[]');
      const updated = [newOrder, ...existing];
      localStorage.setItem('sole_orders', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }

    setTimeout(() => {
      clearCart();
      navigate('/order-success', { state: { orderId: newOrderId } });
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#1A1008]">EXPRESS FAST CHECKOUT</h1>
        <p className="text-xs text-[#8C6E50] font-bold mt-1">256-Bit Encrypted Secure Checkout</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Address */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#E8D5B0] space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-sm text-[#1A1008] uppercase">1. SHIPPING ADDRESS</h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#8C6E50] font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl p-3 text-[#1A1008] focus:outline-none focus:border-[#D52122] font-semibold transition-colors"
                />
              </div>

              <div>
                <label className="text-[#8C6E50] font-bold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl p-3 text-[#1A1008] focus:outline-none focus:border-[#D52122] font-semibold transition-colors"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[#8C6E50] font-bold block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl p-3 text-[#1A1008] focus:outline-none focus:border-[#D52122] font-semibold transition-colors"
                />
              </div>

              <div>
                <label className="text-[#8C6E50] font-bold block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl p-3 text-[#1A1008] focus:outline-none focus:border-[#D52122] font-semibold transition-colors"
                />
              </div>

              <div>
                <label className="text-[#8C6E50] font-bold block mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full bg-[#FFF0D0] border border-[#E8D5B0] rounded-xl p-3 text-[#1A1008] focus:outline-none focus:border-[#D52122] font-semibold transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#E8D5B0] space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-sm text-[#1A1008] uppercase">2. PAYMENT GATEWAY</h3>
            
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
                      ? 'bg-[#D52122] text-[#FFF7E5] border-[#D52122] shadow-md'
                      : 'bg-[#FFF0D0] border-[#E8D5B0] text-[#8C6E50] hover:text-[#1A1008] hover:border-[#D52122]/40'
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-[#E8D5B0] space-y-6 h-fit shadow-sm">
          <h3 className="font-display font-bold text-sm text-[#1A1008] uppercase">ORDER SUMMARY</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-xl bg-[#FFF0D0] border border-[#E8D5B0] p-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-[#1A1008] line-clamp-1">{item.name}</h4>
                  <p className="text-[#8C6E50] font-medium">{item.size} • Qty {item.quantity}</p>
                </div>
                <span className="font-bold text-[#1A1008]">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8D5B0] space-y-2 text-xs">
            <div className="flex justify-between text-[#8C6E50] font-medium">
              <span>Express Shipping</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1A1008] pt-2 border-t border-[#E8D5B0]">
              <span>TOTAL DUE</span>
              <span className="font-display text-xl text-[#D52122]">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing || items.length === 0}
            className="w-full bg-[#D52122] text-[#FFF7E5] py-4 rounded-2xl font-bold text-sm hover:bg-[#B01A1B] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {processing ? 'AUTHORIZING PAYMENT...' : `PAY $${total.toFixed(2)} NOW`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
