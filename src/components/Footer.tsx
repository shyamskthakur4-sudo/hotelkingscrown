import React from 'react';
import { MapPin, Phone, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/photos';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <img 
                src="/assets/hotel-kings-crown/logo-transparent.png" 
                alt="Hotel Kings Crown" 
                style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
              <h3 className="footer-brand-title" style={{ margin: 0 }}>Hotel Kings Crown</h3>
            </div>
            <p className="footer-brand-desc">
              A welcoming, thoughtfully maintained hotel in Malviya Nagar, Jaipur. Featuring contemporary Deluxe & Super Deluxe rooms, comfortable guest lounge, dining hall, and authentic Rajasthani hospitality.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <a 
                href={HOTEL_DETAILS.whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageSquare size={15} />
                WhatsApp Us
              </a>
              <a 
                href={`tel:${HOTEL_DETAILS.phone}`}
                className="btn btn-outline btn-sm"
                style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                <Phone size={15} />
                Call Front Desk
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('home')}>
                  Home Overview
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('rooms')}>
                  Rooms & Suites
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('gallery')}>
                  Photo Gallery
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('about')}>
                  About Hotel Kings Crown
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('contact')}>
                  Contact & Location
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={onOpenBooking}>
                  Enquire About Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Room Categories */}
          <div>
            <h4 className="footer-col-title">Accommodations</h4>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('rooms')}>
                  Deluxe Room
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('rooms')}>
                  Super Deluxe Room
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('gallery')}>
                  Dining Hall Photos
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('gallery')}>
                  En-Suite Bathrooms
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('gallery')}>
                  Lobby & Elevator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Address & Location */}
          <div>
            <h4 className="footer-col-title">Hotel Location</h4>
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
              <MapPin size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '3px' }} />
              <address style={{ fontStyle: 'normal', fontSize: '0.9rem', color: '#B5A89E', lineHeight: '1.6' }}>
                <strong>Hotel Kings Crown</strong><br />
                {HOTEL_DETAILS.address.line1}<br />
                {HOTEL_DETAILS.address.locality}<br />
                {HOTEL_DETAILS.address.city}, {HOTEL_DETAILS.address.state} {HOTEL_DETAILS.address.pincode}<br />
                {HOTEL_DETAILS.address.country}
              </address>
            </div>
            <a 
              href={HOTEL_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold btn-sm"
              style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--accent-gold)', color: '#FFFFFF' }}
            >
              <ExternalLink size={14} />
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            © {currentYear} Hotel Kings Crown, Jaipur. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B5A89E' }}>
              <ShieldCheck size={15} style={{ color: 'var(--accent-gold)' }} />
              Direct Enquiry Guarantee: No booking fees
            </span>
            <button 
              type="button" 
              onClick={() => onNavigate('admin')}
              style={{ color: '#8C8076', fontSize: '0.78rem', textDecoration: 'underline' }}
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
