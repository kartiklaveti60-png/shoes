import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io for live activity feeds & stock notifications
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
connectDB();

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/ai', aiRoutes);

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'SOLE — Premium Luxury Platform',
    timestamp: new Date(),
    version: '1.0.0'
  });
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Broadcast mock recent purchase activity periodically
  const purchaseInterval = setInterval(() => {
    socket.emit('recent_purchase', {
      user: 'Marcus K. (Tokyo)',
      sneaker: "Air Jordan 1 Game-Worn",
      timeAgo: 'Just now',
      price: '$560,000'
    });
  }, 25000);

  socket.on('disconnect', () => {
    clearInterval(purchaseInterval);
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
  ┌────────────────────────────────────────────────────────┐
  │                                                        │
  │     ⚡ SOLE — ULTRA LUXURY SNEAKER PLATFORM API         │
  │     🚀 Running at: http://localhost:${PORT}             │
  │     ✦ Environment: ${process.env.NODE_ENV || 'development'}                     │
  │                                                        │
  └────────────────────────────────────────────────────────┘
  `);
});
