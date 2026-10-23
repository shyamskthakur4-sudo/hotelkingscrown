import React from 'react';
import { 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  Coffee, 
  Wind, 
  Tv, 
  ShieldCheck, 
  UtensilsCrossed, 
  Building2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { HOTEL_DETAILS, HOTEL_PHOTOS, type PhotoItem } from '../data/photos';
import { BookingForm } from '../components/BookingForm';
import { buildWhatsAppLink } from '../lib/whatsapp';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenLightbox: (photo: PhotoItem) => void;
  onOpenBooking: (roomCategory?: 'deluxe' | 'super-deluxe' | 'any') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenLightbox,
  onOpenBooking
}) => {
  // Select curated preview photos
  const galleryPreview = HOTEL_PHOTOS.filter((p) => p.featured).slice(0, 6);

  return (
    <main id="main-content">
      {/* 1. HERO SECTION */}
      <section className="hero-section" aria-label="Welcome to Hotel Kings Crown">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">A WELCOMING STAY IN JAIPUR</span>
            <h1 className="hero-title">
              A Comfortable Stay in the Heart of Jaipur
            </h1>
            <p className="hero-desc">
              Discover a welcoming space to relax, unwind, and make the most of your time in Jaipur at Hotel Kings Crown. Located in Malviya Nagar, behind World Trade Park (WTP).
            </p>

            <div className="hero-actions">
              <button 
                type="button" 
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('rooms')}
              >
                Explore Our Rooms
                <ArrowRight size={18} />
              </button>
              <a 
                href={HOTEL_DETAILS.whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={18} />
                Enquire on WhatsApp
              </a>
            </div>

            <div className="hero-meta-strip">
              <div className="hero-meta-item">
                <MapPin size={18} />
                <span>Behind WTP, Malviya Nagar</span>
              </div>
              <div className="hero-meta-item">
                <UtensilsCrossed size={18} />
                <span>On-Site Dining Hall</span>
              </div>
              <div className="hero-meta-item">
                <Building2 size={18} />
                <span>Elevator to All Floors</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-card">
              <img 
                src="/assets/hotel-kings-crown/photos/DSC00153.jpg" 
                alt="Hotel Kings Crown reception lobby and guest relaxation lounge" 
                className="hero-main-img"
                loading="eager"
              />
              <div className="hero-image-badge">
                Actual Hotel Lobby & Reception Lounge
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHORT EDITORIAL INTRODUCTION */}
      <section className="section section-cream" aria-labelledby="intro-heading">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image-frame">
              <img 
                src="/assets/hotel-kings-crown/photos/DSC00144.jpg" 
                alt="Front desk reception counter with marble finish and Rajasthani palace wallpaper" 
                loading="lazy"
              />
              <p className="intro-caption">
                Warm reception desk with authentic heritage-inspired interiors and 24-hour guest assistance.
              </p>
            </div>

            <div>
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

      {/* 3. ROOM CATEGORIES */}
      <section className="section" id="rooms" aria-labelledby="rooms-heading">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span className="eyebrow">ACCOMMODATIONS</span>
            <h2 id="rooms-heading" style={{ marginBottom: '0.8rem' }}>
              Distinctive Rooms for Your Jaipur Visit
            </h2>
            <p>
              Choose between our comfortable Deluxe Rooms or spacious Super Deluxe Suites featuring private balconies and expanded living lounges.
            </p>
          </div>

          {/* Deluxe Room Spread */}
          <div className="room-editorial-item">
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
          <div className="room-editorial-item reversed">
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

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
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

      {/* 4. PROPERTY HIGHLIGHTS */}
      <section className="section section-cream" aria-labelledby="highlights-heading">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
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
            <div className="highlight-card">
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
            <div className="highlight-card">
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
            <div className="highlight-card">
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

      {/* 5. CURATED GALLERY PREVIEW */}
      <section className="section" id="gallery" aria-labelledby="gallery-preview-heading">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
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
            {galleryPreview.map((photo) => (
              <div 
                key={photo.id} 
                className="gallery-item"
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

      {/* 6. LOCATION & DIRECTIONS */}
      <section className="section section-cream" id="location" aria-labelledby="location-heading">
        <div className="container">
          <div className="location-grid">
            <div className="location-details">
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

            <div className="map-container">
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

      {/* 7. DIRECT BOOKING ENQUIRY SECTION */}
      <section className="section section-white" id="enquire" aria-labelledby="enquire-heading">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow">PLAN YOUR VISIT</span>
            <h2 id="enquire-heading" style={{ marginBottom: '0.8rem' }}>
              Planning Your Stay in Jaipur?
            </h2>
            <p>
              Get in touch with Hotel Kings Crown to enquire about room availability, rates, and your preferred dates. We will promptly reply to your enquiry.
            </p>
          </div>

          <BookingForm />
        </div>
      </section>
    </main>
  );
};
