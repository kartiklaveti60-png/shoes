import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sole_sneaker_db');
    console.log(`[SOLE Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[SOLE Database] Local MongoDB connection note: ${error.message}`);
    console.log(`[SOLE Database] Running in fallback dynamic storage mode.`);
  }
};
