import React, { useState } from 'react';
import { 
  Wind, 
  Coffee, 
  Tv, 
  Building2, 
  Sparkles, 
  Check, 
  MessageSquare, 
  Phone, 
  Droplets,
  CalendarCheck
} from 'lucide-react';
import { HOTEL_PHOTOS, type PhotoItem } from '../data/photos';
import { BookingForm } from '../components/BookingForm';
import { PageHero } from '../components/PageHero';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { RoomCategory } from '../lib/supabase';

interface RoomsPageProps {
  onOpenLightbox: (photo: PhotoItem) => void;
  onOpenBooking: (category: RoomCategory) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenLightbox }) => {
  const [selectedFormCategory, setSelectedFormCategory] = useState<RoomCategory>('any');
  useScrollReveal();

  const deluxePhotos = HOTEL_PHOTOS.filter((p) => p.roomCategory === 'deluxe');
  const superDeluxePhotos = HOTEL_PHOTOS.filter((p) => p.roomCategory === 'super-deluxe');
  const bathroomPhotos = HOTEL_PHOTOS.filter((p) => p.category === 'bathrooms');

  const scrollToEnquiry = (category: RoomCategory) => {
    setSelectedFormCategory(category);
    const element = document.getElementById('room-booking-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* Front Hero with Authentic Property Photograph Background */}
      <PageHero
        photoSrc="/assets/hotel-kings-crown/photos/DSC00186.jpg"
        photoAlt="Deluxe Room with king bed, individual split air conditioning, and fresh white linens"
        eyebrow="ACCOMMODATIONS · MALVIYA NAGAR"
        title="Guest Rooms & Suites in Jaipur"
        subtitle="Designed for genuine comfort and peaceful relaxation, featuring individual climate control, clean white linens, modern en-suite bathrooms, and private balconies."
        actions={
          <div className="hero-quick-chips">
            <a href="#deluxe-room" className="hero-chip-link">
              ↓ Deluxe Room
            </a>
            <a href="#super-deluxe-room" className="hero-chip-link">
              ↓ Super Deluxe Suite
            </a>
            <button 
              type="button" 
              className="btn btn-gold btn-sm"
              onClick={() => scrollToEnquiry('any')}
            >
              Enquire Availability
            </button>
          </div>
        }
      />

      {/* DELUXE ROOM SECTION */}
      <section className="section" id="deluxe-room">
        <div className="container">
          <div className="room-editorial-item reveal-fade-up" style={{ marginBottom: '3rem' }}>
            <div className="room-media">
              <div className="room-main-frame">
                <span className="room-badge-pill">DELUXE ROOM</span>
                <img 
                  src="/assets/hotel-kings-crown/photos/DSC00186.jpg" 
                  alt="Deluxe Room with king bed, split air conditioner and ceiling fan" 
                  onClick={() => onOpenLightbox(deluxePhotos[1] || deluxePhotos[0])}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              {/* Thumbnails */}
              <div className="room-thumbnails-grid">
                {deluxePhotos.slice(0, 4).map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => onOpenLightbox(p)}
                    className="gallery-thumb-item"
                    style={{ 
                      borderRadius: '3px', 
                      overflow: 'hidden', 
                      aspectRatio: '16/11', 
                      cursor: 'pointer',
                      border: '1px solid var(--border-soft)'
                    }}
                  >
                    <img src={p.src} alt={p.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="room-info">
              <span className="eyebrow">CATEGORY 01</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>Deluxe Room</h2>
              <div className="room-sub">Comfortable, Quiet & Well-Appointed</div>
              <p className="room-desc">
                The Deluxe Room is an inviting private retreat featuring a comfortable double bed dressed in clean white cotton linens and tailored accent cushions. Designed with acoustic privacy and natural wood elements, it includes individual split air conditioning, a ceiling fan, bedside reading lights, and an intercom connection to the front desk.
              </p>

              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Verified Room Amenities:
              </h4>

              <ul className="room-feature-list" style={{ marginBottom: '2rem' }}>
                <li>
                  <Wind size={16} />
                  <span>Individual Split Air Conditioner & Ceiling Fan</span>
                </li>
                <li>
                  <Sparkles size={16} />
                  <span>Crisp Cotton Linens, Pillows & Bed Runner</span>
                </li>
                <li>
                  <Phone size={16} />
                  <span>Bedside Table & Direct Front Desk Intercom</span>
                </li>
                <li>
                  <Droplets size={16} />
                  <span>Modern En-Suite Bathroom with Hot Water Geyser</span>
                </li>
                <li>
                  <Check size={16} />
                  <span>Custom Roman Window Blinds & Ambient Downlights</span>
                </li>
              </ul>

              <div className="room-rate-note">
                Contact us for current rates and availability.
              </div>

              <div className="room-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => scrollToEnquiry('deluxe')}
                >
                  <CalendarCheck size={16} />
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
        </div>
      </section>

      <div className="container">
        <div className="section-divider" />
      </div>

      {/* SUPER DELUXE ROOM SECTION */}
      <section className="section" id="super-deluxe-room">
        <div className="container">
          <div className="room-editorial-item reversed reveal-fade-up" style={{ marginBottom: '3rem' }}>
            <div className="room-media">
              <div className="room-main-frame">
                <span className="room-badge-pill">SUPER DELUXE SUITE</span>
                <img 
                  src="/assets/hotel-kings-crown/photos/DSC00212.jpg" 
                  alt="Super Deluxe suite living lounge with private balcony and Smart TV" 
                  onClick={() => onOpenLightbox(superDeluxePhotos[0])}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              {/* Thumbnails */}
              <div className="room-thumbnails-grid">
                {superDeluxePhotos.slice(0, 4).map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => onOpenLightbox(p)}
                    className="gallery-thumb-item"
                    style={{ 
                      borderRadius: '3px', 
                      overflow: 'hidden', 
                      aspectRatio: '16/11', 
                      cursor: 'pointer',
                      border: '1px solid var(--border-soft)'
                    }}
                  >
                    <img src={p.src} alt={p.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="room-info">
              <span className="eyebrow">CATEGORY 02</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>Super Deluxe Room</h2>
              <div className="room-sub">Expanded Suite Living with Private Balcony & Minibar</div>
              <p className="room-desc">
                Our Super Deluxe Room offers generous space with a separate sitting lounge equipped with a plush maroon sofa, coffee table, and full glass sliding doors leading to a private outdoor balcony. Guests enjoy an in-room mini refrigerator, an electric tea kettle station, and a wall-mounted Smart TV for entertainment.
              </p>

              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Verified Suite Amenities:
              </h4>

              <ul className="room-feature-list" style={{ marginBottom: '2rem' }}>
                <li>
                  <Building2 size={16} />
                  <span>Private Balcony with Glass Sliding Doors & Outside View</span>
                </li>
                <li>
                  <Tv size={16} />
                  <span>Wall-Mounted Smart TV in Dedicated Living Area</span>
                </li>
                <li>
                  <Coffee size={16} />
                  <span>In-Room Refrigerator & Electric Tea/Coffee Kettle</span>
                </li>
                <li>
                  <Sparkles size={16} />
                  <span>Plush Velvet Couch, Ottoman Table & Heritage Artwork</span>
                </li>
                <li>
                  <Wind size={16} />
                  <span>Individual Climate Control (Split AC & Ceiling Fan)</span>
                </li>
                <li>
                  <Droplets size={16} />
                  <span>En-Suite Bathroom with Overhead Rain Shower & Geyser</span>
                </li>
              </ul>

              <div className="room-rate-note">
                Contact us for current rates and availability.
              </div>

              <div className="room-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => scrollToEnquiry('super-deluxe')}
                >
                  <CalendarCheck size={16} />
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
        </div>
      </section>

      {/* BATHROOM SPECIFICATIONS */}
      <section className="section section-cream" aria-labelledby="bathroom-heading">
        <div className="container">
          <div className="reveal-fade-up" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
            <span className="eyebrow">HYGIENE & COMFORT</span>
            <h2 id="bathroom-heading" style={{ marginBottom: '0.8rem' }}>
              Modern En-Suite Bathrooms
            </h2>
            <p>
              Cleanliness and modern plumbing are foundational to a pleasant stay. Each room features an attached private bathroom with quality fixtures and continuous hot water.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
            {bathroomPhotos.map((photo, idx) => (
              <div 
                key={photo.id}
                className={`highlight-card reveal-fade-up delay-${(idx + 1) * 100}`}
                onClick={() => onOpenLightbox(photo)}
                style={{ cursor: 'pointer' }}
              >
                <div className="highlight-image-box" style={{ aspectRatio: '4/3' }}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <div className="highlight-body">
                  <h3 className="highlight-title" style={{ fontSize: '1.15rem' }}>{photo.title}</h3>
                  <p className="highlight-desc">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT BOOKING ENQUIRY SECTION */}
      <section className="section section-white" id="room-booking-form-section">
        <div className="container-narrow reveal-fade-up">
          <BookingForm 
            initialRoomCategory={selectedFormCategory}
            title="Book Your Stay at Hotel Kings Crown"
            subtitle="Let us know your travel dates and room preference. We will confirm room availability and direct rates directly with you."
          />
        </div>
      </section>
    </main>
  );
};
