// Database type definitions for Section 3 Compliance Engine

export interface Client {
  id: string
  name: string
  address: string | null
  contact_name: string | null
  contact_email: string | null
  total_contracts: number
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id: string | null
  contract_id: string | null
  action_type: string
  description: string
  timestamp: string
}

export interface Contract {
  id: string
  contract_number: string
  contract_name: string
  contractor_id: string | null
  project_id: string | null
  client_id: string | null
  contract_type: string
  contract_value: number
  start_date: string
  end_date: string | null
  status: string
  hud_funding_amount: number
  total_project_cost: number
  funding_source_id: string | null
  section3_applicable: boolean
  applicability_subpart: string | null
  applicability_threshold: number | null
  applicability_reason: string | null
  applicability_calculated_at: string | null
  labor_hour_benchmark: number | null
  targeted_section3_benchmark: number | null
  contract_document_url: string | null
  signed_contract_url: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  contract_id: string | null
  client_id: string | null
  compliance_form_id: string | null
  task_type: string
  title: string
  description: string | null
  assigned_to: string | null
  assigned_by: string | null
  status: string
  priority: string
  due_date: string
  reminder_date: string | null
  completed_at: string | null
  is_auto_generated: boolean
  auto_generation_rule: string | null
  created_at: string
  updated_at: string
}
