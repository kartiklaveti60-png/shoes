import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);

    const newMsgObj = {
      id: 'msg_' + Date.now(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'General Inquiry',
      message: formData.message,
      status: 'Unread',
      date: new Date().toISOString()
    };

    // 1. Save to sole_client_messages in localStorage for real-time cross-port sync to Admin Portal
    try {
      const existing = localStorage.getItem('sole_client_messages');
      const messagesArr = existing ? JSON.parse(existing) : [];
      messagesArr.unshift(newMsgObj);
      localStorage.setItem('sole_client_messages', JSON.stringify(messagesArr));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('LocalStorage sync error:', e);
    }

    // 2. Send to Backend Express API
    try {
      await fetch('http://localhost:5000/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
    } catch (err) {
      console.warn('Backend API connection warning (using local sync fallback):', err);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const instagramUrl = "https://instagram.com";
  const whatsappUrl = "https://wa.me/15550192834?text=Hello%20SOLE%20Team!%20I%20have%20an%20inquiry%20about%20a%20sneaker.";

  return (
    <div className="w-full min-h-screen bg-white text-black pt-24 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1700px] mx-auto space-y-12">
        
        {/* Hero Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-black text-white border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E60023] text-white text-[11px] font-black tracking-widest uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-white" /> 24/7 GRAIL CONCIERGE
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              GET IN TOUCH
            </h1>
            <p className="text-gray-300 text-sm sm:text-base font-medium leading-relaxed">
              Have a question about grail authentication, size sourcing, consignment, or upcoming hyper-drops? Our footwear team is here to assist you 24/7.
            </p>
          </div>

          <div className="absolute right-0 top-0 w-96 h-96 bg-[#E60023]/15 blur-3xl pointer-events-none rounded-full" />
        </div>

        {/* Quick Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* WhatsApp Channel */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-6 rounded-3xl border border-gray-200 hover:border-black transition-all bg-gray-50 hover:bg-white shadow-sm group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest block">INSTANT MESSAGING</span>
                <h3 className="font-display font-black text-lg text-black uppercase">WHATSAPP CHAT</h3>
                <p className="text-xs text-gray-600 mt-1 font-medium">+1 (555) 019-2834</p>
              </div>
            </div>
            <span className="text-xs font-bold text-black group-hover:text-[#25D366] flex items-center gap-1 mt-4 uppercase">
              CHAT NOW <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Instagram Channel */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-6 rounded-3xl border border-gray-200 hover:border-black transition-all bg-gray-50 hover:bg-white shadow-sm group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block">SOCIAL DIRECT MESSAGES</span>
                <h3 className="font-display font-black text-lg text-black uppercase">INSTAGRAM OFFICIAL</h3>
                <p className="text-xs text-gray-600 mt-1 font-medium">@sole_official</p>
              </div>
            </div>
            <span className="text-xs font-bold text-black group-hover:text-rose-500 flex items-center gap-1 mt-4 uppercase">
              FOLLOW & DM <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Email Support */}
          <div className="glass-panel p-6 rounded-3xl border border-gray-200 bg-gray-50 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-[#E60023]" />
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">EMAIL CONCIERGE</span>
                <h3 className="font-display font-black text-lg text-black uppercase">DIRECT EMAIL</h3>
                <p className="text-xs text-gray-600 mt-1 font-medium">concierge@sole.com</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-4 uppercase">
              <ShieldCheck className="w-4 h-4" /> 24-HOUR RESPONSE
            </span>
          </div>

          {/* Flagship Address */}
          <div className="glass-panel p-6 rounded-3xl border border-gray-200 bg-gray-50 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">FLAGSHIP VAULT</span>
                <h3 className="font-display font-black text-lg text-black uppercase">NEW YORK CITY</h3>
                <p className="text-xs text-gray-600 mt-1 font-medium">100 Grail Blvd, NYC</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1 mt-4 uppercase">
              OPEN MON - SUN (10AM - 9PM)
            </span>
          </div>

        </div>

        {/* Message Inquiry Form */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-black/10 bg-white shadow-xl max-w-4xl mx-auto">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-black text-[#E60023] uppercase tracking-widest">SEND A DIRECT INQUIRY</span>
            <h2 className="font-display font-black text-3xl text-black uppercase">CONCIERGE FORM</h2>
            <p className="text-xs text-gray-600 font-medium">
              Specify your size sourcing requests, order questions, or consignment details below.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-display font-black text-xl text-black uppercase">MESSAGE TRANSMITTED</h3>
              <p className="text-xs text-emerald-800 font-medium max-w-md mx-auto">
                Thank you, {formData.name}. Our concierge team has received your message and will reply to {formData.email} within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#E60023] uppercase transition-colors"
              >
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:border-black outline-none bg-gray-50 text-black font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:border-black outline-none bg-gray-50 text-black font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Inquiry Category</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:border-black outline-none bg-gray-50 text-black font-medium"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Sneaker Grail Sourcing">Sneaker Grail Sourcing</option>
                  <option value="Order & Shipping Status">Order & Shipping Status</option>
                  <option value="Consignment & Trading">Consignment & Trading</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Your Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your inquiry, sneaker model, or size needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-200 focus:border-black outline-none bg-gray-50 text-black font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-4 rounded-xl font-black text-xs hover:bg-[#E60023] disabled:bg-gray-400 transition-all shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {submitting ? 'TRANSMITTING INQUIRY...' : 'SUBMIT INQUIRY'} <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
