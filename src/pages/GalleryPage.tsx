import React, { useState } from 'react';
import { HOTEL_PHOTOS, type PhotoItem } from '../data/photos';
import { PageHero } from '../components/PageHero';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface GalleryPageProps {
  onOpenLightbox: (photo: PhotoItem) => void;
  onOpenBooking: () => void;
}

type CategoryFilter = 'all' | 'rooms' | 'interiors' | 'dining' | 'bathrooms';

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenLightbox, onOpenBooking }) => {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  useScrollReveal(filter);

  const filteredPhotos = filter === 'all' 
    ? HOTEL_PHOTOS 
    : HOTEL_PHOTOS.filter((p) => p.category === filter);

  return (
    <main>
      {/* Front Hero with Authentic Property Photograph Background */}
      <PageHero
        photoSrc="/assets/hotel-kings-crown/photos/DSC00171.jpg"
        photoAlt="Hotel Kings Crown dining hall with marble tables and gold accents"
        eyebrow="VISUAL ARCHIVE · 26 REAL PHOTOGRAPHS"
        title="Hotel Kings Crown Photo Gallery"
        subtitle="Explore authentic, unedited photographs of our guest rooms, lobby lounge, reception, dining hall, modern elevator, and en-suite bathrooms in Malviya Nagar, Jaipur."
      />

      {/* Filter and Grid */}
      <section className="section">
        <div className="container">
          {/* Category Filter Buttons */}
          <div className="gallery-filter-bar reveal-fade-up">
            <button
              type="button"
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Photos ({HOTEL_PHOTOS.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'rooms' ? 'active' : ''}`}
              onClick={() => setFilter('rooms')}
            >
              Guest Rooms & Suites ({HOTEL_PHOTOS.filter((p) => p.category === 'rooms').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'interiors' ? 'active' : ''}`}
              onClick={() => setFilter('interiors')}
            >
              Lobby & Reception ({HOTEL_PHOTOS.filter((p) => p.category === 'interiors').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'dining' ? 'active' : ''}`}
              onClick={() => setFilter('dining')}
            >
              Dining Hall ({HOTEL_PHOTOS.filter((p) => p.category === 'dining').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'bathrooms' ? 'active' : ''}`}
              onClick={() => setFilter('bathrooms')}
            >
              Bathrooms ({HOTEL_PHOTOS.filter((p) => p.category === 'bathrooms').length})
            </button>
          </div>

          {/* Photo Grid */}
          <div className="gallery-grid">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className={`gallery-item reveal-fade-up delay-${(idx % 4 + 1) * 100}`}
                onClick={() => onOpenLightbox(photo)}
                role="button"
                tabIndex={0}
                aria-label={`Open photo: ${photo.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') onOpenLightbox(photo); }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-caption">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Enquiry Banner */}
          <div 
            className="reveal-fade-up"
            style={{ 
              marginTop: '4rem', 
              padding: '3rem 2rem', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: '4px',
              textAlign: 'center',
              border: '1px solid var(--border-soft)'
            }}
          >
            <h3 style={{ marginBottom: '0.8rem' }}>Like What You See?</h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.8rem auto' }}>
              Enquire directly with Hotel Kings Crown for current room availability, rates, and personalized assistance.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onOpenBooking}
            >
              Enquire About a Room
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
