-- Section 3 Compliance Core Schema
-- Phase 1-3: Data model, relationships, and logic automations

-- Contracts table with Section 3 applicability logic
CREATE TABLE IF NOT EXISTS contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_number VARCHAR(100) UNIQUE NOT NULL,
    contract_name VARCHAR(255) NOT NULL,
    contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    
    -- Contract details
    contract_type VARCHAR(50) NOT NULL CHECK (contract_type IN ('construction', 'rehabilitation', 'public_construction', 'lead_hazard_control', 'other')),
    contract_value DECIMAL(15,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'terminated', 'suspended')),
    
    -- HUD funding information
    hud_funding_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    total_project_cost DECIMAL(15,2) NOT NULL,
    funding_source_id UUID REFERENCES funding_sources(id),
    
    -- Section 3 applicability (calculated fields)
    section3_applicable BOOLEAN DEFAULT false,
    applicability_subpart VARCHAR(10) CHECK (applicability_subpart IN ('Subpart B', 'Subpart C', 'N/A')),
    applicability_threshold DECIMAL(15,2),
    applicability_reason TEXT,
    applicability_calculated_at TIMESTAMP WITH TIME ZONE,
    
    -- Compliance requirements
    labor_hour_benchmark DECIMAL(5,2), -- 25% or 5% based on subpart
    targeted_section3_benchmark DECIMAL(5,2), -- 5% for targeted workers
    
    -- Document storage
    contract_document_url TEXT,
    signed_contract_url TEXT,
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funding sources table
CREATE TABLE IF NOT EXISTS funding_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(255) NOT NULL,
    source_type VARCHAR(100) NOT NULL, -- 'CDBG', 'HOME', 'Public Housing', 'Lead Hazard Control', etc.
    hud_program_code VARCHAR(50),
    
    -- Applicability rules
    default_threshold DECIMAL(15,2) NOT NULL, -- $200,000 or $100,000
    requires_section3 BOOLEAN DEFAULT true,
    subpart_type VARCHAR(10) CHECK (subpart_type IN ('Subpart B', 'Subpart C')),
    
    -- Metadata
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance forms table (Section 3 reporting forms)
CREATE TABLE IF NOT EXISTS compliance_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    
    -- Form details
    form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('quarterly', 'annual', 'final', 'ad_hoc')),
    reporting_period_start DATE NOT NULL,
    reporting_period_end DATE NOT NULL,
    due_date DATE NOT NULL,
    
    -- Form status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'submitted', 'approved', 'rejected')),
    submitted_at TIMESTAMP WITH TIME ZONE,
    submitted_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES users(id),
    
    -- Compliance data
    total_labor_hours DECIMAL(10,2) DEFAULT 0,
    section3_labor_hours DECIMAL(10,2) DEFAULT 0,
    targeted_section3_hours DECIMAL(10,2) DEFAULT 0,
    compliance_rate DECIMAL(5,2), -- Calculated percentage
    targeted_compliance_rate DECIMAL(5,2),
    
    -- Qualitative data
    outreach_efforts TEXT,
    training_provided TEXT,
    challenges_encountered TEXT,
    success_stories TEXT,
    
    -- Document storage
    form_document_url TEXT,
    supporting_documents JSONB DEFAULT '[]',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Benchmarks table (compliance thresholds and targets)
