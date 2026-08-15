import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { BookTruckPage } from './pages/BookTruckPage';
import { RegisterTruckPage } from './pages/RegisterTruckPage';
import { EnquiryPage } from './pages/EnquiryPage';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#ECE6DD] text-[#1a1f1b] flex flex-col font-['Inter'] antialiased selection:bg-[#F4B400] selection:text-[#6c5000]">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-truck" element={<BookTruckPage />} />
            <Route path="/register-truck" element={<RegisterTruckPage />} />
            <Route path="/enquiry" element={<EnquiryPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
