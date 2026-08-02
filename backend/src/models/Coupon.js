import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountPercent: { type: Number, required: true, min: 1, max: 100 },
  maxDiscountAmount: { type: Number },
  minOrderAmount: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
