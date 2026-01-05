import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  fetchAll,
  deleteRecord,
  createRecord,
  Client,
  Lead,
  Applicant,
  Company,
  Person,
  Vendor,
} from '../lib/api'
import ExportButton from './ExportButton'
import SearchAndFilter, {
  MAX_RECORDS,
  searchRecord,
  applyFilters,
  getUniqueValues,
} from './SearchAndFilter'

type TableName = 'companies' | 'people' | 'clients' | 'leads' | 'applicants' | 'vendors'
type SortDir = 'asc' | 'desc'

interface TableViewProps {
  table: TableName
  onRecordClick: (id: number) => void
}

interface ColumnDef {
  key: string
  label: string
  width?: string
  searchable?: boolean
  filterable?: boolean
}

const columnDefs: Record<TableName, ColumnDef[]> = {
  companies: [
    { key: 'id', label: 'ID', width: 'w-16' },
    { key: 'name', label: 'Name', width: 'w-48', searchable: true },
    { key: 'website', label: 'Website', width: 'w-40', searchable: true },
    { key: 'industry', label: 'Industry', width: 'w-32', searchable: true, filterable: true },
    { key: 'size', label: 'Size', width: 'w-24' },
    { key: 'headquarters', label: 'Location', width: 'w-32', searchable: true },
  ],
  people: [
    { key: 'id', label: 'ID', width: 'w-16' },
    { key: 'name', label: 'Name', width: 'w-40', searchable: true },
    { key: 'email', label: 'Email', width: 'w-48', searchable: true },
    { key: 'title', label: 'Title', width: 'w-32', searchable: true, filterable: true },
    { key: 'company_name', label: 'Company', width: 'w-40', searchable: true },
  ],
  clients: [
    { key: 'id', label: 'ID', width: 'w-16' },
    { key: 'name', label: 'Client', width: 'w-48', searchable: true },
    { key: 'company_name', label: 'Company', width: 'w-40', searchable: true },
    { key: 'status', label: 'Status', width: 'w-24', filterable: true },
    { key: 'services', label: 'Services', width: 'w-48', searchable: true },
  ],
  leads: [
    { key: 'id', label: 'ID', width: 'w-16' },
    { key: 'name', label: 'Name', width: 'w-40', searchable: true },
    { key: 'company', label: 'Company', width: 'w-40', searchable: true },
    { key: 'email', label: 'Email', width: 'w-48', searchable: true },
    { key: 'status', label: 'Status', width: 'w-28', filterable: true },
    { key: 'created_at', label: 'Created', width: 'w-40' },
  ],
  applicants: [
    { key: 'id', label: 'ID', width: 'w-16' },
    { key: 'first_name', label: 'First Name', width: 'w-32', searchable: true },
    { key: 'last_name', label: 'Last Name', width: 'w-32', searchable: true },
    { key: 'email', label: 'Email', width: 'w-48', searchable: true },
    { key: 'status', label: 'Status', width: 'w-28', filterable: true },
    { key: 'job_id', label: 'Job ID', width: 'w-32', filterable: true },
  ],
  vendors: [
    { key: 'id', label: 'ID', width: 'w-16' },
    { key: 'name', label: 'Name', width: 'w-48', searchable: true },
    { key: 'contact_name', label: 'Contact', width: 'w-40', searchable: true },
    { key: 'status', label: 'Status', width: 'w-28', filterable: true },
    { key: 'service_type', label: 'Service', width: 'w-32', searchable: true, filterable: true },
    { key: 'clients_served', label: 'Clients Served', width: 'w-48', searchable: true },
  ],
}

