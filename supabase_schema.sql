-- Create the articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read published articles
CREATE POLICY "Public can read published articles" 
ON articles FOR SELECT 
USING (published = true);

-- Create a policy that allows authenticated users (admins) all access
CREATE POLICY "Admins have full access" 
ON articles FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows admins to see unpublished articles
-- (This is covered by the 'Admins have full access' policy)
