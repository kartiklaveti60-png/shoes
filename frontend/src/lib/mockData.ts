export interface ColorVariant {
  name: string;
  hex: string;
  images: string[];
}

export interface SizeStock {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Sneakers' | 'Jordan' | 'Running' | 'Basketball' | 'Lifestyle' | 'Limited Edition' | 'Accessories';
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  price: number;
  originalPrice?: number;
  resellEstimate?: number;
  isDrop?: boolean;
  dropDate?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isLimited?: boolean;
  description: string;
  story?: string;
  technology?: string[];
  materials?: string[];
  sustainabilityScore?: number;
  carbonFootprintKg?: number;
  comfortRating?: number;
  images: string[];
  images360?: string[];
  model3DUrl?: string;
  videoUrl?: string;
  colors: ColorVariant[];
  sizes: SizeStock[];
  rating: number;
  numReviews: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "prod_cyber_x",
    name: "SOLE CYBER-X 01 'NEO TOKYO'",
    slug: "sole-cyber-x-01-neo-tokyo",
    brand: "SOLE LABS",
    category: "Limited Edition",
    gender: "Unisex",
    price: 340,
    originalPrice: 420,
    resellEstimate: 650,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    description: "Architected with aerospace-grade carbon fiber plating, responsive nitrogen-infused foam, and custom translucent upper mesh.",
    story: "Inspired by the architectural geometry of Neo Tokyo at dusk. Built for collectors who demand absolute aesthetic and technical dominance.",
    technology: ["Nitrogen Foam Matrix", "Carbon Plate V4", "Cyber-Knit 360", "Adaptive Lacing System"],
    materials: ["Recycled Ocean Polymer (68%)", "Synthetic Micro-Suede", "Carbon Fiber Mesh"],
    sustainabilityScore: 94,
    carbonFootprintKg: 3.8,
    comfortRating: 9.8,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Stealth Obsidian", hex: "#111111", images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"] },
      { name: "Cyber Sunset", hex: "#FF5A1F", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"] },
      { name: "Lunar Platinum", hex: "#E5E5E5", images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8", stock: 4 },
      { size: "US 9", stock: 8 },
      { size: "US 10", stock: 12 },
      { size: "US 11", stock: 3 },
      { size: "US 12", stock: 6 }
    ],
    rating: 4.98,
    numReviews: 142
  },
  {
    _id: "prod_quantum_runner",
    name: "AEROSPACE QUANTUM RUNNER",
    slug: "aerospace-quantum-runner",
    brand: "QUANTUM",
    category: "Running",
    gender: "Men",
    price: 280,
    originalPrice: 310,
    resellEstimate: 350,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    description: "Ultra-lightweight marathon silhouette with kinetic energy dispersion cell technology.",
    story: "Crafted in collaboration with elite endurance athletes. Weighs under 180 grams with 85% energy return.",
    technology: ["Kinetic Energy Cell", "Hydro-Grip Outsole", "Zero-G Mesh"],
    materials: ["Bio-Based TPU", "Recycled Nylon"],
    sustainabilityScore: 91,
    carbonFootprintKg: 4.1,
    comfortRating: 9.7,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Solar Flare", hex: "#FF5A1F", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 9", stock: 10 },
      { size: "US 10", stock: 15 },
      { size: "US 11", stock: 5 }
    ],
    rating: 4.92,
    numReviews: 89
  },
  {
    _id: "prod_air_monolith",
    name: "JORDAN MONOLITH RETRO HIGH",
    slug: "jordan-monolith-retro-high",
    brand: "JORDAN",
    category: "Jordan",
    gender: "Unisex",
    price: 450,
    originalPrice: 450,
    resellEstimate: 890,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    description: "Iconic high-top reimagined in full-grain Italian calfskin with brushed titanium hardware.",
    story: "Only 1,000 individually numbered pairs created worldwide.",
    technology: ["Encapsulated Air Unit", "Hand-Burnished Italian Leather"],
    materials: ["Italian Calfskin", "Solid Titanium Eyelets"],
    sustainabilityScore: 88,
    carbonFootprintKg: 5.4,
    comfortRating: 9.5,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Monochrome Black", hex: "#000000", images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8.5", stock: 2 },
      { size: "US 10", stock: 4 },
      { size: "US 10.5", stock: 1 }
    ],
    rating: 4.99,
    numReviews: 210
  },
  {
    _id: "prod_apex_court",
    name: "SOLE APEX BASKETBALL PRO",
    slug: "sole-apex-basketball-pro",
    brand: "SOLE LABS",
    category: "Basketball",
    gender: "Men",
    price: 260,
    originalPrice: 290,
    resellEstimate: 310,
    isDrop: false,
    isFeatured: false,
    isTrending: true,
    description: "High-performance court shoe engineered for explosive lateral stability and maximum ankle lockdown.",
    story: "Designed for modern multi-positional athletes who move with speed and force.",
    technology: ["Dual-Density Zoom Unit", "Lockdown Fly-Cage"],
    materials: ["Engineered Jacquard Weave"],
    sustainabilityScore: 90,
    carbonFootprintKg: 4.5,
    comfortRating: 9.6,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Phantom White", hex: "#FFFFFF", images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 10", stock: 9 },
      { size: "US 11", stock: 14 }
    ],
    rating: 4.88,
    numReviews: 67
  }
];
