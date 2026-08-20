import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/shared/CustomCursor';
import { SmoothScroll } from './components/shared/SmoothScroll';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AISearchModal } from './components/ai/AISearchModal';
import { AIStylistDrawer } from './components/ai/AIStylistDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { LoginPage } from './pages/LoginPage';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Drops } from './pages/Drops';
import { Community } from './pages/Community';
import { Account } from './pages/Account';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Lookbook } from './pages/Lookbook';
import { Wishlist } from './pages/Wishlist';
import { ResellPredictorPage } from './pages/ResellPredictorPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <div className="relative min-h-screen bg-[#FFF7E5] text-[#1A1008] antialiased">
          
          {/* Custom Luxury Magnetic Cursor */}
          <CustomCursor />

          {/* Client Auth Modal */}
          <AuthModal />

          {/* AI Search Overlay Modal */}
          <AISearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Floating AI Stylist Chatbot */}
          <AIStylistDrawer />

          {/* Global Header Navigation */}
          <Navbar onOpenSearch={() => setSearchOpen(true)} />

          {/* Route Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/shop/:slug" element={<ProductDetail />} />
              <Route path="/drops" element={<Drops />} />
              <Route path="/resell-predictor" element={<ResellPredictorPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/community" element={<Community />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

        </div>
      </SmoothScroll>
    </Router>
  );
};
