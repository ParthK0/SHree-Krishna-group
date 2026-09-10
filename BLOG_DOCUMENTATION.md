# ✍️ Blog Pages & Subpages — Complete Technical & Content Documentation

This document serves as the master specification, data schema, and code template for the **Logistics Intelligence Blog Hub (`/blog`)** and **Individual Blog Article Subpages (`/blog/:slug`)** on the Shree Krishna Group Transportation platform.

---

## 📁 File Architecture & Code Connections

| Purpose | File Location | Key Role |
| :--- | :--- | :--- |
| **TypeScript Type Definitions & Post Registry** | [`frontend/src/data/blogData.ts`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/data/blogData.ts) | Defines `BlogPost`, `BlogPostSection`, `BLOG_POSTS`, and query helpers |
| **Main Blog Catalog Page** | [`frontend/src/pages/BlogIndexPage.tsx`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/pages/BlogIndexPage.tsx) | Renders the `/blog` index, categories, search bar, and post grid |
| **Blog Article Subpage Template** | [`frontend/src/pages/BlogPostPage.tsx`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/pages/BlogPostPage.tsx) | Renders the `/blog/:slug` dynamic article with embedded rate cards & FAQs |
| **Official Rate Card Component** | [`frontend/src/components/RouteMapSection.tsx`](file:///e:/shree%20krishna%20group%20transportation/frontend/src/components/RouteMapSection.tsx) | Embedded rate tables for Table A, Table B, Table C & Pan-India corridors |

---

## 📰 Published Blog Articles & Reading Guides

### 1. Jaipur to Delhi NCR Truck Transport Rate List & Complete 2026 Freight Guide
- **URL:** `/blog/jaipur-to-delhi-transport-cost-guide`
- **Category:** Pricing Guide | **Read Time:** 6 min read
- **Author:** Deepesh Sharma (Head of Freight Logistics & Dispatch)
- **Embedded Tables:**
  - **Table A: Delhi NCR (Load Up to 5 Ton):** 14ft (₹11,500–₹12,500) to 32ft Container (₹20,000–₹22,000).
  - **Table B: Delhi NCR (Load Up to 15 Ton):** 10 Tyre (₹20,000–₹22,000) to 14 Tyre (₹28,000–₹30,000) & 32ft MXL Container (₹24,000–₹26,000).
  - **Table C: Parcel / Courier & Freight Rates:** Road (₹20–40/kg), Air/Rail (₹40–120/kg), Documents (₹15–25/kg).

### 2. Jaipur to Pan India Truck Transport Rate Card: 18-City Freight Matrix
- **URL:** `/blog/jaipur-to-pan-india-truck-transport-rates`
- **Category:** Pricing Guide | **Read Time:** 8 min read
- **Author:** Deepesh Sharma (Head of Freight Logistics & Dispatch)
- **Embedded Tables:**
  - **Left Rate Table: Jaipur ➔ Pan India (Load Upto 7 Ton):** 18 Cities with clear rate ranges:
    Ahmedabad (₹24k–₹26k), Jodhpur (₹17k–₹19k), Ajmer (₹10.5k–₹11.5k), Surat (₹26.5k–₹28.5k), Rajkot (₹27k–₹29k), Vadodara (₹24.5k–₹26.5k), Mumbai (₹35.5k–₹37.5k), Agra (₹14k–₹16k), Indore (₹25.5k–₹27.5k), Bhopal (₹27.5k–₹29.5k), Lucknow (₹27.5k–₹29.5k), Kanpur (₹25.5k–₹27.5k), Alwar (₹11k–₹13k), Kota (₹14k–₹15.5k), Bhiwadi (₹13.5k–₹15.5k), Bharatpur (₹13.5k–₹15.5k), Mahwa (₹13.5k–₹15.5k), Jind (₹15.5k–₹17.5k).

### 3. Truck Selection Guide: 7 Ton vs 15 Ton & 14ft to 32ft Container Selection
- **URL:** `/blog/truck-selection-guide-ftl-ptl-load-capacities`
- **Category:** Fleet Operations | **Read Time:** 7 min read

### 4. Inter-State E-Way Bill & GST Compliance Guide for Rajasthan Shippers
- **URL:** `/blog/inter-state-e-way-bill-gst-transport-rules`
- **Category:** Compliance & Taxes | **Read Time:** 6 min read
