import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, MessageSquare, Loader2, Calendar, User, Phone, BedDouble } from 'lucide-react';
import { submitBookingEnquiry, type RoomCategory } from '../lib/supabase';
import { buildWhatsAppLink } from '../lib/whatsapp';

interface BookingFormProps {
  initialRoomCategory?: RoomCategory;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialRoomCategory = 'any',
  title = 'Enquire About Room Availability',
  subtitle = 'Share your preferred dates and room preference. The hotel team will confirm availability and current rates directly.'
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    guest_name: '',
    contact_number: '',
    check_in: '',
    check_out: '',
    adults: 2,
    children: 0,
    room_category: initialRoomCategory,
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message?: string;
    isFallback?: boolean;
    whatsAppLink?: string;
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.guest_name.trim() || formData.guest_name.trim().length < 2) {
      errs.guest_name = 'Please provide your full name.';
    }

    // Phone / WhatsApp validation: at least 7 digits, sensible chars
    const cleanedPhone = formData.contact_number.replace(/\D/g, '');
    if (!formData.contact_number.trim() || cleanedPhone.length < 8) {
      errs.contact_number = 'Please enter a valid WhatsApp or contact number.';
    }

    if (!formData.check_in) {
      errs.check_in = 'Please select a check-in date.';
    } else if (formData.check_in < todayStr) {
      errs.check_in = 'Check-in date cannot be in the past.';
    }

    if (!formData.check_out) {
      errs.check_out = 'Please select a check-out date.';
    } else if (formData.check_in && formData.check_out < formData.check_in) {
      errs.check_out = 'Check-out date must be on or after check-in date.';
    }

    if (formData.adults < 1) {
      errs.adults = 'At least 1 adult is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? Number(value) : value
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    const waLink = buildWhatsAppLink({
      guest_name: formData.guest_name,
      check_in: formData.check_in,
      check_out: formData.check_out,
      adults: formData.adults,
      children: formData.children,
      room_category: formData.room_category,
      message: formData.message
    });

    try {
      const result = await submitBookingEnquiry({
        guest_name: formData.guest_name,
        contact_number: formData.contact_number,
        check_in: formData.check_in,
        check_out: formData.check_out,
        adults: formData.adults,
        children: formData.children,
        room_category: formData.room_category as RoomCategory,
        message: formData.message
      });

      if (result.success) {
        setSubmitResult({
          success: true,
          message:
            'Your enquiry has been received. The hotel will need to confirm availability and applicable rates.',
          isFallback: result.isFallback,
          whatsAppLink: waLink
        });
      } else {
        setSubmitResult({
          success: false,
          message:
            'We were unable to save your enquiry online due to a temporary network issue. Please send your enquiry directly via WhatsApp to ensure immediate response.',
          whatsAppLink: waLink
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message:
          'Online enquiry service is momentarily unavailable. Please click below to send your details directly via WhatsApp.',
        whatsAppLink: waLink
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitResult(null);
    setFormData({
      guest_name: '',
      contact_number: '',
      check_in: '',
      check_out: '',
      adults: 2,
      children: 0,
      room_category: 'any',
      message: ''
    });
  };

  return (
    <div className="enquiry-card" id="booking-enquiry-form">
      <div style={{ marginBottom: '2rem' }}>
        <span className="eyebrow">DIRECT RESERVATION ENQUIRY</span>
        <h3 style={{ marginBottom: '0.6rem' }}>{title}</h3>
        <p style={{ fontSize: '0.94rem' }}>{subtitle}</p>
      </div>

      {submitResult && submitResult.success && (
        <div className="alert alert-success">
          <CheckCircle2 size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.35rem', color: '#176038' }}>
              Enquiry Submitted Successfully
            </h4>
            <p style={{ color: '#1E6E41', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
              {submitResult.message}
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {submitResult.whatsAppLink && (
                <a
                  href={submitResult.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageSquare size={16} />
                  Open in WhatsApp to Send Instantly
                </a>
              )}
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleReset}
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {submitResult && !submitResult.success && (
        <div className="alert alert-error">
          <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.35rem', color: '#9C271E' }}>
              Online Submission Notice
            </h4>
            <p style={{ color: '#881F17', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
              {submitResult.message}
            </p>
            {submitResult.whatsAppLink && (
              <a
                href={submitResult.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageSquare size={16} />
                Send Enquiry Directly via WhatsApp
              </a>
            )}
          </div>
        </div>
      )}

      {(!submitResult || !submitResult.success) && (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Guest Name */}
            <div>
              <label htmlFor="guest_name" className="form-label">
                <User size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                Your Full Name <span className="required-dot">*</span>
              </label>
              <input
                type="text"
                id="guest_name"
                name="guest_name"
                placeholder="e.g. Rajesh Sharma"
                value={formData.guest_name}
                onChange={handleChange}
                className={`form-input ${errors.guest_name ? 'error' : ''}`}
                required
              />
              {errors.guest_name && <p className="form-error-msg">{errors.guest_name}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contact_number" className="form-label">
                <Phone size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                WhatsApp or Phone Number <span className="required-dot">*</span>
              </label>
              <input
                type="tel"
                id="contact_number"
                name="contact_number"
                placeholder="e.g. +91 98765 43210"
                value={formData.contact_number}
                onChange={handleChange}
                className={`form-input ${errors.contact_number ? 'error' : ''}`}
                required
              />
              {errors.contact_number && <p className="form-error-msg">{errors.contact_number}</p>}
            </div>

            {/* Check-in Date */}
            <div>
              <label htmlFor="check_in" className="form-label">
                <Calendar size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                Check-in Date <span className="required-dot">*</span>
              </label>
              <input
                type="date"
                id="check_in"
                name="check_in"
                min={todayStr}
                value={formData.check_in}
                onChange={handleChange}
                className={`form-input ${errors.check_in ? 'error' : ''}`}
                required
              />
              {errors.check_in && <p className="form-error-msg">{errors.check_in}</p>}
            </div>

            {/* Check-out Date */}
            <div>
              <label htmlFor="check_out" className="form-label">
                <Calendar size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                Check-out Date <span className="required-dot">*</span>
              </label>
              <input
                type="date"
                id="check_out"
                name="check_out"
                min={formData.check_in || todayStr}
                value={formData.check_out}
                onChange={handleChange}
                className={`form-input ${errors.check_out ? 'error' : ''}`}
                required
              />
              {errors.check_out && <p className="form-error-msg">{errors.check_out}</p>}
            </div>

            {/* Adults & Children */}
            <div>
              <label htmlFor="adults" className="form-label">
                Adults
              </label>
              <select
                id="adults"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                className="form-select"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="children" className="form-label">
                Children
              </label>
              <select
                id="children"
                name="children"
                value={formData.children}
                onChange={handleChange}
                className="form-select"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Room Category */}
            <div className="form-group-full">
              <label htmlFor="room_category" className="form-label">
                <BedDouble size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                Preferred Room Category
              </label>
              <select
                id="room_category"
                name="room_category"
                value={formData.room_category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="any">Deluxe or Super Deluxe (Open to Suggestions)</option>
                <option value="deluxe">Deluxe Room (King Bed / Split AC)</option>
                <option value="super-deluxe">Super Deluxe Room (Suite Living Area & Balcony)</option>
              </select>
            </div>

            {/* Additional Message */}
            <div className="form-group-full">
              <label htmlFor="message" className="form-label">
                Special Requests or Travel Notes (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Let us know approximate arrival time or special preferences..."
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                maxLength={1000}
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ minWidth: '220px' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Recording Enquiry...
                </>
              ) : (
                'Submit Room Enquiry'
              )}
            </button>

            <a
              href={buildWhatsAppLink({
                guest_name: formData.guest_name,
                check_in: formData.check_in,
                check_out: formData.check_out,
                adults: formData.adults,
                children: formData.children,
                room_category: formData.room_category,
                message: formData.message
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} />
              Enquire Directly on WhatsApp
            </a>
          </div>

          <p className="form-note">
            <strong>Please note:</strong> This form initiates a direct booking enquiry with Hotel Kings Crown management. Room availability and applicable rates will be communicated directly to your contact number.
          </p>
        </form>
      )}
    </div>
  );
};
