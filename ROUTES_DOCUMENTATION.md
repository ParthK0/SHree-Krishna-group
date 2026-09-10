# 🛣️ Route Pages & Subpages — Complete Technical & Content Documentation

This document serves as the master specification, data schema, and code template for the **Routes Catalog Hub (`/routes`)**, **Official Rate Cards (Table A, Table B, Table C, Left Rate Table)**, and **Individual Route Subpages (`/routes/:slug`)** on the Shree Krishna Group Transportation platform.

---

## 📁 File Architecture & Code Connections

| Purpose | File Location | Key Role |
| :--- | :--- | :--- |
| **Official Rate Card Database** | [`frontend/src/data/rateCardData.ts`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/data/rateCardData.ts) | Defines `Table A` (5 Ton), `Table B` (15 Ton), `Table C` (Parcel Rates), and `Left Rate Table` (Pan-India) |
| **TypeScript Type Definitions** | [`frontend/src/types/route.types.ts`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/types/route.types.ts) | Defines `RouteConfig`, `TruckPriceEstimate`, `TruckTypeSpec`, `ReviewItem`, `FAQItem` |
| **Route Database Registry** | [`frontend/src/data/routeRegistry.ts`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/data/routeRegistry.ts) | Master array of route configurations (`DEFAULT_ROUTES`) and query helpers |
| **Main Routes Catalog Page** | [`frontend/src/pages/RoutesIndexPage.tsx`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/pages/RoutesIndexPage.tsx) | Renders the `/routes` directory, city filter dropdown, search bar & route map |
| **Route Subpage Template** | [`frontend/src/pages/RouteTemplatePage.tsx`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/pages/RouteTemplatePage.tsx) | Renders the `/routes/:slug` dynamic page with 15 rich sections & SEO schemas |
| **Interactive Map & Rate Card Component** | [`frontend/src/components/RouteMapSection.tsx`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/components/RouteMapSection.tsx) | Interactive hub map and tabbed rate tables (Table A, B, C & Pan-India) |

---

## 💳 Official Rate Cards (Updated 2026 Tariffs)

### 1. Left Rate Table: Jaipur ➔ Pan India (Service | Load Upto 7 Ton)
| S.No | City | Rate | State / Region | Distance | Transit Time | 19 ft Rate | 22 ft Rate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Ahmedabad** | **₹24k – ₹26k** | Gujarat / West | 660 KM | 1–2 Days | ₹24,000 | ₹26,000 |
| 2 | **Jodhpur** | **₹17k – ₹19k** | Rajasthan | 340 KM | Same / Next Day | ₹17,000 | ₹19,000 |
| 3 | **Ajmer** | **₹10.5k – ₹11.5k** | Rajasthan | 135 KM | Same Day | ₹10,500 | ₹11,500 |
| 4 | **Surat** | **₹26.5k – ₹28.5k** | Gujarat / West | 850 KM | 2 Days | ₹26,500 | ₹28,500 |
| 5 | **Rajkot** | **₹27k – ₹29k** | Gujarat / West | 880 KM | 2 Days | ₹27,000 | ₹29,000 |
| 6 | **Vadodara** | **₹24.5k – ₹26.5k** | Gujarat / West | 730 KM | 2 Days | ₹24,500 | ₹26,500 |
| 7 | **Mumbai** | **₹35.5k – ₹37.5k** | Maharashtra / West | 1,150 KM | 2–3 Days | ₹35,500 | ₹37,500 |
| 8 | **Agra** | **₹14k – ₹16k** | Uttar Pradesh / East | 240 KM | 1 Day | ₹14,000 | ₹16,000 |
| 9 | **Indore** | **₹25.5k – ₹27.5k** | Madhya Pradesh / Central | 590 KM | 1–2 Days | ₹25,500 | ₹27,500 |
| 10 | **Bhopal** | **₹27.5k – ₹29.5k** | Madhya Pradesh / Central | 600 KM | 1–2 Days | ₹27,500 | ₹29,500 |
| 11 | **Lucknow** | **₹27.5k – ₹29.5k** | Uttar Pradesh / East | 570 KM | 1–2 Days | ₹27,500 | ₹29,500 |
| 12 | **Kanpur** | **₹25.5k – ₹27.5k** | Uttar Pradesh / East | 510 KM | 1–2 Days | ₹25,500 | ₹27,500 |
| 13 | **Alwar** | **₹11k – ₹13k** | Rajasthan | 150 KM | Same Day | ₹11,000 | ₹13,000 |
| 14 | **Kota** | **₹14k – ₹15.5k** | Rajasthan | 250 KM | Same / Next Day | ₹14,000 | ₹15,500 |
| 15 | **Bhiwadi** | **₹13.5k – ₹15.5k** | Rajasthan | 200 KM | Same / Next Day | ₹13,500 | ₹15,500 |
| 16 | **Bharatpur** | **₹13.5k – ₹15.5k** | Rajasthan | 185 KM | Same Day | ₹13,500 | ₹15,500 |
| 17 | **Mahwa** | **₹13.5k – ₹15.5k** | Rajasthan | 115 KM | Same Day | ₹13,500 | ₹15,500 |
| 18 | **Jind** | **₹15.5k – ₹17.5k** | Haryana / North | 320 KM | 1 Day | ₹15,500 | ₹17,500 |

