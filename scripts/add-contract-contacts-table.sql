-- Create contract_contacts table for storing contact information
CREATE TABLE IF NOT EXISTS contract_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  point_of_contact VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  section3_poc VARCHAR(255),
  section3_poc_email VARCHAR(255),
  section3_poc_phone VARCHAR(50),
  compliance_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_contract_contacts_contract_id ON contract_contacts(contract_id);

-- Enable Row Level Security
ALTER TABLE contract_contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view contract contacts" ON contract_contacts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert contract contacts" ON contract_contacts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contract contacts" ON contract_contacts
  FOR UPDATE USING (auth.role() = 'authenticated');
