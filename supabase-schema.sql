-- Prince Green Thumbnails — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Thumbnails table
CREATE TABLE IF NOT EXISTS thumbnails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Finance', 'Motivation', 'Podcast', 'Tech', 'Spirituality')),
  image_url TEXT NOT NULL,
  before_url TEXT,
  after_url TEXT,
  client TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  plan TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'rejected')),
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'in_progress', 'completed')),
  payment_proof_url TEXT,
  whatsapp_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE thumbnails ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public can READ thumbnails
CREATE POLICY "Public can view thumbnails" ON thumbnails FOR SELECT USING (true);

-- Public can INSERT contacts and orders (from frontend forms)
CREATE POLICY "Public can submit contacts" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Service role can do everything (admin panel uses service role)
CREATE POLICY "Service role full access thumbnails" ON thumbnails USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access contacts" ON contact_submissions USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access orders" ON orders USING (auth.role() = 'service_role');

-- Storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT DO NOTHING;

-- Storage policy: anyone can upload payment proofs
CREATE POLICY "Anyone can upload payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-proofs');

-- Storage policy: payment proofs are publicly readable
CREATE POLICY "Payment proofs are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs');

-- Sample data
INSERT INTO thumbnails (title, category, image_url, client) VALUES
  ('How I Made $50K in 3 Months', 'Finance', 'https://picsum.photos/seed/fin1/640/360', 'WealthPath'),
  ('The Secret Morning Routine', 'Motivation', 'https://picsum.photos/seed/mot1/640/360', 'RiseDaily'),
  ('AI Will Replace You in 2025', 'Tech', 'https://picsum.photos/seed/tec1/640/360', 'TechFuture'),
  ('Deep Talk with Gary Vee', 'Podcast', 'https://picsum.photos/seed/pod1/640/360', 'DiveDeep'),
  ('Kundalini Awakening Guide', 'Spirituality', 'https://picsum.photos/seed/spi1/640/360', 'SoulPath');
