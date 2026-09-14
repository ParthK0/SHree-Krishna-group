import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { BookTruckPage } from './pages/BookTruckPage';
import { RegisterTruckPage } from './pages/RegisterTruckPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { RefundPage } from './pages/RefundPage';
import { RouteTemplatePage } from './pages/RouteTemplatePage';
import { RoutesIndexPage } from './pages/RoutesIndexPage';
import { AdminRoutesPage } from './pages/AdminRoutesPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <div className="min-h-screen bg-[#ECE6DD] text-[#1a1f1b] flex flex-col font-['Inter'] antialiased selection:bg-[#F4B400] selection:text-[#6c5000]">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-truck" element={<BookTruckPage />} />
            <Route path="/register-truck" element={<RegisterTruckPage />} />
            <Route path="/enquiry" element={<Navigate to="/contact#enquiry" replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/cancellation-refund-policy" element={<RefundPage />} />

            {/* Route Directory & Master Route Templates */}
            <Route path="/routes" element={<RoutesIndexPage />} />
            <Route path="/routes/:slug" element={<RouteTemplatePage />} />
            <Route path="/admin/routes" element={<AdminRoutesPage />} />

            {/* Logistics Intelligence Blog */}
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* Direct clean SEO route slug (e.g. /jaipur-to-delhi-transport) */}
            <Route path="/:slug" element={<RouteTemplatePage />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
