-- Create an enum for the commercial status
CREATE TYPE commercial_status AS ENUM (
  'Sin contactar',
  'Email enviado',
  'Abierto',
  'Interesado',
  'Llamada realizada',
  'Reunión agendada',
  'Propuesta enviada',
  'Cliente',
  'Descartado'
);

-- Create the companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  cif VARCHAR(50),
  province VARCHAR(100),
  city VARCHAR(100),
  address TEXT,
  postal_code VARCHAR(20),
  phone VARCHAR(50),
  email VARCHAR(255),
  website TEXT,
  google_maps_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  business_hours TEXT,
  rating DECIMAL(3,2),
  reviews_count INTEGER DEFAULT 0,
  category VARCHAR(100),
  
  -- CRM Specifics
  status commercial_status DEFAULT 'Sin contactar',
  tags TEXT[] DEFAULT '{}', -- E.g., ['Premium', 'Multimarca']
  
  -- AI Analysis Scores (0-100)
  ai_score_design INTEGER,
  ai_score_seo INTEGER,
  ai_score_speed INTEGER,
  ai_score_marketing INTEGER,
  ai_score_security INTEGER,
  ai_score_total INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for companies table
CREATE TRIGGER update_companies_modtime
BEFORE UPDATE ON companies
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (adjust according to auth requirements)
CREATE POLICY "Allow public read access"
  ON companies FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated insert access"
  ON companies FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update access"
  ON companies FOR UPDATE
  USING (auth.role() = 'authenticated');
