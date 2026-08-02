import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  isVerifiedPurchase: { type: Boolean, default: true },
  comfortRating: { type: Number, default: 9 },
  fitRating: { type: String, enum: ['Runs Small', 'True to Size', 'Runs Large'], default: 'True to Size' },
  images: [{ type: String }],
  likesCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model('Review', reviewSchema);
