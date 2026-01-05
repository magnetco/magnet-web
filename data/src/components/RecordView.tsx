import { useState, useEffect, useCallback } from 'react'
import { fetchAll, updateRecord, deleteRecord, enrichRecord, fetchClientInvoices, createRecord, Company, Person, Client, Lead, Applicant, Vendor, Invoice } from '../lib/api'
import { ToastContainer, useToast } from './Toast'
import InvoiceBarChart from './InvoiceBarChart'
import CommunicationTimeline from './CommunicationTimeline'
import LinearTracking from './LinearTracking'

type TableName = 'companies' | 'people' | 'clients' | 'leads' | 'applicants' | 'vendors'

interface RecordViewProps {
  table: TableName
  recordId: number
  onBack: () => void
  onNavigate: (table: TableName, id: number) => void
}

interface FieldDef {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'email' | 'url' | 'select' | 'readonly'
  options?: string[]
}

const fieldDefs: Record<TableName, FieldDef[]> = {
  companies: [
    { key: 'id', label: 'ID', type: 'readonly' },
    { key: 'name', label: 'Name' },
    { key: 'website', label: 'Website', type: 'url' },
    { key: 'industry', label: 'Industry' },
    { key: 'size', label: 'Size' },
    { key: 'employee_count', label: 'Employee Count' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'headquarters', label: 'Headquarters' },
    { key: 'founded_year', label: 'Founded Year' },
    { key: 'annual_revenue', label: 'Annual Revenue' },
    { key: 'linkedin_url', label: 'LinkedIn', type: 'url' },
    { key: 'funding_stage', label: 'Funding Stage' },
    { key: 'total_funding', label: 'Total Funding' },
    { key: 'technologies', label: 'Technologies' },
    { key: 'phone', label: 'Phone' },
    { key: 'notes', label: 'Notes', type: 'textarea' },
    { key: 'created_at', label: 'Created', type: 'readonly' },
    { key: 'updated_at', label: 'Updated', type: 'readonly' },
  ],
  people: [
    { key: 'id', label: 'ID', type: 'readonly' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone' },
    { key: 'title', label: 'Title' },
    { key: 'linkedin_url', label: 'LinkedIn', type: 'url' },
    { key: 'location', label: 'Location' },
    { key: 'seniority_level', label: 'Seniority', type: 'select', options: ['', 'Entry', 'Mid', 'Senior', 'Director', 'VP', 'C-Level'] },
    { key: 'department', label: 'Department' },
    { key: 'twitter_url', label: 'Twitter', type: 'url' },
    { key: 'previous_companies', label: 'Previous Companies' },
    { key: 'notes', label: 'Notes', type: 'textarea' },
    { key: 'company_id', label: 'Company ID', type: 'readonly' },
    { key: 'created_at', label: 'Created', type: 'readonly' },
    { key: 'updated_at', label: 'Updated', type: 'readonly' },
  ],
  clients: [
    { key: 'id', label: 'ID', type: 'readonly' },
    { key: 'name', label: 'Client Name' },
    { key: 'status', label: 'Status', type: 'select', options: ['lead', 'active', 'churned', 'paused'] },
    { key: 'services', label: 'Services' },
    { key: 'notes', label: 'Notes', type: 'textarea' },
    { key: 'company_id', label: 'Company ID', type: 'readonly' },
    { key: 'created_at', label: 'Created', type: 'readonly' },
    { key: 'updated_at', label: 'Updated', type: 'readonly' },
  ],
  leads: [
    { key: 'id', label: 'ID', type: 'readonly' },
    { key: 'name', label: 'Name' },
    { key: 'company', label: 'Company' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'status', label: 'Status', type: 'select', options: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'] },
    { key: 'message', label: 'Message', type: 'textarea' },
    { key: 'person_id', label: 'Person ID', type: 'readonly' },
    { key: 'created_at', label: 'Created', type: 'readonly' },
    { key: 'updated_at', label: 'Updated', type: 'readonly' },
  ],
  applicants: [
    { key: 'id', label: 'ID', type: 'readonly' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'status', label: 'Status', type: 'select', options: ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'] },
    { key: 'cell_number', label: 'Phone' },
    { key: 'linkedin_url', label: 'LinkedIn', type: 'url' },
    { key: 'resume_url', label: 'Resume', type: 'url' },
    { key: 'timezone', label: 'Timezone' },
    { key: 'location_preference', label: 'Location Preference' },
    { key: 'job_id', label: 'Job ID' },
    { key: 'created_at', label: 'Created', type: 'readonly' },
    { key: 'updated_at', label: 'Updated', type: 'readonly' },
  ],
  vendors: [
    { key: 'id', label: 'ID', type: 'readonly' },
    { key: 'name', label: 'Vendor Name' },
    { key: 'contact_name', label: 'Contact Name' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'status', label: 'Status', type: 'select', options: ['prospect', 'evaluating', 'approved', 'active', 'on_hold', 'inactive'] },
    { key: 'phone', label: 'Phone' },
    { key: 'website', label: 'Website', type: 'url' },
    { key: 'service_type', label: 'Service Type', type: 'select', options: ['', 'Photography', 'Videography', 'Design', 'Development', 'Copywriting', 'Marketing', 'Consulting', 'Other'] },
    { key: 'notes', label: 'Notes', type: 'textarea' },
    { key: 'created_at', label: 'Created', type: 'readonly' },
    { key: 'updated_at', label: 'Updated', type: 'readonly' },
  ],
}

type RecordData = Company | Person | Client | Lead | Applicant | Vendor

export default function RecordView({ table, recordId, onBack, onNavigate }: RecordViewProps) {
  const [record, setRecord] = useState<RecordData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [enriching, setEnriching] = useState(false)
  const [enrichingCompany, setEnrichingCompany] = useState(false)
  const [editedFields, setEditedFields] = useState<Record<string, string>>({})
  const toast = useToast()
  
  // Related data
  const [relatedPeople, setRelatedPeople] = useState<Person[]>([])
  const [relatedCompany, setRelatedCompany] = useState<Company | null>(null)
  const [relatedLeads, setRelatedLeads] = useState<Lead[]>([])
  const [relatedClients, setRelatedClients] = useState<Client[]>([])
  const [relatedInvoices, setRelatedInvoices] = useState<Invoice[]>([])
  const [invoiceSummary, setInvoiceSummary] = useState<{ total_count: number; total_invoiced: number; total_paid: number; outstanding: number } | null>(null)
  
  // Financial fields for clients (calculated from invoices)
  const [financialFields, setFinancialFields] = useState<{
    lifetime_value: string
    avg_annual_revenue: string
    contract_start: string
    contract_value: string
  }>({
    lifetime_value: '',
    avg_annual_revenue: '',
    contract_start: '',
    contract_value: '',
  })

  const fields = fieldDefs[table]

  const loadRecord = useCallback(async () => {
    setLoading(true)
    try {
      const allRecords = await fetchAll<RecordData>(table)
      const found = allRecords.find((r) => r.id === recordId)
      if (found) {
        setRecord(found)
        // Initialize edited fields
        const initial: Record<string, string> = {}
        fields.forEach((f) => {
          const val = (found as Record<string, unknown>)[f.key]
          initial[f.key] = val !== null && val !== undefined ? String(val) : ''
        })
        setEditedFields(initial)
        
        // Initialize financial fields for clients
        if (table === 'clients') {
          const client = found as Client
          setFinancialFields({
            lifetime_value: client.lifetime_value !== null ? String(client.lifetime_value) : '',
            avg_annual_revenue: client.avg_annual_revenue !== null ? String(client.avg_annual_revenue) : '',
            contract_start: client.contract_start || '',
            contract_value: client.contract_value !== null ? String(client.contract_value) : '',
          })
        }
      }
    } catch (err) {
      console.error('Failed to load record:', err)
    } finally {
      setLoading(false)
    }
  }, [table, recordId, fields])

  const loadRelatedData = useCallback(async () => {
    if (!record) return

    try {
      if (table === 'companies') {
        // Load people belonging to this company
        const allPeople = await fetchAll<Person>('people')
        setRelatedPeople(allPeople.filter((p) => p.company_id === recordId))
        
        // Load leads with this company name
        const allLeads = await fetchAll<Lead>('leads')
        const companyName = (record as Company).name
        setRelatedLeads(allLeads.filter((l) => l.company?.toLowerCase() === companyName?.toLowerCase()))
        
        // Load clients linked to this company via company_id
        const allClients = await fetchAll<Client>('clients')
        setRelatedClients(allClients.filter((c) => c.company_id === recordId))
      } else if (table === 'people') {
        // Load the company this person belongs to
        const person = record as Person
        if (person.company_id) {
          const allCompanies = await fetchAll<Company>('companies')
          const company = allCompanies.find((c) => c.id === person.company_id)
          if (company) setRelatedCompany(company)
        }
        
        // Load leads linked to this person
        const allLeads = await fetchAll<Lead>('leads')
        setRelatedLeads(allLeads.filter((l) => (l as Lead & { person_id?: number }).person_id === recordId))
        
        // Load clients linked to this person
        const allClients = await fetchAll<Client>('clients')
        setRelatedClients(allClients.filter((c) => (c as Client & { person_id?: number }).person_id === recordId))
      } else if (table === 'leads') {
        // Load person linked to this lead
        const lead = record as Lead & { person_id?: number }
        if (lead.person_id) {
          const allPeople = await fetchAll<Person>('people')
          const person = allPeople.find((p) => p.id === lead.person_id)
          if (person) setRelatedPeople([person])
          
          // Load company via person
          if (person?.company_id) {
            const allCompanies = await fetchAll<Company>('companies')
            const company = allCompanies.find((c) => c.id === person.company_id)
            if (company) setRelatedCompany(company)
          }
        }
      } else if (table === 'clients') {
        const client = record as Client
        
        // Load company linked to this client via company_id
        if (client.company_id) {
          const allCompanies = await fetchAll<Company>('companies')
          const company = allCompanies.find((c) => c.id === client.company_id)
          if (company) {
            setRelatedCompany(company)
            
            // Load all people at this company
            const allPeople = await fetchAll<Person>('people')
            setRelatedPeople(allPeople.filter((p) => p.company_id === client.company_id))
          }
        }
        
        // Also check lead_id
        if (client.lead_id) {
          const allLeads = await fetchAll<Lead>('leads')
          const lead = allLeads.find((l) => l.id === client.lead_id)
          if (lead) setRelatedLeads([lead])
        }
        
        // Load invoices for this client
        try {
          const invoiceData = await fetchClientInvoices(recordId)
          setRelatedInvoices(invoiceData.invoices)
          setInvoiceSummary(invoiceData.summary)
        } catch (err) {
          console.error('Failed to load invoices:', err)
        }
      }
    } catch (err) {
      console.error('Failed to load related data:', err)
    }
  }, [table, record, recordId])

  useEffect(() => {
    loadRecord()
  }, [loadRecord])

  useEffect(() => {
    loadRelatedData()
  }, [loadRelatedData])

  const handleFieldChange = (key: string, value: string) => {
    setEditedFields((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    if (!record) return
    setSaving(true)
    try {
      // Find changed fields and save them
      for (const field of fields) {
        if (field.type === 'readonly') continue
        const originalValue = (record as Record<string, unknown>)[field.key]
        const originalStr = originalValue !== null && originalValue !== undefined ? String(originalValue) : ''
        const newValue = editedFields[field.key] || ''
        
        if (originalStr !== newValue) {
          await updateRecord(table, recordId, field.key, newValue || null)
        }
      }
      await loadRecord()
    } catch (err) {
      console.error('Failed to save:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this record?')) return
    await deleteRecord(table, recordId)
    onBack()
  }

  const handleEnrich = async () => {
    if (table !== 'companies' && table !== 'people') return

    setEnriching(true)
    try {
      const result = await enrichRecord(table, recordId)
      if (result.fieldsUpdated.length > 0) {
        toast.success('Enrichment complete', result.fieldsUpdated)
        await loadRecord() // Reload to show updated data
      } else {
        toast.info('No new data found', ['All fields already populated'])
      }
    } catch (err) {
      console.error('Enrichment failed:', err)
      toast.error('Enrichment failed', ['Check console for details'])
    } finally {
      setEnriching(false)
    }
  }

  // Enrich related company
  const handleEnrichCompany = async () => {
    if (!relatedCompany) return
    
    setEnrichingCompany(true)
    try {
      const result = await enrichRecord('companies', relatedCompany.id)
      if (result.fieldsUpdated.length > 0) {
        toast.success('Company enriched', result.fieldsUpdated)
        await loadRelatedData() // Reload company data
      } else {
        toast.info('No new data found', ['All fields already populated'])
      }
    } catch (err) {
      console.error('Company enrichment failed:', err)
      toast.error('Company enrichment failed', ['Check console for details'])
    } finally {
      setEnrichingCompany(false)
    }
  }

  // Calculate financial fields from invoices
  const calculateFinancials = () => {
    if (!invoiceSummary || relatedInvoices.length === 0) return

    const totalPaid = Number(invoiceSummary.total_paid) || 0
    const totalInvoiced = Number(invoiceSummary.total_invoiced) || 0
    
    // Find earliest invoice date
    const earliestInvoice = relatedInvoices.reduce((earliest, inv) => {
      if (!inv.issue_date) return earliest
      if (!earliest) return inv.issue_date
      return new Date(inv.issue_date) < new Date(earliest) ? inv.issue_date : earliest
    }, null as string | null)
    
    // Calculate years since contract start (use existing or earliest invoice)
    const startDate = financialFields.contract_start || earliestInvoice
    let avgAnnual = totalPaid
    
    if (startDate) {
      const years = (Date.now() - new Date(startDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      if (years >= 1) {
        avgAnnual = totalPaid / years
      }
    }

    setFinancialFields({
      lifetime_value: String(Math.round(totalPaid)),
      avg_annual_revenue: String(Math.round(avgAnnual)),
      contract_start: startDate || financialFields.contract_start,
      contract_value: String(Math.round(totalInvoiced)),
    })
  }

  // Save financial fields
  const handleSaveFinancials = async () => {
    if (!record) return
    setSaving(true)
    try {
      if (financialFields.lifetime_value) {
        await updateRecord('clients', recordId, 'lifetime_value', financialFields.lifetime_value)
      }
      if (financialFields.avg_annual_revenue) {
        await updateRecord('clients', recordId, 'avg_annual_revenue', financialFields.avg_annual_revenue)
      }
      if (financialFields.contract_start) {
        await updateRecord('clients', recordId, 'contract_start', financialFields.contract_start)
      }
      if (financialFields.contract_value) {
        await updateRecord('clients', recordId, 'contract_value', financialFields.contract_value)
      }
      await loadRecord()
    } catch (err) {
      console.error('Failed to save financials:', err)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (value: unknown): string => {
    if (!value) return '—'
    return new Date(String(value)).toLocaleString()
  }

  // Create client or lead from company
  const handleCreateFromCompany = async (type: 'client' | 'lead') => {
    if (table !== 'companies' || !record) return
    const company = record as Company
    
    try {
      if (type === 'client') {
        const newClient = await createRecord<Client>('clients', {
          name: company.name,
          company_id: company.id,
          status: 'lead',
        })
        toast.success('Client created', [`${company.name} is now a client`])
        onNavigate('clients', newClient.id)
      } else {
        const newLead = await createRecord<Lead>('leads', {
          name: company.name,
          company: company.name,
        })
        toast.success('Lead created', [`${company.name} is now a lead`])
        onNavigate('leads', newLead.id)
      }
    } catch (err) {
      console.error(`Failed to create ${type}:`, err)
      toast.error(`Failed to create ${type}`, ['Check console for details'])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-basalt border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!record) {
    return (
      <div className="text-center py-16">
        <p className="text-basalt mb-4">Record not found</p>
        <button onClick={onBack} className="text-ember hover:underline">
          Go back
        </button>
      </div>
    )
  }

  return (
    <>
      <ToastContainer messages={toast.messages} onDismiss={toast.dismissToast} />
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-basalt hover:text-oxblood transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <p className="text-sm text-basalt capitalize">{table}</p>
            <h2 className="text-xl font-medium text-oxblood">
              {editedFields['name'] || editedFields['first_name'] || `Record #${recordId}`}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(table === 'companies' || table === 'people') && (
            <button
              onClick={handleEnrich}
              disabled={enriching}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-basalt hover:text-ember transition-colors disabled:opacity-50"
              title="Enrich with AI"
            >
              {enriching ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {enriching ? 'Enriching...' : 'Enrich'}
            </button>
          )}
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 text-sm text-basalt hover:text-ember transition-colors"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 text-sm font-medium text-frost bg-ember hover:bg-oxblood rounded transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 bg-frost rounded-lg border border-opal p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.key}
                className={field.type === 'textarea' ? 'md:col-span-2' : ''}
              >
                <label className="block text-sm font-medium text-basalt mb-1">
                  {field.label}
                </label>
                {field.type === 'readonly' ? (
                  <p className="text-charcoal py-2">
                    {field.key.includes('_at')
                      ? formatDate((record as Record<string, unknown>)[field.key])
                      : (record as Record<string, unknown>)[field.key]?.toString() || '—'}
                  </p>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={editedFields[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-opal rounded focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={editedFields[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="w-full px-3 py-2 border border-opal rounded focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
                    value={editedFields[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="w-full px-3 py-2 border border-opal rounded focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Data Sidebar */}
        <div className="space-y-4">
          {/* Related Company */}
          {relatedCompany && (
            <div className="bg-gradient-to-br from-sky-50/60 to-frost rounded-lg border border-sky-200/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-sky-100 rounded">
                    <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-sky-900">Company</h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={handleEnrichCompany}
                    disabled={enrichingCompany}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs text-basalt hover:text-ember transition-colors disabled:opacity-50"
                    title="Enrich company data"
                  >
                    {enrichingCompany ? (
                      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {enrichingCompany ? '...' : 'Enrich'}
                  </button>
                  <button
                    onClick={() => onNavigate('companies', relatedCompany.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs text-ember hover:text-oxblood transition-colors"
                    title="View company details"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open
                  </button>
                </div>
              </div>
              
              <div className="p-3 bg-snow rounded">
                <p className="font-medium text-charcoal mb-1">{relatedCompany.name}</p>
                
                {/* Industries as tags */}
                {relatedCompany.industry && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {relatedCompany.industry.split(',').map((ind, i) => (
                      <span
                        key={i}
                        className="text-xs px-1.5 py-0.5 bg-opal/50 text-charcoal rounded"
                      >
                        {ind.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Description */}
                {relatedCompany.description && (
                  <p className="text-xs text-basalt mb-2 line-clamp-2">{relatedCompany.description}</p>
                )}
                
                {/* Website & LinkedIn */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {relatedCompany.website && (
                    <a 
                      href={relatedCompany.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-ember hover:underline truncate max-w-[140px]"
                    >
                      {relatedCompany.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  {relatedCompany.linkedin_url && (
                    <a 
                      href={relatedCompany.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
                
                {/* Key stats */}
                <div className="space-y-1 text-xs">
                  {relatedCompany.annual_revenue && (
                    <div className="flex justify-between">
                      <span className="text-basalt">Revenue</span>
                      <span className="font-medium text-charcoal">{relatedCompany.annual_revenue}</span>
                    </div>
                  )}
                  {(relatedCompany.size || relatedCompany.employee_count) && (
                    <div className="flex justify-between">
                      <span className="text-basalt">Size</span>
                      <span className="font-medium text-charcoal">
                        {relatedCompany.employee_count ? `${relatedCompany.employee_count} employees` : relatedCompany.size}
                      </span>
                    </div>
                  )}
                  {relatedCompany.headquarters && (
                    <div className="flex justify-between">
                      <span className="text-basalt">HQ</span>
                      <span className="font-medium text-charcoal">{relatedCompany.headquarters}</span>
                    </div>
                  )}
                  {relatedCompany.founded_year && (
                    <div className="flex justify-between">
                      <span className="text-basalt">Founded</span>
                      <span className="font-medium text-charcoal">{relatedCompany.founded_year}</span>
                    </div>
                  )}
                  {relatedCompany.funding_stage && (
                    <div className="flex justify-between">
                      <span className="text-basalt">Funding</span>
                      <span className="font-medium text-charcoal">{relatedCompany.funding_stage}</span>
                    </div>
                  )}
                  {relatedCompany.total_funding && (
                    <div className="flex justify-between">
                      <span className="text-basalt">Total Raised</span>
                      <span className="font-medium text-charcoal">{relatedCompany.total_funding}</span>
                    </div>
                  )}
                  {relatedCompany.phone && (
                    <div className="flex justify-between">
                      <span className="text-basalt">Phone</span>
                      <a href={`tel:${relatedCompany.phone}`} className="font-medium text-ember hover:underline">{relatedCompany.phone}</a>
                    </div>
                  )}
                </div>
                
                {/* Technologies */}
                {relatedCompany.technologies && (
                  <div className="mt-2">
                    <p className="text-xs text-basalt mb-1">Tech Stack</p>
                    <div className="flex flex-wrap gap-1">
                      {relatedCompany.technologies.split(',').slice(0, 6).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                      {relatedCompany.technologies.split(',').length > 6 && (
                        <span className="text-xs text-basalt">+{relatedCompany.technologies.split(',').length - 6} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related People */}
          {relatedPeople.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50/60 to-frost rounded-lg border border-amber-200/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-amber-100 rounded">
                  <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-amber-900">
                  People at Company ({relatedPeople.length})
                </h3>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {relatedPeople.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => onNavigate('people', person.id)}
                    className="w-full text-left p-3 bg-white/70 rounded border border-amber-100/50 hover:bg-amber-50/50 hover:border-amber-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-charcoal truncate">{person.name}</p>
                        {person.title && (
                          <p className="text-xs text-basalt truncate">{person.title}</p>
                        )}
                      </div>
                      {person.seniority_level && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${
                          person.seniority_level === 'C-Level' || person.seniority_level === 'VP' 
                            ? 'bg-amber-100 text-amber-800'
                            : person.seniority_level === 'Director' || person.seniority_level === 'Senior'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {person.seniority_level}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {person.email && (
                        <p className="text-xs text-ember truncate">{person.email}</p>
                      )}
                      {person.linkedin_url && (
                        <span className="text-xs text-blue-600">• LinkedIn</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Leads */}
          {relatedLeads.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50/80 to-frost rounded-lg border border-purple-200/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-purple-100 rounded">
                  <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-purple-900">
                  Leads ({relatedLeads.length})
                </h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {relatedLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => onNavigate('leads', lead.id)}
                    className="w-full text-left p-3 bg-white/70 rounded border border-purple-100/50 hover:bg-purple-50/50 hover:border-purple-200 transition-colors"
                  >
                    <p className="font-medium text-charcoal">{lead.name}</p>
                    <p className="text-sm text-basalt">{lead.email}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Clients - Don't show on client pages */}
          {relatedClients.length > 0 && table !== 'clients' && (
            <div className="bg-gradient-to-br from-emerald-50/80 to-frost rounded-lg border border-emerald-200/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-emerald-100 rounded">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-emerald-900">
                  Clients ({relatedClients.length})
                </h3>
              </div>
              <div className="space-y-2">
                {relatedClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => onNavigate('clients', client.id)}
                    className="w-full text-left p-3 bg-white/70 rounded border border-emerald-100/50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-charcoal">{client.name}</p>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full capitalize ${
                          client.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : client.status === 'churned'
                            ? 'bg-red-100 text-red-800'
                            : client.status === 'paused'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>
                    {client.services && (
                      <p className="text-xs text-basalt mb-1">{client.services}</p>
                    )}
                    <div className="flex gap-3 text-xs">
                      {client.lifetime_value && (
                        <div>
                          <span className="text-basalt">LTV: </span>
                          <span className="font-medium text-charcoal">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(client.lifetime_value))}
                          </span>
                        </div>
                      )}
                      {client.avg_annual_revenue && (
                        <div>
                          <span className="text-basalt">ARR: </span>
                          <span className="font-medium text-charcoal">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(client.avg_annual_revenue))}
                          </span>
                        </div>
                      )}
                    </div>
                    {client.contract_start && (
                      <p className="text-xs text-basalt mt-1">
                        Since {new Date(client.contract_start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Actions - Create Client/Lead from Company */}
          {table === 'companies' && (
            <div className="bg-gradient-to-br from-slate-50 to-frost rounded-lg border border-slate-200/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-slate-100 rounded">
                  <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-slate-700">Quick Actions</h3>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCreateFromCompany('client')}
                  className="w-full flex items-center gap-2 p-2.5 text-sm text-left bg-white/70 rounded border border-emerald-200/50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-colors group"
                >
                  <div className="p-1 bg-emerald-100 rounded group-hover:bg-emerald-200 transition-colors">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">Create Client</p>
                    <p className="text-xs text-basalt">Add as a new client account</p>
                  </div>
                </button>
                <button
                  onClick={() => handleCreateFromCompany('lead')}
                  className="w-full flex items-center gap-2 p-2.5 text-sm text-left bg-white/70 rounded border border-purple-200/50 hover:bg-purple-50/50 hover:border-purple-300 transition-colors group"
                >
                  <div className="p-1 bg-purple-100 rounded group-hover:bg-purple-200 transition-colors">
                    <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">Create Lead</p>
                    <p className="text-xs text-basalt">Add as a new sales lead</p>
                  </div>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Financial Summary - Only for clients with invoices */}
      {table === 'clients' && invoiceSummary && invoiceSummary.total_count > 0 && (
        <div className="bg-frost rounded-lg border border-opal p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-charcoal">Financial Summary</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={calculateFinancials}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-ember border border-ember rounded hover:bg-ember hover:text-frost transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate from Invoices
              </button>
              <button
                onClick={handleSaveFinancials}
                disabled={saving}
                className="px-3 py-1.5 text-sm font-medium text-frost bg-ember hover:bg-oxblood rounded transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Lifetime Value */}
            <div>
              <label className="block text-sm font-medium text-basalt mb-1">
                Lifetime Value (LTV)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-basalt">$</span>
                <input
                  type="text"
                  value={financialFields.lifetime_value ? Number(financialFields.lifetime_value).toLocaleString() : ''}
                  onChange={(e) => setFinancialFields(prev => ({ 
                    ...prev, 
                    lifetime_value: e.target.value.replace(/[^0-9]/g, '') 
                  }))}
                  className="w-full pl-7 pr-3 py-2 border border-opal rounded focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  placeholder="0"
                />
              </div>
              {invoiceSummary && (
                <p className="text-xs text-basalt mt-1">
                  Paid: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(invoiceSummary.total_paid))}
                </p>
              )}
            </div>

            {/* Avg Annual Revenue */}
            <div>
              <label className="block text-sm font-medium text-basalt mb-1">
                Avg Annual Revenue
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-basalt">$</span>
                <input
                  type="text"
                  value={financialFields.avg_annual_revenue ? Number(financialFields.avg_annual_revenue).toLocaleString() : ''}
                  onChange={(e) => setFinancialFields(prev => ({ 
                    ...prev, 
                    avg_annual_revenue: e.target.value.replace(/[^0-9]/g, '') 
                  }))}
                  className="w-full pl-7 pr-3 py-2 border border-opal rounded focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-basalt mt-1">
                Per year average
              </p>
            </div>

            {/* Contract Start */}
            <div>
              <label className="block text-sm font-medium text-basalt mb-1">
                Contract Start
              </label>
              <input
                type="date"
                value={financialFields.contract_start ? financialFields.contract_start.split('T')[0] : ''}
                onChange={(e) => setFinancialFields(prev => ({ 
                  ...prev, 
                  contract_start: e.target.value 
                }))}
                className="w-full px-3 py-2 border border-opal rounded focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
              {relatedInvoices.length > 0 && (
                <p className="text-xs text-basalt mt-1">
                  First invoice: {new Date(relatedInvoices[relatedInvoices.length - 1]?.issue_date).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Contract Value / Total Invoiced */}
            <div>
              <label className="block text-sm font-medium text-basalt mb-1">
                Total Contract Value
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-basalt">$</span>
                <input
                  type="text"
                  value={financialFields.contract_value ? Number(financialFields.contract_value).toLocaleString() : ''}
                  onChange={(e) => setFinancialFields(prev => ({ 
                    ...prev, 
                    contract_value: e.target.value.replace(/[^0-9]/g, '') 
                  }))}
                  className="w-full pl-7 pr-3 py-2 border border-opal rounded focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  placeholder="0"
                />
              </div>
              {invoiceSummary && (
                <p className="text-xs text-basalt mt-1">
                  Invoiced: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(invoiceSummary.total_invoiced))}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Invoices - Full width section (only for clients) */}
      {table === 'clients' && invoiceSummary && (
        <div className="bg-frost rounded-lg border border-opal overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-opal/60">
            <h3 className="text-lg font-medium text-charcoal">
              Invoices ({invoiceSummary.total_count})
            </h3>
            
            {/* Summary stats */}
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-basalt">Total Invoiced: </span>
                <span className="font-medium text-charcoal tabular-nums">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(invoiceSummary.total_invoiced))}
                </span>
              </div>
              <div>
                <span className="text-basalt">Total Paid: </span>
                <span className="font-medium text-emerald-700 tabular-nums">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(invoiceSummary.total_paid))}
                </span>
              </div>
              {Number(invoiceSummary.outstanding) > 0 && (
                <div>
                  <span className="text-basalt">Outstanding: </span>
                  <span className="font-medium text-amber-700 tabular-nums">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(invoiceSummary.outstanding))}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart */}
          {relatedInvoices.length > 0 && (
            <div className="px-6 py-4 border-b border-opal/60">
              <InvoiceBarChart invoices={relatedInvoices} />
            </div>
          )}

          {/* Invoice table */}
          {relatedInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-opal/60">
                    <th className="px-6 py-3 text-left text-xs font-medium text-basalt uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-basalt uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-basalt uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-basalt uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-opal/40">
                  {relatedInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-snow/60 transition-colors">
                      <td className="px-6 py-3">
                        <span className="font-mono text-sm text-charcoal">
                          #{invoice.number || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-sm font-medium text-charcoal tabular-nums">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency || 'USD', minimumFractionDigits: 2 }).format(Number(invoice.amount))}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-md capitalize ${
                            invoice.status === 'paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : invoice.status === 'open'
                              ? 'bg-amber-50 text-amber-700'
                              : invoice.status === 'draft'
                              ? 'bg-slate-50 text-slate-500'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-basalt">
                          {invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-sm text-basalt italic">No invoices linked to this client</p>
            </div>
          )}
        </div>
      )}

      {/* Linear Issue Tracking - Only for clients */}
      {table === 'clients' && (
        <LinearTracking clientId={recordId} />
      )}

      {/* Communication Timeline - Only for clients */}
      {table === 'clients' && (
        <CommunicationTimeline companyId={(record as Client).company_id || undefined} />
      )}
    </div>
    </>
  )
}

