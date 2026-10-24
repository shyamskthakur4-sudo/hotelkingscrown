import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ExternalLink } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/photos';
import { BookingForm } from '../components/BookingForm';
import { PageHero } from '../components/PageHero';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ContactPage: React.FC = () => {
  useScrollReveal();

  return (
    <main>
      {/* Front Hero with Authentic Property Photograph Background */}
      <PageHero
        photoSrc="/assets/hotel-kings-crown/photos/DSC00144.jpg"
        photoAlt="Hotel Kings Crown front desk reception counter with marble finish and Rajasthani wallpaper"
        eyebrow="DIRECT HOTEL CONCIERGE · 24/7 SUPPORT"
        title="Contact Hotel Kings Crown"
        subtitle="Reach out directly for room availability, rates, group stay requests, or directions to our property in Malviya Nagar, Jaipur behind WTP."
        actions={
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href={HOTEL_DETAILS.whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} />
              WhatsApp Us (+91 7425023130)
            </a>
            <a 
              href={`tel:${HOTEL_DETAILS.phone}`}
              className="btn btn-gold"
            >
              <Phone size={16} />
              Call Reception
            </a>
          </div>
        }
      />

      {/* Main Content: Info & Form */}
      <section className="section">
        <div className="container">
          <div className="location-grid" style={{ alignItems: 'flex-start', marginBottom: '4rem' }}>
            {/* Contact Details */}
            <div className="reveal-fade-up">
              <span className="eyebrow">HOTEL FRONT DESK</span>
              <h2 style={{ marginBottom: '1.2rem' }}>Reach Us Directly</h2>
              <p style={{ marginBottom: '2rem' }}>
                For the fastest assistance regarding reservations and room categories, connect with our team on WhatsApp or call our front desk directly.
              </p>

              <div className="location-info-card">
                {/* Address */}
                <div className="location-item">
                  <MapPin size={24} />
                  <div>
                    <div className="location-label">Property Address</div>
                    <div className="location-value">
                      <strong>Hotel Kings Crown</strong><br />
                      {HOTEL_DETAILS.address.line1}<br />
                      {HOTEL_DETAILS.address.locality}<br />
                      {HOTEL_DETAILS.address.city}, {HOTEL_DETAILS.address.state} {HOTEL_DETAILS.address.pincode}<br />
                      {HOTEL_DETAILS.address.country}
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="location-item">
                  <MessageSquare size={24} />
                  <div>
                    <div className="location-label">WhatsApp Enquiry Number</div>
                    <div className="location-value">
                      <a 
                        href={HOTEL_DETAILS.whatsappUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--whatsapp-green)', fontWeight: 600, fontSize: '1.05rem' }}
                      >
                        {HOTEL_DETAILS.whatsapp}
                      </a>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Instant chat assistance for rates and room photos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="location-item">
                  <Phone size={24} />
                  <div>
                    <div className="location-label">Front Desk Phone</div>
                    <div className="location-value">
                      <a 
                        href={`tel:${HOTEL_DETAILS.phone}`}
                        style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.05rem' }}
                      >
                        {HOTEL_DETAILS.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="location-item">
                  <Clock size={24} />
                  <div>
                    <div className="location-label">Front Desk Reception</div>
                    <div className="location-value">
                      Staffed 24 Hours / 7 Days a Week
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href={HOTEL_DETAILS.whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  Chat on WhatsApp
                </a>
                <a 
                  href={HOTEL_DETAILS.googleMapsUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={16} />
                  Get Google Maps Directions
                </a>
              </div>
            </div>

            {/* Direct Booking Enquiry Form */}
            <div className="reveal-fade-up delay-200">
              <BookingForm 
                title="Send a Booking Enquiry"
                subtitle="Fill in your details below. The hotel team will verify availability and respond with direct rates."
              />
            </div>
          </div>

          {/* Interactive Google Map */}
          <div className="reveal-fade-up">
            <div style={{ marginBottom: '1.2rem' }}>
              <span className="eyebrow">LOCATION MAP</span>
              <h3>Find Us Behind World Trade Park (WTP)</h3>
            </div>
            <div className="map-container" style={{ aspectRatio: '21 / 9', minHeight: '380px' }}>
              <iframe
                title="Hotel Kings Crown Jaipur Google Maps Location"
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
    </main>
  );
};
