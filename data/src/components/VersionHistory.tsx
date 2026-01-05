import { useState, useEffect } from 'react'
import { fetchVersions, revertToVersion, RecordVersion } from '../lib/api'

type TableName = 'companies' | 'people' | 'clients' | 'leads' | 'applicants'

interface VersionHistoryProps {
  table: TableName
  recordId: number
  field: string
  onClose: () => void
  onRevert: () => void
}

export default function VersionHistory({
  table,
  recordId,
  field,
  onClose,
  onRevert,
}: VersionHistoryProps) {
  const [versions, setVersions] = useState<RecordVersion[]>([])
  const [loading, setLoading] = useState(true)
  const [reverting, setReverting] = useState<number | null>(null)

  useEffect(() => {
    loadVersions()
  }, [table, recordId])

  const loadVersions = async () => {
    setLoading(true)
    try {
      const allVersions = await fetchVersions(table, recordId)
      // Filter to show only versions for this field
      const fieldVersions = allVersions.filter((v) => v.field_name === field)
      setVersions(fieldVersions)
    } catch (err) {
      console.error('Failed to load versions:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRevert = async (versionId: number) => {
    setReverting(versionId)
    try {
      await revertToVersion(versionId)
      onRevert()
      onClose()
    } catch (err) {
      console.error('Failed to revert:', err)
    } finally {
      setReverting(null)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div className="version-panel fixed right-0 top-0 h-full w-80 bg-frost shadow-xl border-l border-opal z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-opal bg-snow">
        <div>
          <h3 className="font-medium text-oxblood">Version History</h3>
          <p className="text-xs text-basalt mt-0.5">{field}</p>
        </div>
        <button
          onClick={onClose}
          className="text-basalt hover:text-oxblood transition-colors p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-5 h-5 border-2 border-basalt border-t-transparent rounded-full animate-spin" />
          </div>
        ) : versions.length === 0 ? (
          <p className="text-center text-basalt py-8 text-sm">No changes recorded</p>
        ) : (
          <div className="space-y-3">
            {versions.map((version) => (
              <div
                key={version.id}
                className="bg-snow rounded-lg p-3 border border-opal"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs text-basalt">
                    {formatDate(version.changed_at)}
                  </span>
                  <button
                    onClick={() => handleRevert(version.id)}
                    disabled={reverting === version.id}
                    className="text-xs text-ember hover:text-oxblood font-medium disabled:opacity-50"
                  >
                    {reverting === version.id ? 'Reverting...' : 'Revert'}
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex gap-2">
                    <span className="text-basalt shrink-0">From:</span>
                    <span className="text-oxblood/70 line-through truncate">
                      {version.old_value || '(empty)'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-basalt shrink-0">To:</span>
                    <span className="text-oxblood truncate">
                      {version.new_value || '(empty)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

