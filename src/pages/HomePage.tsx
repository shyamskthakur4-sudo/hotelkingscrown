import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  Coffee, 
  Wind, 
  Tv, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  ExternalLink,
  Camera,
  Calendar,
  Users
} from 'lucide-react';
import { HOTEL_DETAILS, HOTEL_PHOTOS, type PhotoItem } from '../data/photos';
import { BookingForm } from '../components/BookingForm';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { RoomCategory } from '../lib/supabase';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenLightbox: (photo: PhotoItem) => void;
  onOpenBooking: (roomCategory?: RoomCategory) => void;
}

const HERO_SLIDES = [
  {
    id: 'lobby',
    title: 'Grand Reception & Lounge',
    badge: 'Lobby Lounge · Photo DSC00153',
    src: '/assets/hotel-kings-crown/photos/DSC00153.jpg',
    tagline: 'A Welcoming Sanctuary Behind WTP, Jaipur'
  },
  {
    id: 'deluxe',
    title: 'Deluxe King Bedroom',
    badge: 'Deluxe Bedroom · Photo DSC00186',
    src: '/assets/hotel-kings-crown/photos/DSC00186.jpg',
    tagline: 'Individual Split AC, Crisp Linens & Calm Privacy'
  },
  {
    id: 'super-deluxe',
    title: 'Super Deluxe Balcony Suite',
    badge: 'Balcony Suite · Photo DSC00212',
    src: '/assets/hotel-kings-crown/photos/DSC00212.jpg',
    tagline: 'Private Balcony, Velvet Sitting Lounge & Minibar'
  },
  {
    id: 'dining',
    title: 'On-Site Marble Dining Hall',
    badge: 'Dining Hall · Photo DSC00171',
    src: '/assets/hotel-kings-crown/photos/DSC00171.jpg',
    tagline: 'Bright Climate-Controlled Dining Space'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenLightbox,
  onOpenBooking
}) => {
  useScrollReveal();
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Quick search widget state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(dayAfter.toISOString().split('T')[0]);
  const [roomCategory, setRoomCategory] = useState<RoomCategory>('any');
  const [guests, setGuests] = useState('2');

  // Parallax scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const galleryPreview = HOTEL_PHOTOS.filter((p) => p.featured).slice(0, 6);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const element = document.getElementById('enquire');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentHero = HERO_SLIDES[activeSlide];
  const parallaxTransform = `translate3d(0, ${Math.min(scrollY * 0.28, 120)}px, 0) scale(${1 + Math.min(scrollY * 0.0003, 0.08)})`;

  return (
    <main id="main-content">
      {/* 1. CINEMATIC HERO SECTION WITH REAL HOTEL PHOTOGRAPHY */}
      <section className="cinematic-hero" aria-label="Welcome to Hotel Kings Crown">
        {/* Background Slide Carousel with Parallax */}
        <div className="hero-bg-carousel">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero-bg-slide ${idx === activeSlide ? 'active' : ''}`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="hero-bg-image"
                style={{ transform: parallaxTransform }}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
          <div className="hero-cinematic-overlay" />
        </div>

        {/* Hero Content */}
        <div className="container hero-container">
          <div className="hero-main-column">
            {/* Location & Heritage Badge */}
            <div className="hero-badge-strip reveal-fade-up">
              <span className="hero-eyebrow-pill">
                <MapPin size={13} style={{ display: 'inline', marginRight: '6px' }} />
                MALVIYA NAGAR · BEHIND WTP · JAIPUR
              </span>
            </div>

            {/* Masked Editorial Heading */}
            <div className="hero-title-mask reveal-fade-up delay-100">
              <h1 className="hero-cinematic-title">
                A Comfortable Stay in the Heart of Jaipur
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="hero-cinematic-desc reveal-fade-up delay-200">
              Discover a welcoming sanctuary to relax, unwind, and make the most of your time in Rajasthan's Pink City. Thoughtfully appointed Deluxe & Super Deluxe rooms, 24/7 reception, on-site dining hall, and modern amenities situated right behind World Trade Park (WTP).
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-cinematic-actions reveal-fade-up delay-300">
              <button 
                type="button" 
                className="btn btn-gold btn-lg hero-action-btn"
                onClick={() => onNavigate('rooms')}
              >
                Explore Our Rooms
                <ArrowRight size={18} />
              </button>
              <a 
                href={HOTEL_DETAILS.whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg hero-action-btn"
              >
                <MessageSquare size={18} />
                Enquire on WhatsApp
              </a>
              <button
                type="button"
                className="btn btn-outline-light btn-lg hero-action-btn"
                onClick={() => onNavigate('gallery')}
              >
                View 26 Real Photos
              </button>
            </div>
          </div>

          {/* Bottom Controls: Slide Switcher Tabs & Attribution */}
          <div className="hero-bottom-bar reveal-fade-in delay-300">
            {/* Real Photo Attribution Tag */}
            <div className="hero-photo-tag">
              <Camera size={14} />
              <span>{currentHero.badge}</span>
            </div>

            {/* Interactive Photo Scene Tabs */}
            <div className="hero-scene-tabs" role="tablist" aria-label="Hotel Spaces">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeSlide}
                  className={`hero-scene-tab ${idx === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                >
                  <span className="scene-num">0{idx + 1}</span>
                  <span className="scene-name">{slide.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <span>DISCOVER</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* 2. FLOATING QUICK ENQUIRY STRIP (HERO SEARCH WIDGET) */}
      <section className="hero-search-strip-wrapper">
        <div className="container">
          <form className="hero-search-bar" onSubmit={handleQuickSearchSubmit}>
            <div className="search-field">
              <label htmlFor="search-check-in">
                <Calendar size={14} />
                <span>CHECK-IN</span>
              </label>
              <input
                id="search-check-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            <div className="search-field">
              <label htmlFor="search-check-out">
                <Calendar size={14} />
                <span>CHECK-OUT</span>
              </label>
              <input
                id="search-check-out"
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

            <div className="search-field">
              <label htmlFor="search-category">
                <Building2 size={14} />
                <span>ROOM CATEGORY</span>
              </label>
              <select
                id="search-category"
                value={roomCategory}
                onChange={(e) => setRoomCategory(e.target.value as RoomCategory)}
              >
                <option value="any">Any Room Category</option>
                <option value="deluxe">Deluxe Room</option>
                <option value="super-deluxe">Super Deluxe Room</option>
              </select>
            </div>

            <div className="search-field">
              <label htmlFor="search-guests">
                <Users size={14} />
                <span>GUESTS</span>
              </label>
              <select
                id="search-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4+ Adults / Family</option>
              </select>
            </div>

            <button type="submit" className="btn btn-gold btn-search">
              Check Availability
            </button>
          </form>
        </div>
      </section>

      {/* 3. SHORT EDITORIAL INTRODUCTION */}
      <section className="section section-cream" aria-labelledby="intro-heading">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image-frame reveal-fade-up">
              <img 
                src="/assets/hotel-kings-crown/photos/DSC00144.jpg" 
                alt="Front desk reception counter with marble finish and Rajasthani palace wallpaper" 
                loading="lazy"
              />
              <p className="intro-caption">
                Warm reception desk with authentic heritage-inspired interiors and 24-hour guest assistance.
              </p>
            </div>

            <div className="reveal-fade-up delay-100">
              <span className="eyebrow">OUR PROPERTY IN MALVIYA NAGAR</span>
              <h2 id="intro-heading" style={{ marginBottom: '1.4rem' }}>
                Your Jaipur Stay, Thoughtfully Considered
              </h2>
              <p style={{ marginBottom: '1.2rem' }}>
                Hotel Kings Crown offers a calm, comfortable environment designed for business travelers, couples, and families visiting Rajasthan's Pink City. Situated on Mahalaxmi Road right behind Jaipur's landmark World Trade Park, our property combines modern convenience with personalized attention.
              </p>
              <p style={{ marginBottom: '1.8rem' }}>
                From thoughtfully planned Deluxe and Super Deluxe rooms to our warm guest lounge and bright on-site dining hall, every space is created to offer peace and hospitality throughout your journey.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <Check size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span>24/7 Front Desk Reception</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <Check size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span>Spacious Marble Dining Hall</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <Check size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span>Modern Golden Elevator</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <Check size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span>Individual Air Conditioning</span>
                </div>
              </div>

              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => onNavigate('about')}
              >
                Learn More About Hotel Kings Crown
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROOM CATEGORIES */}
      <section className="section" id="rooms" aria-labelledby="rooms-heading">
        <div className="container">
          <div className="reveal-fade-up" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span className="eyebrow">ACCOMMODATIONS</span>
            <h2 id="rooms-heading" style={{ marginBottom: '0.8rem' }}>
              Distinctive Rooms for Your Jaipur Visit
            </h2>
            <p>
              Choose between our comfortable Deluxe Rooms or spacious Super Deluxe Suites featuring private balconies and expanded living lounges.
            </p>
          </div>

          {/* Deluxe Room Spread */}
          <div className="room-editorial-item reveal-fade-up">
            <div className="room-media">
              <div className="room-main-frame">
                <span className="room-badge-pill">DELUXE CATEGORY</span>
                <img 
                  src="/assets/hotel-kings-crown/photos/DSC00186.jpg" 
                  alt="Deluxe Room with king bed and split air conditioner" 
                  loading="lazy"
                />
              </div>
            </div>

            <div className="room-info">
              <span className="eyebrow">CATEGORY 01</span>
              <h3 className="room-title">Deluxe Room</h3>
              <div className="room-sub">Comfortable & Well-Appointed Room in Malviya Nagar</div>
              <p className="room-desc">
                Designed for quiet relaxation with a comfortable double bed, crisp white linens, accent headboard, individual split air conditioning, ceiling fan, and modern en-suite bathroom with hot running water.
              </p>

              <ul className="room-feature-list">
                <li>
                  <Wind size={16} />
                  <span>Split Air Conditioning & Ceiling Fan</span>
                </li>
                <li>
                  <Sparkles size={16} />
                  <span>Clean White Linens & Bedside Connectivity</span>
                </li>
                <li>
                  <Check size={16} />
                  <span>En-Suite Bathroom with Rain Shower</span>
                </li>
              </ul>

              <div className="room-rate-note">
                Contact us for current rates and availability.
              </div>

              <div className="room-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => onOpenBooking('deluxe')}
                >
                  Enquire for Deluxe Room
                </button>
                <a 
                  href={buildWhatsAppLink({ room_category: 'deluxe' })}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>

          {/* Super Deluxe Room Spread (Reversed Layout) */}
          <div className="room-editorial-item reversed reveal-fade-up delay-100">
            <div className="room-media">
              <div className="room-main-frame">
                <span className="room-badge-pill">SUPER DELUXE CATEGORY</span>
                <img 
                  src="/assets/hotel-kings-crown/photos/DSC00212.jpg" 
                  alt="Super Deluxe Room suite sitting lounge with private balcony and TV" 
                  loading="lazy"
                />
              </div>
            </div>

            <div className="room-info">
              <span className="eyebrow">CATEGORY 02</span>
              <h3 className="room-title">Super Deluxe Room</h3>
              <div className="room-sub">Spacious Suite Living with Private Balcony & Minibar</div>
              <p className="room-desc">
                An upgraded experience featuring a private living room with plush velvet couch seating, private balcony overlooking the city, wall-mounted Smart TV, in-room mini refrigerator, and electric tea/coffee kettle station.
              </p>

              <ul className="room-feature-list">
                <li>
                  <Coffee size={16} />
                  <span>In-Room Refrigerator & Tea/Coffee Station</span>
                </li>
                <li>
                  <Tv size={16} />
                  <span>Wall-Mounted Smart TV in Living Area</span>
                </li>
                <li>
                  <Building2 size={16} />
                  <span>Private Balcony with Glass Sliding Doors</span>
                </li>
              </ul>

              <div className="room-rate-note">
                Contact us for current rates and availability.
              </div>

              <div className="room-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => onOpenBooking('super-deluxe')}
                >
                  Enquire for Super Deluxe
                </button>
                <a 
                  href={buildWhatsAppLink({ room_category: 'super-deluxe' })}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>

          <div className="reveal-fade-up" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              type="button"
              className="btn btn-outline"
              onClick={() => onNavigate('rooms')}
            >
              View Full Room Details & Photos
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. PROPERTY HIGHLIGHTS */}
      <section className="section section-cream" aria-labelledby="highlights-heading">
        <div className="container">
          <div className="reveal-fade-up" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="eyebrow">PROPERTY CHARACTER</span>
            <h2 id="highlights-heading" style={{ marginBottom: '0.8rem' }}>
              Actual Facilities & Hotel Spaces
            </h2>
            <p>
              Every photograph shows the authentic interiors and shared amenities at Hotel Kings Crown in Malviya Nagar, Jaipur.
            </p>
          </div>

          <div className="highlights-grid">
            {/* Highlight 1: Dining Hall */}
            <div className="highlight-card reveal-fade-up delay-100">
              <div className="highlight-image-box">
                <img 
                  src="/assets/hotel-kings-crown/photos/DSC00171.jpg" 
                  alt="Hotel Kings Crown dining hall with marble tables and quilted chairs" 
                  loading="lazy"
                />
              </div>
              <div className="highlight-body">
                <h3 className="highlight-title">Bright Dining Hall</h3>
                <p className="highlight-desc">
                  An inviting on-site dining space featuring marble-top tables, gold accents, comfortable banquette seating, and air conditioning for breakfast and meals.
                </p>
              </div>
            </div>

            {/* Highlight 2: Golden Elevator */}
            <div className="highlight-card reveal-fade-up delay-200">
              <div className="highlight-image-box">
                <img 
                  src="/assets/hotel-kings-crown/photos/DSC00162.jpg" 
                  alt="Modern golden elevator with glass entrance" 
                  loading="lazy"
                />
              </div>
              <div className="highlight-body">
                <h3 className="highlight-title">Golden Guest Elevator</h3>
                <p className="highlight-desc">
                  Convenient elevator access to all guest room floors, framed by polished granite foyers and wide, clean hallways.
                </p>
              </div>
            </div>

            {/* Highlight 3: Modern Bathrooms */}
            <div className="highlight-card reveal-fade-up delay-300">
              <div className="highlight-image-box">
                <img 
                  src="/assets/hotel-kings-crown/photos/DSC00204.jpg" 
                  alt="Modern en-suite bathroom with marble tiling and chrome fixtures" 
                  loading="lazy"
                />
              </div>
              <div className="highlight-body">
                <h3 className="highlight-title">Modern En-Suite Bathrooms</h3>
                <p className="highlight-desc">
                  Every room includes an en-suite bathroom fitted with wall-hung dual-flush commodes, rain shower systems, and continuous hot water geysers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CURATED GALLERY PREVIEW */}
      <section className="section" id="gallery" aria-labelledby="gallery-preview-heading">
        <div className="container">
          <div className="reveal-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="eyebrow">PHOTOGRAPHY SPREAD</span>
              <h2 id="gallery-preview-heading">Explore Hotel Kings Crown</h2>
            </div>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => onNavigate('gallery')}
            >
              View All 26 Verified Photos
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="gallery-grid">
            {galleryPreview.map((photo, idx) => (
              <div 
                key={photo.id} 
                className={`gallery-item reveal-fade-up delay-${(idx % 3 + 1) * 100}`}
                onClick={() => onOpenLightbox(photo)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') onOpenLightbox(photo); }}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-caption">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LOCATION & DIRECTIONS */}
      <section className="section section-cream" id="location" aria-labelledby="location-heading">
        <div className="container">
          <div className="location-grid">
            <div className="location-details reveal-fade-up">
              <span className="eyebrow">MALVIYA NAGAR, JAIPUR</span>
              <h2 id="location-heading" style={{ marginBottom: '1.2rem' }}>
                Conveniently Located Behind WTP
              </h2>
              <p style={{ marginBottom: '1.8rem' }}>
                Hotel Kings Crown is situated on Mahalaxmi Road, right behind the renowned World Trade Park (WTP) in Malviya Nagar. An accessible neighborhood with dining, shopping, and smooth transit across Jaipur.
              </p>

              <div className="location-info-card">
                <div className="location-item">
                  <MapPin size={22} />
                  <div>
                    <div className="location-label">Address</div>
                    <div className="location-value">{HOTEL_DETAILS.address.full}</div>
                  </div>
                </div>

                <div className="location-item">
                  <MessageSquare size={22} />
                  <div>
                    <div className="location-label">Direct WhatsApp</div>
                    <div className="location-value">{HOTEL_DETAILS.whatsapp}</div>
                  </div>
                </div>

                <div className="location-item">
                  <ShieldCheck size={22} />
                  <div>
                    <div className="location-label">Direct Booking Advantage</div>
                    <div className="location-value">Best rates directly from hotel management with no third-party platform commissions.</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href={HOTEL_DETAILS.googleMapsUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={16} />
                  Get Google Maps Directions
                </a>
                <a 
                  href={`tel:${HOTEL_DETAILS.phone}`}
                  className="btn btn-outline"
                >
                  Call Reception
                </a>
              </div>
            </div>

            <div className="map-container reveal-fade-in delay-200">
              <iframe
                title="Hotel Kings Crown Location Map"
                src="https://maps.google.com/maps?q=Hotel+Kings+Crown+Malviya+Nagar+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. DIRECT BOOKING ENQUIRY SECTION */}
      <section className="section section-white" id="enquire" aria-labelledby="enquire-heading">
        <div className="container-narrow reveal-fade-up">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow">PLAN YOUR VISIT</span>
            <h2 id="enquire-heading" style={{ marginBottom: '0.8rem' }}>
              Planning Your Stay in Jaipur?
            </h2>
            <p>
              Get in touch with Hotel Kings Crown to enquire about room availability, rates, and your preferred dates. We will promptly reply to your enquiry.
            </p>
          </div>

          <BookingForm 
            initialRoomCategory={roomCategory}
            initialCheckIn={checkIn}
            initialCheckOut={checkOut}
            initialAdults={parseInt(guests, 10) || 1}
          />
        </div>
      </section>
    </main>
  );
};
