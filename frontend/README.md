# 🚚 Shree Krishna Group Transportation — Frontend

Modern industrial logistics web application built with React 19, Vite, TypeScript, and Tailwind CSS v4.

---

## 📂 Directory Structure

```
frontend/
├── public/                 # Static web assets, icons, branding
├── src/
│   ├── components/         # Reusable UI components & forms
│   ├── pages/              # Routed pages (Home, Book Truck, Register, Contact, etc.)
│   ├── lib/                # WhatsApp & EmailJS dispatch utilities, constants
│   ├── App.tsx             # Master route assembler
│   ├── main.tsx            # React application entrypoint
│   └── index.css           # Design tokens, custom classes (.sk-input), Tailwind
├── index.html              # HTML shell & SEO metadata
├── vite.config.ts          # Vite build & plugin configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch on [http://localhost:5173](http://localhost:5173).

### 3. Build for Production
```bash
npm run build
```
Build output is generated into the `frontend/dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```
