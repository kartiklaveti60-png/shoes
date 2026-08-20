import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Package, DollarSign, Flame, Plus, 
  Search, CheckCircle2, 
  X, Filter, Edit3, Trash2, Zap, Eye, Sparkles,
  BarChart2, MessageSquare, Image, ShoppingBag, Mail, Send, Activity
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface OrderItem {
  id: string;
  user: string;
  sneaker: string;
  price: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

interface SizeStock {
  size: string;
  stock: number;
}

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  resellEstimate?: number;
  stock: number;
  image: string;
  detailImages: string[];
  description: string;
  story?: string;
  technology?: string[];
  materials?: string[];
  isLimited: boolean;
  isHyped: boolean;
  rating: number;
  numReviews: number;
  sizes: SizeStock[];
}

interface ClientMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  adminReply?: string;
  date: string;
}

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'drops' | 'resell' | 'community' | 'lookbook' | 'messages'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('ALL');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<ProductItem | null>(null);
  const [activeDetailImageIndex, setActiveDetailImageIndex] = useState<number>(0);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    brand: '',
    category: '',
    price: 0,
    resellEstimate: 0,
    stock: 0,
    image: '',
    detailImages: '',
    description: '',
    story: '',
    isLimited: false,
    isHyped: false
  });

  const [sneakerGraphs, setSneakerGraphs] = useState<Record<string, Array<{ label: string; price: number }>>>(() => {
    try {
      const saved = localStorage.getItem('sole_sneaker_graphs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [editingGraphProduct, setEditingGraphProduct] = useState<ProductItem | null>(null);
  const [editingGraphPoints, setEditingGraphPoints] = useState<Array<{ label: string; price: number }>>([]);

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('sole_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [clientMessages, setClientMessages] = useState<ClientMessageItem[]>(() => {
    try {
      const saved = localStorage.getItem('sole_client_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        id: 'msg_demo_1',
        name: 'Jordan Belfort',
        email: 'belfort@stratton.com',
        subject: 'Sneaker Grail Sourcing',
        message: 'Looking for a size US 10.5 of Air Jordan 1 Off-White Chicago in deadstock condition with OG box.',
        status: 'Unread',
        date: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'msg_demo_2',
        name: 'Elena Rostova',
        email: 'elena.rostova@fashion.io',
        subject: 'Order & Shipping Status',
        message: 'Hi team! Could you check the tracking link for my Travis Scott Reverse Mocha order #ORD-98231? Thank you!',
        status: 'Read',
        date: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  });

  const [messageFilter, setMessageFilter] = useState<string>('ALL');
  const [replyingMessageId, setReplyingMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  useEffect(() => {
    const fetchApiOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/orders`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOrders(json.data);
        }
      } catch (e) {
        try {
          const saved = localStorage.getItem('sole_orders');
          if (saved) setOrders(JSON.parse(saved));
        } catch (err) {}
      }
    };

    fetchApiOrders();
    const interval = setInterval(fetchApiOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchApiMessages = async () => {
      let apiMsgs: ClientMessageItem[] = [];
      try {
        const res = await fetch(`${API_BASE}/api/v1/contact`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          apiMsgs = json.data.map((m: any) => ({
            id: m._id || m.id,
            name: m.name,
            email: m.email,
            subject: m.subject || 'General Inquiry',
            message: m.message,
            status: m.status || 'Unread',
            adminReply: m.adminReply || '',
            date: m.createdAt || m.date || new Date().toISOString()
          }));
        }
      } catch (e) {}

      let localMsgs: ClientMessageItem[] = [];
      try {
        const saved = localStorage.getItem('sole_client_messages');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) localMsgs = parsed;
        }
      } catch (e) {}

      const combinedMap = new Map<string, ClientMessageItem>();
      localMsgs.forEach(m => combinedMap.set(m.id || (m.email + '_' + m.message), m));
      apiMsgs.forEach(m => combinedMap.set(m.id || (m.email + '_' + m.message), m));

      const mergedList = Array.from(combinedMap.values()).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      if (mergedList.length > 0) {
        setClientMessages(mergedList);
      }
    };

    fetchApiMessages();
    const interval = setInterval(fetchApiMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkMessageStatus = async (id: string, status: 'Unread' | 'Read' | 'Replied', replyContent: string = '') => {
    const updated = clientMessages.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status,
          adminReply: replyContent || m.adminReply
        };
      }
      return m;
    });
    setClientMessages(updated);
    try {
      localStorage.setItem('sole_client_messages', JSON.stringify(updated));
    } catch (e) {}

    try {
      await fetch(`${API_BASE}/api/v1/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminReply: replyContent })
      });
    } catch (err) {}

    if (replyingMessageId === id) {
      setReplyingMessageId(null);
      setReplyText('');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const updated = clientMessages.filter(m => m.id !== id);
    setClientMessages(updated);
    try {
      localStorage.setItem('sole_client_messages', JSON.stringify(updated));
    } catch (e) {}

    try {
      await fetch(`${API_BASE}/api/v1/contact/${id}`, { method: 'DELETE' });
    } catch (err) {}
  };

  const totalGrossRevenue = orders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: "prod_aj1_lost_found",
      name: 'Nike Air Jordan 1 High Chicago "Lost & Found"',
      slug: "nike-air-jordan-1-high-chicago-lost-and-found",
      brand: "JORDAN",
      category: "Hyped",
      price: 180,
      originalPrice: 180,
      resellEstimate: 300,
      stock: 27,
      image: "/images/aj1-chicago-lost-found.jpg",
      detailImages: [
        "/images/aj1-chicago-lost-found.jpg",
        "/images/aj1-lost-found-side.png",
        "/images/aj1-lost-found-heel.png",
        "/images/aj1-lost-found-outsole.png"
      ],
      description: "Reimagined 1985 classic silhouette featuring cracked leather collars, vintage yellowed midsole, and authentic vintage receipts.",
      story: "Inspired by the thrill of discovering an original 1985 pair tucked away in a dusty mom-and-pop store stockroom.",
      isLimited: true,
      isHyped: true,
      rating: 4.98,
      numReviews: 420,
      sizes: [
        { size: "US 8.5", stock: 5 },
        { size: "US 9", stock: 8 },
        { size: "US 10", stock: 12 }
      ]
    },
    {
      id: "prod_travis_scott_aj1",
      name: "Travis Scott x Air Jordan 1 Low 'Reverse Mocha'",
      slug: "travis-scott-air-jordan-1-low-reverse-mocha",
      brand: "JORDAN",
      category: "Hyped",
      price: 1450,
      originalPrice: 1600,
      resellEstimate: 2100,
      stock: 10,
      image: "/images/travis-scott-reverse-mocha.png",
      detailImages: [
        "/images/travis-scott-reverse-mocha.png",
        "/images/travis-scott-reverse-mocha-side.png"
      ],
      description: "Iconic reverse oversized Swoosh silhouette crafted with premium Sail leather overlays and Mocha suede underlays.",
      isLimited: true,
      isHyped: true,
      rating: 4.97,
      numReviews: 312,
      sizes: [{ size: "US 10", stock: 5 }]
    },
    {
      id: "prod_nike_sb_dunk_orange_lobster",
      name: 'Nike SB Dunk Low Concepts "Orange Lobster"',
      slug: "nike-sb-dunk-low-concepts-orange-lobster",
      brand: "NIKE SB",
      category: "Hyped",
      price: 500,
      originalPrice: 550,
      resellEstimate: 750,
      stock: 21,
      image: "/images/nike-sb-dunk-orange-lobster.jpg",
      detailImages: ["/images/nike-sb-dunk-orange-lobster.jpg"],
      description: "Iconic Concepts lobster collaboration featuring speckled nubuck overlays, rubber band toe wrap, and plaid bib lining.",
      isLimited: true,
      isHyped: true,
      rating: 4.97,
      numReviews: 345,
      sizes: [{ size: "US 10", stock: 8 }]
    },
    {
      id: "prod_off_white_aj1_chicago",
      name: 'Jordan 1 Retro High Off-White "Chicago"',
      slug: "jordan-1-retro-high-off-white-chicago",
      brand: "JORDAN x OFF-WHITE",
      category: "Hyped",
      price: 3865,
      originalPrice: 4200,
      resellEstimate: 5500,
      stock: 14,
      image: "/images/off-white-jordan-1-chicago.jpg",
      detailImages: ["/images/off-white-jordan-1-chicago.jpg"],
      description: "Virgil Abloh's legendary deconstructed 'The Ten' Chicago High-Top with exposed foam and signature red zip-tie.",
      isLimited: true,
      isHyped: true,
      rating: 4.99,
      numReviews: 512,
      sizes: [{ size: "US 10", stock: 5 }]
    },
    {
      id: "prod_lv_af1",
      name: "Louis Vuitton x Nike Air Force 1",
      slug: "louis-vuitton-x-nike-air-force-1",
      brand: "LOUIS VUITTON",
      category: "Limited Edition",
      price: 352800,
      originalPrice: 380000,
      resellEstimate: 420000,
      stock: 16,
      image: "/images/louis-vuitton-nike-air-force-1.png",
      detailImages: ["/images/louis-vuitton-nike-air-force-1.png"],
      description: "Designed by Virgil Abloh for Louis Vuitton. Crafted in Fiesso d'Artico with signature Monogram calf leather.",
      isLimited: true,
      isHyped: false,
      rating: 4.99,
      numReviews: 218,
      sizes: [{ size: "US 10", stock: 6 }]
    }
  ]);

  const [newSneaker, setNewSneaker] = useState({
    name: '',
    brand: 'JORDAN',
    category: 'Hyped',
    price: 250,
    resellEstimate: 350,
    stock: 25,
    image: '/images/aj1-chicago-lost-found.jpg',
    detailImages: '/images/aj1-chicago-lost-found.jpg',
    description: 'Exclusive limited edition sneaker drop.',
    isLimited: true,
    isHyped: true
  });

  const handleUpdateStatus = (id: string, status: OrderItem['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    fetch(`${API_BASE}/api/v1/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).catch(() => {});
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    fetch(`${API_BASE}/api/v1/orders/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleClearAllOrders = () => {
    if (window.confirm('Are you sure you want to clear all order records?')) {
      setOrders([]);
      fetch(`${API_BASE}/api/v1/orders`, { method: 'DELETE' }).catch(() => {});
    }
  };

  const handleCreateTestOrder = () => {
    const demoItems = [
      { sneaker: 'Nike Air Jordan 1 High Chicago "Lost & Found"', price: 180 },
      { sneaker: "Travis Scott x Air Jordan 1 Low 'Reverse Mocha'", price: 1450 },
      { sneaker: 'Louis Vuitton x Nike Air Force 1', price: 352800 }
    ];
    const picked = demoItems[Math.floor(Math.random() * demoItems.length)];
    const newDemoOrder: OrderItem = {
      id: `SOLE-${Math.floor(100000 + Math.random() * 900000)}`,
      user: `Collector #${Math.floor(100 + Math.random() * 900)}`,
      sneaker: picked.sneaker,
      price: picked.price,
      date: 'Just now',
      status: 'Processing'
    };
    setOrders(prev => [newDemoOrder, ...prev]);

    fetch(`${API_BASE}/api/v1/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDemoOrder)
    }).catch(() => {});
  };

  const handleStockChange = (id: string, delta: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, p.stock + delta) };
      }
      return p;
    }));
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      resellEstimate: product.resellEstimate || 0,
      stock: product.stock,
      image: product.image,
      detailImages: (product.detailImages || []).join(', '),
      description: product.description || '',
      story: product.story || '',
      isLimited: product.isLimited,
      isHyped: product.isHyped
    });
  };

  const handleSaveEditSneaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editForm.name.trim()) return;

    const detailList = editForm.detailImages
      ? editForm.detailImages.split(',').map(s => s.trim()).filter(Boolean)
      : [editForm.image];

    const updated: ProductItem = {
      ...editingProduct,
      name: editForm.name,
      brand: editForm.brand,
      category: editForm.category,
      price: Number(editForm.price),
      resellEstimate: Number(editForm.resellEstimate),
      stock: Number(editForm.stock),
      image: editForm.image || '/images/aj1-chicago-lost-found.jpg',
      detailImages: detailList.length > 0 ? detailList : [editForm.image],
      description: editForm.description,
      story: editForm.story,
      isLimited: editForm.isLimited,
      isHyped: editForm.isHyped
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updated : p));
    setEditingProduct(null);
  };

  const [drops, setDrops] = useState([
    { id: 'drop_1', name: "Travis Scott x Air Jordan 1 Low 'Reverse Mocha'", releaseDate: '2026-08-15', price: 1450, stock: 15, tier: 'LEGEND MEMBER', status: 'Active Countdown' },
    { id: 'drop_2', name: 'Nike SB Dunk Low Concepts "Orange Lobster"', releaseDate: '2026-08-20', price: 500, stock: 25, tier: 'TITAN MEMBER', status: 'Active Countdown' }
  ]);

  const handleToggleDropTier = (id: string) => {
    const tiers = ['SHADOW MEMBER', 'TITAN MEMBER', 'LEGEND MEMBER', 'GHOST MEMBER'];
    setDrops(drops.map(d => {
      if (d.id === id) {
        const nextIndex = (tiers.indexOf(d.tier) + 1) % tiers.length;
        return { ...d, tier: tiers[nextIndex] };
      }
      return d;
    }));
  };

  const handleDeleteDrop = (id: string) => {
    setDrops(drops.filter(d => d.id !== id));
  };

  const handleAddSneaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSneaker.name.trim()) return;

    const created: ProductItem = {
      id: 'prod_' + Date.now(),
      name: newSneaker.name,
      slug: newSneaker.name.toLowerCase().replace(/\s+/g, '-'),
      brand: newSneaker.brand,
      category: newSneaker.category,
      price: Number(newSneaker.price),
      resellEstimate: Number(newSneaker.resellEstimate || newSneaker.price * 1.4),
      stock: Number(newSneaker.stock),
      image: newSneaker.image || '/images/aj1-chicago-lost-found.jpg',
      detailImages: [newSneaker.image],
      description: newSneaker.description,
      isLimited: newSneaker.isLimited,
      isHyped: newSneaker.isHyped,
      rating: 5.0,
      numReviews: 1,
      sizes: [{ size: "US 10", stock: 15 }]
    };

    setProducts([created, ...products]);
    setIsAddModalOpen(false);
  };

  const handleDeleteSneaker = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = orderFilter === 'ALL' || o.status === orderFilter;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.sneaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredProducts = products.filter(p => {
    const matchesCategory = inventoryCategoryFilter === 'ALL' || p.category === inventoryCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalInventoryStock = products.reduce((acc, p) => acc + p.stock, 0);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row antialiased">

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tighter">SOLE</span>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold tracking-wider">ADMIN</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="API Online" />
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                activeTab === 'overview' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#D52122]" />
              OVERVIEW ANALYTICS
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'orders' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#D52122]" />
                LIVE ORDERS
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'orders' ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'inventory' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#D52122]" />
                SHOP & CATALOG
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'inventory' ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'}`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('drops')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'drops' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-[#D52122]" />
                HYPER DROPS
              </div>
              <span className="text-[10px] bg-[#D52122] text-white px-2 py-0.5 rounded-full font-extrabold">
                {drops.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('resell')}
              className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                activeTab === 'resell' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-[#D52122]" />
              RESELL PREDICTOR
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'messages' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D52122]" />
                CLIENT MESSAGES
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                clientMessages.filter(m => m.status === 'Unread').length > 0 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}>
                {clientMessages.length}
              </span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-200 text-[11px] text-gray-500 font-medium">
          <p>SOLE CONTROL CENTER v1.0</p>
          <p className="text-[10px] text-green-600 font-bold mt-0.5">● Connected to Catalog ({products.length} Sneakers)</p>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#D52122] uppercase">EXECUTIVE MANAGEMENT</span>
            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-black mt-0.5">CONTROL DASHBOARD</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders or sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-black focus:outline-none focus:border-black w-48 sm:w-64"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-[#D52122] transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> ADD SNEAKER
            </button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">
                  ${totalGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </h2>
                <span className="text-xs text-green-600 font-bold mt-1 inline-block">
                  {orders.length === 0 ? '0 orders placed yet' : `↑ Live from ${orders.length} order(s)`}
                </span>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>Active Orders</span>
                  <Package className="w-4 h-4 text-[#D52122]" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">{orders.length}</h2>
                <span className="text-xs text-[#D52122] font-bold mt-1 inline-block">
                  {orders.filter(o => o.status === 'Processing').length} Pending Dispatch
                </span>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>Catalog Inventory</span>
                  <Flame className="w-4 h-4 text-[#D52122]" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">{products.length} Silhouettes</h2>
                <span className="text-xs text-black font-bold mt-1 inline-block">{totalInventoryStock} total pairs in vault</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-lg text-black uppercase">REVENUE TRAJECTORY</h3>
                    <p className="text-xs text-gray-500 font-medium">Monthly revenue progression in USD</p>
                  </div>
                  <span className="text-xs bg-black text-white font-bold px-3 py-1 rounded-full">2026 AUDITED</span>
                </div>

                <div className="h-64 pt-6 flex items-end justify-between gap-3 border-b border-gray-200 pb-2">
                  {[
                    { month: 'Jan', val: 40 },
                    { month: 'Feb', val: 55 },
                    { month: 'Mar', val: 48 },
                    { month: 'Apr', val: 72 },
                    { month: 'May', val: 65 },
                    { month: 'Jun', val: 85 },
                    { month: 'Jul', val: 95 }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                        className="w-full bg-black rounded-t-xl group-hover:bg-[#D52122] transition-all relative"
                        style={{ height: `${bar.val}%` }}
                      />
                      <span className="text-[10px] font-bold text-gray-500">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-4">
                <h3 className="font-display font-bold text-sm text-black uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#D52122]" /> LIVE SYSTEM STREAM
                </h3>

                <div className="space-y-3 text-xs">
                  {orders.length === 0 ? (
                    <div className="p-3 bg-white rounded-2xl border border-gray-200">
                      <span className="font-bold text-black block">System Telemetry Online</span>
                      <span className="text-gray-500 text-[10px]">Awaiting incoming website orders...</span>
                    </div>
                  ) : (
                    orders.slice(0, 3).map((o, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-2xl border border-gray-200">
                        <span className="font-bold text-black block">Order #{o.id} ({o.status})</span>
                        <span className="text-gray-500 text-[10px]">{o.user} • ${o.price.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                  <div className="p-3 bg-white rounded-2xl border border-gray-200">
                    <span className="font-bold text-black block">Catalog Inventory Sync</span>
                    <span className="text-green-600 font-bold text-[10px]">All {products.length} website sneakers loaded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-xl text-black uppercase">LIVE ORDERS MANAGEMENT</h3>
                <p className="text-xs text-gray-500 font-medium">Update fulfillment status live for all incoming orders</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['ALL', 'Processing', 'Shipped', 'Delivered'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      orderFilter === status
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
                    }`}
                  >
                    {status}
                  </button>
                ))}

                <button
                  onClick={handleCreateTestOrder}
                  className="bg-[#D52122] hover:bg-black text-white px-3 py-1.5 rounded-full font-bold text-xs transition-all shadow-sm flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> DEMO ORDER
                </button>

                {orders.length > 0 && (
                  <button
                    onClick={handleClearAllOrders}
                    className="bg-gray-200 hover:bg-red-600 hover:text-white text-gray-700 px-3 py-1.5 rounded-full font-bold text-xs transition-all"
                  >
                    CLEAR ORDERS
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-gray-500 border-b border-gray-200 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Sneaker</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="font-bold text-gray-600 text-sm">No Orders Found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white transition-colors">
                        <td className="py-4 font-black text-black">{ord.id}</td>
                        <td className="py-4 text-gray-800 font-bold">{ord.user}</td>
                        <td className="py-4 text-black font-bold">{ord.sneaker}</td>
                        <td className="py-4 text-black font-black">${ord.price.toLocaleString()}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            ord.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            ord.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            ● {ord.status}
                          </span>
                        </td>
                        <td className="py-4 text-right space-x-1.5">
                          {ord.status !== 'Shipped' && (
                            <button
                              onClick={() => handleUpdateStatus(ord.id, 'Shipped')}
                              className="bg-yellow-100 hover:bg-black hover:text-white text-yellow-900 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                            >
                              MARK SHIPPED
                            </button>
                          )}
                          {ord.status !== 'Delivered' && (
                            <button
                              onClick={() => handleUpdateStatus(ord.id, 'Delivered')}
                              className="bg-black hover:bg-[#D52122] text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                            >
                              MARK DELIVERED
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-1.5 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-500 rounded-lg text-xs transition-all inline-flex items-center"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#D52122] uppercase tracking-wider block">WEBSITE CATALOG VAULT</span>
                <h3 className="font-display font-black text-2xl text-black uppercase mt-0.5">SNEAKER CATALOG INVENTORY</h3>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#D52122] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" /> ADD SNEAKER
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-3xl p-5 border border-gray-200 space-y-4 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
                  <div>
                    <div className="h-44 bg-gray-50 rounded-2xl overflow-hidden p-3 border border-gray-100 flex items-center justify-center relative">
                      <img src={prod.image} alt={prod.name} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#D52122] uppercase tracking-wider">{prod.brand} • {prod.category}</span>
                        <span className="text-[10px] font-bold text-gray-500">★ {prod.rating}</span>
                      </div>
                      <h4 className="font-bold text-sm text-black line-clamp-1">{prod.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 font-medium">{prod.description}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px]">RETAIL</span>
                        <span className="font-black text-black text-sm">${prod.price.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 font-bold block text-[10px]">VAULT STOCK</span>
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleStockChange(prod.id, -1)} className="w-5 h-5 bg-gray-100 rounded font-bold text-xs">-</button>
                          <span className="font-black text-xs min-w-[20px] text-center">{prod.stock}</span>
                          <button onClick={() => handleStockChange(prod.id, 1)} className="w-5 h-5 bg-gray-100 rounded font-bold text-xs">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="bg-black hover:bg-[#D52122] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-1 justify-center"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> EDIT
                      </button>
                      <button
                        onClick={() => handleDeleteSneaker(prod.id)}
                        className="bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 p-2 rounded-xl text-xs font-bold transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HYPER DROPS TAB */}
        {activeTab === 'drops' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h3 className="font-display font-black text-2xl text-black uppercase">HYPER DROPS MANAGEMENT</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drops.map((drop) => (
                <div key={drop.id} className="bg-white rounded-2xl p-5 border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-[#D52122]/10 text-[#D52122] font-bold px-2.5 py-0.5 rounded-full">{drop.status}</span>
                    <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full">🔒 {drop.tier}</span>
                  </div>
                  <h4 className="font-bold text-sm text-black">{drop.name}</h4>
                  <div className="text-xs text-gray-600 flex justify-between">
                    <span>Release: {drop.releaseDate}</span>
                    <span className="font-bold text-black">${drop.price}</span>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button onClick={() => handleToggleDropTier(drop.id)} className="flex-1 bg-gray-100 hover:bg-black hover:text-white text-black py-2 rounded-xl text-xs font-bold transition-all">CYCLE TIER</button>
                    <button onClick={() => handleDeleteDrop(drop.id)} className="p-2 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 rounded-xl text-xs"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESELL TAB */}
        {activeTab === 'resell' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <h3 className="font-display font-black text-2xl text-black uppercase">RESELL PREDICTOR AI ENGINE</h3>
            <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center border-b pb-3 text-xs">
                  <span className="font-bold text-black">{p.name}</span>
                  <span className="font-black text-emerald-600">${(p.resellEstimate || p.price * 1.4).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLIENT MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h3 className="font-display font-black text-2xl text-black uppercase">CLIENT MESSAGES INBOX</h3>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">● Listener Active</span>
            </div>

            <div className="space-y-4">
              {clientMessages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-2xl p-6 border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-black">{msg.name} ({msg.email})</h4>
                      <span className="text-xs font-bold text-[#D52122]">{msg.subject}</span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full">{msg.status}</span>
                  </div>
                  <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl">"{msg.message}"</p>
                  {msg.adminReply && (
                    <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl">Reply sent: "{msg.adminReply}"</p>
                  )}
                  <div className="flex gap-2 justify-end">
                    {msg.status === 'Unread' && (
                      <button onClick={() => handleMarkMessageStatus(msg.id, 'Read')} className="px-3 py-1.5 bg-gray-100 text-xs font-bold rounded-full">Mark Read</button>
                    )}
                    <button onClick={() => handleDeleteMessage(msg.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ADD SNEAKER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-black">ADD SNEAKER TO CATALOG</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddSneaker} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Sneaker Name"
                value={newSneaker.name}
                onChange={e => setNewSneaker({...newSneaker, name: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-300 text-black font-semibold"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Price"
                  value={newSneaker.price}
                  onChange={e => setNewSneaker({...newSneaker, price: Number(e.target.value)})}
                  className="w-full p-3 rounded-xl border border-gray-300 text-black font-semibold"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newSneaker.stock}
                  onChange={e => setNewSneaker({...newSneaker, stock: Number(e.target.value)})}
                  className="w-full p-3 rounded-xl border border-gray-300 text-black font-semibold"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 bg-[#D52122] text-white font-bold rounded-xl hover:bg-black transition-all">
                ADD SNEAKER NOW
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SNEAKER MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-black">EDIT SNEAKER</h3>
              <button onClick={() => setEditingProduct(null)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveEditSneaker} className="space-y-3 text-xs">
              <input
                type="text"
                value={editForm.name}
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-300 text-black font-semibold"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={editForm.price}
                  onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                  className="w-full p-3 rounded-xl border border-gray-300 text-black font-semibold"
                />
                <input
                  type="number"
                  value={editForm.stock}
                  onChange={e => setEditForm({...editForm, stock: Number(e.target.value)})}
                  className="w-full p-3 rounded-xl border border-gray-300 text-black font-semibold"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-[#D52122] transition-all">
                SAVE SNEAKER
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
