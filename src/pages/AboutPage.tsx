import { MessageSquare, Check, ShieldCheck } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/photos';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <main>
      {/* Page Header */}
      <section className="section section-cream" style={{ paddingBottom: '3.5rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="eyebrow">ABOUT THE PROPERTY</span>
          <h1 style={{ marginBottom: '1.2rem' }}>
            Hospitality Grounded in Comfort & Care
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            Hotel Kings Crown is a welcoming, independently operated hotel in Malviya Nagar, Jaipur, offering comfortable accommodations and practical conveniences for travelers.
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="section">
        <div className="container">
          <div className="intro-grid" style={{ marginBottom: '5rem' }}>
            <div>
              <span className="eyebrow">OUR LOCATION & COMMITMENT</span>
              <h2 style={{ marginBottom: '1.4rem' }}>
                Thoughtful Accommodations in Malviya Nagar
              </h2>
              <p style={{ marginBottom: '1.2rem' }}>
                Located on Mahalaxmi Road, directly behind Jaipur's prominent World Trade Park (WTP), Hotel Kings Crown provides an ideal base for business trips, leisure getaways, and family stays in Rajasthan's capital.
              </p>
              <p style={{ marginBottom: '1.2rem' }}>
                We believe hospitality begins with authentic care and practical comfort: impeccably clean rooms, dependable air conditioning, hot water geysers in every bathroom, and a supportive team ready to assist guests around the clock.
              </p>
              <p style={{ marginBottom: '1.8rem' }}>
                Rather than exaggerated promises, we focus on what matters most to discerning travelers—a restful night's sleep, clean modern spaces, and genuine warmth.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onOpenBooking}
                >
                  Enquire About Room Availability
                </button>
                <a
                  href={HOTEL_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  WhatsApp Direct Enquiry
                </a>
              </div>
            </div>

            <div className="intro-image-frame">
              <img
                src="/assets/hotel-kings-crown/photos/DSC00134.jpg"
                alt="Hotel Kings Crown reception lounge seating with curved sofas"
                loading="lazy"
              />
              <p className="intro-caption">
                Guest lounge at Hotel Kings Crown designed for relaxing, reading, or greeting visitors.
              </p>
            </div>
          </div>

          {/* Genuine Facilities Section */}
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="eyebrow">VERIFIED FACILITIES</span>
            <h2 style={{ marginBottom: '0.8rem' }}>What You Will Find at Hotel Kings Crown</h2>
            <p>
              All amenities listed below represent actual facilities visible in our genuine property photographs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-soft)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>24/7 Front Desk Reception</h3>
              <p style={{ fontSize: '0.92rem' }}>
                Staffed reception desk to welcome guests, provide check-in assistance, answer local travel questions, and ensure your stay is seamless.
              </p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-soft)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>On-Site Dining Hall</h3>
              <p style={{ fontSize: '0.92rem' }}>
                Clean, climate-controlled dining area with marble tables, comfortable seating, and ambient lighting for morning breakfasts and meals.
              </p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-soft)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Guest Elevator Access</h3>
              <p style={{ fontSize: '0.92rem' }}>
                Modern elevator serving all guest room floors, making movement with luggage effortless for seniors and families.
              </p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-soft)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Climate-Controlled Rooms</h3>
              <p style={{ fontSize: '0.92rem' }}>
                Each Deluxe and Super Deluxe room is equipped with an individual split air conditioning unit and ceiling fan for customized comfort.
              </p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-soft)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Modern Attached Bathrooms</h3>
              <p style={{ fontSize: '0.92rem' }}>
                En-suite bathrooms featuring wall-hung commodes, vanity washbasins, rain shower heads, and individual water heating geysers.
              </p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-soft)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Direct Communication</h3>
              <p style={{ fontSize: '0.92rem' }}>
                Direct WhatsApp and telephone access to hotel management for quick answers on rates, directions, and flexible travel plans.
              </p>
            </div>
          </div>

          {/* Photo Pair */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-soft)' }}>
              <img
                src="/assets/hotel-kings-crown/photos/DSC00177.jpg"
                alt="Hotel Kings Crown dining hall with marble tables"
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-soft)' }}>
              <img
                src="/assets/hotel-kings-crown/photos/DSC00162.jpg"
                alt="Golden elevator entrance and foyer"
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
