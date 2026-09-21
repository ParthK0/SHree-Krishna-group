import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { TruckPreloader } from './components/TruckPreloader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FloatingQuickEnquiry } from './components/FloatingQuickEnquiry';
import { PageLoadingSpinner } from './components/PageLoadingSpinner';
import { ToastProvider } from './components/ToastProvider';

// Eagerly import HomePage for instant first-paint performance
import { HomePage } from './pages/HomePage';

// Lazy load subpages to drastically reduce initial JS bundle size
const BookTruckPage = lazy(() => import('./pages/BookTruckPage').then(m => ({ default: m.BookTruckPage })));
const RegisterTruckPage = lazy(() => import('./pages/RegisterTruckPage').then(m => ({ default: m.RegisterTruckPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const RefundPage = lazy(() => import('./pages/RefundPage').then(m => ({ default: m.RefundPage })));
const RouteTemplatePage = lazy(() => import('./pages/RouteTemplatePage').then(m => ({ default: m.RouteTemplatePage })));
const RoutesIndexPage = lazy(() => import('./pages/RoutesIndexPage').then(m => ({ default: m.RoutesIndexPage })));
const AdminRoutesPage = lazy(() => import('./pages/AdminRoutesPage').then(m => ({ default: m.AdminRoutesPage })));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage').then(m => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));



function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="flex-grow flex flex-col w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
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
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <ToastProvider>
        <ScrollToTop />
        <Analytics />
        {isLoading && <TruckPreloader onComplete={() => setIsLoading(false)} durationMs={1600} />}
        <div className="min-h-screen bg-[#ECE6DD] text-[#1a1f1b] flex flex-col font-['Inter'] antialiased selection:bg-[#F5B51B] selection:text-[#071F35]">
          {/* Header with floating hero state & expanded full-bar scroll transition */}
          <Header />

          <main className="flex-grow flex flex-col">
            <ErrorBoundary>
              <Suspense fallback={<PageLoadingSpinner />}>
                <AnimatedRoutes />
              </Suspense>
            </ErrorBoundary>
          </main>

          {/* Floating Message Quick Enquiry Icon in bottom */}
          <FloatingQuickEnquiry />

          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
