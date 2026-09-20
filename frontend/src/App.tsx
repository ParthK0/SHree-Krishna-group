import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { TruckPreloader } from './components/TruckPreloader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MobileBottomBar } from './components/MobileBottomBar';
import { FloatingQuickEnquiry } from './components/FloatingQuickEnquiry';
import { PageLoadingSpinner } from './components/PageLoadingSpinner';
import { ToastProvider } from './components/ToastProvider';

// Eagerly import HomePage for instant first-paint performance
import { HomePage } from './pages/HomePage';

// Lazy load subpages to drastically reduce initial JS bundle size
const BookTruckPage = lazy(() => import('./pages/BookTruckPage').then(m => ({ default: m.BookTruckPage })));
const RegisterTruckPage = lazy(() => import('./pages/RegisterTruckPage').then(m => ({ default: m.RegisterTruckPage })));
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

/**
 * Renders persistent Header on all subpages.
 * The Homepage Hero already features an immersive embedded full-screen nav.
 */
function ConditionalHeader() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <Header />;
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
          {/* Persistent Header on all subpages */}
          <ConditionalHeader />

          <main className="flex-grow">
            <ErrorBoundary>
              <Suspense fallback={<PageLoadingSpinner />}>
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
              </Suspense>
            </ErrorBoundary>
          </main>

          {/* Floating Message / Mail Quick Enquiry Icon (Zero WhatsApp permission required) */}
          <FloatingQuickEnquiry />

          {/* Mobile Bottom Quick Action Bar (Call, Enquiry, Book Truck) */}
          <MobileBottomBar />

          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
