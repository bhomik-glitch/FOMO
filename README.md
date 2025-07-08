# FOMOO

FOMOO is more than just a clothing brand—it's a movement for self-expression, boldness, and attitude. This full-stack project powers the FOMOO e-commerce platform, letting users shop unique, oversized, and expressive streetwear, manage their carts, and experience a modern, interactive web store.

## Table of Contents
- [About FOMOO](#about-fomoo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Contact](#contact)

---

## About FOMOO
FOMOO stands for more than just Fear of Missing Out. It's about the fear of not expressing, of staying silent when your soul screams for color, chaos, and confidence.

We started FOMOO with one purpose — to turn emotion into fabric and attitude into style. Every stitch, every drop, every oversized silhouette is built for those who feel too much, dream too big, and refuse to blend in.

We're not just a clothing brand. We are a movement of the misunderstood, the misfits, the rebels, and the loud hearts. From gritty street vibes to raw emotion-packed drops, our pieces reflect the world we live in — messy, bold, unfiltered.

**Don't miss out. Feel everything. Wear your world.**

---

## Features
- Modern React + TypeScript frontend with Vite
- Express.js + MongoDB backend API
- User authentication (JWT-based)
- Product catalog, cart, wishlist, and order management
- Razorpay payment integration
- Responsive, animated UI with Tailwind CSS
- Popup notifications, preloader, and interactive effects
- Admin product seeding (via backend script)

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Razorpay
- **Other:** Vercel (deployment), dotenv, Radix UI, Lucide Icons

---

## Getting Started

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the following variables:
   ```env
   PORT=5000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   # or
   npm start
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000) by default.

### Frontend Setup
1. `cd project`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `project/` with the following variable:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the frontend dev server:
   ```bash
   npm run dev
   ```
   The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

---

## Environment Variables

### Backend (`backend/.env`)
- `PORT` - Port for the backend server (default: 5000)
- `DB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT authentication
- `RAZORPAY_KEY_ID` - Razorpay API key (for payments)
- `RAZORPAY_KEY_SECRET` - Razorpay API secret

### Frontend (`project/.env`)
- `VITE_API_BASE_URL` - URL of the backend API (e.g., http://localhost:5000/api)

