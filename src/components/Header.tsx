import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/photos';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : 'is-transparent'} ${mobileMenuOpen ? 'menu-open' : ''}`} role="banner">
      <div className="container header-inner">
        <a 
          href="#home" 
          className="header-brand"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          <div className="header-logo-badge">
            <img 
              src="/assets/hotel-kings-crown/logo-transparent.png" 
              alt="Hotel Kings Crown Logo" 
              className="header-logo-img"
            />
          </div>
          <div className="header-brand-text">
            <span className="header-brand-name">Hotel Kings Crown</span>
            <span className="header-brand-sub">Malviya Nagar · Jaipur</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          <button 
            type="button"
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            type="button"
            className={`nav-link ${currentPage === 'rooms' ? 'active' : ''}`}
            onClick={() => handleNavClick('rooms')}
          >
            Rooms
          </button>
          <button 
            type="button"
            className={`nav-link ${currentPage === 'gallery' ? 'active' : ''}`}
            onClick={() => handleNavClick('gallery')}
          >
            Gallery
          </button>
          <button 
            type="button"
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>
          <button 
            type="button"
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <a
            href={HOTEL_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm header-action-btn header-whatsapp-btn"
            title="Chat directly with Hotel Kings Crown on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare size={16} />
            <span className="action-text">WhatsApp</span>
          </a>
          <button 
            type="button"
            className="btn btn-gold btn-sm header-action-btn header-book-btn"
            onClick={onOpenBooking}
          >
            Enquire Stay
          </button>
          <button 
            type="button"
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <nav className="mobile-nav-list" aria-label="Mobile Navigation Links">
            <button 
              type="button"
              className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <span>Home</span>
              <span className="mobile-nav-arrow" aria-hidden="true">→</span>
            </button>
            <button 
              type="button"
              className={`mobile-nav-link ${currentPage === 'rooms' ? 'active' : ''}`}
              onClick={() => handleNavClick('rooms')}
            >
              <span>Rooms & Suites</span>
              <span className="mobile-nav-arrow" aria-hidden="true">→</span>
            </button>
            <button 
              type="button"
              className={`mobile-nav-link ${currentPage === 'gallery' ? 'active' : ''}`}
              onClick={() => handleNavClick('gallery')}
            >
              <span>Property Gallery</span>
              <span className="mobile-nav-arrow" aria-hidden="true">→</span>
            </button>
            <button 
              type="button"
              className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              <span>About Hotel Kings Crown</span>
              <span className="mobile-nav-arrow" aria-hidden="true">→</span>
            </button>
            <button 
              type="button"
              className={`mobile-nav-link ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              <span>Contact & Directions</span>
              <span className="mobile-nav-arrow" aria-hidden="true">→</span>
            </button>
          </nav>

          <div className="mobile-drawer-footer">
            <button 
              type="button"
              className="btn btn-gold btn-lg mobile-drawer-btn"
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
            >
              Enquire About a Room
            </button>
            <a 
              href={HOTEL_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg mobile-drawer-btn"
            >
              <MessageSquare size={18} />
              Chat on WhatsApp (+91 9399112249)
            </a>
            <a 
              href={`tel:${HOTEL_DETAILS.phone}`}
              className="btn btn-outline-light btn-lg mobile-drawer-btn"
            >
              <Phone size={18} />
              Call Front Desk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
