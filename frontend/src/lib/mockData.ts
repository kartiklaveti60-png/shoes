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
      "/images/aj1-chicago-lost-found.jpg",
      "/images/aj1-lost-found-side.png",
      "/images/aj1-lost-found-heel.png",
      "/images/aj1-lost-found-outsole.png",
      "/images/aj1-lost-found-box.png"
    ],
    colors: [
      { 
        name: "Varsity Red / Black / Sail", 
        hex: "#CE1126", 
        images: [
          "/images/aj1-chicago-lost-found.jpg",
          "/images/aj1-lost-found-side.png",
          "/images/aj1-lost-found-heel.png",
          "/images/aj1-lost-found-outsole.png",
          "/images/aj1-lost-found-box.png"
        ] 
      }
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
      "/images/travis-scott-reverse-mocha.png",
      "/images/travis-scott-reverse-mocha-side.png",
      "/images/travis-scott-reverse-mocha-top.png",
      "/images/travis-scott-reverse-mocha-heel.png"
    ],
    colors: [
      { 
        name: "Sail / Dark Mocha / University Red", 
        hex: "#7E5C41", 
        images: [
          "/images/travis-scott-reverse-mocha.png",
          "/images/travis-scott-reverse-mocha-side.png",
          "/images/travis-scott-reverse-mocha-top.png",
          "/images/travis-scott-reverse-mocha-heel.png"
        ] 
      }
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
      "/images/nike-sb-dunk-orange-lobster.jpg",
      "/images/orange-lobster-toe-band.jpg",
      "/images/orange-lobster-top.jpg",
      "/images/orange-lobster-heel.jpg",
      "/images/orange-lobster-art.jpg"
    ],
    colors: [
      { 
        name: "Orange Frost / Electro Orange / White", 
        hex: "#FF5A1F", 
        images: [
          "/images/nike-sb-dunk-orange-lobster.jpg",
          "/images/orange-lobster-toe-band.jpg",
          "/images/orange-lobster-top.jpg",
          "/images/orange-lobster-heel.jpg",
          "/images/orange-lobster-art.jpg"
        ] 
      }
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
      "/images/off-white-jordan-1-chicago.jpg",
      "/images/off-white-jordan-1-chicago-side.jpg",
      "/images/off-white-jordan-1-chicago-medial.jpg",
      "/images/off-white-jordan-1-chicago-pair.jpg",
      "/images/off-white-jordan-1-chicago-heel.jpg"
    ],
    colors: [
      { 
        name: "White / Black / Varsity Red", 
        hex: "#CE1126", 
        images: [
          "/images/off-white-jordan-1-chicago.jpg",
          "/images/off-white-jordan-1-chicago-side.jpg",
          "/images/off-white-jordan-1-chicago-medial.jpg",
          "/images/off-white-jordan-1-chicago-pair.jpg",
          "/images/off-white-jordan-1-chicago-heel.jpg"
        ] 
      }
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
      "/images/nike-pegasus-42.png",
      "/images/nike-pegasus-42-pair.png",
      "/images/nike-pegasus-42-outsole.png",
      "/images/nike-pegasus-42-detail.jpg",
      "/images/nike-pegasus-42-top.jpg"
    ],
    colors: [
      { 
        name: "Black / White / Air Zoom", 
        hex: "#111111", 
        images: [
          "/images/nike-pegasus-42.png",
          "/images/nike-pegasus-42-pair.png",
          "/images/nike-pegasus-42-outsole.png",
          "/images/nike-pegasus-42-detail.jpg",
          "/images/nike-pegasus-42-top.jpg"
        ] 
      }
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
      "/images/adidas-adizero-evo-sl.jpg",
      "/images/adidas-adizero-evo-sl-pair.jpg",
      "/images/adidas-adizero-evo-sl-outsole.jpg",
      "/images/adidas-adizero-evo-sl-onfoot.jpg",
      "/images/adidas-adizero-evo-sl-side.jpg"
    ],
    colors: [
      { 
        name: "Cloud White / Core Black / Lightstrike", 
        hex: "#FFFFFF", 
        images: [
          "/images/adidas-adizero-evo-sl.jpg",
          "/images/adidas-adizero-evo-sl-pair.jpg",
          "/images/adidas-adizero-evo-sl-outsole.jpg",
          "/images/adidas-adizero-evo-sl-onfoot.jpg",
          "/images/adidas-adizero-evo-sl-side.jpg"
        ] 
      }
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
      "/images/new-balance-fresh-foam-880-v15.jpg",
      "/images/new-balance-fresh-foam-880-v15-pair.jpg",
      "/images/new-balance-fresh-foam-880-v15-front.jpg",
      "/images/new-balance-fresh-foam-880-v15-heel.jpg",
      "/images/new-balance-fresh-foam-880-v15-quarter.jpg"
    ],
    colors: [
      { 
        name: "Black / Silver / Fresh Foam X", 
        hex: "#111111", 
        images: [
          "/images/new-balance-fresh-foam-880-v15.jpg",
          "/images/new-balance-fresh-foam-880-v15-pair.jpg",
          "/images/new-balance-fresh-foam-880-v15-front.jpg",
          "/images/new-balance-fresh-foam-880-v15-heel.jpg",
          "/images/new-balance-fresh-foam-880-v15-quarter.jpg"
        ] 
      }
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
    _id: "prod_nike_lebron_23",
    name: "NIKE LEBRON XXIII",
    slug: "nike-lebron-xxiii",
    brand: "NIKE",
    category: "Basketball",
    gender: "Men",
    price: 210,
    originalPrice: 230,
    resellEstimate: 260,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
    hypeScore: 98,
    liveViewers: 8420,
    description: "LeBron James' 23rd signature court silhouette engineered with full-length Zoom Strobel, heel Max Air cushion, and royal crown molded stability armor.",
    story: "Marking 23 signature iterations of dominance. Designed for unstoppable power, speed, and court command.",
    technology: ["Full-Length Zoom Strobel", "Heel Max Air Unit", "Crown-Fit TPU Armor", "Data-Informed Multi-Directional Traction"],
    materials: ["Battleknit 3.0", "Molded Crown TPU Collar", "High-Density Foam Midsole"],
    sustainabilityScore: 91,
    carbonFootprintKg: 4.8,
    comfortRating: 9.9,
    images: [
      "/images/nike-lebron-xxiii.jpg",
      "/images/nike-lebron-xxiii-pair.jpg",
      "/images/nike-lebron-xxiii-layout.jpg",
      "/images/nike-lebron-xxiii-heel.jpg",
      "/images/nike-lebron-xxiii-outsole.jpg"
    ],
    colors: [
      { 
        name: "Purple / Black Metallic Crown", 
        hex: "#7E22CE", 
        images: [
          "/images/nike-lebron-xxiii.jpg",
          "/images/nike-lebron-xxiii-pair.jpg",
          "/images/nike-lebron-xxiii-layout.jpg",
          "/images/nike-lebron-xxiii-heel.jpg",
          "/images/nike-lebron-xxiii-outsole.jpg"
        ] 
      }
    ],
    sizes: [
      { size: "US 9", stock: 12 },
      { size: "US 10", stock: 18 },
      { size: "US 11", stock: 14 },
      { size: "US 12", stock: 8 }
    ],
    rating: 4.96,
    numReviews: 312
  },
  {
    _id: "prod_adidas_ae_2",
    name: "ADIDAS Anthony Edwards 2",
    slug: "adidas-anthony-edwards-2",
    brand: "ADIDAS",
    category: "Basketball",
    gender: "Men",
    price: 130,
    originalPrice: 150,
    resellEstimate: 180,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
    hypeScore: 97,
    liveViewers: 6150,
    description: "Anthony Edwards' 2nd signature court shoe featuring TPU honeycomb stability wings, Lightstrike Pro foam, and explosive first-step response.",
    story: "Built for Ant-Man's rim-rocking athleticism and unmatched vertical launch speed.",
    technology: ["Lightstrike Pro Foam", "TPU Honeycomb Support Wing", "Generative Herringbone Traction"],
    materials: ["Honeycomb Perforated Upper", "TPU Lateral Cage", "Rubber Outsole"],
    sustainabilityScore: 89,
    carbonFootprintKg: 4.2,
    comfortRating: 9.7,
    images: [
      "/images/adidas-anthony-edwards-2.jpg",
      "/images/adidas-anthony-edwards-2-pair.jpg",
      "/images/adidas-anthony-edwards-2-side.jpg",
      "/images/adidas-anthony-edwards-2-heel.jpg",
      "/images/adidas-anthony-edwards-2-top.jpg"
    ],
    colors: [
      { 
        name: "With Love Red / Black / Coral", 
        hex: "#F97316", 
        images: [
          "/images/adidas-anthony-edwards-2.jpg",
          "/images/adidas-anthony-edwards-2-pair.jpg",
          "/images/adidas-anthony-edwards-2-side.jpg",
          "/images/adidas-anthony-edwards-2-heel.jpg",
          "/images/adidas-anthony-edwards-2-top.jpg"
        ] 
      }
    ],
    sizes: [
      { size: "US 8.5", stock: 10 },
      { size: "US 9.5", stock: 15 },
      { size: "US 10", stock: 20 },
      { size: "US 11", stock: 9 }
    ],
    rating: 4.94,
    numReviews: 240
  },
  {
    _id: "prod_ua_curry_13_ap",
    name: "UNDER ARMOUR CURRY 13 AP",
    slug: "under-armour-curry-13-ap",
    brand: "UNDER ARMOUR",
    category: "Basketball",
    gender: "Unisex",
    price: 140,
    originalPrice: 160,
    resellEstimate: 190,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
    hypeScore: 96,
    liveViewers: 5200,
    description: "Stephen Curry's 13th All-Pro edition built with rubberless UA Flow technology for unmatched court grip and quick-release shot mechanics.",
    story: "Designed for the greatest shooter in basketball history. Maximum court feel, zero distraction.",
    technology: ["UA Flow Rubberless Cushioning", "Warp 2.0 Upper Fit", "TPE-Blend Midfoot Shank"],
    materials: ["UA Warp Breathable Knit", "Molded Midfoot Strap", "UA Flow Outsole"],
    sustainabilityScore: 92,
    carbonFootprintKg: 4.0,
    comfortRating: 9.8,
    images: [
      "/images/under-armour-curry-13-ap.jpg",
      "/images/under-armour-curry-13-ap-pair.jpg",
      "/images/under-armour-curry-13-ap-top.jpg",
      "/images/under-armour-curry-13-ap-outsole.jpg",
      "/images/under-armour-curry-13-ap-detail.jpg"
    ],
    colors: [
      { 
        name: "Nebula Purple / Cosmic Violet", 
        hex: "#8B5CF6", 
        images: [
          "/images/under-armour-curry-13-ap.jpg",
          "/images/under-armour-curry-13-ap-pair.jpg",
          "/images/under-armour-curry-13-ap-top.jpg",
          "/images/under-armour-curry-13-ap-outsole.jpg",
          "/images/under-armour-curry-13-ap-detail.jpg"
        ] 
      }
    ],
    sizes: [
      { size: "US 8", stock: 8 },
      { size: "US 9", stock: 14 },
      { size: "US 10", stock: 16 },
      { size: "US 11", stock: 10 }
    ],
    rating: 4.95,
    numReviews: 198
  },
  {
    _id: "prod_nike_af01",
    name: "NIKE AIR FORCE 01",
    slug: "nike-air-force-01",
    brand: "NIKE",
    category: "Lifestyle",
    gender: "Unisex",
    price: 115,
    originalPrice: 115,
    resellEstimate: 130,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
    description: "The radiance lives on in the NIKE AIR FORCE 01, the basketball classic featuring crisp leather, bold accent lines, and timeless style.",
    story: "Debuting in 1982, the Air Force 01 was Nike's first basketball shoe to house Nike Air, revolutionizing the game while rapidly becoming a global lifestyle icon.",
    technology: ["Encapsulated Nike Air Cushioning", "Perforated Toe Box", "Non-Marking Rubber Sole"],
    materials: ["Full-Grain Leather Upper", "Padded Low-Cut Collar", "Durable Rubber Cupsole"],
    sustainabilityScore: 86,
    carbonFootprintKg: 4.1,
    comfortRating: 9.4,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Triple White", hex: "#FFFFFF", images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8", stock: 15 },
      { size: "US 9", stock: 20 },
      { size: "US 10", stock: 18 },
      { size: "US 11", stock: 10 }
    ],
    rating: 4.86,
    numReviews: 342
  },
  {
    _id: "prod_nike_dunk_panda",
    name: "Nike Dunk Low Retro White Black Panda",
    slug: "nike-dunk-low-retro-white-black-panda",
    brand: "NIKE",
    category: "Lifestyle",
    gender: "Unisex",
    price: 115,
    originalPrice: 115,
    resellEstimate: 140,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
    hypeScore: 94,
    description: "Created for the hardwood but taken to the streets, the Nike Dunk Low Retro White Black Panda delivers modern comfort with iconic monochrome color-blocking.",
    story: "Originally a college basketball shoe, the Dunk Low became a streetwear staple embraced by skateboarders and sneaker fans across generations.",
    technology: ["Lightweight Foam Midsole", "Padded Low-Cut Collar", "Pivot Circle Traction"],
    materials: ["Smooth Leather Upper", "Soft Mesh Tongue", "Rubber Cupsole"],
    sustainabilityScore: 84,
    carbonFootprintKg: 3.9,
    comfortRating: 9.2,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "White / Black (Panda)", hex: "#000000", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 8.5", stock: 12 },
      { size: "US 9.5", stock: 25 },
      { size: "US 10.5", stock: 22 },
      { size: "US 11.5", stock: 8 }
    ],
    rating: 4.91,
    numReviews: 518
  },
  {
    _id: "prod_adidas_samba",
    name: "adidas SAMBA",
    slug: "adidas-samba",
    brand: "ADIDAS",
    category: "Lifestyle",
    gender: "Unisex",
    price: 120,
    originalPrice: 120,
    resellEstimate: 135,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
    hypeScore: 90,
    description: "Born on the indoor football pitch, the adidas SAMBA is an undisputed lifestyle icon featuring a soft leather upper, classic suede T-toe, and signature gum sole.",
    story: "First introduced in 1949 to give footballers traction on icy pitches, the Samba transitioned seamlessly into casual culture and skate parks worldwide.",
    technology: ["Gum Rubber Outsole", "Reinforced Suede T-Toe", "Ortholite Sockliner"],
    materials: ["Full-Grain Leather Upper", "Suede T-Toe Overlay", "Gum Rubber Sole"],
    sustainabilityScore: 88,
    carbonFootprintKg: 3.7,
    comfortRating: 9.3,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80&w=1200"
    ],
    colors: [
      { name: "Cloud White / Core Black / Gum", hex: "#FFFFFF", images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200"] }
    ],
    sizes: [
      { size: "US 7.5", stock: 10 },
      { size: "US 8.5", stock: 18 },
      { size: "US 9.5", stock: 15 },
      { size: "US 10.5", stock: 14 }
    ],
    rating: 4.90,
    numReviews: 435
  },
  {
    _id: "prod_adidas_all_star",
    name: "adidas All Star",
    slug: "adidas-all-star",
    brand: "ADIDAS",
    category: "Lifestyle",
    gender: "Unisex",
    price: 130,
    originalPrice: 130,
    resellEstimate: 150,
    isDrop: false,
    isFeatured: true,
    isTrending: true,
    isLimited: false,
    isHyped: false,
    hypeScore: 91,
    description: "A timeless street style icon, the adidas All Star features a premium leather upper, clean low-profile design, and signature classic three-stripes aesthetic.",
    story: "Born for daily versatility, the adidas All Star carries court heritage into modern urban street culture with supreme comfort and durable craftsmanship.",
    technology: ["Ortholite Sockliner", "Padded Collar", "High-Traction Rubber Cupsole"],
    materials: ["Full-Grain Leather Upper", "Soft Textile Lining", "Rubber Outsole"],
    sustainabilityScore: 87,
    carbonFootprintKg: 3.8,
    comfortRating: 9.4,
    images: [
      "/images/adidas-all-star.png"
    ],
    colors: [
      { name: "Cloud White / Core Black", hex: "#FFFFFF", images: ["/images/adidas-all-star.png"] }
    ],
    sizes: [
      { size: "US 8", stock: 12 },
      { size: "US 9", stock: 18 },
      { size: "US 10", stock: 20 },
      { size: "US 11", stock: 14 }
    ],
    rating: 4.89,
    numReviews: 284
  }
];
