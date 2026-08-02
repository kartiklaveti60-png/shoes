import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  subtitle: { type: String },
  coverImage: { type: String, required: true },
  author: { type: String, default: 'SOLE Editorial' },
  readTime: { type: String, default: '5 min read' },
  category: { type: String, enum: ['Design', 'Culture', 'Technology', 'Lookbook'], default: 'Culture' },
  content: { type: String, required: true },
  featuredProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
