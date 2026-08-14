# 🚚 Shree Krishna Group Transportation — Project Overview & Documentation

Welcome to the official technical and functional documentation for the **Shree Krishna Group Transportation** web application.

---

## 🎯 1. Project Vision & Business Model

**Shree Krishna Group Transportation** is a modern industrial logistics web application built for a regional transport service based in Rajasthan, India.

The primary objective of the platform is to **bridge cargo shippers (customers with goods to move)** and **truck owners/drivers (fleet partners seeking loads)** without needing a complex database backend or payment processing gateway.

### Target Audience Pathways:
1. **Cargo Shippers / Businesses:** Book full-load or part-load transport by providing trip route, weight, and goods details.
2. **Truck Drivers / Fleet Owners:** Register their vehicle details, capacity, current location, and preferred transit routes to receive dispatch work.

---

## ⚡ 2. Core Features & Functions

### A. Customer Truck Booking Form (`src/components/BookingForm.tsx`)
- **Pickup & Drop Locations:** Select origin and destination cities (e.g., Jaipur to Jodhpur).
- **Goods & Weight Metadata:** Specify payload type (e.g., Marble, FMCG, Industrial Equipment) and approximate weight.
- **Vehicle Type Selector:** Choose appropriate vehicle sizes (Mini Truck, Tata 407 14ft, 17–20ft, 22–24ft, 32ft Multi-axle).
- **Interactive Multi-Step Progress Bar:** Displays real-time step notifications (*Checking available trucks... → Sending booking to dispatcher... → Sending email...*).

### B. Driver / Truck Owner Registration Form (`src/components/DriverForm.tsx`)
- **Owner & Vehicle Metadata:** Capture driver name, mobile number, and vehicle registration number (e.g., `RJ14XX0000`).
- **Capacity & Location Tracking:** Capture carrying capacity (e.g., 5 Tons), current location, and preferred operating routes.

### C. Automated Dual-Dispatch Notification Engine (`src/lib/whatsapp.ts`)
- **Zero-Redirect Direct Email Dispatch:** Automatically sends formatted booking and driver registration leads directly to personal Gmail via **EmailJS API** (with **FormSubmit.co** fallback).
- **Instant WhatsApp Redirection:** Formats form data into a structured WhatsApp message (`wa.me/+918079086274`) and opens WhatsApp for instant 1-click customer support.
- **Background WhatsApp API Integration:** Configured to support UltraMsg silent background sending.

---

## 🛠️ 3. Technical Stack & Tooling

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19 + Vite** | Ultra-fast client-side application bundle |
| **Language** | **TypeScript (`.tsx`)** | Type safety for components, form states, and dispatch functions |
| **Styling** | **Tailwind CSS v4 + Vanilla CSS** | Custom Industrial UI theme and design system tokens |
| **Animations** | **Framer Motion** | Micro-interactions and smooth section fade-up entries |
| **Iconography** | **Lucide React** | Industrial icons (`Truck`, `Navigation`, `CheckCircle2`, `MessageCircle`) |
| **Media Assets** | **WebP Compression** | Optimized high-resolution imagery for fast loading speeds |

---

## 🎨 4. Design System & Component Architecture

### Color Palette:
- **Base Background:** `#ECE6DD` (Warm Industrial Stone)
- **Primary Text:** `#1a1f1b` (Charcoal Black)
- **Forest Accent:** `#0F6A37` (Green Trust Accent)
- **Gold Accent:** `#F4B400` (Industrial Transport Gold)
- **Light Green Tint:** `#EBF5EE` (Success / Card Highlight)

### Component Hierarchy:
```
src/
├── App.tsx                # Master page layout and section assembler
├── index.css              # Design tokens, custom inputs (.sk-input), and global styles
├── lib/
│   └── whatsapp.ts        # Automated EmailJS & WhatsApp lead delivery service
└── components/
    ├── Header.tsx         # Fixed navigation bar with branding badge & call button
    ├── Hero.tsx           # High-converting Hero section with animated vehicle visuals
    ├── Stats.tsx          # Live counter metrics (Trips completed, fleet size, client rating)
    ├── TwoPathSplit.tsx   # Dual pathway cards: "Book Freight" vs "Register Truck"
    ├── HowItWorks.tsx     # 3-step interactive booking workflow guide
    ├── VisualBreak.tsx    # Full-width high-resolution fleet break banner
    ├── BookingForm.tsx    # Customer transport booking form
    ├── DriverForm.tsx     # Fleet owner & driver onboarding form
    ├── FadeUp.tsx         # Framer Motion scroll animation wrapper
    └── Footer.tsx         # Contact info, office location, and copyright notice
```

---

## 📌 5. What We Have Accomplished & Current Status

1. **Modernized Tech Stack:** Upgraded the application to React 19, TypeScript, and Vite with Tailwind v4.
2. **Visual & UX Refinement:** Implemented a modern industrial UI design with custom input styling (`.sk-input`) and step-by-step submission feedback.
3. **Automated Lead Generation:** Integrated dual EmailJS and WhatsApp auto-dispatch so no backend database is required to receive orders.
4. **Asset & Accessibility Optimization:** Converted image assets to `.webp` format and ensured WCAG 2.2 AA compliant color contrast standards across all components.

---

*Documentation generated for Shree Krishna Group Transportation.*
