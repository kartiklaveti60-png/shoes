import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true, default: 'USA' },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['customer', 'admin', 'vip'], default: 'customer' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300' },
  bio: { type: String, default: 'Sneaker collector & fashion enthusiast.' },
  addresses: [addressSchema],
  
  // Gamification & Loyalty
  xp: { type: Number, default: 250 },
  tier: { type: String, enum: ['GHOST', 'SHADOW', 'TITAN', 'LEGEND'], default: 'GHOST' },
  coins: { type: Number, default: 50 },
  badges: [{ type: String }],
  shoeSize: { type: String, default: 'US 10' },
  
  // Taste Graph & Preferences
  favoriteBrands: [{ type: String }],
  stylePreference: { type: String, default: 'Futuristic Techwear' },
  
  // Social
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
