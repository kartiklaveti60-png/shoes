import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import { MOCK_PRODUCTS } from './controllers/productController.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing products...');
    await Product.deleteMany({});

    console.log('[Seed] Inserting mock products into MongoDB...');
    const inserted = await Product.insertMany(MOCK_PRODUCTS);
    console.log(`[Seed] Successfully inserted ${inserted.length} products!`);

    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
