import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  fetchInvoices,
  fetchHarvestSyncStatus,
  triggerHarvestSync,
  fetchUnmatchedHarvestClients,
  linkHarvestClient,
  fetchAll,
  Invoice,
  HarvestSyncStatus,
  UnmatchedHarvestClient,
  Client,
} from '../lib/api'
import InvoiceBarChart from './InvoiceBarChart'
import SearchAndFilter, { searchRecord, applyFilters, getUniqueValues } from './SearchAndFilter'

interface InvoicesViewProps {
  onRecordClick?: (id: number) => void
}

type SortKey = 'number' | 'client_name' | 'amount' | 'status' | 'issue_date'
type SortDir = 'asc' | 'desc'

const statusColors: Record<Invoice['status'], string> = {
  paid: 'bg-emerald-50 text-emerald-700',
  open: 'bg-amber-50 text-amber-700',
  draft: 'bg-slate-50 text-slate-500',
  closed: 'bg-slate-100 text-slate-600',
}

function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatCurrencyFull(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatSyncTime(dateStr: string | null): string {
  if (!dateStr) return 'Never'
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export default function InvoicesView({ onRecordClick }: InvoicesViewProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<HarvestSyncStatus | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('issue_date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Matching UI state
  const [unmatchedClients, setUnmatchedClients] = useState<UnmatchedHarvestClient[]>([])
  const [localClients, setLocalClients] = useState<Client[]>([])
  const [showMatchingUI, setShowMatchingUI] = useState(false)
  const [linkingId, setLinkingId] = useState<number | null>(null)
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [invoicesData, statusData, unmatchedData, clientsData] = await Promise.all([
        fetchInvoices(),
        fetchHarvestSyncStatus(),
        fetchUnmatchedHarvestClients(),
        fetchAll<Client>('clients'),
      ])
      setInvoices(invoicesData)
      setSyncStatus(statusData)
      setUnmatchedClients(unmatchedData)
      setLocalClients(clientsData)
    } catch (err) {
      console.error('Failed to load invoices:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSync = async () => {
    setSyncing(true)
    setSyncMessage(null)
    try {
      const result = await triggerHarvestSync()
      setSyncMessage({
        type: 'success',
        text: `Synced ${result.invoicesSynced} invoices`,
      })
      await loadData()
    } catch (err: unknown) {
      const error = err as { message?: string }
      setSyncMessage({
        type: 'error',
        text: error.message || 'Failed to sync',
      })
    } finally {
      setSyncing(false)
    }
  }

  const handleLinkClient = async (harvestClientId: number, clientId: number) => {
    setLinkingId(harvestClientId)
    try {
      const result = await linkHarvestClient(harvestClientId, clientId)
      setSyncMessage({
        type: 'success',
        text: `Linked! ${result.invoicesUpdated} invoices updated.`,
      })
      await loadData()
    } catch (err: unknown) {
      const error = err as { message?: string }
      setSyncMessage({
        type: 'error',
        text: error.message || 'Failed to link',
      })
    } finally {
      setLinkingId(null)
    }
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(key === 'issue_date' || key === 'amount' ? 'desc' : 'asc')
    }
  }

  // Filter options
  const filterOptions = useMemo(() => [
    { key: 'status', label: 'Status', options: getUniqueValues(invoices, 'status') },
  ], [invoices])

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Search fields for invoices
  const invoiceSearchFields = ['number', 'client_name', 'harvest_client_name']

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch = searchRecord(inv, searchQuery, invoiceSearchFields)
      const matchesFilters = applyFilters(inv, activeFilters)
      return matchesSearch && matchesFilters
    })
  }, [invoices, searchQuery, activeFilters])

  // Sort invoices (after filtering)
  const sortedInvoices = useMemo(() => {
    return [...filteredInvoices].sort((a, b) => {
      let cmp = 0
      
      switch (sortKey) {
        case 'number':
          cmp = (a.number || '').localeCompare(b.number || '')
          break
        case 'client_name':
          cmp = (a.client_name || a.harvest_client_name || '').localeCompare(
            b.client_name || b.harvest_client_name || ''
          )
          break
        case 'amount':
          cmp = Number(a.amount) - Number(b.amount)
          break
        case 'status':
          cmp = a.status.localeCompare(b.status)
          break
        case 'issue_date':
          cmp = (a.issue_date || '').localeCompare(b.issue_date || '')
          break
      }
      
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filteredInvoices, sortKey, sortDir])

  // Summary stats (from filtered invoices)
  const totalInvoiced = filteredInvoices.reduce((sum, inv) => sum + Number(inv.amount), 0)
  const totalPaid = filteredInvoices.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + Number(inv.amount), 0)

  const SortIcon = ({ active, direction }: { active: boolean; direction: SortDir }) => (
    <svg 
      className={`w-3.5 h-3.5 ml-1 transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      {direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  )

  return (
    <div className="bg-frost rounded-xl border border-opal/60 shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-opal/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-charcoal">Invoices</h2>
            <span className="text-sm text-basalt tabular-nums">
              {filteredInvoices.length === invoices.length
                ? invoices.length.toLocaleString()
                : `${filteredInvoices.length.toLocaleString()} of ${invoices.length.toLocaleString()}`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6 text-sm mr-4">
              <div>
                <span className="text-basalt">Invoiced</span>
                <span className="font-medium text-charcoal ml-1.5 tabular-nums">
                  {formatCurrency(totalInvoiced)}
                </span>
              </div>
              <div>
                <span className="text-basalt">Paid</span>
                <span className="font-medium text-emerald-600 ml-1.5 tabular-nums">
                  {formatCurrency(totalPaid)}
                </span>
              </div>
            </div>
            <span className="text-xs text-basalt">
              {syncStatus && formatSyncTime(syncStatus.lastSyncedAt)}
            </span>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-frost bg-charcoal hover:bg-oxblood rounded-lg transition-colors disabled:opacity-50"
            >
              <svg
                className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {syncing ? 'Syncing' : 'Sync'}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          totalCount={invoices.length}
          displayedCount={filteredInvoices.length}
          placeholder="Search invoices..."
        />

        {/* Sync message */}
        {syncMessage && (
          <div
            className={`text-sm px-3 py-2 rounded-lg mb-4 ${
              syncMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {syncMessage.text}
          </div>
        )}

        {/* Unmatched clients toggle */}
        {unmatchedClients.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowMatchingUI(!showMatchingUI)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                showMatchingUI
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {unmatchedClients.length} unmatched {unmatchedClients.length === 1 ? 'client' : 'clients'}
              <svg className={`w-3 h-3 ml-1.5 inline transition-transform ${showMatchingUI ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Matching UI */}
        {showMatchingUI && unmatchedClients.length > 0 && (
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-lg p-4 mb-4">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {unmatchedClients.map((unmatched) => (
                <div
                  key={unmatched.harvest_client_id}
                  className="flex items-center gap-3 bg-white p-3 rounded-lg border border-amber-100/80"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal text-sm truncate">
                      {unmatched.harvest_client_name}
                    </p>
                    <p className="text-xs text-basalt">
                      {unmatched.invoice_count} invoice{Number(unmatched.invoice_count) !== 1 ? 's' : ''} · {formatCurrency(Number(unmatched.total_amount))}
                    </p>
                  </div>
                  <select
                    className="text-sm border border-opal rounded-lg px-2.5 py-1.5 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-ember/20"
                    defaultValue=""
                    disabled={linkingId === unmatched.harvest_client_id}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleLinkClient(unmatched.harvest_client_id, parseInt(e.target.value))
                      }
                    }}
                  >
                    <option value="">Select client...</option>
                    {localClients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  {linkingId === unmatched.harvest_client_id && (
                    <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bar Chart */}
        {!loading && invoices.length > 0 && (
          <InvoiceBarChart invoices={invoices} />
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-5 h-5 border-2 border-basalt/30 border-t-basalt rounded-full animate-spin" />
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-20 text-basalt">
            {invoices.length === 0
              ? 'No invoices yet. Click "Sync" to fetch from Harvest.'
              : 'No invoices match your search.'}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-opal/60">
                <th 
                  onClick={() => handleSort('number')}
                  className="group px-6 py-3 text-left text-xs font-medium text-basalt uppercase tracking-wider cursor-pointer hover:text-charcoal transition-colors"
                >
                  <span className="inline-flex items-center">
                    Invoice
                    <SortIcon active={sortKey === 'number'} direction={sortDir} />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('client_name')}
                  className="group px-6 py-3 text-left text-xs font-medium text-basalt uppercase tracking-wider cursor-pointer hover:text-charcoal transition-colors"
                >
                  <span className="inline-flex items-center">
                    Client
                    <SortIcon active={sortKey === 'client_name'} direction={sortDir} />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('amount')}
                  className="group px-6 py-3 text-right text-xs font-medium text-basalt uppercase tracking-wider cursor-pointer hover:text-charcoal transition-colors"
                >
                  <span className="inline-flex items-center justify-end">
                    Amount
                    <SortIcon active={sortKey === 'amount'} direction={sortDir} />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('status')}
                  className="group px-6 py-3 text-left text-xs font-medium text-basalt uppercase tracking-wider cursor-pointer hover:text-charcoal transition-colors"
                >
                  <span className="inline-flex items-center">
                    Status
                    <SortIcon active={sortKey === 'status'} direction={sortDir} />
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('issue_date')}
                  className="group px-6 py-3 text-left text-xs font-medium text-basalt uppercase tracking-wider cursor-pointer hover:text-charcoal transition-colors"
                >
                  <span className="inline-flex items-center">
                    Date
                    <SortIcon active={sortKey === 'issue_date'} direction={sortDir} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-opal/40">
              {sortedInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  onClick={() => onRecordClick?.(invoice.id)}
                  className="hover:bg-snow/60 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-charcoal">
                      #{invoice.number || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-charcoal">
                      {invoice.client_name || invoice.harvest_client_name}
                    </span>
                    {!invoice.client_name && (
                      <span className="ml-2 text-xs text-amber-600">unlinked</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-charcoal tabular-nums">
                      {formatCurrencyFull(Number(invoice.amount), invoice.currency)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-md capitalize ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-basalt">
                      {formatDate(invoice.issue_date)}
                    </span>
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
