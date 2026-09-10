# 🚚 Shree Krishna Group Transportation — Backend API

Node.js + Express + TypeScript API server for Shree Krishna Group Transportation.

---

## 📂 Directory Structure

```
backend/
├── src/
│   ├── controllers/         # Request handling & input validation
│   │   ├── booking.controller.ts
│   │   ├── driver.controller.ts
│   │   └── enquiry.controller.ts
│   ├── routes/              # Express endpoint routers
│   │   ├── index.ts         # Main router mounted on /api
│   │   ├── health.routes.ts
│   │   ├── bookings.routes.ts
│   │   ├── drivers.routes.ts
│   │   └── enquiries.routes.ts
│   ├── middleware/          # Logger & centralized error handler
│   │   ├── requestLogger.ts
│   │   └── errorHandler.ts
│   └── server.ts            # Application entrypoint
├── .env.example             # Environment variables template
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000) with hot-reloading.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & uptime status |
| `POST` | `/api/bookings` | Submit new customer truck booking enquiry |
| `POST` | `/api/drivers` | Register truck owner / fleet driver |
| `POST` | `/api/enquiries` | Submit general customer support query |
