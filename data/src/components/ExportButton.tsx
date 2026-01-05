import { useState } from 'react'
import { exportCSV } from '../lib/api'

type TableName = 'companies' | 'people' | 'clients' | 'leads' | 'applicants'

interface ExportButtonProps {
  table: TableName
}

export default function ExportButton({ table }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      await exportCSV(table)
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-basalt hover:text-oxblood border border-opal hover:border-basalt rounded transition-colors disabled:opacity-50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {exporting ? 'Exporting...' : 'Export CSV'}
    </button>
  )
}

