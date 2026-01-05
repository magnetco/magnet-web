const API_BASE = '/api'

export interface Client {
  id: number
  name: string
  company: string | null
  company_id: number | null
  company_name?: string // joined from companies table
  email: string
  phone: string | null
  status: 'lead' | 'active' | 'churned' | 'paused'
  contract_start: string | null
  contract_value: number | null
  lifetime_value: number | null
  avg_annual_revenue: number | null
  services: string | null
  industry: string | null
  notes: string | null
  lead_id: number | null
  person_id: number | null
  created_at: string
  updated_at: string
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'

export interface Lead {
  id: number
  name: string
  company: string | null
  email: string
  message: string
  status: LeadStatus
  created_at: string
  updated_at: string
}

export type ApplicantStatus = 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'

export interface Applicant {
  id: number
  job_id: string
  sanity_job_url: string | null
  first_name: string
  last_name: string
  email: string
  cell_number: string
  linkedin_url: string
  resume_url: string | null
  timezone: string
  location_preference: string
  status: ApplicantStatus
  created_at: string
  updated_at: string
}

export interface Company {
  id: number
  name: string
  website: string | null
  industry: string | null
  size: string | null
  annual_revenue: string | null
  headquarters: string | null
  founded_year: number | null
  description: string | null
  linkedin_url: string | null
  funding_stage: string | null
  total_funding: string | null
  employee_count: number | null
  phone: string | null
  technologies: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Person {
  id: number
  name: string
  email: string | null
  phone: string | null
  title: string | null
  linkedin_url: string | null
  location: string | null
  seniority_level: string | null
  department: string | null
  twitter_url: string | null
  previous_companies: string | null
  notes: string | null
  company_id: number | null
  company_name: string | null
  created_at: string
  updated_at: string
}

export type VendorStatus = 'prospect' | 'evaluating' | 'approved' | 'active' | 'on_hold' | 'inactive'

export interface Vendor {
  id: number
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  service_type: string | null
  notes: string | null
  clients_served: string | null // joined from vendor_clients
  status: VendorStatus
  created_at: string
  updated_at: string
}

export interface RecordVersion {
  id: number
  table_name: string
  record_id: number
  field_name: string
  old_value: string | null
  new_value: string | null
  changed_by: string
  changed_at: string
}

export interface Invoice {
  id: number
  harvest_id: number
  harvest_client_id: number
  harvest_client_name: string
  client_id: number | null
  client_name: string | null
  company_name: string | null
  number: string
  amount: number
  due_amount: number
  status: 'draft' | 'open' | 'paid' | 'closed'
  issue_date: string
  due_date: string | null
  paid_date: string | null
  subject: string | null
  notes: string | null
  currency: string
  created_at: string
  updated_at: string
}

export interface HarvestSyncStatus {
  lastSyncedAt: string | null
  status: 'pending' | 'syncing' | 'success' | 'error' | 'never'
  recordsSynced: number
  errorMessage: string | null
}

export interface InvoiceSummary {
  total_count: number
  paid_count: number
  open_count: number
  draft_count: number
  closed_count: number
  total_amount: number
  paid_amount: number
  outstanding_amount: number
}

type TableName = 'clients' | 'leads' | 'applicants' | 'companies' | 'people' | 'vendors' | 'invoices'

// Generic CRUD operations
export async function fetchAll<T>(table: TableName): Promise<T[]> {
  const res = await fetch(`${API_BASE}/${table}`)
  if (!res.ok) throw new Error(`Failed to fetch ${table}`)
  return res.json()
}

export async function updateRecord(
  table: TableName,
  id: number,
  field: string,
  value: string | number | null
): Promise<void> {
  const res = await fetch(`${API_BASE}/${table}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ field, value }),
  })
  if (!res.ok) throw new Error(`Failed to update ${table}`)
}

export async function deleteRecord(table: TableName, id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${table}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Failed to delete ${table}`)
}

export async function createRecord<T>(table: TableName, data: Partial<T>): Promise<T> {
  const res = await fetch(`${API_BASE}/${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to create ${table}`)
  return res.json()
}

// Version history
export async function fetchVersions(
  table: TableName,
  recordId: number
): Promise<RecordVersion[]> {
  const res = await fetch(`${API_BASE}/versions/${table}/${recordId}`)
  if (!res.ok) throw new Error('Failed to fetch versions')
  return res.json()
}

export async function revertToVersion(versionId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/versions/${versionId}/revert`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error('Failed to revert')
}

// CSV export
export async function exportCSV(table: TableName): Promise<void> {
  const res = await fetch(`${API_BASE}/${table}/export`)
  if (!res.ok) throw new Error('Failed to export')
  
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${table}-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Lead to client conversion
export async function convertLeadToClient(leadId: number): Promise<Client> {
  const res = await fetch(`${API_BASE}/leads/${leadId}/convert`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error('Failed to convert lead')
  return res.json()
}

// Data enrichment with Perplexity
export interface EnrichResult {
  success: boolean
  enriched: Record<string, string | null>
  fieldsUpdated: string[]
  record: Company | Person
}

export async function enrichRecord(
  table: 'companies' | 'people',
  id: number
): Promise<EnrichResult> {
  const res = await fetch(`${API_BASE}/enrich/${table}/${id}`, {
    method: 'POST',
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || `Failed to enrich ${table}`)
  }
  return res.json()
}

// Harvest integration
export async function fetchHarvestSyncStatus(): Promise<HarvestSyncStatus> {
  const res = await fetch(`${API_BASE}/harvest/status`)
  if (!res.ok) throw new Error('Failed to fetch sync status')
  return res.json()
}

export async function triggerHarvestSync(): Promise<{ 
  success: boolean
  invoicesSynced: number
  clientsMatched: number
  clientsUnmatched: number 
}> {
  const res = await fetch(`${API_BASE}/harvest/sync`, { method: 'POST' })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Failed to sync from Harvest')
  }
  return res.json()
}

export async function fetchInvoices(clientId?: number): Promise<Invoice[]> {
  const url = clientId 
    ? `${API_BASE}/invoices?client_id=${clientId}`
    : `${API_BASE}/invoices`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch invoices')
  return res.json()
}

export async function fetchInvoiceSummary(): Promise<InvoiceSummary> {
  const res = await fetch(`${API_BASE}/invoices/summary`)
  if (!res.ok) throw new Error('Failed to fetch invoice summary')
  return res.json()
}

export async function fetchClientInvoices(clientId: number): Promise<{
  invoices: Invoice[]
  summary: { total_count: number; total_invoiced: number; total_paid: number; outstanding: number }
}> {
  const res = await fetch(`${API_BASE}/invoices/by-client/${clientId}`)
  if (!res.ok) throw new Error('Failed to fetch client invoices')
  return res.json()
}

export interface UnmatchedHarvestClient {
  harvest_client_id: number
  harvest_client_name: string
  invoice_count: number
  total_amount: number
}

export async function fetchUnmatchedHarvestClients(): Promise<UnmatchedHarvestClient[]> {
  const res = await fetch(`${API_BASE}/invoices/unmatched-clients`)
  if (!res.ok) throw new Error('Failed to fetch unmatched clients')
  return res.json()
}

export async function linkHarvestClient(harvestClientId: number, clientId: number): Promise<{ success: boolean; invoicesUpdated: number }> {
  const res = await fetch(`${API_BASE}/invoices/link-harvest-client`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ harvest_client_id: harvestClientId, client_id: clientId }),
  })
  if (!res.ok) throw new Error('Failed to link harvest client')
  return res.json()
}