CREATE TABLE IF NOT EXISTS benchmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    
    -- Benchmark details
    benchmark_type VARCHAR(50) NOT NULL CHECK (benchmark_type IN ('labor_hours', 'targeted_hours', 'contracting', 'custom')),
    benchmark_name VARCHAR(255) NOT NULL,
    
    -- Target values
    target_percentage DECIMAL(5,2),
    target_absolute_value DECIMAL(15,2),
    measurement_unit VARCHAR(50), -- 'hours', 'dollars', 'count'
    
    -- Current performance
    current_value DECIMAL(15,2) DEFAULT 0,
    current_percentage DECIMAL(5,2) DEFAULT 0,
    is_met BOOLEAN DEFAULT false,
    
    -- Time period
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Metadata
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table (compliance tasks and reminders)
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    compliance_form_id UUID REFERENCES compliance_forms(id) ON DELETE SET NULL,
    
    -- Task details
    task_type VARCHAR(50) NOT NULL CHECK (task_type IN ('report_submission', 'worker_verification', 'document_upload', 'training', 'outreach', 'audit', 'custom')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    assigned_by UUID REFERENCES users(id),
    
    -- Status and priority
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue', 'cancelled')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Dates
    due_date DATE NOT NULL,
    reminder_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Automation flags
    is_auto_generated BOOLEAN DEFAULT false,
    auto_generation_rule VARCHAR(100), -- 'onCreateContract', 'onQuarterEnd', etc.
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contract labor hours tracking (links to existing labor_hours table)
CREATE TABLE IF NOT EXISTS contract_labor_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    
    -- Summary period
    summary_period VARCHAR(20) NOT NULL CHECK (summary_period IN ('daily', 'weekly', 'monthly', 'quarterly', 'annual', 'total')),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Labor hour totals
    total_hours DECIMAL(10,2) DEFAULT 0,
    section3_hours DECIMAL(10,2) DEFAULT 0,
    targeted_section3_hours DECIMAL(10,2) DEFAULT 0,
    
    -- Worker counts
    total_workers INTEGER DEFAULT 0,
    section3_workers INTEGER DEFAULT 0,
    targeted_section3_workers INTEGER DEFAULT 0,
    
    -- Compliance rates
    section3_compliance_rate DECIMAL(5,2),
    targeted_compliance_rate DECIMAL(5,2),
    
    -- Benchmark comparison
    meets_section3_benchmark BOOLEAN DEFAULT false,
    meets_targeted_benchmark BOOLEAN DEFAULT false,
    
    -- Metadata
    last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(contract_id, summary_period, period_start, period_end)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contracts_contractor ON contracts(contractor_id);
CREATE INDEX IF NOT EXISTS idx_contracts_project ON contracts(project_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_contracts_section3_applicable ON contracts(section3_applicable);
CREATE INDEX IF NOT EXISTS idx_contracts_funding_source ON contracts(funding_source_id);

CREATE INDEX IF NOT EXISTS idx_compliance_forms_contract ON compliance_forms(contract_id);
CREATE INDEX IF NOT EXISTS idx_compliance_forms_status ON compliance_forms(status);
CREATE INDEX IF NOT EXISTS idx_compliance_forms_due_date ON compliance_forms(due_date);
CREATE INDEX IF NOT EXISTS idx_compliance_forms_period ON compliance_forms(reporting_period_start, reporting_period_end);

CREATE INDEX IF NOT EXISTS idx_benchmarks_contract ON benchmarks(contract_id);
CREATE INDEX IF NOT EXISTS idx_benchmarks_type ON benchmarks(benchmark_type);
CREATE INDEX IF NOT EXISTS idx_benchmarks_period ON benchmarks(period_start, period_end);

CREATE INDEX IF NOT EXISTS idx_tasks_contract ON tasks(contract_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_auto_generated ON tasks(is_auto_generated);

CREATE INDEX IF NOT EXISTS idx_contract_labor_summary_contract ON contract_labor_summary(contract_id);
CREATE INDEX IF NOT EXISTS idx_contract_labor_summary_period ON contract_labor_summary(summary_period, period_start);

-- Triggers for updated_at
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funding_sources_updated_at BEFORE UPDATE ON funding_sources 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_forms_updated_at BEFORE UPDATE ON compliance_forms 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_benchmarks_updated_at BEFORE UPDATE ON benchmarks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contract_labor_summary_updated_at BEFORE UPDATE ON contract_labor_summary 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default funding sources based on HUD 24 CFR Part 75
INSERT INTO funding_sources (source_name, source_type, hud_program_code, default_threshold, subpart_type, description) VALUES
('Community Development Block Grant (CDBG)', 'CDBG', 'B-CDBG', 200000.00, 'Subpart B', 'Housing rehabilitation, housing construction, and other public construction projects'),
('HOME Investment Partnerships', 'HOME', 'M-HOME', 200000.00, 'Subpart B', 'Affordable housing development and rehabilitation'),
('Public Housing Capital Fund', 'Public Housing', 'PH-CF', 200000.00, 'Subpart B', 'Public housing modernization and development'),
('Public Housing Operating Fund', 'Public Housing', 'PH-OF', 200000.00, 'Subpart B', 'Public housing operations and maintenance'),
('Lead Hazard Control Program', 'Lead Hazard Control', 'LHC', 100000.00, 'Subpart C', 'Lead-based paint hazard control and healthy homes'),
('Lead-Based Paint Hazard Reduction', 'Lead Hazard Control', 'LBPHR', 100000.00, 'Subpart C', 'Lead hazard reduction in housing'),
('Choice Neighborhoods', 'Choice Neighborhoods', 'CN', 200000.00, 'Subpart B', 'Neighborhood revitalization'),
('Housing Opportunities for Persons with AIDS (HOPWA)', 'HOPWA', 'HOPWA', 200000.00, 'Subpart B', 'Housing assistance for persons with HIV/AIDS');

COMMENT ON TABLE contracts IS 'Core contracts table with Section 3 applicability determination';
COMMENT ON TABLE funding_sources IS 'HUD funding sources with Section 3 applicability rules';
COMMENT ON TABLE compliance_forms IS 'Section 3 compliance reporting forms (quarterly, annual, final)';
COMMENT ON TABLE benchmarks IS 'Compliance benchmarks and performance targets';
COMMENT ON TABLE tasks IS 'Compliance tasks, reminders, and workflow automation';
COMMENT ON TABLE contract_labor_summary IS 'Aggregated labor hour summaries by contract and period';