export default function TableView({ table, onRecordClick }: TableViewProps) {
  const [data, setData] = useState<(Client | Lead | Applicant | Company | Person | Vendor)[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<string>('id')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [creating, setCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const columns = columnDefs[table]
  const searchFields = columns.filter((c) => c.searchable).map((c) => c.key)
  const filterableColumns = columns.filter((c) => c.filterable)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetchAll<Client | Lead | Applicant | Company | Person | Vendor>(table)
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }, [table])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Reset search and filters when table changes
  useEffect(() => {
    setSearchQuery('')
    setActiveFilters({})
  }, [table])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  // Compute filter options from data
  const filterOptions = useMemo(() => {
    return filterableColumns.map((col) => ({
      key: col.key,
      label: col.label,
      options: getUniqueValues(data as Record<string, unknown>[], col.key),
    }))
  }, [data, filterableColumns])

  // Apply search and filters
  const filteredData = useMemo(() => {
    return data.filter((record) => {
      const rec = record as Record<string, unknown>
      const matchesSearch = searchRecord(rec, searchQuery, searchFields)
      const matchesFilters = applyFilters(rec, activeFilters)
      return matchesSearch && matchesFilters
    })
  }, [data, searchQuery, searchFields, activeFilters])

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey]
      const bVal = (b as Record<string, unknown>)[sortKey]
      
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1
      
      let cmp = 0
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        cmp = aVal - bVal
      } else {
        cmp = String(aVal).localeCompare(String(bVal))
      }
      
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filteredData, sortKey, sortDir])

  // Apply 10K limit
  const totalCount = sortedData.length
  const displayData = sortedData.slice(0, MAX_RECORDS)
  const displayedCount = displayData.length

  const handleDelete = async (e: React.MouseEvent, recordId: number) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this record?')) return
    await deleteRecord(table, recordId)
    await loadData()
  }

  const handleCreate = async () => {
    setCreating(true)
    try {
      const defaults: Record<TableName, Record<string, unknown>> = {
        companies: { name: 'New Company' },
        people: { name: 'New Person', email: 'email@example.com' },
        clients: { name: 'New Client', email: 'email@example.com', status: 'lead' },
        leads: { name: 'New Lead', email: 'email@example.com', message: '' },
        applicants: {
          first_name: 'New',
          last_name: 'Applicant',
          email: 'email@example.com',
          cell_number: '',
          linkedin_url: '',
          timezone: 'UTC',
          location_preference: 'Remote',
          job_id: '',
        },
        vendors: { name: 'New Vendor' },
      }
      const newRecord = await createRecord(table, defaults[table])
      // Navigate to the new record
      onRecordClick(newRecord.id)
    } catch (err) {
      console.error('Failed to create:', err)
    } finally {
      setCreating(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
  }

  const formatCellValue = (value: unknown, key: string): string => {
    if (value === null || value === undefined) return '—'
    if (key === 'created_at' || key === 'updated_at') {
      if (typeof value === 'string') {
        return new Date(value).toLocaleDateString()
      }
    }
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...'
    }
    return String(value)
  }

  return (
    <div className="bg-frost rounded-lg border border-opal shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 px-4 py-3 border-b border-opal">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-medium text-oxblood capitalize">{table}</h2>
            <span className="text-sm text-basalt">
              {displayedCount === totalCount
                ? `${totalCount.toLocaleString()} record${totalCount !== 1 ? 's' : ''}`
                : `${displayedCount.toLocaleString()} of ${totalCount.toLocaleString()} records`}
            </span>
          </div>
          <div className="flex items-center gap-2">
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
            <ExportButton table={table} />
          </div>
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
          placeholder={`Search ${table}...`}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-basalt border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16 text-basalt">
            No records found. Click "Add" to create one.
          </div>
        ) : displayData.length === 0 ? (
          <div className="text-center py-16 text-basalt">
            No records match your search or filters.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-snow border-b border-opal">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-4 py-2 text-left font-medium text-basalt cursor-pointer hover:text-oxblood select-none ${col.width || ''}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (
                        <svg className={`w-3 h-3 ${sortDir === 'desc' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      )}
                    </span>
                  </th>
                ))}
                <th className="px-4 py-2 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRecordClick(row.id)}
                  className="border-b border-opal/50 last:border-0 hover:bg-snow/50 cursor-pointer transition-colors"
                >
                  {columns.map((col) => {
                    const rawValue = (row as Record<string, unknown>)[col.key]
                    const displayValue = formatCellValue(rawValue, col.key)

                    return (
                      <td key={col.key} className={`px-4 py-3 ${col.width || ''}`}>
                        <span className="text-charcoal">{displayValue}</span>
                      </td>
                    )
                  })}
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => handleDelete(e, row.id)}
                      className="p-1 text-basalt hover:text-ember transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
