
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL,
  service_label TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  budget TEXT,
  timeline TEXT,
  message TEXT,
  whatsapp_message TEXT,
  forwarded_to_whatsapp BOOLEAN NOT NULL DEFAULT false,
  source_page TEXT,
  referrer TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT bookings_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  CONSTRAINT bookings_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT bookings_phone_len CHECK (char_length(phone) BETWEEN 4 AND 32),
  CONSTRAINT bookings_message_len CHECK (message IS NULL OR char_length(message) <= 2000)
);

CREATE INDEX bookings_created_at_idx ON public.bookings (created_at DESC);
CREATE INDEX bookings_service_idx ON public.bookings (service);

GRANT INSERT ON public.bookings TO anon;
GRANT INSERT ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
