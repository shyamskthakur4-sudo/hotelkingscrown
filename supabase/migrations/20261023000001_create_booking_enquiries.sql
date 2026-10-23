-- Hotel Kings Crown, Jaipur
-- Booking Enquiries Database Schema Migration

CREATE TABLE IF NOT EXISTS public.booking_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL CHECK (length(trim(guest_name)) >= 2 AND length(guest_name) <= 150),
    contact_number TEXT NOT NULL CHECK (length(trim(contact_number)) >= 7 AND length(contact_number) <= 30),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    adults INTEGER NOT NULL DEFAULT 1 CHECK (adults >= 1 AND adults <= 20),
    children INTEGER NOT NULL DEFAULT 0 CHECK (children >= 0 AND children <= 20),
    room_category TEXT NOT NULL CHECK (room_category IN ('deluxe', 'super-deluxe', 'any')),
    message TEXT CHECK (length(message) <= 2000),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT valid_dates CHECK (check_out >= check_in)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.booking_enquiries ENABLE ROW LEVEL SECURITY;

-- 1. Public visitors can INSERT enquiries only (no public reading, updating, or deleting)
CREATE POLICY "Public visitors can submit booking enquiry"
ON public.booking_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Authenticated hotel staff can view enquiries
CREATE POLICY "Authenticated users can view booking enquiries"
ON public.booking_enquiries
FOR SELECT
TO authenticated
USING (true);

-- 3. Authenticated hotel staff can update enquiry statuses
CREATE POLICY "Authenticated users can update booking enquiries"
ON public.booking_enquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. Authenticated hotel staff can delete enquiries
CREATE POLICY "Authenticated users can delete booking enquiries"
ON public.booking_enquiries
FOR DELETE
TO authenticated
USING (true);
