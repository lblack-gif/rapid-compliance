-- Seed script for worker_hours and action_plans tables
-- This ensures the KPI cards show real data

-- Insert sample worker hours data for the current quarter
INSERT INTO worker_hours (
  id,
  worker_id,
  contract_id,
  hours_worked,
  is_section3_hours,
  is_targeted_section3_hours,
  work_date,
  status,
  trade_performed,
  work_description,
  created_at
)
SELECT
  gen_random_uuid(),
  w.id,
  c.id,
  (random() * 8 + 4)::numeric(5,2), -- 4-12 hours
  w.is_section3_worker,
  w.is_targeted_section3_worker,
  (CURRENT_DATE - (random() * 90)::int)::date, -- Random date within last 90 days
  'approved',
  CASE (random() * 4)::int
    WHEN 0 THEN 'Construction'
    WHEN 1 THEN 'Electrical'
    WHEN 2 THEN 'Plumbing'
    WHEN 3 THEN 'HVAC'
    ELSE 'General Labor'
  END,
  'Regular work shift',
  NOW()
FROM workers w
CROSS JOIN contracts c
WHERE c.status = 'active'
LIMIT 500
ON CONFLICT DO NOTHING;

-- Insert sample action plans (CAPs) for the current quarter
INSERT INTO action_plans (
  id,
  title,
  description,
  status,
  quarter,
  fiscal_year,
  progress_percentage,
  target_compliance_rate,
  current_compliance_rate,
  start_date,
  due_date,
  created_at
)
VALUES
  (gen_random_uuid(), 'Q4 Section 3 Hiring Initiative', 'Increase Section 3 worker hiring by 15%', 'completed', 'Q4', 2024, 100, 25.0, 28.5, '2024-10-01', '2024-12-31', NOW()),
  (gen_random_uuid(), 'Targeted Worker Outreach Program', 'Partner with local agencies for targeted hiring', 'approved', 'Q4', 2024, 85, 5.0, 6.2, '2024-10-15', '2024-12-15', NOW()),
  (gen_random_uuid(), 'Compliance Documentation Improvement', 'Streamline Section 3 verification process', 'in_progress', 'Q4', 2024, 60, 95.0, 92.0, '2024-11-01', '2024-12-31', NOW())
ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT 
  'Total Labor Hours' as metric,
  SUM(hours_worked)::int as value
FROM worker_hours
WHERE work_date >= DATE_TRUNC('quarter', CURRENT_DATE)
UNION ALL
SELECT 
  'Section 3 Hours' as metric,
  SUM(CASE WHEN is_section3_hours THEN hours_worked ELSE 0 END)::int as value
FROM worker_hours
WHERE work_date >= DATE_TRUNC('quarter', CURRENT_DATE)
UNION ALL
SELECT 
  'Targeted Section 3 Hours' as metric,
  SUM(CASE WHEN is_targeted_section3_hours THEN hours_worked ELSE 0 END)::int as value
FROM worker_hours
WHERE work_date >= DATE_TRUNC('quarter', CURRENT_DATE)
UNION ALL
SELECT 
  'Completed CAPs' as metric,
  COUNT(*)::int as value
FROM action_plans
WHERE status IN ('completed', 'approved')
  AND created_at >= DATE_TRUNC('quarter', CURRENT_DATE);
