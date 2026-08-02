import React, { useState } from 'react';
import { 
  TrendingUp, Package, Users, DollarSign, Flame, Plus, 
  ShieldCheck, ArrowUpRight, Search, CheckCircle2, Clock, 
  X, Filter, RefreshCw, Layers, Edit3, Trash2, Zap, ArrowRight, Activity
} from 'lucide-react';

interface OrderItem {
  id: string;
  user: string;
  sneaker: string;
  price: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  isLimited: boolean;
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'customers'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // State: Orders
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: 'SOLE-984210', user: 'Alex Mercer', sneaker: "Air Jordan 1 Game-Worn", price: 560000, date: 'Just now', status: 'Processing' },
    { id: 'SOLE-741299', user: 'Kaito Tanaka', sneaker: 'AEROSPACE QUANTUM RUNNER', price: 280, date: '14 mins ago', status: 'Shipped' },
    { id: 'SOLE-612988', user: 'Elena Rostova', sneaker: 'JORDAN MONOLITH RETRO HIGH', price: 450, date: '1 hour ago', status: 'Delivered' },
    { id: 'SOLE-551023', user: 'Marcus Vance', sneaker: 'SOLE APEX BASKETBALL PRO', price: 260, date: '3 hours ago', status: 'Processing' }
  ]);

  // State: Inventory
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod_lv_af1',
      name: "Louis Vuitton x Nike Air Force 1",
      brand: 'LOUIS VUITTON',
      category: 'Limited Edition',
      price: 352800,
      stock: 16,
      image: '/images/louis-vuitton-nike-air-force-1.png',
      isLimited: true
    },
    {
      id: 'prod_cyber_x',
      name: "Air Jordan 1 Game-Worn",
      brand: 'JORDAN',
      category: 'Limited Edition',
      price: 560000,
      stock: 33,
      image: '/images/air-jordan-1-game-worn.jpg',
      isLimited: true
    },
    {
      id: 'prod_quantum',
      name: 'AEROSPACE QUANTUM RUNNER',
      brand: 'QUANTUM',
      category: 'Running',
      price: 280,
      stock: 42,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
      isLimited: false
    },
    {
      id: 'prod_jordan',
      name: 'JORDAN MONOLITH RETRO HIGH',
      brand: 'JORDAN',
      category: 'Jordan',
      price: 450,
      stock: 7,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400',
      isLimited: true
    }
  ]);

  // Form State for Adding New Sneaker
  const [newSneaker, setNewSneaker] = useState({
    name: '',
    brand: 'SOLE LABS',
    category: 'Sneakers',
    price: 300,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400',
    isLimited: false
  });

  const handleUpdateStatus = (id: string, status: OrderItem['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleAddSneaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSneaker.name.trim()) return;

    const created: ProductItem = {
      id: 'prod_' + Date.now(),
      name: newSneaker.name,
      brand: newSneaker.brand,
      category: newSneaker.category,
      price: Number(newSneaker.price),
      stock: Number(newSneaker.stock),
      image: newSneaker.image || 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400',
      isLimited: newSneaker.isLimited
    };

    setProducts([created, ...products]);
    setIsAddModalOpen(false);
    setNewSneaker({
      name: '',
      brand: 'SOLE LABS',
      category: 'Sneakers',
      price: 300,
      stock: 25,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400',
      isLimited: false
    });
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = orderFilter === 'ALL' || o.status === orderFilter;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.sneaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row antialiased">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tighter text-black">SOLE</span>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold tracking-wider">ADMIN</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="API Online" />
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                activeTab === 'overview' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#FF5A1F]" />
              OVERVIEW ANALYTICS
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'orders' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#FF5A1F]" />
                LIVE ORDERS
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'orders' ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                activeTab === 'inventory' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <Flame className="w-4 h-4 text-[#FF5A1F]" />
              CATALOG INVENTORY
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                activeTab === 'customers' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4 text-[#FF5A1F]" />
              VIP CUSTOMERS
            </button>
          </nav>

        </div>

        <div className="pt-6 border-t border-gray-200 text-[11px] text-gray-500 font-medium">
          <p>SOLE CONTROL CENTER v1.0</p>
          <p className="text-[10px] text-green-600 font-bold mt-0.5">● Connected to MongoDB Atlas</p>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#FF5A1F] uppercase">EXECUTIVE MANAGEMENT</span>
            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-black mt-0.5">CONTROL DASHBOARD</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders or sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-full pl-9 pr-4 py-2 text-xs font-semibold text-black focus:outline-none focus:border-black w-48 sm:w-64"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Add Sneaker CTA */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-[#FF5A1F] transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> ADD SNEAKER
            </button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">$482,900</h2>
                <span className="text-xs text-green-600 font-bold mt-1 inline-block">↑ +24.8% vs last month</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>Active Orders</span>
                  <Package className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">{orders.length}</h2>
                <span className="text-xs text-[#FF5A1F] font-bold mt-1 inline-block">
                  {orders.filter(o => o.status === 'Processing').length} Pending Dispatch
                </span>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>VIP Members</span>
                  <Users className="w-4 h-4 text-black" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">14,250</h2>
                <span className="text-xs text-black font-bold mt-1 inline-block">1,890 Titan & Legend Tiers</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>Sell-Through Rate</span>
                  <Flame className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">98.4%</h2>
                <span className="text-xs text-gray-500 font-bold mt-1 inline-block">Drops sell out under 4 mins</span>
              </div>

            </div>

            {/* Sales Chart Visualizer & Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Chart */}
              <div className="lg:col-span-8 bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-lg text-black uppercase">REVENUE TRAJECTORY</h3>
                    <p className="text-xs text-gray-500 font-medium">Monthly revenue progression in USD</p>
                  </div>
                  <span className="text-xs bg-black text-white font-bold px-3 py-1 rounded-full">2026 AUDITED</span>
                </div>

                {/* SVG Visualizer Chart */}
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
                        className="w-full bg-black rounded-t-xl group-hover:bg-[#FF5A1F] transition-all relative"
                        style={{ height: `${bar.val}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity">
                          ${bar.val * 5}k
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Log */}
              <div className="lg:col-span-4 bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-4">
                <h3 className="font-display font-bold text-sm text-black uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#FF5A1F]" /> LIVE SYSTEM STREAM
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-gray-200">
                    <span className="font-bold text-black block">New VIP Registration</span>
                    <span className="text-gray-500 text-[10px]">Kaito T. joined Titan VIP Tier</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-gray-200">
                    <span className="font-bold text-black block">Order #SOLE-984210 Dispatched</span>
                    <span className="text-gray-500 text-[10px]">DHL Express Tracking generated</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-gray-200">
                    <span className="font-bold text-black block">Inventory Low Alert</span>
                    <span className="text-red-600 font-bold text-[10px]">JORDAN MONOLITH: 7 units left</span>
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

              {/* Status Filter */}
              <div className="flex gap-2">
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
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-gray-500 border-b border-gray-200 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Sneaker</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white transition-colors">
                      <td className="py-4 font-black text-black">{ord.id}</td>
                      <td className="py-4 text-gray-800 font-bold">{ord.user}</td>
                      <td className="py-4 text-black font-bold">{ord.sneaker}</td>
                      <td className="py-4 text-black font-black">${ord.price}</td>
                      <td className="py-4 text-gray-500 font-medium">{ord.date}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          ord.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          ● {ord.status}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'Shipped')}
                          className="bg-gray-200 hover:bg-black hover:text-white text-black px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                        >
                          MARK SHIPPED
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(ord.id, 'Delivered')}
                          className="bg-black hover:bg-[#FF5A1F] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                        >
                          MARK DELIVERED
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-black uppercase">SNEAKER CATALOG INVENTORY</h3>
                <p className="text-xs text-gray-500 font-medium">Manage active stock, prices, and limited release tags</p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-[#FF5A1F] transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> ADD NEW SNEAKER
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl p-4 border border-gray-200 space-y-3 shadow-sm">
                  <div className="h-40 bg-gray-50 rounded-xl overflow-hidden p-3 border border-gray-100 flex items-center justify-center relative">
                    <img src={prod.image} alt={prod.name} className="h-full object-contain" />
                    {prod.isLimited && (
                      <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        LIMITED
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#FF5A1F] uppercase">{prod.brand}</span>
                    <h4 className="font-bold text-sm text-black line-clamp-1">{prod.name}</h4>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="font-black text-black">${prod.price}</span>
                      <span className="text-gray-600 font-bold">Stock: {prod.stock} units</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <h3 className="font-display font-bold text-xl text-black uppercase">REGISTERED VIP CUSTOMERS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Alex Mercer', email: 'alex.mercer@future.sole', xp: 1450, tier: 'TITAN VIP', orders: 12 },
                { name: 'Kaito Tanaka', email: 'kaito.t@tokyo.sole', xp: 4850, tier: 'LEGEND VIP', orders: 28 },
                { name: 'Elena Rostova', email: 'elena.r@berlin.sole', xp: 3920, tier: 'LEGEND VIP', orders: 19 }
              ].map((cust, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-gray-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-black">{cust.name}</h4>
                    <p className="text-xs text-gray-500">{cust.email}</p>
                    <span className="text-[10px] font-bold text-[#FF5A1F] mt-1 inline-block">{cust.orders} Completed Purchases</span>
                  </div>
                  <div className="text-right">
                    <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">{cust.tier}</span>
                    <span className="block text-xs font-bold text-black mt-1">{cust.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ================= ADD NEW SNEAKER MODAL ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

          <div className="relative w-full max-w-md bg-white border border-black/10 rounded-3xl p-6 shadow-2xl z-10 text-black">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h3 className="font-display font-black text-lg text-black uppercase">ADD NEW SNEAKER TO VAULT</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSneaker} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Sneaker Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SOLE PHANTOM RUNNER 02"
                  value={newSneaker.name}
                  onChange={(e) => setNewSneaker({ ...newSneaker, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    value={newSneaker.brand}
                    onChange={(e) => setNewSneaker({ ...newSneaker, brand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={newSneaker.category}
                    onChange={(e) => setNewSneaker({ ...newSneaker, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  >
                    <option value="Sneakers">Sneakers</option>
                    <option value="Limited Edition">Limited Edition</option>
                    <option value="Running">Running</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Basketball">Basketball</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newSneaker.price}
                    onChange={(e) => setNewSneaker({ ...newSneaker, price: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={newSneaker.stock}
                    onChange={(e) => setNewSneaker({ ...newSneaker, stock: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="limitedCheck"
                  checked={newSneaker.isLimited}
                  onChange={(e) => setNewSneaker({ ...newSneaker, isLimited: e.target.checked })}
                  className="w-4 h-4 accent-black"
                />
                <label htmlFor="limitedCheck" className="font-bold text-black cursor-pointer">Tag as Limited Edition Drop</label>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#FF5A1F] transition-all shadow-lg mt-4"
              >
                PUBLISH TO LIVE CATALOGUE
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
