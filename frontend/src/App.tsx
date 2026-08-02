import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/shared/CustomCursor';
import { SmoothScroll } from './components/shared/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AISearchModal } from './components/ai/AISearchModal';
import { AIStylistDrawer } from './components/ai/AIStylistDrawer';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Drops } from './pages/Drops';
import { AIStylistPage } from './pages/AIStylistPage';
import { Community } from './pages/Community';
import { Account } from './pages/Account';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Lookbook } from './pages/Lookbook';

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[#0A0A0A] text-white antialiased">
          
          {/* Custom Luxury Magnetic Cursor */}
          <CustomCursor />

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
              <Route path="/ai-stylist" element={<AIStylistPage />} />
              <Route path="/community" element={<Community />} />
              <Route path="/account" element={<Account />} />
              <Route path="/wishlist" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/lookbook" element={<Lookbook />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

        </div>
      </SmoothScroll>
    </Router>
  );
};
