import { useState } from 'react'
import TableView from './TableView'
import ApplicantsKanbanView from './ApplicantsKanbanView'

type ViewMode = 'table' | 'kanban'

interface ApplicantsViewProps {
  onRecordClick: (id: number) => void
}

export default function ApplicantsView({ onRecordClick }: ApplicantsViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table')

  return (
    <div>
      {/* View Toggle */}
      <div className="flex justify-end mb-3">
        <div className="inline-flex items-center gap-1 p-1 bg-opal/50 rounded-lg">
          <button
            onClick={() => setViewMode('table')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-all ${
              viewMode === 'table'
                ? 'bg-frost text-oxblood shadow-sm'
                : 'text-basalt hover:text-oxblood'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Table
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-all ${
              viewMode === 'kanban'
                ? 'bg-frost text-oxblood shadow-sm'
                : 'text-basalt hover:text-oxblood'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
            Kanban
          </button>
        </div>
      </div>

      {/* View Content */}
      {viewMode === 'table' ? (
        <TableView table="applicants" onRecordClick={onRecordClick} />
      ) : (
        <ApplicantsKanbanView onRecordClick={onRecordClick} />
      )}
    </div>
  )
}

