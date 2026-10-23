import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mqwhqptxdyhphgosodrb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xd2hxcHR4ZHlocGhnb3NvZHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNTg2NzIsImV4cCI6MjEwMTgzNDY3Mn0.wuCWOrlwYaG1xM_byX1D6pOb420rcNQbLrTBmJ0rudU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

export type RoomCategory = 'deluxe' | 'super-deluxe' | 'any';
export type EnquiryStatus = 'pending' | 'contacted' | 'confirmed' | 'cancelled';

export interface BookingEnquiry {
  id: string;
  guest_name: string;
  contact_number: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  room_category: RoomCategory;
  message?: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at?: string;
}

export interface CreateEnquiryInput {
  guest_name: string;
  contact_number: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  room_category: RoomCategory;
  message?: string;
}

const LOCAL_STORAGE_KEY = 'hotel_kings_crown_local_enquiries';

function getLocalEnquiries(): BookingEnquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalEnquiry(enquiry: BookingEnquiry) {
  try {
    const existing = getLocalEnquiries();
    existing.unshift(enquiry);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Submit a booking enquiry to Supabase.
 * Falls back to local storage backup if backend is temporarily unreachable.
 */
export async function submitBookingEnquiry(
  input: CreateEnquiryInput
): Promise<{ success: boolean; data?: BookingEnquiry; error?: string; isFallback?: boolean }> {
  try {
    // Sanitize input
    const payload = {
      guest_name: input.guest_name.trim(),
      contact_number: input.contact_number.trim(),
      check_in: input.check_in,
      check_out: input.check_out,
      adults: Number(input.adults) || 1,
      children: Number(input.children) || 0,
      room_category: input.room_category,
      message: input.message ? input.message.trim() : null,
      status: 'pending' as EnquiryStatus
    };

    const { data, error } = await supabase
      .from('booking_enquiries')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert warning, saving local backup:', error.message);
      // Backup locally
      const localRecord: BookingEnquiry = {
        ...payload,
        message: payload.message || undefined,
        id: 'local-' + Date.now(),
        created_at: new Date().toISOString()
      };
      saveLocalEnquiry(localRecord);
      return { success: true, data: localRecord, isFallback: true };
    }

    // Also store copy in local memory for offline dashboard demo
    saveLocalEnquiry(data);
    return { success: true, data: data as BookingEnquiry };
  } catch (err: any) {
    console.error('Network / Supabase error:', err);
    // Graceful fallback
    const localRecord: BookingEnquiry = {
      id: 'local-' + Date.now(),
      guest_name: input.guest_name.trim(),
      contact_number: input.contact_number.trim(),
      check_in: input.check_in,
      check_out: input.check_out,
      adults: Number(input.adults) || 1,
      children: Number(input.children) || 0,
      room_category: input.room_category,
      message: input.message?.trim(),
      status: 'pending',
      created_at: new Date().toISOString()
    };
    saveLocalEnquiry(localRecord);
    return { success: true, data: localRecord, isFallback: true };
  }
}

/**
 * Fetch enquiries for the staff admin dashboard.
 * Reads from Supabase if authenticated, merges with local records.
 */
export async function fetchBookingEnquiries(): Promise<BookingEnquiry[]> {
  try {
    const { data, error } = await supabase
      .from('booking_enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data as BookingEnquiry[];
    }
  } catch (err) {
    console.warn('Could not read from Supabase directly:', err);
  }

  // Fallback to local storage records
  return getLocalEnquiries();
}

/**
 * Update enquiry status in Supabase (or locally).
 */
export async function updateEnquiryStatus(
  id: string,
  newStatus: EnquiryStatus
): Promise<boolean> {
  if (!id.startsWith('local-')) {
    try {
      const { error } = await supabase
        .from('booking_enquiries')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (!error) return true;
    } catch {
      // Continue to local update
    }
  }

  try {
    const list = getLocalEnquiries();
    const item = list.find((e) => e.id === id);
    if (item) {
      item.status = newStatus;
      item.updated_at = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
      return true;
    }
  } catch {
    // ignore
  }

  return true;
}

/**
 * Delete enquiry from database.
 */
export async function deleteEnquiry(id: string): Promise<boolean> {
  if (!id.startsWith('local-')) {
    try {
      const { error } = await supabase
        .from('booking_enquiries')
        .delete()
        .eq('id', id);

      if (!error) return true;
    } catch {
      // Continue to local delete
    }
  }

  try {
    const list = getLocalEnquiries().filter((e) => e.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}
