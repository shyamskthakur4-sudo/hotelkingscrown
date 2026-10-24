export interface WhatsAppEnquiryDetails {
  guest_name?: string;
  check_in?: string;
  check_out?: string;
  adults?: number | string;
  children?: number | string;
  room_category?: string;
  message?: string;
}

const WHATSAPP_PHONE = '917425023130';

export function getRoomCategoryLabel(category?: string): string {
  if (category === 'deluxe') return 'Deluxe Room';
  if (category === 'super-deluxe') return 'Super Deluxe Room';
  return 'Deluxe or Super Deluxe (Open to suggestions)';
}

/**
 * Generate a properly encoded WhatsApp deep-link with prefilled text.
 */
export function buildWhatsAppLink(details?: WhatsAppEnquiryDetails): string {
  if (!details || (!details.guest_name && !details.check_in)) {
    const defaultText = `Hello Hotel Kings Crown, Jaipur. I would like to enquire about room availability and current rates for a stay in Malviya Nagar. Thank you.`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(defaultText)}`;
  }

  const roomLabel = getRoomCategoryLabel(details.room_category);
  const adultsCount = details.adults || 1;
  const childrenCount = details.children !== undefined ? details.children : 0;

  const lines = [
    `Hello Hotel Kings Crown, Jaipur. I would like to enquire about a stay.`,
    ``,
    `Guest name: ${details.guest_name || 'Guest'}`,
    `Check-in: ${details.check_in || 'To be decided'}`,
    `Check-out: ${details.check_out || 'To be decided'}`,
    `Adults: ${adultsCount}`,
    `Children: ${childrenCount}`,
    `Preferred room: ${roomLabel}`
  ];

  if (details.message && details.message.trim().length > 0) {
    lines.push(`Additional request: ${details.message.trim()}`);
  }

  lines.push(``);
  lines.push(`Please share the current room rates and availability. Thank you.`);

  const messageText = lines.join('\n');
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(messageText)}`;
}
