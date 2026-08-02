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
  category: 'Sneakers' | 'Hyped' | 'Running' | 'Basketball' | 'Lifestyle' | 'Limited Edition' | 'Accessories';
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  price: number;
  originalPrice?: number;
  resellEstimate?: number;
  isDrop?: boolean;
  dropDate?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isLimited?: boolean;
  isHyped?: boolean;
  hypeScore?: number;
  liveViewers?: number;
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
    _id: "prod_aj1_lost_found",
    name: 'Nike Air Jordan 1 High Chicago "Lost & Found"',
    slug: "nike-air-jordan-1-high-chicago-lost-and-found",
    brand: "JORDAN",
    category: "Hyped",
    gender: "Unisex",
    price: 300,
    originalPrice: 350,
    resellEstimate: 480,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    isHyped: true,
    hypeScore: 99,
    liveViewers: 16500,
    description: "Reimagined 1985 classic silhouette featuring cracked leather collars, vintage yellowed midsole, and authentic vintage receipts.",
    story: "Inspired by the thrill of discovering an original 1985 pair tucked away in a dusty mom-and-pop store stockroom. Features vintage packaging and invoice documentation.",
    technology: ["Encapsulated Nike Air Cushioning", "Cracked Vintage Leather Collar", "Aged Outsole Finish", "1985 OG Box Packaging"],
    materials: ["Varsity Red Calfskin", "Cracked Black Leather", "Sail Leather Upper", "Aged Rubber Cupsole"],
    sustainabilityScore: 90,
    carbonFootprintKg: 4.2,
    comfortRating: 9.8,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Varsity Red / Black / Sail", hex: "#CE1126", images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8.5", stock: 5 },
      { size: "US 9", stock: 8 },
      { size: "US 10", stock: 12 },
      { size: "US 11", stock: 6 }
    ],
    rating: 4.98,
    numReviews: 420
  },
  {
    _id: "prod_travis_scott_aj1",
    name: "Travis Scott x Air Jordan 1 Low 'Reverse Mocha'",
    slug: "travis-scott-air-jordan-1-low-reverse-mocha",
    brand: "JORDAN",
    category: "Hyped",
    gender: "Unisex",
    price: 1450,
    originalPrice: 1600,
    resellEstimate: 2100,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    isHyped: true,
    hypeScore: 97,
    liveViewers: 12900,
    description: "Iconic reverse oversized Swoosh silhouette crafted with premium Sail leather overlays and Mocha suede underlays.",
    story: "Cactus Jack's signature backward Swoosh design combined with subtle Red branding on the heel tab.",
    technology: ["Encapsulated Air Cushioning", "Cactus Jack Custom Insole", "Reverse Swoosh Architecture"],
    materials: ["Premium Suede & Nappa Leather", "Vintage Off-White Rubber Midsole"],
    sustainabilityScore: 89,
    carbonFootprintKg: 4.3,
    comfortRating: 9.7,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Sail / Dark Mocha / University Red", hex: "#7E5C41", images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 9", stock: 3 },
      { size: "US 10", stock: 5 },
      { size: "US 11", stock: 2 }
    ],
    rating: 4.97,
    numReviews: 312
  },
  {
    _id: "prod_nike_sb_dunk_orange_lobster",
    name: 'Nike SB Dunk Low Concepts "Orange Lobster"',
    slug: "nike-sb-dunk-low-concepts-orange-lobster",
    brand: "NIKE SB",
    category: "Hyped",
    gender: "Unisex",
    price: 500,
    originalPrice: 550,
    resellEstimate: 750,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    isHyped: true,
    hypeScore: 98,
    liveViewers: 14800,
    description: "Iconic Concepts lobster collaboration featuring speckled nubuck overlays, rubber band toe wrap, and plaid bib lining.",
    story: "Continuing the legendary Concepts Lobster SB Dunk series with vibrant Orange speckling, signature checkered tablecloth interior lining, and iconic toe band detail.",
    technology: ["Zoom Air Heel Unit", "Padded SB Dunk Collar", "Speckled Nubuck Leather", "Concepts Signature Rubber Band Wrap"],
    materials: ["Premium Orange Nubuck", "Plaid Textile Lining", "White Leather Tongue", "Black Rubber Outsole"],
    sustainabilityScore: 88,
    carbonFootprintKg: 4.4,
    comfortRating: 9.7,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Orange Frost / Electro Orange / White", hex: "#FF5A1F", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8", stock: 3 },
      { size: "US 9", stock: 6 },
      { size: "US 10", stock: 8 },
      { size: "US 11", stock: 4 }
    ],
    rating: 4.97,
    numReviews: 345
  },
  {
    _id: "prod_off_white_aj1_chicago",
    name: 'Jordan 1 Retro High Off-White "Chicago"',
    slug: "jordan-1-retro-high-off-white-chicago",
    brand: "JORDAN x OFF-WHITE",
    category: "Hyped",
    gender: "Unisex",
    price: 3865,
    originalPrice: 4200,
    resellEstimate: 5500,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    isHyped: true,
    hypeScore: 99,
    liveViewers: 19200,
    description: "Virgil Abloh's legendary deconstructed 'The Ten' Chicago High-Top with exposed foam, quotation branding, and signature red zip-tie.",
    story: "The holy grail of sneaker collaborations. Virgil Abloh deconstructed the original 1985 Air Jordan 1 Chicago silhouette with media quotation marks, oversized floating Swoosh, and industrial red tag.",
    technology: ["Deconstructed Floating Swoosh", "Exposed Collar Foam", "Virgil Abloh Red Zip-Tie Tag", "Encapsulated Air Unit"],
    materials: ["Full-Grain Leather", "Mesh & Suede Overlays", "Exposed Foam Tongue", "Custom Laces with 'SHOELACES' text"],
    sustainabilityScore: 91,
    carbonFootprintKg: 4.0,
    comfortRating: 9.9,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "White / Black / Varsity Red", hex: "#CE1126", images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8", stock: 2 },
      { size: "US 9", stock: 4 },
      { size: "US 10", stock: 5 },
      { size: "US 11", stock: 3 }
    ],
    rating: 4.99,
    numReviews: 512
  },
  {
    _id: "prod_lv_af1",
    name: "Louis Vuitton x Nike Air Force 1",
    slug: "louis-vuitton-x-nike-air-force-1",
    brand: "LOUIS VUITTON",
    category: "Limited Edition",
    gender: "Unisex",
    price: 352800,
    originalPrice: 380000,
    resellEstimate: 420000,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    isHyped: false,
    description: "Designed by Virgil Abloh for the Louis Vuitton Spring-Summer 2022 runway. Crafted in Fiesso d'Artico with signature Monogram calf leather.",
    story: "Handcrafted in Louis Vuitton's legendary shoe atelier in Fiesso d'Artico, Italy, combining Nike's classic Air Force 1 silhouette with LV's iconic Monogram motifs and Virgil Abloh's signature quotation marks.",
    technology: ["Encapsulated Nike Air Cushioning", "Fiesso d'Artico Hand-Stitched Construction", "Virgil Abloh Custom Lacing", "Louis Vuitton Damier Monogram"],
    materials: ["Calfskin Leather with Monogram Print", "Natural Rawhide Piping", "Rubber Cupsole", "Gold-Plated Metal Eyelets"],
    sustainabilityScore: 92,
    carbonFootprintKg: 4.1,
    comfortRating: 9.9,
    images: [
      "/images/louis-vuitton-nike-air-force-1.png",
      "/images/louis-vuitton-af1-pair.png",
      "/images/louis-vuitton-af1-trunk.png",
      "/images/louis-vuitton-af1-detail.png"
    ],
    colors: [
      { name: "Monogram Brown/Damier Azur", hex: "#7A4926", images: ["/images/louis-vuitton-nike-air-force-1.png", "/images/louis-vuitton-af1-pair.png", "/images/louis-vuitton-af1-trunk.png", "/images/louis-vuitton-af1-detail.png"] }
    ],
    sizes: [
      { size: "US 8", stock: 2 },
      { size: "US 9", stock: 4 },
      { size: "US 10", stock: 6 },
      { size: "US 11", stock: 3 },
      { size: "US 12", stock: 1 }
    ],
    rating: 4.99,
    numReviews: 218
  },
  {
    _id: "prod_cyber_x",
    name: "Air Jordan 1 Game-Worn",
    slug: "air-jordan-1-game-worn",
    brand: "JORDAN",
    category: "Limited Edition",
    gender: "Unisex",
    price: 560000,
    originalPrice: 600000,
    resellEstimate: 650000,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    isHyped: false,
    description: "Original 1985 game-worn Air Jordan 1 'Chicago' colorway, autographed by Michael Jordan with vintage ink signature on the collar.",
    story: "Worn by Michael Jordan during his legendary 1985 rookie season with the Chicago Bulls. Features authentic game wear, vintage aged cupsole, original factory laces, and a certified hand-signed collar signature.",
    technology: ["Original Air Unit (1985)", "Hand-Signed Collar Signature", "Chicago Bulls Game-Worn Specs", "MEARS & PSA/DNA Certified"],
    materials: ["Full-Grain Aniline Leather", "Aged Rubber Cupsole", "Vintage Cotton Laces", "Autographed Permanent Marker Ink"],
    sustainabilityScore: 94,
    carbonFootprintKg: 3.8,
    comfortRating: 9.8,
    images: [
      "/images/air-jordan-1-game-worn.jpg",
      "/images/air-jordan-1-side.png",
      "/images/air-jordan-1-signature.png",
      "/images/air-jordan-1-top.png"
    ],
    colors: [
      { name: "Chicago Red/White/Black", hex: "#CE1126", images: ["/images/air-jordan-1-game-worn.jpg", "/images/air-jordan-1-side.png", "/images/air-jordan-1-signature.png", "/images/air-jordan-1-top.png"] }
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
    _id: "prod_nike_pegasus_42",
    name: "Nike Pegasus 42",
    slug: "nike-pegasus-42",
    brand: "NIKE",
    category: "Running",
    gender: "Unisex",
    price: 145,
    originalPrice: 160,
    resellEstimate: 180,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isHyped: false,
    description: "Responsive daily trainer featuring dual ReactX foam and forefoot Air Zoom unit for smooth transition.",
    story: "The workhorse with wings returns. Four decades of running evolution upgraded with high-energy ReactX foam.",
    technology: ["Dual ReactX Foam Cushioning", "Forefoot Air Zoom Cell", "Engineered Flymesh Upper"],
    materials: ["Recycled Flymesh", "Blown Rubber Outsole"],
    sustainabilityScore: 93,
    carbonFootprintKg: 3.6,
    comfortRating: 9.6,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Volt / White / Black", hex: "#CEFF00", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8", stock: 12 },
      { size: "US 9", stock: 20 },
      { size: "US 10", stock: 25 },
      { size: "US 11", stock: 15 }
    ],
    rating: 4.89,
    numReviews: 210
  },
  {
    _id: "prod_adidas_adizero_evo_sl",
    name: "Adidas Adizero Evo SL",
    slug: "adidas-adizero-evo-sl",
    brand: "ADIDAS",
    category: "Running",
    gender: "Unisex",
    price: 150,
    originalPrice: 170,
    resellEstimate: 210,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isHyped: false,
    description: "Superlight tempo trainer infused with Lightstrike Pro foam for effortless high-speed miles.",
    story: "Inspired by world-record breaking Adizero race day technology, distilled into an ultra-fast daily trainer.",
    technology: ["Lightstrike Pro Foam", "Continental™ Rubber Traction", "Superlight Mesh Upper"],
    materials: ["Engineered Monomesh", "Continental Rubber"],
    sustainabilityScore: 92,
    carbonFootprintKg: 3.5,
    comfortRating: 9.7,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Core Black / Cloud White / Lucrid Lemon", hex: "#000000", images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8.5", stock: 10 },
      { size: "US 9.5", stock: 18 },
      { size: "US 10.5", stock: 22 },
      { size: "US 11.5", stock: 14 }
    ],
    rating: 4.91,
    numReviews: 184
  },
  {
    _id: "prod_nb_fresh_foam_880_v15",
    name: "New Balance Fresh Foam 880 v15",
    slug: "new-balance-fresh-foam-880-v15",
    brand: "NEW BALANCE",
    category: "Running",
    gender: "Unisex",
    price: 149,
    originalPrice: 165,
    resellEstimate: 190,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isHyped: false,
    description: "Plush dual-density Fresh Foam X midsole delivering cloud-like comfort and long-distance durability.",
    story: "The premier neutral trainer designed for high-mileage comfort, features precision-engineered mesh and soft heel transition.",
    technology: ["Fresh Foam X Midsole", "NDurance Outsole Rubber", "Hypoknit Upper"],
    materials: ["Hypoknit Mesh", "NDurance Rubber"],
    sustainabilityScore: 94,
    carbonFootprintKg: 3.8,
    comfortRating: 9.8,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Shadow Grey / Cobalt Blue", hex: "#4A5568", images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8", stock: 8 },
      { size: "US 9", stock: 15 },
      { size: "US 10", stock: 20 },
      { size: "US 11", stock: 12 }
    ],
    rating: 4.93,
    numReviews: 265
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
    isHyped: false,
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
    category: "Lifestyle",
    gender: "Unisex",
    price: 450,
    originalPrice: 450,
    resellEstimate: 890,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
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
    isHyped: false,
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
  },
  {
    _id: "prod_off_white_dunk",
    name: "Off-White x Nike Dunk Low 'Dear Summer'",
    slug: "off-white-nike-dunk-low-dear-summer",
    brand: "OFF-WHITE",
    category: "Lifestyle",
    gender: "Unisex",
    price: 680,
    originalPrice: 750,
    resellEstimate: 980,
    isDrop: true,
    isFeatured: true,
    isTrending: true,
    isLimited: true,
    isHyped: false,
    description: "Limited Lot release featuring Virgil Abloh's signature secondary lacing system, exposed foam tongue, and zip-tie tag.",
    story: "Part of the landmark 50-pair 'Dear Summer' collection showcasing unique color combinations and materials.",
    technology: ["Secondary Flywire Lacing System", "Virgil Abloh Signature Zip-Tie"],
    materials: ["Canvas and Leather Upper", "Exposed Foam Tongue"],
    sustainabilityScore: 87,
    carbonFootprintKg: 4.6,
    comfortRating: 9.4,
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Sail / Neutral Grey", hex: "#E5E5E0", images: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8", stock: 4 },
      { size: "US 10", stock: 7 },
      { size: "US 11", stock: 3 }
    ],
    rating: 4.95,
    numReviews: 185
  }
];
