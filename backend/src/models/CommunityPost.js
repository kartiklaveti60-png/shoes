import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const communityPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String, required: true },
  images: [{ type: String, required: true }],
  taggedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
  comments: [commentSchema],
  category: { type: String, enum: ['Outfit', 'Sneaker Room', 'On-Foot', 'Custom'], default: 'Outfit' }
}, {
  timestamps: true
});

export default mongoose.model('CommunityPost', communityPostSchema);
