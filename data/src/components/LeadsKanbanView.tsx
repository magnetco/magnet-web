import { useState, useEffect, useCallback, useMemo } from 'react'
import { fetchAll, updateRecord, deleteRecord, createRecord, Lead, LeadStatus } from '../lib/api'
import SearchAndFilter, {
  MAX_RECORDS,
  searchRecord,
  applyFilters,
  getUniqueValues,
} from './SearchAndFilter'

interface LeadsKanbanViewProps {
  onRecordClick: (id: number) => void
}

const statusConfig: { status: LeadStatus; label: string; color: string; bgColor: string }[] = [
  { status: 'new', label: 'New', color: 'text-violet-700', bgColor: 'bg-violet-50 border-violet-200' },
  { status: 'contacted', label: 'Contacted', color: 'text-sky-700', bgColor: 'bg-sky-50 border-sky-200' },
  { status: 'qualified', label: 'Qualified', color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200' },
  { status: 'proposal', label: 'Proposal', color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-200' },
  { status: 'negotiation', label: 'Negotiation', color: 'text-pink-700', bgColor: 'bg-pink-50 border-pink-200' },
  { status: 'won', label: 'Won', color: 'text-emerald-700', bgColor: 'bg-emerald-50 border-emerald-200' },
  { status: 'lost', label: 'Lost', color: 'text-slate-500', bgColor: 'bg-slate-50 border-slate-200' },
]

const searchFields = ['name', 'company', 'email', 'message']

export default function LeadsKanbanView({ onRecordClick }: LeadsKanbanViewProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null)
  const [creating, setCreating] = useState(false)
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetchAll<Lead>('leads')
      setLeads(result)
    } catch (err) {
      console.error('Failed to load leads:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(lead.id))
  }

  const handleDragEnd = () => {
    setDraggedLead(null)
    setDragOverColumn(null)
  }

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(status)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = async (e: React.DragEvent, newStatus: LeadStatus) => {
    e.preventDefault()
    setDragOverColumn(null)

    if (!draggedLead || draggedLead.status === newStatus) return

    // Optimistically update UI
    setLeads((prev) =>
      prev.map((l) =>
        l.id === draggedLead.id ? { ...l, status: newStatus } : l
      )
    )

    try {
      await updateRecord('leads', draggedLead.id, 'status', newStatus)
    } catch (err) {
      console.error('Failed to update status:', err)
      // Revert on error
      loadData()
    }
  }

  const handleDelete = async (e: React.MouseEvent, leadId: number) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this lead?')) return
    await deleteRecord('leads', leadId)
    await loadData()
  }

  const handleCreate = async () => {
    setCreating(true)
    try {
      const newLead = await createRecord<Lead>('leads', {
        name: 'New Lead',
        email: 'email@example.com',
        message: '',
        status: 'new',
      })
      onRecordClick(newLead.id)
    } catch (err) {
      console.error('Failed to create:', err)
    } finally {
      setCreating(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Compute filter options from data
  const filterOptions = useMemo(() => {
    return [
      {
        key: 'company',
        label: 'Company',
        options: getUniqueValues(leads as unknown as Record<string, unknown>[], 'company'),
      },
    ]
  }, [leads])

  // Apply search and filters
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const rec = lead as unknown as Record<string, unknown>
      const matchesSearch = searchRecord(rec, searchQuery, searchFields)
      const matchesFilters = applyFilters(rec, activeFilters)
      return matchesSearch && matchesFilters
    })
  }, [leads, searchQuery, activeFilters])

  // Apply 10K limit
  const totalCount = filteredLeads.length
  const displayLeads = filteredLeads.slice(0, MAX_RECORDS)
  const displayedCount = displayLeads.length

  const getLeadsByStatus = (status: LeadStatus) =>
    displayLeads.filter((l) => l.status === status)

  if (loading) {
    return (
      <div className="bg-frost rounded-lg border border-opal shadow-sm">
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-basalt border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-frost rounded-lg border border-opal shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 px-4 py-3 border-b border-opal">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-medium text-oxblood">Leads</h2>
            <span className="text-sm text-basalt">
              {displayedCount === totalCount
                ? `${totalCount.toLocaleString()} lead${totalCount !== 1 ? 's' : ''}`
                : `${displayedCount.toLocaleString()} of ${totalCount.toLocaleString()} leads`}
            </span>
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-frost bg-ember hover:bg-oxblood rounded transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>

        {/* Search and Filters */}
        <SearchAndFilter
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          totalCount={totalCount}
          displayedCount={displayedCount}
          placeholder="Search leads..."
        />
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-7 gap-3 p-4 min-h-[500px]">
        {statusConfig.map(({ status, label, color, bgColor }) => {
          const columnLeads = getLeadsByStatus(status)
          const isOver = dragOverColumn === status

          return (
            <div
              key={status}
              className={`flex flex-col rounded-lg border ${bgColor} transition-all ${
                isOver ? 'ring-2 ring-ember ring-offset-2' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-2 py-2 border-b border-inherit">
                <span className={`text-xs font-semibold ${color}`}>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${color} bg-white/60`}>
                  {columnLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-1.5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-340px)]">
                {columnLeads.length === 0 ? (
                  <div className="text-center py-6 text-basalt/50 text-xs">
                    No leads
                  </div>
                ) : (
                  columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead)}
                      onDragEnd={handleDragEnd}
                      onClick={() => onRecordClick(lead.id)}
                      className={`group bg-frost rounded-lg border border-opal/50 p-2 cursor-pointer transition-all hover:shadow-md hover:border-opal ${
                        draggedLead?.id === lead.id ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-oxblood text-xs truncate">
                            {lead.name}
                          </h3>
                          {lead.company && (
                            <p className="text-[10px] text-basalt truncate mt-0.5">
                              {lead.company}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleDelete(e, lead.id)}
                          className="p-0.5 text-basalt/40 hover:text-ember opacity-0 group-hover:opacity-100 transition-all"
                          title="Delete"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Email */}
                      {lead.email && (
                        <p className="text-[10px] text-basalt/70 truncate mt-1">
                          {lead.email}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* No results message */}
      {displayLeads.length === 0 && leads.length > 0 && (
        <div className="text-center py-8 text-basalt border-t border-opal">
          No leads match your search or filters.
        </div>
      )}
    </div>
  )
}

