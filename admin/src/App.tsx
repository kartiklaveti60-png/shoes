import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { 
  TrendingUp, Package, DollarSign, Flame, Plus, 
  ShieldCheck, Search, CheckCircle2, Clock, 
  X, Filter, Edit3, Trash2, Zap, ArrowRight, Activity, Eye, Tag, Sparkles,
  BarChart2, MessageSquare, Image, Users, ShoppingBag, Mail, Send
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

export const App: React.FC = () => {
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

  // State & Handlers for Editing Sneaker Resell Graph
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

  // State: Orders initialized from localStorage (defaults to empty array)
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('sole_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State: Client Messages & Inquiries
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
        message: 'Looking for a size US 10.5 of Air Jordan 1 Off-White Chicago in deadstock condition with OG box. Urgent inquiry for private collection.',
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

  // Fetch orders from backend API and sync with local storage for real-time cross-port sync
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
    const interval = setInterval(fetchApiOrders, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Client Contact Messages from backend API & localStorage and merge seamlessly
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

      // Merge local and API messages seamlessly
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
    const interval = setInterval(fetchApiMessages, 1000);

    const handleStorage = () => {
      fetchApiMessages();
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
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
      window.dispatchEvent(new Event('storage'));
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
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}

    try {
      await fetch(`${API_BASE}/api/v1/contact/${id}`, { method: 'DELETE' });
    } catch (err) {}
  };

  const totalGrossRevenue = orders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);

  // State: Inventory - ALL 16 SNEAKERS FROM THE WEBSITE WITH FULL DETAIL PHOTOS & SPECS
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
        "/images/aj1-lost-found-outsole.png",
        "/images/aj1-lost-found-box.png"
      ],
      description: "Reimagined 1985 classic silhouette featuring cracked leather collars, vintage yellowed midsole, and authentic vintage receipts.",
      story: "Inspired by the thrill of discovering an original 1985 pair tucked away in a dusty mom-and-pop store stockroom. Features vintage packaging and invoice documentation.",
      technology: ["Encapsulated Nike Air Cushioning", "Cracked Vintage Leather Collar", "Aged Outsole Finish", "1985 OG Box Packaging"],
      materials: ["Varsity Red Calfskin", "Cracked Black Leather", "Sail Leather Upper", "Aged Rubber Cupsole"],
      isLimited: true,
      isHyped: true,
      rating: 4.98,
      numReviews: 420,
      sizes: [
        { size: "US 8.5", stock: 5 },
        { size: "US 9", stock: 8 },
        { size: "US 10", stock: 12 },
        { size: "US 11", stock: 2 }
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
        "/images/travis-scott-reverse-mocha-side.png",
        "/images/travis-scott-reverse-mocha-top.png",
        "/images/travis-scott-reverse-mocha-heel.png"
      ],
      description: "Iconic reverse oversized Swoosh silhouette crafted with premium Sail leather overlays and Mocha suede underlays.",
      story: "Cactus Jack's signature backward Swoosh design combined with subtle Red branding on the heel tab.",
      technology: ["Encapsulated Air Cushioning", "Cactus Jack Custom Insole", "Reverse Swoosh Architecture"],
      materials: ["Premium Suede & Nappa Leather", "Vintage Off-White Rubber Midsole"],
      isLimited: true,
      isHyped: true,
      rating: 4.97,
      numReviews: 312,
      sizes: [
        { size: "US 9", stock: 3 },
        { size: "US 10", stock: 5 },
        { size: "US 11", stock: 2 }
      ]
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
      detailImages: [
        "/images/nike-sb-dunk-orange-lobster.jpg",
        "/images/orange-lobster-toe-band.jpg",
        "/images/orange-lobster-top.jpg",
        "/images/orange-lobster-heel.jpg",
        "/images/orange-lobster-art.jpg"
      ],
      description: "Iconic Concepts lobster collaboration featuring speckled nubuck overlays, rubber band toe wrap, and plaid bib lining.",
      story: "Continuing the legendary Concepts Lobster SB Dunk series with vibrant Orange speckling, signature checkered tablecloth interior lining, and iconic toe band detail.",
      technology: ["Zoom Air Heel Unit", "Padded SB Dunk Collar", "Speckled Nubuck Leather", "Concepts Signature Rubber Band Wrap"],
      materials: ["Premium Orange Nubuck", "Plaid Textile Lining", "White Leather Tongue", "Black Rubber Outsole"],
      isLimited: true,
      isHyped: true,
      rating: 4.97,
      numReviews: 345,
      sizes: [
        { size: "US 8", stock: 3 },
        { size: "US 9", stock: 6 },
        { size: "US 10", stock: 8 },
        { size: "US 11", stock: 4 }
      ]
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
      detailImages: [
        "/images/off-white-jordan-1-chicago.jpg",
        "/images/off-white-jordan-1-chicago-side.jpg",
        "/images/off-white-jordan-1-chicago-medial.jpg",
        "/images/off-white-jordan-1-chicago-pair.jpg",
        "/images/off-white-jordan-1-chicago-heel.jpg"
      ],
      description: "Virgil Abloh's legendary deconstructed 'The Ten' Chicago High-Top with exposed foam, quotation branding, and signature red zip-tie.",
      story: "The holy grail of sneaker collaborations. Virgil Abloh deconstructed the original 1985 Air Jordan 1 Chicago silhouette with media quotation marks, oversized floating Swoosh, and industrial red tag.",
      technology: ["Deconstructed Floating Swoosh", "Exposed Collar Foam", "Virgil Abloh Red Zip-Tie Tag", "Encapsulated Air Unit"],
      materials: ["Full-Grain Leather", "Mesh & Suede Overlays", "Exposed Foam Tongue", "Custom Laces with 'SHOELACES' text"],
      isLimited: true,
      isHyped: true,
      rating: 4.99,
      numReviews: 512,
      sizes: [
        { size: "US 8", stock: 2 },
        { size: "US 9", stock: 4 },
        { size: "US 10", stock: 5 },
        { size: "US 11", stock: 3 }
      ]
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
      detailImages: [
        "/images/louis-vuitton-nike-air-force-1.png",
        "/images/louis-vuitton-af1-pair.png",
        "/images/louis-vuitton-af1-trunk.png",
        "/images/louis-vuitton-af1-detail.png"
      ],
      description: "Designed by Virgil Abloh for the Louis Vuitton Spring-Summer 2022 runway. Crafted in Fiesso d'Artico with signature Monogram calf leather.",
      story: "Handcrafted in Louis Vuitton's legendary shoe atelier in Fiesso d'Artico, Italy, combining Nike's classic Air Force 1 silhouette with LV's iconic Monogram motifs and Virgil Abloh's signature quotation marks.",
      technology: ["Encapsulated Nike Air Cushioning", "Fiesso d'Artico Hand-Stitched Construction", "Virgil Abloh Custom Lacing", "Louis Vuitton Damier Monogram"],
      materials: ["Calfskin Leather with Monogram Print", "Natural Rawhide Piping", "Rubber Cupsole", "Gold-Plated Metal Eyelets"],
      isLimited: true,
      isHyped: false,
      rating: 4.99,
      numReviews: 218,
      sizes: [
        { size: "US 8", stock: 2 },
        { size: "US 9", stock: 4 },
        { size: "US 10", stock: 6 },
        { size: "US 11", stock: 3 },
        { size: "US 12", stock: 1 }
      ]
    },
    {
      id: "prod_cyber_x",
      name: "Air Jordan 1 Game-Worn",
      slug: "air-jordan-1-game-worn",
      brand: "JORDAN",
      category: "Limited Edition",
      price: 560000,
      originalPrice: 600000,
      resellEstimate: 650000,
      stock: 33,
      image: "/images/air-jordan-1-game-worn.jpg",
      detailImages: [
        "/images/air-jordan-1-game-worn.jpg",
        "/images/air-jordan-1-side.png",
        "/images/air-jordan-1-signature.png",
        "/images/air-jordan-1-top.png"
      ],
      description: "Original 1985 game-worn Air Jordan 1 'Chicago' colorway, autographed by Michael Jordan with vintage ink signature on the collar.",
      story: "Worn by Michael Jordan during his legendary 1985 rookie season with the Chicago Bulls. Features authentic game wear, vintage aged cupsole, original factory laces, and a certified hand-signed collar signature.",
      technology: ["Original Air Unit (1985)", "Hand-Signed Collar Signature", "Chicago Bulls Game-Worn Specs", "MEARS & PSA/DNA Certified"],
      materials: ["Full-Grain Aniline Leather", "Aged Rubber Cupsole", "Vintage Cotton Laces", "Autographed Permanent Marker Ink"],
      isLimited: true,
      isHyped: false,
      rating: 4.98,
      numReviews: 142,
      sizes: [
        { size: "US 8", stock: 4 },
        { size: "US 9", stock: 8 },
        { size: "US 10", stock: 12 },
        { size: "US 11", stock: 3 },
        { size: "US 12", stock: 6 }
      ]
    },
    {
      id: "prod_nike_pegasus_42",
      name: "Nike Pegasus 42",
      slug: "nike-pegasus-42",
      brand: "NIKE",
      category: "Running",
      price: 145,
      originalPrice: 160,
      resellEstimate: 180,
      stock: 72,
      image: "/images/nike-pegasus-42.png",
      detailImages: [
        "/images/nike-pegasus-42.png",
        "/images/nike-pegasus-42-pair.png",
        "/images/nike-pegasus-42-outsole.png",
        "/images/nike-pegasus-42-detail.jpg",
        "/images/nike-pegasus-42-top.jpg"
      ],
      description: "Responsive daily trainer featuring dual ReactX foam and forefoot Air Zoom unit for smooth transition.",
      story: "The workhorse with wings returns. Four decades of running evolution upgraded with high-energy ReactX foam.",
      technology: ["Dual ReactX Foam Cushioning", "Forefoot Air Zoom Cell", "Engineered Flymesh Upper"],
      materials: ["Recycled Flymesh", "Blown Rubber Outsole"],
      isLimited: false,
      isHyped: false,
      rating: 4.89,
      numReviews: 210,
      sizes: [
        { size: "US 8", stock: 12 },
        { size: "US 9", stock: 20 },
        { size: "US 10", stock: 25 },
        { size: "US 11", stock: 15 }
      ]
    },
    {
      id: "prod_adidas_adizero_evo_sl",
      name: "Adidas Adizero Evo SL",
      slug: "adidas-adizero-evo-sl",
      brand: "ADIDAS",
      category: "Running",
      price: 150,
      originalPrice: 170,
      resellEstimate: 210,
      stock: 64,
      image: "/images/adidas-adizero-evo-sl.jpg",
      detailImages: [
        "/images/adidas-adizero-evo-sl.jpg",
        "/images/adidas-adizero-evo-sl-pair.jpg",
        "/images/adidas-adizero-evo-sl-outsole.jpg",
        "/images/adidas-adizero-evo-sl-onfoot.jpg",
        "/images/adidas-adizero-evo-sl-side.jpg"
      ],
      description: "Superlight tempo trainer infused with Lightstrike Pro foam for effortless high-speed miles.",
      story: "Inspired by world-record breaking Adizero race day technology, distilled into an ultra-fast daily trainer.",
      technology: ["Lightstrike Pro Foam", "Continental™ Rubber Traction", "Superlight Mesh Upper"],
      materials: ["Engineered Monomesh", "Continental Rubber"],
      isLimited: false,
      isHyped: false,
      rating: 4.91,
      numReviews: 184,
      sizes: [
        { size: "US 8.5", stock: 10 },
        { size: "US 9.5", stock: 18 },
        { size: "US 10.5", stock: 22 },
        { size: "US 11.5", stock: 14 }
      ]
    },
    {
      id: "prod_nb_fresh_foam_880_v15",
      name: "New Balance Fresh Foam 880 v15",
      slug: "new-balance-fresh-foam-880-v15",
      brand: "NEW BALANCE",
      category: "Running",
      price: 149,
      originalPrice: 165,
      resellEstimate: 190,
      stock: 55,
      image: "/images/new-balance-fresh-foam-880-v15.jpg",
      detailImages: [
        "/images/new-balance-fresh-foam-880-v15.jpg",
        "/images/new-balance-fresh-foam-880-v15-pair.jpg",
        "/images/new-balance-fresh-foam-880-v15-front.jpg",
        "/images/new-balance-fresh-foam-880-v15-heel.jpg",
        "/images/new-balance-fresh-foam-880-v15-quarter.jpg"
      ],
      description: "Plush dual-density Fresh Foam X midsole delivering cloud-like comfort and long-distance durability.",
      story: "The premier neutral trainer designed for high-mileage comfort, features precision-engineered mesh and soft heel transition.",
      technology: ["Fresh Foam X Midsole", "NDurance Outsole Rubber", "Hypoknit Upper"],
      materials: ["Hypoknit Mesh", "NDurance Rubber"],
      isLimited: false,
      isHyped: false,
      rating: 4.93,
      numReviews: 265,
      sizes: [
        { size: "US 8", stock: 8 },
        { size: "US 9", stock: 15 },
        { size: "US 10", stock: 20 },
        { size: "US 11", stock: 12 }
      ]
    },
    {
      id: "prod_nike_lebron_23",
      name: "NIKE LEBRON XXIII",
      slug: "nike-lebron-xxiii",
      brand: "NIKE",
      category: "Basketball",
      price: 210,
      originalPrice: 230,
      resellEstimate: 260,
      stock: 52,
      image: "/images/nike-lebron-xxiii.jpg",
      detailImages: [
        "/images/nike-lebron-xxiii.jpg",
        "/images/nike-lebron-xxiii-pair.jpg",
        "/images/nike-lebron-xxiii-layout.jpg",
        "/images/nike-lebron-xxiii-heel.jpg",
        "/images/nike-lebron-xxiii-outsole.jpg"
      ],
      description: "LeBron James' 23rd signature court silhouette engineered with full-length Zoom Strobel, heel Max Air cushion, and royal crown molded stability armor.",
      story: "Marking 23 signature iterations of dominance. Designed for unstoppable power, speed, and court command.",
      technology: ["Full-Length Zoom Strobel", "Heel Max Air Unit", "Crown-Fit TPU Armor"],
      materials: ["Battleknit 3.0", "Molded Crown TPU Collar", "High-Density Foam Midsole"],
      isLimited: false,
      isHyped: false,
      rating: 4.96,
      numReviews: 312,
      sizes: [
        { size: "US 9", stock: 12 },
        { size: "US 10", stock: 18 },
        { size: "US 11", stock: 14 },
        { size: "US 12", stock: 8 }
      ]
    },
    {
      id: "prod_adidas_ae_2",
      name: "ADIDAS Anthony Edwards 2",
      slug: "adidas-anthony-edwards-2",
      brand: "ADIDAS",
      category: "Basketball",
      price: 130,
      originalPrice: 150,
      resellEstimate: 180,
      stock: 54,
      image: "/images/adidas-anthony-edwards-2.jpg",
      detailImages: [
        "/images/adidas-anthony-edwards-2.jpg",
        "/images/adidas-anthony-edwards-2-pair.jpg",
        "/images/adidas-anthony-edwards-2-side.jpg",
        "/images/adidas-anthony-edwards-2-heel.jpg",
        "/images/adidas-anthony-edwards-2-top.jpg"
      ],
      description: "Anthony Edwards' 2nd signature court shoe featuring TPU honeycomb stability wings, Lightstrike Pro foam, and explosive first-step response.",
      story: "Built for Ant-Man's rim-rocking athleticism and unmatched vertical launch speed.",
      technology: ["Lightstrike Pro Foam", "TPU Honeycomb Support Wing", "Generative Herringbone Traction"],
      materials: ["Honeycomb Perforated Upper", "TPU Lateral Cage", "Rubber Outsole"],
      isLimited: false,
      isHyped: false,
      rating: 4.94,
      numReviews: 240,
      sizes: [
        { size: "US 8.5", stock: 10 },
        { size: "US 9.5", stock: 15 },
        { size: "US 10", stock: 20 },
        { size: "US 11", stock: 9 }
      ]
    },
    {
      id: "prod_ua_curry_13_ap",
      name: "UNDER ARMOUR CURRY 13 AP",
      slug: "under-armour-curry-13-ap",
      brand: "UNDER ARMOUR",
      category: "Basketball",
      price: 140,
      originalPrice: 160,
      resellEstimate: 190,
      stock: 48,
      image: "/images/under-armour-curry-13-ap.jpg",
      detailImages: [
        "/images/under-armour-curry-13-ap.jpg",
        "/images/under-armour-curry-13-ap-pair.jpg",
        "/images/under-armour-curry-13-ap-top.jpg",
        "/images/under-armour-curry-13-ap-outsole.jpg",
        "/images/under-armour-curry-13-ap-detail.jpg"
      ],
      description: "Stephen Curry's 13th All-Pro edition built with rubberless UA Flow technology for unmatched court grip and quick-release shot mechanics.",
      story: "Designed for the greatest shooter in basketball history. Maximum court feel, zero distraction.",
      technology: ["UA Flow Rubberless Cushioning", "Warp 2.0 Upper Fit", "TPE-Blend Midfoot Shank"],
      materials: ["UA Warp Breathable Knit", "Molded Midfoot Strap", "UA Flow Outsole"],
      isLimited: false,
      isHyped: false,
      rating: 4.95,
      numReviews: 198,
      sizes: [
        { size: "US 8", stock: 8 },
        { size: "US 9", stock: 14 },
        { size: "US 10", stock: 16 },
        { size: "US 11", stock: 10 }
      ]
    },
    {
      id: "prod_nike_af01",
      name: "NIKE AIR FORCE 01",
      slug: "nike-air-force-01",
      brand: "NIKE",
      category: "Lifestyle",
      price: 115,
      originalPrice: 115,
      resellEstimate: 130,
      stock: 63,
      image: "/images/nike-air-force-01.png",
      detailImages: [
        "/images/nike-air-force-01.png",
        "/images/nike-air-force-01-pair.png",
        "/images/nike-air-force-01-side.png",
        "/images/nike-air-force-01-heel.png",
        "/images/nike-air-force-01-onfoot.jpg"
      ],
      description: "The radiance lives on in the NIKE AIR FORCE 01, the basketball classic featuring crisp leather, bold accent lines, and timeless style.",
      story: "Debuting in 1982, the Air Force 01 was Nike's first basketball shoe to house Nike Air, revolutionizing the game while rapidly becoming a global lifestyle icon.",
      technology: ["Encapsulated Nike Air Cushioning", "Perforated Toe Box", "Non-Marking Rubber Sole"],
      materials: ["Full-Grain Leather Upper", "Padded Low-Cut Collar", "Durable Rubber Cupsole"],
      isLimited: false,
      isHyped: false,
      rating: 4.86,
      numReviews: 342,
      sizes: [
        { size: "US 8", stock: 15 },
        { size: "US 9", stock: 20 },
        { size: "US 10", stock: 18 },
        { size: "US 11", stock: 10 }
      ]
    },
    {
      id: "prod_nike_dunk_panda",
      name: "Nike Dunk Low Retro White Black Panda",
      slug: "nike-dunk-low-retro-white-black-panda",
      brand: "NIKE",
      category: "Lifestyle",
      price: 115,
      originalPrice: 115,
      resellEstimate: 140,
      stock: 67,
      image: "/images/nike-dunk-low-panda.png",
      detailImages: [
        "/images/nike-dunk-low-panda.png",
        "/images/nike-dunk-low-panda-pair.jpg",
        "/images/nike-dunk-low-panda-heel.jpg",
        "/images/nike-dunk-low-panda-rear.jpg",
        "/images/nike-dunk-low-panda-onfoot.jpg"
      ],
      description: "Created for the hardwood but taken to the streets, the Nike Dunk Low Retro White Black Panda delivers modern comfort with iconic monochrome color-blocking.",
      story: "Originally a college basketball shoe, the Dunk Low became a streetwear staple embraced by skateboarders and sneaker fans across generations.",
      technology: ["Lightweight Foam Midsole", "Padded Low-Cut Collar", "Pivot Circle Traction"],
      materials: ["Smooth Leather Upper", "Soft Mesh Tongue", "Rubber Cupsole"],
      isLimited: false,
      isHyped: false,
      rating: 4.91,
      numReviews: 518,
      sizes: [
        { size: "US 8.5", stock: 12 },
        { size: "US 9.5", stock: 25 },
        { size: "US 10.5", stock: 22 },
        { size: "US 11.5", stock: 8 }
      ]
    },
    {
      id: "prod_adidas_samba",
      name: "adidas SAMBA",
      slug: "adidas-samba",
      brand: "ADIDAS",
      category: "Lifestyle",
      price: 120,
      originalPrice: 120,
      resellEstimate: 135,
      stock: 57,
      image: "/images/adidas-samba.png",
      detailImages: [
        "/images/adidas-samba.png",
        "/images/adidas-samba-side.jpg",
        "/images/adidas-samba-toe.jpg",
        "/images/adidas-samba-heel.jpg",
        "/images/adidas-samba-top.jpg",
        "/images/adidas-samba-onfoot.jpg"
      ],
      description: "Born on the indoor football pitch, the adidas SAMBA is an undisputed lifestyle icon featuring a soft leather upper, classic suede T-toe, and signature gum sole.",
      story: "First introduced in 1949 to give footballers traction on icy pitches, the Samba transitioned seamlessly into casual culture and skate parks worldwide.",
      technology: ["Gum Rubber Outsole", "Reinforced Suede T-Toe", "Ortholite Sockliner"],
      materials: ["Full-Grain Leather Upper", "Suede T-Toe Overlay", "Gum Rubber Sole"],
      isLimited: false,
      isHyped: false,
      rating: 4.90,
      numReviews: 435,
      sizes: [
        { size: "US 7.5", stock: 10 },
        { size: "US 8.5", stock: 18 },
        { size: "US 9.5", stock: 15 },
        { size: "US 10.5", stock: 14 }
      ]
    },
    {
      id: "prod_adidas_all_star",
      name: "adidas All Star",
      slug: "adidas-all-star",
      brand: "ADIDAS",
      category: "Lifestyle",
      price: 130,
      originalPrice: 130,
      resellEstimate: 150,
      stock: 64,
      image: "/images/adidas-all-star.png",
      detailImages: [
        "/images/adidas-all-star.png",
        "/images/adidas-all-star-quarter.jpg",
        "/images/adidas-all-star-pair.jpg",
        "/images/adidas-all-star-heel.jpg",
        "/images/adidas-all-star-toe.jpg"
      ],
      description: "A timeless street style icon, the adidas All Star features a premium leather upper, clean low-profile design, and signature classic three-stripes aesthetic.",
      story: "Born for daily versatility, the adidas All Star carries court heritage into modern urban street culture with supreme comfort and durable craftsmanship.",
      technology: ["Ortholite Sockliner", "Padded Collar", "High-Traction Rubber Cupsole"],
      materials: ["Full-Grain Leather Upper", "Soft Textile Lining", "Rubber Outsole"],
      isLimited: false,
      isHyped: false,
      rating: 4.89,
      numReviews: 284,
      sizes: [
        { size: "US 8", stock: 12 },
        { size: "US 9", stock: 18 },
        { size: "US 10", stock: 20 },
        { size: "US 11", stock: 14 }
      ]
    }
  ]);

  // Form State for Adding New Sneaker
  const [newSneaker, setNewSneaker] = useState({
    name: '',
    brand: 'JORDAN',
    category: 'Hyped',
    price: 250,
    resellEstimate: 350,
    stock: 25,
    image: '/images/aj1-chicago-lost-found.jpg',
    detailImages: '/images/aj1-chicago-lost-found.jpg, /images/aj1-lost-found-side.png',
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
      { sneaker: 'Louis Vuitton x Nike Air Force 1', price: 352800 },
      { sneaker: 'Jordan 1 Retro High Off-White "Chicago"', price: 3865 },
      { sneaker: 'Nike SB Dunk Low Concepts "Orange Lobster"', price: 500 }
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
        const newStock = Math.max(0, p.stock + delta);
        return { ...p, stock: newStock };
      }
      return p;
    }));
    if (selectedProductDetail && selectedProductDetail.id === id) {
      setSelectedProductDetail(prev => prev ? { ...prev, stock: Math.max(0, prev.stock + delta) } : null);
    }
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

    const updatedProducts = products.map(p => p.id === editingProduct.id ? updated : p);
    setProducts(updatedProducts);

    if (selectedProductDetail && selectedProductDetail.id === editingProduct.id) {
      setSelectedProductDetail(updated);
    }

    setEditingProduct(null);
  };

  const handleOpenGraphEditor = (product: ProductItem) => {
    setEditingGraphProduct(product);
    const retail = product.price || 150;
    const resell = product.resellEstimate || retail * 1.5;
    const profit = resell - retail;

    const defaultPoints = [
      { label: 'Q1 2025', price: Math.round(retail * 1.05) },
      { label: 'Q2 2025', price: Math.round(retail * 1.35) },
      { label: 'Q3 2025', price: Math.round(retail + profit * 0.45) },
      { label: 'Q4 2025', price: Math.round(retail + profit * 0.78) },
      { label: '2026 CURRENT', price: resell },
      { label: '2027 FORECAST', price: Math.round(resell * 1.25) }
    ];

    setEditingGraphPoints(sneakerGraphs[product.id] || defaultPoints);
  };

  const handleUpdateGraphPointPrice = (index: number, newPrice: number) => {
    setEditingGraphPoints(prev => prev.map((pt, i) => i === index ? { ...pt, price: Math.max(0, newPrice) } : pt));
  };

  const handleSaveGraphTrajectory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGraphProduct) return;

    const updatedGraphs = {
      ...sneakerGraphs,
      [editingGraphProduct.id]: editingGraphPoints
    };

    setSneakerGraphs(updatedGraphs);
    try {
      localStorage.setItem('sole_sneaker_graphs', JSON.stringify(updatedGraphs));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {}

    // Update Current price as sneaker resellEstimate
    const currentPt = editingGraphPoints.find(p => p.label.includes('CURRENT'));
    if (currentPt) {
      setProducts(prev => prev.map(p => p.id === editingGraphProduct.id ? { ...p, resellEstimate: currentPt.price } : p));
    }

    setEditingGraphProduct(null);
  };

  // State & Handlers: Drops
  const [drops, setDrops] = useState([
    { id: 'drop_1', name: "Travis Scott x Air Jordan 1 Low 'Reverse Mocha'", releaseDate: '2026-08-15', price: 1450, stock: 15, tier: 'LEGEND MEMBER', status: 'Active Countdown' },
    { id: 'drop_2', name: 'Nike SB Dunk Low Concepts "Orange Lobster"', releaseDate: '2026-08-20', price: 500, stock: 25, tier: 'TITAN MEMBER', status: 'Active Countdown' },
    { id: 'drop_3', name: 'Jordan 1 Retro High Off-White "Chicago"', releaseDate: '2026-09-01', price: 3865, stock: 8, tier: 'GHOST MEMBER', status: 'Upcoming' }
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

  // State & Handlers: Community Posts
  const [communityPosts, setCommunityPosts] = useState([
    { id: 'post_1', author: 'Kaito Tanaka', tier: 'LEGEND MEMBER', sneaker: 'Travis Scott Reverse Mocha', likes: 342, image: '/images/travis-scott-reverse-mocha.png', isFeatured: true },
    { id: 'post_2', author: 'Elena Rostova', tier: 'TITAN MEMBER', sneaker: 'Off-White Jordan 1 Chicago', likes: 512, image: '/images/off-white-jordan-1-chicago.jpg', isFeatured: true },
    { id: 'post_3', author: 'Alex Mercer', tier: 'SHADOW MEMBER', sneaker: 'Nike Air Jordan 1 Lost & Found', likes: 198, image: '/images/aj1-chicago-lost-found.jpg', isFeatured: false }
  ]);

  const handleTogglePostFeatured = (id: string) => {
    setCommunityPosts(communityPosts.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
  };

  const handleDeletePost = (id: string) => {
    setCommunityPosts(communityPosts.filter(p => p.id !== id));
  };

  // State & Handlers: Lookbooks
  const [lookbooks, setLookbooks] = useState([
    { id: 'lb_1', title: "CYBERPUNK WINTER '26", season: "FALL/WINTER 2026", totalOutfits: 12, status: "Published", cover: "/images/off-white-jordan-1-chicago.jpg" },
    { id: 'lb_2', title: "TOKYO STREETWEAR OG", season: "SPRING/SUMMER 2026", totalOutfits: 8, status: "Published", cover: "/images/travis-scott-reverse-mocha.png" },
    { id: 'lb_3', title: "HIGH-OCTANE VELOCITY", season: "SPECIAL EDITION", totalOutfits: 10, status: "Draft", cover: "/images/nike-sb-dunk-orange-lobster.jpg" }
  ]);

  const handleToggleLookbookStatus = (id: string) => {
    setLookbooks(lookbooks.map(lb => {
      if (lb.id === id) {
        return { ...lb, status: lb.status === 'Published' ? 'Draft' : 'Published' };
      }
      return lb;
    }));
  };

  const handleDeleteLookbook = (id: string) => {
    setLookbooks(lookbooks.filter(lb => lb.id !== id));
  };

  const handleAddSneaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSneaker.name.trim()) return;

    const detailList = newSneaker.detailImages
      ? newSneaker.detailImages.split(',').map(s => s.trim()).filter(Boolean)
      : [newSneaker.image];

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
      detailImages: detailList,
      description: newSneaker.description,
      isLimited: newSneaker.isLimited,
      isHyped: newSneaker.isHyped,
      rating: 5.0,
      numReviews: 1,
      sizes: [
        { size: "US 9", stock: 10 },
        { size: "US 10", stock: 15 }
      ]
    };

    setProducts([created, ...products]);
    setIsAddModalOpen(false);
    setNewSneaker({
      name: '',
      brand: 'JORDAN',
      category: 'Hyped',
      price: 250,
      resellEstimate: 350,
      stock: 25,
      image: '/images/aj1-chicago-lost-found.jpg',
      detailImages: '/images/aj1-chicago-lost-found.jpg, /images/aj1-lost-found-side.png',
      description: 'Exclusive limited edition sneaker drop.',
      isLimited: true,
      isHyped: true
    });
  };

  const handleDeleteSneaker = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    if (selectedProductDetail?.id === id) {
      setSelectedProductDetail(null);
    }
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
      <CustomCursor />

      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="SOLE Logo" className="h-9 w-auto object-contain drop-shadow-sm" />
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

            {/* WEBSITE SECTION 1: SHOP & INVENTORY */}
            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'inventory' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#FF5A1F]" />
                SHOP & CATALOG
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'inventory' ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'}`}>
                {products.length}
              </span>
            </button>

            {/* WEBSITE SECTION 2: HYPER DROPS */}
            <button
              onClick={() => setActiveTab('drops')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'drops' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-[#FF5A1F]" />
                HYPER DROPS
              </div>
              <span className="text-[10px] bg-[#FF5A1F] text-white px-2 py-0.5 rounded-full font-extrabold">
                {drops.length}
              </span>
            </button>

            {/* WEBSITE SECTION 3: RESELL PREDICTOR */}
            <button
              onClick={() => setActiveTab('resell')}
              className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                activeTab === 'resell' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-[#FF5A1F]" />
              RESELL PREDICTOR
            </button>

            {/* WEBSITE SECTION 4: COMMUNITY ROOM */}
            <button
              onClick={() => setActiveTab('community')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'community' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#FF5A1F]" />
                COMMUNITY ROOM
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'community' ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'}`}>
                {communityPosts.length}
              </span>
            </button>

            {/* WEBSITE SECTION 5: LOOKBOOK */}
            <button
              onClick={() => setActiveTab('lookbook')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'lookbook' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Image className="w-4 h-4 text-[#FF5A1F]" />
                LOOKBOOK CAMPAIGNS
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'lookbook' ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'}`}>
                {lookbooks.length}
              </span>
            </button>

            {/* WEBSITE SECTION 6: CLIENT MESSAGES & CONCIERGE */}
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                activeTab === 'messages' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF5A1F]" />
                CLIENT MESSAGES
              </div>
              <div className="flex items-center gap-1.5">
                {clientMessages.filter(m => m.status === 'Unread').length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#E60023] animate-ping" />
                )}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  activeTab === 'messages'
                    ? 'bg-white text-black'
                    : clientMessages.filter(m => m.status === 'Unread').length > 0
                    ? 'bg-[#E60023] text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {clientMessages.length}
                </span>
              </div>
            </button>
          </nav>

        </div>

        <div className="pt-6 border-t border-gray-200 text-[11px] text-gray-500 font-medium">
          <p>SOLE CONTROL CENTER v1.0</p>
          <p className="text-[10px] text-green-600 font-bold mt-0.5">● Connected to Website Catalog ({products.length} Sneakers)</p>
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
                className="bg-gray-50 border border-gray-300 rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-black focus:outline-none focus:border-black w-48 sm:w-64"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black p-0.5"
                  title="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
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
            
            {/* 3 Stat Cards */}
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
                  <Package className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">{orders.length}</h2>
                <span className="text-xs text-[#FF5A1F] font-bold mt-1 inline-block">
                  {orders.filter(o => o.status === 'Processing').length} Pending Dispatch
                </span>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                  <span>Catalog Inventory</span>
                  <Flame className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <h2 className="font-display text-3xl font-black text-black mt-2">{products.length} Silhouettes</h2>
                <span className="text-xs text-black font-bold mt-1 inline-block">{totalInventoryStock} total pairs in vault</span>
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
                          ${bar.val * 15}k
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
                    <span className="text-green-600 font-bold text-[10px]">All {products.length} website sneakers loaded & active</span>
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
                {/* Status Filter */}
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
                  className="bg-[#FF5A1F] hover:bg-black text-white px-3 py-1.5 rounded-full font-bold text-xs transition-all shadow-sm flex items-center gap-1"
                  title="Generate a demo order to test management"
                >
                  <Plus className="w-3.5 h-3.5" /> DEMO ORDER
                </button>

                {orders.length > 0 && (
                  <button
                    onClick={handleClearAllOrders}
                    className="bg-gray-200 hover:bg-red-600 hover:text-white text-gray-700 px-3 py-1.5 rounded-full font-bold text-xs transition-all"
                    title="Clear all orders"
                  >
                    CLEAR ORDERS
                  </button>
                )}
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
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center">
                        <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="font-bold text-gray-600 text-sm">No Orders Found</p>
                        <p className="text-xs text-gray-400 mt-0.5">Place an order on the website or generate a demo order above.</p>
                        <button
                          onClick={handleCreateTestOrder}
                          className="mt-4 bg-black text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-[#FF5A1F] transition-all inline-flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" /> GENERATE DEMO ORDER NOW
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white transition-colors">
                        <td className="py-4 font-black text-black">{ord.id}</td>
                        <td className="py-4 text-gray-800 font-bold">{ord.user}</td>
                        <td className="py-4 text-black font-bold">{ord.sneaker}</td>
                        <td className="py-4 text-black font-black">${ord.price.toLocaleString()}</td>
                        <td className="py-4 text-gray-500 font-medium">{ord.date}</td>
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
                              className="bg-black hover:bg-[#FF5A1F] text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                            >
                              MARK DELIVERED
                            </button>
                          )}
                          {ord.status !== 'Processing' && (
                            <button
                              onClick={() => handleUpdateStatus(ord.id, 'Processing')}
                              className="bg-gray-100 hover:bg-gray-800 hover:text-white text-gray-700 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                            >
                              RESET PROCESSING
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-1.5 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-500 rounded-lg text-xs transition-all inline-flex items-center"
                            title="Delete order"
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
                <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider block">WEBSITE CATALOG VAULT</span>
                <h3 className="font-display font-black text-2xl text-black uppercase mt-0.5">SNEAKER CATALOG INVENTORY</h3>
                <p className="text-xs text-gray-500 font-medium">
                  Viewing all {products.length} website sneakers with complete detail photo galleries, retail vs resell specs, and size stock breakdown.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold bg-black text-white px-4 py-2 rounded-full">
                  TOTAL VAULT STOCK: {totalInventoryStock} PAIRS
                </span>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-[#FF5A1F] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" /> ADD SNEAKER
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['ALL', 'Hyped', 'Limited Edition', 'Running', 'Basketball', 'Lifestyle'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setInventoryCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    inventoryCategoryFilter === cat
                      ? 'bg-black text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
                  }`}
                >
                  {cat} ({cat === 'ALL' ? products.length : products.filter(p => p.category === cat).length})
                </button>
              ))}
            </div>

            {/* Sneaker Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-3xl p-5 border border-gray-200 space-y-4 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
                  
                  <div>
                    {/* Image Box */}
                    <div className="h-52 bg-gray-50 rounded-2xl overflow-hidden p-3 border border-gray-100 flex items-center justify-center relative group-hover:bg-[#FFF7E5] transition-colors">
                      <img src={prod.image} alt={prod.name} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      
                      {/* Badge Pills */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        {prod.isLimited && (
                          <span className="bg-black text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                            LIMITED
                          </span>
                        )}
                        {prod.isHyped && (
                          <span className="bg-[#FF5A1F] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                            🔥 HYPED
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="absolute top-3 right-3 bg-white/90 hover:bg-black hover:text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-gray-200 text-[10px] font-bold text-black flex items-center gap-1 shadow-sm transition-all z-10"
                        title="Edit Sneaker Photos & Specs"
                      >
                        <Edit3 className="w-3 h-3 text-[#FF5A1F]" /> Edit Photos ({prod.detailImages?.length || 1})
                      </button>
                    </div>

                    {/* Detail Photos Thumbnail Bar */}
                    {prod.detailImages && prod.detailImages.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none items-center">
                        {prod.detailImages.map((imgUrl, imgIdx) => (
                          <div 
                            key={imgIdx} 
                            onClick={() => {
                              setSelectedProductDetail(prod);
                              setActiveDetailImageIndex(imgIdx);
                            }}
                            className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0 cursor-pointer hover:border-black transition-all p-1"
                            title={`View Detail Photo ${imgIdx + 1}`}
                          >
                            <img src={imgUrl} alt={`${prod.name} detail ${imgIdx + 1}`} className="w-full h-full object-contain" />
                          </div>
                        ))}
                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="w-12 h-12 rounded-xl bg-black text-white hover:bg-[#FF5A1F] flex flex-col items-center justify-center shrink-0 transition-all text-[9px] font-bold p-1 shadow-sm"
                          title="Edit Photo Gallery"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>EDIT</span>
                        </button>
                      </div>
                    )}

                    {/* Sneaker Info */}
                    <div className="space-y-1.5 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#FF5A1F] uppercase tracking-wider">{prod.brand} • {prod.category}</span>
                        <span className="text-[10px] font-bold text-gray-500">★ {prod.rating} ({prod.numReviews})</span>
                      </div>

                      <h4 className="font-bold text-sm text-black line-clamp-1 group-hover:text-[#FF5A1F] transition-colors">{prod.name}</h4>
                      
                      <p className="text-xs text-gray-500 line-clamp-2 font-medium">{prod.description}</p>
                    </div>
                  </div>

                  {/* Footer Price & Details CTA */}
                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px]">RETAIL</span>
                        <span className="font-black text-black text-sm">${prod.price.toLocaleString()}</span>
                      </div>

                      {prod.resellEstimate && (
                        <div className="text-right">
                          <span className="text-gray-400 font-bold block text-[10px]">ESTIMATED RESELL</span>
                          <span className="font-black text-emerald-600 text-sm">${prod.resellEstimate.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="text-right">
                        <span className="text-gray-400 font-bold block text-[10px]">VAULT STOCK</span>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleStockChange(prod.id, -1)}
                            className="w-5 h-5 bg-gray-100 hover:bg-black hover:text-white rounded text-xs font-bold flex items-center justify-center transition-colors"
                            title="Decrease stock by 1"
                          >
                            -
                          </button>
                          <span className={`font-black text-xs min-w-[20px] text-center ${prod.stock < 15 ? 'text-red-600' : 'text-black'}`}>{prod.stock}</span>
                          <button
                            onClick={() => handleStockChange(prod.id, 1)}
                            className="w-5 h-5 bg-gray-100 hover:bg-black hover:text-white rounded text-xs font-bold flex items-center justify-center transition-colors"
                            title="Increase stock by 1"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedProductDetail(prod);
                          setActiveDetailImageIndex(0);
                        }}
                        className="flex-1 bg-gray-100 hover:bg-black hover:text-white text-black py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> VIEW SPECS
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="bg-black hover:bg-[#FF5A1F] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        title="Edit Sneaker & Photos"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> EDIT
                      </button>

                      <button
                        onClick={() => handleDeleteSneaker(prod.id)}
                        className="bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 p-2 rounded-xl text-xs font-bold transition-all"
                        title="Delete from Catalog"
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

        {/* WEBSITE SECTION 2: HYPER DROPS MANAGEMENT */}
        {activeTab === 'drops' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider block">RELEASE CALENDAR MANAGER</span>
                <h3 className="font-display font-black text-2xl text-black uppercase mt-0.5">HYPER DROPS MANAGEMENT</h3>
                <p className="text-xs text-gray-500 font-medium">Control drop launch dates, stock reservations, and Member Tier locks.</p>
              </div>

              <button
                onClick={() => alert("Hyper Drop Creator: Feature active. Custom drops can be added to the calendar.")}
                className="bg-[#FF5A1F] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" /> ADD HYPER DROP
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {drops.map((drop) => (
                <div key={drop.id} className="bg-white rounded-2xl p-5 border border-gray-200 space-y-3 shadow-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] font-bold px-2.5 py-0.5 rounded-full">{drop.status}</span>
                    <button
                      onClick={() => handleToggleDropTier(drop.id)}
                      className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full hover:bg-[#FF5A1F] transition-all"
                      title="Click to cycle member tier lock"
                    >
                      🔒 {drop.tier}
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-black">{drop.name}</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between"><span>Launch Date</span><span className="font-bold text-black">{drop.releaseDate}</span></div>
                    <div className="flex justify-between"><span>Retail Price</span><span className="font-bold text-black">${drop.price}</span></div>
                    <div className="flex justify-between"><span>Reserved Vault Stock</span><span className="font-bold text-black">{drop.stock} Pairs</span></div>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => handleToggleDropTier(drop.id)}
                      className="flex-1 bg-gray-100 hover:bg-black hover:text-white text-black py-2 rounded-xl text-xs font-bold transition-all"
                    >
                      CYCLE TIER
                    </button>
                    <button
                      onClick={() => handleDeleteDrop(drop.id)}
                      className="p-2 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 rounded-xl text-xs transition-all"
                      title="Delete drop"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEBSITE SECTION 3: RESELL PREDICTOR */}
        {activeTab === 'resell' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider block">NEURAL ENGINE ANALYTICS</span>
                <h3 className="font-display font-black text-2xl text-black uppercase mt-0.5">RESELL PREDICTOR AI ENGINE</h3>
                <p className="text-xs text-gray-500 font-medium">Algorithmic secondary market valuations, custom price trajectories, and growth forecasting.</p>
              </div>

              <button
                onClick={() => alert("AI Resell Engine Sync: Recalculated market trends for all catalog sneakers.")}
                className="bg-black hover:bg-[#FF5A1F] text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#FF5A1F]" /> RUN AI PRICING ENGINE
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase">Market Volatility</span>
                <h4 className="font-display text-2xl font-black text-black mt-1">+18.4%</h4>
                <span className="text-xs text-green-600 font-bold">Bullish Collector Demand</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase">Avg Resell Profit Margin</span>
                <h4 className="font-display text-2xl font-black text-black mt-1">+142.8%</h4>
                <span className="text-xs text-green-600 font-bold">↑ High Secondary ROI</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase">Top Valuation Gainer</span>
                <h4 className="font-display text-2xl font-black text-emerald-600 mt-1">$3,528.00</h4>
                <span className="text-xs text-gray-500 font-bold">Louis Vuitton x Nike AF1</span>
              </div>
            </div>

            {/* Sneaker Resell Market Table */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
              <h4 className="font-display font-black text-lg text-black uppercase">SNEAKER PRICE TRAJECTORY & GRAPH MANAGER</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-gray-500 uppercase font-bold border-b border-gray-200 pb-2">
                    <tr>
                      <th className="pb-3">Sneaker</th>
                      <th className="pb-3">Retail</th>
                      <th className="pb-3">AI Est Resell</th>
                      <th className="pb-3">ROI %</th>
                      <th className="pb-3">Live Price Graph Trend</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((p) => {
                      const retail = p.price || 150;
                      const resell = p.resellEstimate || retail * 1.5;
                      const profit = resell - retail;
                      const roi = (((resell - retail) / retail) * 100).toFixed(0);

                      const points = sneakerGraphs[p.id] || [
                        { label: 'Q1 25', price: Math.round(retail * 1.05) },
                        { label: 'Q2 25', price: Math.round(retail * 1.35) },
                        { label: 'Q3 25', price: Math.round(retail + profit * 0.45) },
                        { label: 'Q4 25', price: Math.round(retail + profit * 0.78) },
                        { label: 'NOW', price: resell },
                        { label: '2027', price: Math.round(resell * 1.25) }
                      ];

                      const min = Math.min(...points.map(pt => pt.price));
                      const max = Math.max(...points.map(pt => pt.price));
                      const range = max - min || 1;
                      const svgPts = points.map((pt, idx) => {
                        const x = 10 + (idx / (points.length - 1)) * 140;
                        const y = 35 - ((pt.price - min) / range) * 25;
                        return `${x},${y}`;
                      }).join(' ');

                      return (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3.5 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 border p-1" />
                            <div>
                              <span className="font-bold text-black block line-clamp-1">{p.name}</span>
                              <span className="text-[10px] text-gray-500 font-bold">{p.brand}</span>
                            </div>
                          </td>
                          <td className="py-3.5 text-gray-600 font-semibold">${p.price}</td>
                          <td className="py-3.5 font-black text-emerald-600">${(p.resellEstimate || p.price * 1.4).toLocaleString()}</td>
                          <td className="py-3.5 font-bold text-green-600">+{roi}%</td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2">
                              <svg className="w-36 h-10 overflow-visible">
                                <polyline fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={svgPts} />
                              </svg>
                              <span className="text-[9px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">6 Points</span>
                            </div>
                          </td>
                          <td className="py-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => handleOpenGraphEditor(p)}
                              className="bg-black hover:bg-[#FF5A1F] text-white px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all shadow-sm"
                              title="Edit Sneaker Price Graph"
                            >
                              📈 EDIT GRAPH
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="bg-gray-100 hover:bg-gray-800 hover:text-white px-2.5 py-1.5 rounded-lg font-bold text-[10px] transition-all"
                            >
                              ✏️ SPECS
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* WEBSITE SECTION 4: COMMUNITY ROOM */}
        {activeTab === 'community' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider block">COMMUNITY & STYLIST ROOM</span>
                <h3 className="font-display font-black text-2xl text-black uppercase mt-0.5">COMMUNITY MODERATION</h3>
                <p className="text-xs text-gray-500 font-medium">Moderate customer outfit uploads, likes, and top stylist badges.</p>
              </div>

              <button
                onClick={() => alert("Post Moderation: All community posts approved and active.")}
                className="bg-black hover:bg-[#FF5A1F] text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" /> MODERATE FEED
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-4 border border-gray-200 space-y-3 shadow-sm">
                  <div className="h-44 bg-gray-50 rounded-xl overflow-hidden p-2 border border-gray-100 flex items-center justify-center">
                    <img src={post.image} alt={post.sneaker} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-black">{post.author}</h4>
                      <span className="text-[10px] font-bold text-[#FF5A1F]">{post.tier}</span>
                    </div>
                    <span className="text-xs font-bold bg-gray-100 px-2.5 py-1 rounded-full text-black">♥ {post.likes}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium line-clamp-1">Featured: {post.sneaker}</p>
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => handleTogglePostFeatured(post.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        post.isFeatured ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-black hover:text-white'
                      }`}
                    >
                      {post.isFeatured ? '★ FEATURED' : 'FEATURE ON HOME'}
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 rounded-xl text-xs transition-all"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEBSITE SECTION 5: LOOKBOOK CAMPAIGNS */}
        {activeTab === 'lookbook' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider block">EDITORIAL & CAMPAIGN MANAGER</span>
                <h3 className="font-display font-black text-2xl text-black uppercase mt-0.5">LOOKBOOK CAMPAIGNS</h3>
                <p className="text-xs text-gray-500 font-medium">Manage seasonal lookbooks, outfit layer presets, and editorial campaigns.</p>
              </div>

              <button
                onClick={() => alert("Lookbook Creator: New lookbook campaign created.")}
                className="bg-[#FF5A1F] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" /> CREATE LOOKBOOK
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lookbooks.map((lb) => (
                <div key={lb.id} className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4 shadow-sm">
                  <div className="h-44 bg-gray-50 rounded-xl overflow-hidden p-2 border border-gray-100 flex items-center justify-center">
                    <img src={lb.cover} alt={lb.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#FF5A1F] uppercase">{lb.season}</span>
                    <h4 className="font-display font-black text-lg text-black uppercase mt-0.5">{lb.title}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1">{lb.totalOutfits} Editorial Outfits & Presets</p>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => handleToggleLookbookStatus(lb.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        lb.status === 'Published' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-black hover:text-white'
                      }`}
                    >
                      ● {lb.status}
                    </button>
                    <button
                      onClick={() => handleDeleteLookbook(lb.id)}
                      className="p-2 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 rounded-xl text-xs transition-all"
                      title="Delete lookbook"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEBSITE SECTION 6: CLIENT MESSAGES & CUSTOMER INQUIRIES */}
        {activeTab === 'messages' && (
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 space-y-6">
            
            {/* Header & Metrics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider block">LIVE WEBSITE INQUIRIES & MESSAGING</span>
                <h3 className="font-display font-black text-2xl text-black uppercase mt-0.5">CLIENT MESSAGES INBOX</h3>
                <p className="text-xs text-gray-500 font-medium">Real-time incoming customer inquiries from website `/contact` form & live messaging.</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" /> Live Website Listener Active
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">TOTAL INQUIRIES</span>
                <span className="font-display font-black text-2xl text-black">{clientMessages.length}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">UNREAD MESSAGES</span>
                <span className="font-display font-black text-2xl text-[#E60023]">{clientMessages.filter(m => m.status === 'Unread').length}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">REPLIED MESSAGES</span>
                <span className="font-display font-black text-2xl text-emerald-600">{clientMessages.filter(m => m.status === 'Replied').length}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">GRAIL SOURCING</span>
                <span className="font-display font-black text-2xl text-blue-600">{clientMessages.filter(m => m.subject.toLowerCase().includes('sourcing')).length}</span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
              <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {['ALL', 'UNREAD', 'SNEAKER GRAIL SOURCING', 'ORDER STATUS', 'REPLIED'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMessageFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    messageFilter === cat
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Message List Cards */}
            <div className="space-y-4">
              {clientMessages.filter(m => {
                if (messageFilter === 'UNREAD') return m.status === 'Unread';
                if (messageFilter === 'REPLIED') return m.status === 'Replied';
                if (messageFilter === 'SNEAKER GRAIL SOURCING') return m.subject.toLowerCase().includes('sourcing');
                if (messageFilter === 'ORDER STATUS') return m.subject.toLowerCase().includes('order');
                return true;
              }).length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-6">
                  <p className="text-gray-500 text-xs font-medium">No customer messages match filter "{messageFilter}".</p>
                </div>
              ) : (
                clientMessages
                  .filter(m => {
                    if (messageFilter === 'UNREAD') return m.status === 'Unread';
                    if (messageFilter === 'REPLIED') return m.status === 'Replied';
                    if (messageFilter === 'SNEAKER GRAIL SOURCING') return m.subject.toLowerCase().includes('sourcing');
                    if (messageFilter === 'ORDER STATUS') return m.subject.toLowerCase().includes('order');
                    return true;
                  })
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`bg-white rounded-2xl p-6 border transition-all shadow-sm ${
                        msg.status === 'Unread'
                          ? 'border-[#E60023] ring-1 ring-[#E60023]/30 bg-red-50/20'
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-sm shrink-0">
                            {msg.name.substring(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-display font-black text-base text-black uppercase">{msg.name}</h4>
                              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{msg.email}</span>
                            </div>
                            <span className="text-[11px] font-extrabold text-[#FF5A1F] uppercase">{msg.subject}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            msg.status === 'Unread'
                              ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse'
                              : msg.status === 'Replied'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            ● {msg.status}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium">
                            {new Date(msg.date).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Message Body */}
                      <div className="py-4 text-xs text-gray-800 font-medium leading-relaxed bg-gray-50 p-4 rounded-xl mt-4 border border-gray-100">
                        "{msg.message}"
                      </div>

                      {/* Existing Reply display if present */}
                      {msg.adminReply && (
                        <div className="mt-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                          <span className="font-bold text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Admin Concierge Reply Transmitted:
                          </span>
                          <p className="text-emerald-950 font-medium italic">"{msg.adminReply}"</p>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${msg.subject} - SOLE Concierge&body=Hello ${msg.name},\n\nThank you for reaching out to SOLE.`}
                            className="px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-[#FF5A1F] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm uppercase"
                          >
                            <Mail className="w-3.5 h-3.5" /> Direct Email Reply
                          </a>

                          <a
                            href={`https://wa.me/?text=Hello%20${encodeURIComponent(msg.name)},%20this%20is%20SOLE%20Concierge%20regarding%20your%20inquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-white hover:bg-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm uppercase"
                          >
                            WhatsApp Client
                          </a>

                          {msg.status === 'Unread' && (
                            <button
                              onClick={() => handleMarkMessageStatus(msg.id, 'Read')}
                              className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all uppercase"
                            >
                              Mark Read
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setReplyingMessageId(replyingMessageId === msg.id ? null : msg.id)}
                            className="px-3.5 py-1.5 rounded-full bg-gray-900 text-white hover:bg-[#FF5A1F] text-xs font-bold transition-all uppercase"
                          >
                            {replyingMessageId === msg.id ? 'Close Reply Form' : 'Quick Portal Reply'}
                          </button>

                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Inline Portal Reply Form */}
                      {replyingMessageId === msg.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-fadeIn">
                          <label className="text-xs font-bold text-black uppercase block">Type Response to {msg.name}:</label>
                          <textarea
                            rows={3}
                            placeholder="Type official concierge response..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full p-3 text-xs rounded-xl border border-gray-300 focus:border-black outline-none bg-gray-50 text-black font-medium"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => { setReplyingMessageId(null); setReplyText(''); }}
                              className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 text-xs font-bold hover:bg-gray-300 transition-all uppercase"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleMarkMessageStatus(msg.id, 'Replied', replyText)}
                              className="px-5 py-2 rounded-full bg-[#FF5A1F] text-white text-xs font-black hover:bg-black transition-all shadow-md uppercase flex items-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" /> TRANSMIT REPLY
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))
              )}
            </div>

          </div>
        )}



      </main>

      {/* ================= SNEAKER FULL DETAIL INSPECTION MODAL ================= */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div onClick={() => setSelectedProductDetail(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-gray-200 rounded-3xl shadow-2xl z-10 text-black overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-black text-[#FF5A1F] uppercase tracking-widest">{selectedProductDetail.brand} • {selectedProductDetail.category}</span>
                <h3 className="font-display font-black text-2xl text-black uppercase">{selectedProductDetail.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(selectedProductDetail)}
                  className="bg-black hover:bg-[#FF5A1F] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" /> EDIT PHOTOS & SPECS
                </button>
                <button 
                  onClick={() => setSelectedProductDetail(null)} 
                  className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Photo Gallery View */}
              <div className="md:col-span-6 space-y-4">
                <div className="h-72 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden p-4 flex items-center justify-center relative">
                  <img 
                    src={selectedProductDetail.detailImages[activeDetailImageIndex] || selectedProductDetail.image} 
                    alt={selectedProductDetail.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                    Photo {activeDetailImageIndex + 1} of {selectedProductDetail.detailImages.length}
                  </span>
                </div>

                {/* Thumbnails Row */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedProductDetail.detailImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveDetailImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden p-1 bg-gray-50 cursor-pointer transition-all shrink-0 ${
                        activeDetailImageIndex === idx ? 'border-[#FF5A1F] shadow-md' : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      <img src={imgUrl} alt={`${selectedProductDetail.name} view ${idx+1}`} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Detailed Specs Section */}
              <div className="md:col-span-6 space-y-6">
                
                {/* Price & Resell Highlights */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Retail Listing Price</span>
                    <span className="font-display font-black text-2xl text-black">${selectedProductDetail.price.toLocaleString()}</span>
                  </div>
                  {selectedProductDetail.resellEstimate && (
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase block">Estimated Resell Value</span>
                      <span className="font-display font-black text-2xl text-emerald-600">${selectedProductDetail.resellEstimate.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Description & Story */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-black uppercase tracking-wider block">Description & Story</span>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">{selectedProductDetail.description}</p>
                  {selectedProductDetail.story && (
                    <p className="text-xs text-gray-500 italic leading-relaxed pt-1">{selectedProductDetail.story}</p>
                  )}
                </div>

                {/* Technology Badges */}
                {selectedProductDetail.technology && selectedProductDetail.technology.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-black uppercase tracking-wider block">Key Technologies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProductDetail.technology.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-bold bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/30 px-2.5 py-1 rounded-full">
                          ⚡ {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Stock Breakdown */}
                {selectedProductDetail.sizes && selectedProductDetail.sizes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-black uppercase tracking-wider block">Size Vault Breakdown</span>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {selectedProductDetail.sizes.map((sz, sIdx) => (
                        <div key={sIdx} className="bg-gray-50 border border-gray-200 p-2 rounded-xl">
                          <span className="font-bold block text-black">{sz.size}</span>
                          <span className="text-[10px] text-gray-500 font-bold">{sz.stock} left</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Stock & Delete Actions */}
                <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500">Quick Stock:</span>
                    <button
                      onClick={() => handleStockChange(selectedProductDetail.id, 5)}
                      className="bg-gray-100 hover:bg-black hover:text-white text-black px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                    >
                      +5 Stock
                    </button>
                    <button
                      onClick={() => handleStockChange(selectedProductDetail.id, -1)}
                      className="bg-gray-100 hover:bg-black hover:text-white text-black px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                    >
                      -1 Stock
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteSneaker(selectedProductDetail.id)}
                    className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" /> DELETE FROM CATALOG
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

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
                    <option value="Hyped">Hyped</option>
                    <option value="Limited Edition">Limited Edition</option>
                    <option value="Running">Running</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Lifestyle">Lifestyle</option>
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
                  <label className="font-bold text-gray-700 block mb-1">Resell Estimate ($ USD)</label>
                  <input
                    type="number"
                    value={newSneaker.resellEstimate}
                    onChange={(e) => setNewSneaker({ ...newSneaker, resellEstimate: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Main Cover Photo URL</label>
                <input
                  type="text"
                  value={newSneaker.image}
                  onChange={(e) => setNewSneaker({ ...newSneaker, image: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Detail Photos URLs (comma separated)</label>
                <input
                  type="text"
                  value={newSneaker.detailImages}
                  onChange={(e) => setNewSneaker({ ...newSneaker, detailImages: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#FF5A1F] hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase"
                >
                  ADD TO CATALOG VAULT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT SNEAKER & PHOTO GALLERY MODAL ================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div onClick={() => setEditingProduct(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-xl max-h-[90vh] bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-black overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-black text-[#FF5A1F] uppercase tracking-widest">EDIT SNEAKER & PHOTO GALLERY</span>
                <h3 className="font-display font-black text-xl text-black uppercase mt-0.5">{editingProduct.name}</h3>
              </div>
              <button onClick={() => setEditingProduct(null)} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditSneaker} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Sneaker Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    value={editForm.brand}
                    onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  >
                    <option value="Hyped">Hyped</option>
                    <option value="Limited Edition">Limited Edition</option>
                    <option value="Running">Running</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    required
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Resell Value ($)</label>
                  <input
                    type="number"
                    value={editForm.resellEstimate}
                    onChange={(e) => setEditForm({ ...editForm, resellEstimate: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Vault Stock</label>
                  <input
                    type="number"
                    required
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Main Cover Photo URL</label>
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Detail Photos URLs (comma separated)</label>
                <textarea
                  rows={3}
                  value={editForm.detailImages}
                  onChange={(e) => setEditForm({ ...editForm, detailImages: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black font-mono text-[11px]"
                  placeholder="/images/photo1.jpg, /images/photo2.jpg"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editForm.isLimited}
                    onChange={(e) => setEditForm({ ...editForm, isLimited: e.target.checked })}
                    className="rounded border-gray-300 text-[#FF5A1F] focus:ring-[#FF5A1F]"
                  />
                  <span>Is Limited Edition</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editForm.isHyped}
                    onChange={(e) => setEditForm({ ...editForm, isHyped: e.target.checked })}
                    className="rounded border-gray-300 text-[#FF5A1F] focus:ring-[#FF5A1F]"
                  />
                  <span>Is Hyped Drop 🔥</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#FF5A1F] hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" /> SAVE CHANGES
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= EDIT RESELL PRICE TRAJECTORY GRAPH MODAL ================= */}
      {editingGraphProduct && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div onClick={() => setEditingGraphProduct(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-black overflow-y-auto space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img src={editingGraphProduct.image} alt={editingGraphProduct.name} className="w-12 h-12 object-contain rounded-xl bg-gray-50 border p-1" />
                <div>
                  <span className="text-xs font-black text-[#FF5A1F] uppercase tracking-widest">EDIT RESELL PRICE GRAPH</span>
                  <h3 className="font-display font-black text-xl text-black uppercase">{editingGraphProduct.name}</h3>
                </div>
              </div>
              <button onClick={() => setEditingGraphProduct(null)} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Chart Visualizer Preview */}
            <div className="bg-gray-950 text-white rounded-2xl p-5 border border-gray-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <TrendingUp className="w-4 h-4" /> LIVE GRAPH PREVIEW
                </span>
                <span className="text-gray-400 text-[11px]">
                  Retail: <strong className="text-white">${editingGraphProduct.price}</strong> | 
                  Current Resell: <strong className="text-emerald-400">${(editingGraphPoints.find(p => p.label.includes('CURRENT'))?.price || editingGraphProduct.price * 1.5).toLocaleString()}</strong>
                </span>
              </div>

              {/* Interactive SVG Sparkline Visualizer */}
              {(() => {
                const prices = editingGraphPoints.map(p => p.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                const range = maxPrice - minPrice || 1;
                const width = 500;
                const height = 140;
                const pad = 20;

                const pts = editingGraphPoints.map((pt, i) => {
                  const x = pad + (i / (editingGraphPoints.length - 1)) * (width - pad * 2);
                  const y = height - pad - ((pt.price - minPrice) / range) * (height - pad * 2);
                  return { x, y, pt };
                });

                const pathD = pts.reduce((acc, curr, i) => i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`, '');
                const areaD = `${pathD} L ${pts[pts.length - 1].x} ${height - pad} L ${pts[0].x} ${height - pad} Z`;

                return (
                  <div className="pt-2">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36 overflow-visible">
                      <defs>
                        <linearGradient id="adminGraphGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d={areaD} fill="url(#adminGraphGrad)" />
                      <path d={pathD} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      {pts.map((p, idx) => (
                        <g key={idx}>
                          <circle cx={p.x} cy={p.y} r="4" fill="#10B981" stroke="#000" strokeWidth="2" />
                          <text x={p.x} y={p.y - 8} textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold">
                            ${p.pt.price}
                          </text>
                          <text x={p.x} y={height - 4} textAnchor="middle" fill="#9CA3AF" fontSize="8" fontWeight="600">
                            {p.pt.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                );
              })()}
            </div>

            {/* Price Point Input Form */}
            <form onSubmit={handleSaveGraphTrajectory} className="space-y-4 text-xs">
              <span className="font-bold text-black uppercase tracking-wider block text-xs">
                Adjust Prices for Timeframe Nodes ($ USD)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {editingGraphPoints.map((pt, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 p-3 rounded-2xl space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block">{pt.label}</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2.5 text-gray-400 font-bold">$</span>
                      <input
                        type="number"
                        required
                        value={pt.price}
                        onChange={(e) => handleUpdateGraphPointPrice(idx, Number(e.target.value))}
                        className="w-full bg-white border border-gray-300 rounded-xl pl-6 pr-2 py-1.5 text-black font-bold text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    const retail = editingGraphProduct.price || 150;
                    const resell = editingGraphProduct.resellEstimate || retail * 1.5;
                    const profit = resell - retail;
                    setEditingGraphPoints([
                      { label: 'Q1 2025', price: Math.round(retail * 1.05) },
                      { label: 'Q2 2025', price: Math.round(retail * 1.35) },
                      { label: 'Q3 2025', price: Math.round(retail + profit * 0.45) },
                      { label: 'Q4 2025', price: Math.round(retail + profit * 0.78) },
                      { label: '2026 CURRENT', price: resell },
                      { label: '2027 FORECAST', price: Math.round(resell * 1.25) }
                    ]);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3.5 rounded-xl text-xs transition-all"
                >
                  RESET TREND
                </button>
                <button
                  type="button"
                  onClick={() => setEditingGraphProduct(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#FF5A1F] hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" /> SAVE GRAPH TRAJECTORY
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
