# ⚡ SOLE — Next-Generation Luxury Sneaker Platform

> *Wear the Future.*

A state-of-the-art luxury sneaker e-commerce experience inspired by Apple, Awwwards winners, Tesla, Arc Browser, Framer, Nothing, and high-end streetwear houses. Outperforming standard e-commerce with 3D interactive sneaker viewers, AI outfit recommendations, 3D foot spatial scanner, resell value analytics, and real-time drop countdowns.

---

## 🛠 Tech Stack

### Frontend (`/frontend`)
- **Core**: React 18, Vite, TypeScript
- **Styling & UI**: TailwindCSS, Glassmorphism design tokens, Custom Magnetic Cursor
- **Animations & 3D**: Three.js, React Three Fiber (R3F), @react-three/drei, GSAP, Framer Motion, Lenis Smooth Scroll
- **State Management**: Zustand
- **Icons**: Lucide-React

### Backend (`/backend`)
- **Core**: Node.js, Express.js (ES Module Architecture)
- **Database**: MongoDB, Mongoose ORM
- **Security**: JWT Authentication, Bcrypt, Helmet, CORS, Rate Limiting
- **Real-Time**: Socket.io for live activity streams and drop notifications
- **Payments**: Stripe & Razorpay webhook integrations

### Admin Dashboard (`/admin`)
- Separate React + Vite dashboard for real-time inventory management, sales tracking, and order fulfillment.

---

## 🚀 Quick Start Instructions

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

### 2. Run Development Mode
```bash
# Terminal 1: Backend Server (Port 5000)
cd backend
npm run dev

# Terminal 2: Frontend App (Port 5173)
cd frontend
npm run dev

# Terminal 3: Admin Dashboard (Port 5174)
cd admin
npm run dev
```

---

## 🌟 Key Features

1. **Interactive 3D Sneaker Canvas** (React Three Fiber)
   - Real-time 3D lighting, material shaders, nitrogen midsole wobbles, carbon fiber outsole.
2. **AI Outfit Generator & AI Stylist Chatbot**
   - Generates full clothing layer recommendations based on sneaker choice, weather conditions, and occasion.
3. **AI 3D Foot Spatial Scanner**
   - Precise length and width measurement sliders with 99.2% sizing fit confidence.
4. **Hyper Drops Release Calendar**
   - Live countdown timer, VIP Tier locks (GHOST, SHADOW, TITAN, LEGEND), and instant drop notifications.
5. **On-Foot Community Room**
   - Outfit gallery, likes, comments, user XP rewards, and Top Stylist leaderboard.
6. **Express Fast Checkout**
   - 256-bit encrypted checkout with Stripe & Razorpay support, promo code engine (`FUTURE15`), and celebratory confetti.

---

## 📊 API Routes Documentation

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/auth/register` | `POST` | Register new customer |
| `/api/v1/auth/login` | `POST` | Login user & return JWT token |
| `/api/v1/products` | `GET` | Get all products with filters & sorting |
| `/api/v1/products/:slug` | `GET` | Get product details by slug |
| `/api/v1/ai/outfit` | `POST` | AI Neural Outfit Generator |
| `/api/v1/ai/stylist-chat` | `POST` | AI Stylist Chatbot assistant |
| `/api/v1/ai/scan-foot` | `POST` | 3D Foot Scanner calculation |
| `/api/v1/health` | `GET` | Server health check |

---

## 🐳 Docker Support

Run full stack with Docker Compose:
```bash
docker-compose up --build
```
