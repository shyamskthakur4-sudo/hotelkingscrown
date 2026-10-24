import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MessageSquare, X, Loader2, ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { BookingForm } from './components/BookingForm';
import { HomePage } from './pages/HomePage';
import { HOTEL_PHOTOS, HOTEL_DETAILS, type PhotoItem } from './data/photos';
import type { RoomCategory } from './lib/supabase';

// Lazy-load subpages for fast initial LCP and bundle splitting
const RoomsPage = lazy(() => import('./pages/RoomsPage').then((m) => ({ default: m.RoomsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));

const PageLoadingFallback: React.FC = () => (
  <div style={{ padding: '6rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
    <Loader2 size={32} className="animate-spin" style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
      Loading Hotel Kings Crown...
    </span>
  </div>
);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingCategory, setBookingCategory] = useState<RoomCategory>('any');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'rooms', 'gallery', 'about', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      } else if (window.location.pathname === '/admin') {
        setCurrentPage('admin');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track scroll reading progress and back-to-top visibility
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setShowBackToTop(window.scrollY > 380);
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLightbox = (photo: PhotoItem) => {
    const idx = HOTEL_PHOTOS.findIndex((p) => p.id === photo.id);
    if (idx !== -1) {
      setSelectedPhotoIndex(idx);
    }
  };

  const handleOpenBookingModal = (category: RoomCategory = 'any') => {
    setBookingCategory(category);
    setBookingModalOpen(true);
  };

  return (
    <div className="site-wrapper">
      {/* Top Luxury Gold Scroll Reading Progress Bar */}
      {currentPage !== 'admin' && (
        <div 
          className="scroll-progress-line" 
          style={{ width: `${scrollProgress}%` }} 
          aria-hidden="true" 
        />
      )}

      {/* Do not show standard header/footer if in staff admin dashboard */}
      {currentPage !== 'admin' && (
        <Header 
          currentPage={currentPage} 
          onNavigate={navigateTo} 
          onOpenBooking={() => handleOpenBookingModal('any')}
        />
      )}

      {/* Pages with Suspense */}
      <Suspense fallback={<PageLoadingFallback />}>
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigateTo}
            onOpenLightbox={handleOpenLightbox}
            onOpenBooking={handleOpenBookingModal}
          />
        )}

        {currentPage === 'rooms' && (
          <RoomsPage 
            onOpenLightbox={handleOpenLightbox}
            onOpenBooking={handleOpenBookingModal}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage 
            onOpenLightbox={handleOpenLightbox}
            onOpenBooking={() => handleOpenBookingModal('any')}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBookingModal('any')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminPage onBackToHome={() => navigateTo('home')} />
        )}
      </Suspense>

      {currentPage !== 'admin' && (
        <Footer 
          onNavigate={navigateTo}
          onOpenBooking={() => handleOpenBookingModal('any')}
        />
      )}

      {/* Lightbox Modal */}
      <Lightbox 
        photos={HOTEL_PHOTOS}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onPrev={() => setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : HOTEL_PHOTOS.length - 1))}
        onNext={() => setSelectedPhotoIndex((prev) => (prev !== null && prev < HOTEL_PHOTOS.length - 1 ? prev + 1 : 0))}
      />

      {/* Booking Enquiry Modal */}
      {bookingModalOpen && (
        <div 
          className="lightbox-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setBookingModalOpen(false)}
        >
          <div 
            className="booking-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="booking-modal-close"
              onClick={() => setBookingModalOpen(false)}
              aria-label="Close booking enquiry form"
            >
              <X size={20} />
            </button>
            <div className="booking-modal-body">
              <BookingForm 
                initialRoomCategory={bookingCategory}
                onSuccess={() => {
                  setTimeout(() => setBookingModalOpen(false), 4000);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Back To Top Button */}
      {currentPage !== 'admin' && (
        <button
          type="button"
          className={`back-to-top-btn ${showBackToTop ? 'is-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Floating WhatsApp Action FAB / Pill with Online Indicator */}
      {currentPage !== 'admin' && (
        <a
          href={HOTEL_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-btn"
          aria-label="Chat directly on WhatsApp with Hotel Kings Crown (+91 7425023130)"
          title="Chat directly on WhatsApp"
        >
          <span className="whatsapp-pulse-dot" aria-hidden="true" />
          <MessageSquare size={19} className="whatsapp-icon" />
          <span className="whatsapp-pill-text">WhatsApp Enquiries</span>
        </a>
      )}
    </div>
  );
};
export default App;
