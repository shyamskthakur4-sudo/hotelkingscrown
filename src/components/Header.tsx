import React, { useState } from 'react';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/photos';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a 
          href="#home" 
          className="header-brand"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          <img 
            src="/assets/hotel-kings-crown/logo-transparent.png" 
            alt="Hotel Kings Crown Logo" 
            className="header-logo-img"
          />
          <div className="header-brand-text">
            <span className="header-brand-name">Hotel Kings Crown</span>
            <span className="header-brand-sub">Malviya Nagar, Jaipur</span>
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
            className="btn btn-whatsapp btn-sm"
            title="Chat directly with Hotel Kings Crown on WhatsApp"
          >
            <MessageSquare size={16} />
            <span className="desktop-only">WhatsApp</span>
          </a>
          <button 
            type="button"
            className="btn btn-gold btn-sm"
            onClick={onOpenBooking}
          >
            Enquire Stay
          </button>
          <button 
            type="button"
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#F8F6F1',
          zIndex: 899,
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          borderTop: '1px solid var(--border-soft)'
        }}>
          <button 
            type="button"
            className="nav-link"
            style={{ textAlign: 'left', fontSize: '1.25rem', padding: '0.6rem 0' }}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            type="button"
            className="nav-link"
            style={{ textAlign: 'left', fontSize: '1.25rem', padding: '0.6rem 0' }}
            onClick={() => handleNavClick('rooms')}
          >
            Rooms & Suites
          </button>
          <button 
            type="button"
            className="nav-link"
            style={{ textAlign: 'left', fontSize: '1.25rem', padding: '0.6rem 0' }}
            onClick={() => handleNavClick('gallery')}
          >
            Property Gallery
          </button>
          <button 
            type="button"
            className="nav-link"
            style={{ textAlign: 'left', fontSize: '1.25rem', padding: '0.6rem 0' }}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>
          <button 
            type="button"
            className="nav-link"
            style={{ textAlign: 'left', fontSize: '1.25rem', padding: '0.6rem 0' }}
            onClick={() => handleNavClick('contact')}
          >
            Contact & Directions
          </button>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button 
              type="button"
              className="btn btn-gold btn-lg"
              style={{ width: '100%' }}
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
            >
              Enquire About a Room
            </button>
            <a 
              href={HOTEL_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              style={{ width: '100%' }}
            >
              <MessageSquare size={18} />
              Chat on WhatsApp (+91 9399112249)
            </a>
            <a 
              href={`tel:${HOTEL_DETAILS.phone}`}
              className="btn btn-outline btn-lg"
              style={{ width: '100%' }}
            >
              <Phone size={18} />
              Call Hotel Front Desk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
