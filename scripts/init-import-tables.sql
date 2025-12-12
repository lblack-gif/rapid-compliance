-- Minimal tables needed for DCHA contract import
-- This script creates only the essential tables without dependencies

-- 1. Clients table (no dependencies)
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    address TEXT,
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    total_contracts INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Funding sources table (no dependencies)
CREATE TABLE IF NOT EXISTS funding_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(100) NOT NULL UNIQUE,
    source_type VARCHAR(50),
    default_threshold DECIMAL(15,2),
    subpart_type VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default funding sources
INSERT INTO funding_sources (source_name, source_type, default_threshold, subpart_type) VALUES
    ('CDBG', 'HUD', 200000, 'B'),
    ('HOME', 'HUD', 200000, 'B'),
    ('HTF', 'HUD', 200000, 'B'),
    ('Section 3', 'HUD', 200000, 'B'),
    ('Lead Hazard Control', 'HUD', 100000, 'C'),
    ('Lead Hazard Reduction', 'HUD', 100000, 'C'),
    ('Other', 'General', 200000, 'B')
ON CONFLICT (source_name) DO NOTHING;

-- 3. Contracts table (depends on clients and funding_sources)
CREATE TABLE IF NOT EXISTS contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    contract_number VARCHAR(100),
    contract_name VARCHAR(255),
    vendor_name VARCHAR(255) NOT NULL,
    contract_value DECIMAL(15,2),
    start_date DATE,
    end_date DATE,
    funding_source_id UUID REFERENCES funding_sources(id) ON DELETE SET NULL,
    section3_applicable BOOLEAN DEFAULT false,
    applicability_subpart VARCHAR(10),
    labor_hour_benchmark DECIMAL(5,2),
    targeted_section3_benchmark DECIMAL(5,2) DEFAULT 5.00,
    title TEXT,
    scope_of_work TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Contract contacts table (depends on contracts)
CREATE TABLE IF NOT EXISTS contract_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    point_of_contact VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    section3_poc VARCHAR(255),
    section3_poc_email VARCHAR(255),
    section3_poc_phone VARCHAR(50),
    compliance_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tasks table (depends on contracts and clients)
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    task_type VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'pending',
    is_auto_generated BOOLEAN DEFAULT false,
    auto_generation_rule VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Benchmarks table (depends on contracts)
CREATE TABLE IF NOT EXISTS benchmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    benchmark_type VARCHAR(100) NOT NULL,
    target_percentage DECIMAL(5,2) NOT NULL,
    actual_percentage DECIMAL(5,2) DEFAULT 0,
    is_met BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Audit logs table (depends on contracts)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    action_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
CREATE INDEX IF NOT EXISTS idx_contracts_client ON contracts(client_id);
CREATE INDEX IF NOT EXISTS idx_contracts_number ON contracts(contract_number);
CREATE INDEX IF NOT EXISTS idx_contract_contacts_contract ON contract_contacts(contract_id);
CREATE INDEX IF NOT EXISTS idx_tasks_contract ON tasks(contract_id);
CREATE INDEX IF NOT EXISTS idx_tasks_client ON tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_benchmarks_contract ON benchmarks(contract_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_contract ON audit_logs(contract_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_benchmarks_updated_at BEFORE UPDATE ON benchmarks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for now, can be restricted later)
CREATE POLICY "Allow all operations on clients" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on contracts" ON contracts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on contract_contacts" ON contract_contacts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on benchmarks" ON benchmarks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on audit_logs" ON audit_logs FOR ALL USING (true) WITH CHECK (true);
