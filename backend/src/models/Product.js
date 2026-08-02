import mongoose from 'mongoose';

const colorVariantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  images: [{ type: String }]
});

const sizeStockSchema = new mongoose.Schema({
  size: { type: String, required: true }, // e.g. "US 9", "EU 42"
  stock: { type: Number, required: true, default: 10 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, enum: ['Sneakers', 'Hyped', 'Running', 'Basketball', 'Lifestyle', 'Limited Edition', 'Accessories'], index: true },
  gender: { type: String, enum: ['Men', 'Women', 'Unisex', 'Kids'], default: 'Unisex' },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  resellEstimate: { type: Number },
  isDrop: { type: Boolean, default: false },
  dropDate: { type: Date },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isLimited: { type: Boolean, default: false },
  isHyped: { type: Boolean, default: true },
  hypeScore: { type: Number, default: 95 },
  liveViewers: { type: Number, default: 1200 },
  
  description: { type: String, required: true },
  story: { type: String },
  technology: [{ type: String }],
  materials: [{ type: String }],
  sustainabilityScore: { type: Number, default: 92 }, // 0-100 score
  carbonFootprintKg: { type: Number, default: 4.2 },
  comfortRating: { type: Number, default: 9.6 }, // out of 10
  
  images: [{ type: String, required: true }],
  images360: [{ type: String }],
  model3DUrl: { type: String }, // Path to .glb/.gltf model
  videoUrl: { type: String },
  
  colors: [colorVariantSchema],
  sizes: [sizeStockSchema],
  
  rating: { type: Number, default: 4.9 },
  numReviews: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

productSchema.index({ name: 'text', description: 'text', brand: 'text' });

export default mongoose.model('Product', productSchema);