---

### 2. Table A: Delhi NCR (Service | Load Upto 5 Ton)
| S.No | Vehicle Type | Capacity | Recommended Cargo | Verified Rate |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **14 ft Truck** | Up to 4.5 Tons | FMCG goods, electrical panels, textile bales, light machinery | **₹11,500 – ₹12,500** |
| 2 | **17 ft Truck** | Up to 5 Tons | Machinery components, tiles, light fabrication, PVC pipes | **₹12,500 – ₹14,000** |
| 3 | **20 ft Truck** | Up to 5 Tons | Sanitaryware, chemicals, granite tiles, commercial hardware | **₹13,500 – ₹15,500** |
| 4 | **22 ft Truck** | Up to 5 Tons | Steel pipes, structural frames, industrial packaging | **₹14,000 – ₹16,000** |
| 5 | **Container 19 ft** | Up to 5 Tons (Closed) | Garments, high-value electronics, sealed cartons, FMCG | **₹14,000 – ₹16,000** |
| 6 | **Container 22 ft** | Up to 5 Tons (Closed HQ) | Weather-sensitive industrial cargo, furniture, solar parts | **₹14,500 – ₹16,500** |
| 7 | **Container 32 ft** | Up to 5 Tons (High Volume) | Volumetric goods, e-commerce, plastics, foam, large cartons | **₹20,000 – ₹22,000** |

---

### 3. Table B: Delhi NCR (Service | Load Upto 15 Ton)
| S.No | Vehicle Type | Payload Capacity | Recommended Freight | Verified Rate |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **10 Tyre Truck** | 10 – 12 Tons | Heavy machinery, steel rods, marble slabs, industrial castings | **₹20,000 – ₹22,000** |
| 2 | **12 Tyre Truck** | 14 – 16 Tons | Heavy stone blocks, infrastructure metal, bulk manufacturing | **₹26,000 – ₹28,000** |
| 3 | **14 Tyre Truck** | 16 – 20 Tons | Bulk construction steel, heavy transformers, raw engineering coils | **₹28,000 – ₹30,000** |
| 4 | **Container 32 ft** | 12 – 15 Tons Multi-Axle | Heavy density volume cargo, solar modules, industrial FMCG | **₹24,000 – ₹26,000** |

---

### 4. Table C: Parcel / Courier & Freight Rates (Per KG)
| S.No | Service Type | Category | Recommended Freight | Official Rate |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Basic Freight Parcel (Road)** | Surface Road Freight | Standard surface packages, commercial carton parcels, warehouse cargo | **₹20–40 per kg** |
| 2 | **Heavy Special Freight Parcel (Air / Rail / Delicate etc.)** | Express Air / Rail | High-value items, fragile & delicate cargo, express multimodal transit | **₹40–120 per kg** |
| 3 | **Documents / Small Box Light Parcel** | Light Cargo & Courier | Business documentation, samples, lightweight boxed dispatches | **₹15–25 per kg** |

---

## 🛣️ Route Subpage Template (`/routes/:slug`)
Every route subpage in `frontend/src/data/routeRegistry.ts` contains:
1. **Dynamic SEO Headers & Structured JSON-LD Schemas**
2. **Breadcrumbs Navigation**
3. **Hero Section with Highlights & Fast Quote CTA**
4. **Corridor Metrics Bar (Distance, Transit Time, Pricing)**
5. **In-Depth Corridor Context & Industrial Hubs Served**
6. **Official Price Estimates Table & Pricing Determinants**
7. **Available Commercial Fleet Specifications**
8. **Industries Served & Materials Handled**
9. **4-Step Highway Transit Workflow**
10. **Statutory Documentation Checklist (GST Invoice, E-Way Bill, Bilty)**
11. **Customer Reviews & Testimonials**
12. **FAQ Accordion**
13. **Photo Gallery of Real Transport Operations**
14. **Cross-Linked Corridors & Suggested Blog Articles**
15. **Sticky Dispatch Call-to-Action Bar**
