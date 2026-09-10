# 🚚 Shree Krishna Group Transportation

High-performance, modern industrial logistics platform for **Shree Krishna Group Transportation** (Jaipur, Rajasthan).

The project is organized into a clean, modular monorepo with distinct **frontend** and **backend** directories:
- **`frontend/`**: Modern client-side React 19 + Vite web application
- **`backend/`**: Express + TypeScript REST API service

---

## 🏛️ Business Information

- **Registered Business:** Shree Krishna Transport (Parent: Shree Krishna Buildtech)
- **GSTIN:** `08KEYPK3684A1ZV`
- **Registered Office:** 1D, Lalita Colony, Nahari Ka Naka, Shastri Nagar, Jaipur, Rajasthan 302016
- **Contact Phone / WhatsApp:** +91 97848 00833
- **Email:** deepesh3052@gmail.com
- **Operating Area:** Rajasthan → All India Connectivity

---

## 📂 Repository Architecture

```
shree-krishna-group-transportation/
├── frontend/                     # React 19 + Vite Web Application
│   ├── src/                     # Components, pages, forms & routing
│   ├── public/                  # Static assets & brand logos
│   ├── package.json             # Frontend dependencies & scripts
│   ├── vite.config.ts           # Vite build configuration
│   └── README.md                # Frontend documentation
│
├── backend/                      # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── controllers/         # Bookings, drivers, enquiries controllers
│   │   ├── routes/              # Express API endpoints (/api/*)
│   │   ├── middleware/          # Logger & error handlers
│   │   └── server.ts            # Express server initialization
│   ├── .env.example             # Environment template
│   ├── package.json             # Backend dependencies & scripts
│   └── README.md                # Backend documentation
│
├── package.json                  # Root Monorepo configuration (npm workspaces)
├── .gitignore                    # Global ignore rules
├── README.md                     # Monorepo documentation
└── PROJECT_OVERVIEW.md           # Business & technical documentation
```

---

## ⚡ Quick Start

### 1. Install Dependencies
You can install dependencies for both frontend and backend from the root:
```bash
# Install frontend dependencies
npm --prefix frontend install

# Install backend dependencies (optional/when running API)
npm --prefix backend install
```

### 2. Run Development Servers
From the root directory:
```bash
# Start frontend web app (http://localhost:5173)
npm run dev
# OR: npm run dev:frontend

# Start backend API server (http://localhost:5000)
npm run dev:backend
```

Or you can work inside either directory directly:
```bash
cd frontend
npm run dev

cd ../backend
npm run dev
```

### 3. Build for Production
```bash
# Build frontend web app
npm run build
```

---

## 🌐 Legal Routes & Features

- `/` — Homepage (Hero, Stats, How It Works, Two-Path Split, About Us, Trust Strip)
- `/book-truck` — 2-Step Truck Booking Wizard with legal declaration & parcel support
- `/register-truck` — 2-Step Vehicle Registration Wizard with legal declaration
- `/enquiry` — General Freight Enquiry Form with WhatsApp pipeline
- `/contact` — Comprehensive Business Contact & Location Page
- `/terms-and-conditions` — Operational Terms & Conditions
- `/privacy-policy` — Data Protection & Privacy Policy
- `/cancellation-refund-policy` — Cancellation & Refund Policy
