import { useState, useEffect, useCallback, useMemo } from 'react'
import { fetchAll, updateRecord, deleteRecord, createRecord, Client } from '../lib/api'
import SearchAndFilter, {
  MAX_RECORDS,
  searchRecord,
  applyFilters,
  getUniqueValues,
} from './SearchAndFilter'

type ClientStatus = 'lead' | 'active' | 'churned' | 'paused'

interface KanbanViewProps {
  onRecordClick: (id: number) => void
}

const statusConfig: { 
  status: ClientStatus
  label: string
  color: string
  bgColor: string
  dropBg: string
  icon: React.ReactNode
}[] = [
  { 
    status: 'lead', 
    label: 'Onboarding', 
    color: 'text-amber-700', 
    bgColor: 'bg-amber-50/70 border-amber-200/60',
    dropBg: 'bg-amber-100/80',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  { 
    status: 'active', 
    label: 'Active', 
    color: 'text-emerald-700', 
    bgColor: 'bg-emerald-50/70 border-emerald-200/60',
    dropBg: 'bg-emerald-100/80',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    status: 'churned', 
    label: 'Churned', 
    color: 'text-slate-500', 
    bgColor: 'bg-slate-50/70 border-slate-200/60',
    dropBg: 'bg-slate-100/80',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
  },
  { 
    status: 'paused', 
    label: 'Paused', 
    color: 'text-blue-700', 
    bgColor: 'bg-blue-50/70 border-blue-200/60',
    dropBg: 'bg-blue-100/80',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
]

const searchFields = ['name', 'company_name', 'email', 'services', 'industry']

export default function KanbanView({ onRecordClick }: KanbanViewProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedClient, setDraggedClient] = useState<Client | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<ClientStatus | null>(null)
  const [creating, setCreating] = useState(false)
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetchAll<Client>('clients')
      setClients(result)
    } catch (err) {
      console.error('Failed to load clients:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDragStart = (e: React.DragEvent, client: Client) => {
    setDraggedClient(client)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(client.id))
  }

  const handleDragEnd = () => {
    setDraggedClient(null)
    setDragOverColumn(null)
  }

  const handleDragOver = (e: React.DragEvent, status: ClientStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(status)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = async (e: React.DragEvent, newStatus: ClientStatus) => {
    e.preventDefault()
    setDragOverColumn(null)

    if (!draggedClient || draggedClient.status === newStatus) return

    // Optimistically update UI
    setClients((prev) =>
      prev.map((c) =>
        c.id === draggedClient.id ? { ...c, status: newStatus } : c
      )
    )

    try {
      await updateRecord('clients', draggedClient.id, 'status', newStatus)
    } catch (err) {
      console.error('Failed to update status:', err)
      // Revert on error
      loadData()
    }
  }

  const handleDelete = async (e: React.MouseEvent, clientId: number) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this client?')) return
    await deleteRecord('clients', clientId)
    await loadData()
  }

  const handleCreate = async () => {
    setCreating(true)
    try {
      const newClient = await createRecord<Client>('clients', {
        name: 'New Client',
        email: 'email@example.com',
        status: 'lead',
      })
      onRecordClick(newClient.id)
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
        key: 'services',
        label: 'Services',
        options: getUniqueValues(clients as unknown as Record<string, unknown>[], 'services'),
      },
      {
        key: 'industry',
        label: 'Industry',
        options: getUniqueValues(clients as unknown as Record<string, unknown>[], 'industry'),
      },
    ]
  }, [clients])

  // Apply search and filters
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const rec = client as unknown as Record<string, unknown>
      const matchesSearch = searchRecord(rec, searchQuery, searchFields)
      const matchesFilters = applyFilters(rec, activeFilters)
      return matchesSearch && matchesFilters
    })
  }, [clients, searchQuery, activeFilters])

  // Apply 10K limit
  const totalCount = filteredClients.length
  const displayClients = filteredClients.slice(0, MAX_RECORDS)
  const displayedCount = displayClients.length

  const getClientsByStatus = (status: ClientStatus) =>
    displayClients.filter((c) => c.status === status)

  const formatCurrency = (value: number | null) => {
    if (!value) return null
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

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
            <h2 className="font-medium text-oxblood">Clients</h2>
            <span className="text-sm text-basalt">
              {displayedCount === totalCount
                ? `${totalCount.toLocaleString()} client${totalCount !== 1 ? 's' : ''}`
                : `${displayedCount.toLocaleString()} of ${totalCount.toLocaleString()} clients`}
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
          placeholder="Search clients..."
        />
      </div>

      {/* Kanban Board */}
      <div className={`grid grid-cols-4 gap-4 p-4 min-h-[500px] transition-all duration-200 ${
        draggedClient ? 'bg-gradient-to-b from-opal/20 to-transparent rounded-lg' : ''
      }`}>
        {statusConfig.map(({ status, label, color, bgColor, dropBg, icon }) => {
          const columnClients = getClientsByStatus(status)
          const isOver = dragOverColumn === status
          const isDragging = !!draggedClient
          const canDrop = isDragging && draggedClient?.status !== status

          return (
            <div
              key={status}
              className={`flex flex-col rounded-xl border-2 transition-all duration-200 ${bgColor} ${
                isOver && canDrop
                  ? `${dropBg} border-dashed scale-[1.02] shadow-lg`
                  : canDrop
                  ? 'border-dashed border-opacity-60'
                  : ''
              }`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* Column Header */}
              <div className={`flex items-center justify-between px-3 py-2.5 border-b transition-colors ${
                isOver && canDrop ? 'border-current/30' : 'border-inherit'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`${color} opacity-70`}>{icon}</span>
                  <span className={`text-sm font-semibold ${color}`}>{label}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${color} bg-white/60 font-medium`}>
                  {columnClients.length}
                </span>
              </div>

              {/* Drop Zone Indicator */}
              {isOver && canDrop && (
                <div className="mx-2 mt-2 py-3 border-2 border-dashed border-current/30 rounded-lg flex items-center justify-center gap-2 text-xs font-medium opacity-70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Drop here
                </div>
              )}

              {/* Cards */}
              <div className={`flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-340px)] transition-opacity ${
                isDragging && !canDrop ? 'opacity-40' : ''
              }`}>
                {columnClients.length === 0 && !isOver ? (
                  <div className={`text-center py-8 text-sm transition-all ${
                    isDragging && canDrop ? 'text-current opacity-50' : 'text-basalt/50'
                  }`}>
                    {isDragging && canDrop ? 'Drop to move here' : 'No clients'}
                  </div>
                ) : (
                  columnClients.map((client) => {
                    const isBeingDragged = draggedClient?.id === client.id
                    return (
                      <div
                        key={client.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, client)}
                        onDragEnd={handleDragEnd}
                        onClick={() => onRecordClick(client.id)}
                        className={`group bg-frost rounded-lg border p-3 transition-all duration-150 ${
                          isBeingDragged 
                            ? 'opacity-30 scale-95 border-dashed border-basalt/30 bg-opal/50' 
                            : 'border-opal/50 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-opal hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Drag Handle Visual */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 min-w-0 flex-1">
                            <div className="mt-0.5 text-basalt/30 group-hover:text-basalt/50 transition-colors">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" />
                                <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" />
                                <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-oxblood text-sm truncate">
                                {client.name}
                              </h3>
                              {client.company_name && (
                                <p className="text-xs text-basalt truncate mt-0.5">
                                  {client.company_name}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleDelete(e, client.id)}
                            className="p-1 text-basalt/40 hover:text-ember opacity-0 group-hover:opacity-100 transition-all"
                            title="Delete"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Meta info */}
                        <div className="mt-2 ml-5 flex flex-wrap gap-1.5">
                          {client.services && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-powder/50 text-juniper rounded">
                              {client.services.split(',')[0]}
                            </span>
                          )}
                          {client.contract_value && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-coral/30 text-oxblood rounded font-medium">
                              {formatCurrency(client.contract_value)}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* No results message */}
      {displayClients.length === 0 && clients.length > 0 && (
        <div className="text-center py-8 text-basalt border-t border-opal">
          No clients match your search or filters.
        </div>
      )}
    </div>
  )
}
