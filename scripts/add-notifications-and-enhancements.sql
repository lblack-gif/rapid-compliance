-- Add notifications table for alert system
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification details
    notification_type VARCHAR(50) NOT NULL CHECK (notification_type IN ('overdue_task', 'missing_report', 'below_benchmark', 'general')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    
    -- Related entities
    related_contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    related_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update contract_analyses table to include extracted OCR fields
ALTER TABLE contract_analyses ADD COLUMN IF NOT EXISTS vendor_name VARCHAR(255);
ALTER TABLE contract_analyses ADD COLUMN IF NOT EXISTS contract_value DECIMAL(15,2);
ALTER TABLE contract_analyses ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE contract_analyses ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE contract_analyses ADD COLUMN IF NOT EXISTS funding_source VARCHAR(100);

-- Add lifecycle_stage to contracts table
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS lifecycle_stage VARCHAR(50) DEFAULT 'pre_award' 
    CHECK (lifecycle_stage IN ('pre_award', 'award', 'construction', 'quarterly', 'close_out'));

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_contract_analyses_vendor ON contract_analyses(vendor_name);
CREATE INDEX IF NOT EXISTS idx_contract_analyses_dates ON contract_analyses(start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_contracts_lifecycle ON contracts(lifecycle_stage);

-- Add RLS policies for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Add trigger for updated_at on notifications
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE notifications IS 'System notifications and alerts for users';
COMMENT ON COLUMN contracts.lifecycle_stage IS 'Current stage in the Pre-Award → Close-Out lifecycle';
