import mongoose from 'mongoose';

const dropSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  retailPrice: { type: Number, required: true },
  estimatedResell: { type: Number },
  editionCount: { type: Number, default: 500 },
  bannerImage: { type: String, required: true },
  story: { type: String, required: true },
  tierRequired: { type: String, enum: ['ALL', 'SHADOW', 'TITAN', 'LEGEND'], default: 'ALL' },
  subscribersCount: { type: Number, default: 0 },
  status: { type: String, enum: ['UPCOMING', 'LIVE', 'SOLD_OUT'], default: 'UPCOMING' }
}, {
  timestamps: true
});

export default mongoose.model('Drop', dropSchema);
