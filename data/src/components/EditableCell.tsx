import { useState, useRef, useEffect } from 'react'

interface EditableCellProps {
  value: string | number | null
  field: string
  recordId: number
  onSave: (field: string, value: string) => Promise<void>
  onShowHistory: () => void
  type?: 'text' | 'number' | 'date' | 'select'
  options?: string[]
}

export default function EditableCell({
  value,
  field,
  onSave,
  onShowHistory,
  type = 'text',
  options,
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(String(value ?? ''))
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select()
      }
    }
  }, [isEditing])

  const handleSave = async () => {
    if (editValue === String(value ?? '')) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    try {
      await onSave(field, editValue)
      setIsEditing(false)
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditValue(String(value ?? ''))
      setIsEditing(false)
    }
  }

  const displayValue = value ?? '—'

  if (isEditing) {
    if (type === 'select' && options) {
      return (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          disabled={isSaving}
          className="w-full px-2 py-1 text-sm bg-frost border border-basalt rounded focus:outline-none focus:ring-2 focus:ring-ember"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={type === 'date' ? 'date' : type === 'number' ? 'number' : 'text'}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        disabled={isSaving}
        className="w-full px-2 py-1 text-sm bg-frost border border-basalt rounded focus:outline-none focus:ring-2 focus:ring-ember"
      />
    )
  }

  return (
    <div
      className="group flex items-center gap-1 cursor-pointer min-h-[28px] px-2 py-1 -mx-2 -my-1 rounded hover:bg-opal transition-colors"
      onClick={() => setIsEditing(true)}
    >
      <span className={`flex-1 truncate ${value === null ? 'text-basalt/50 italic' : ''}`}>
        {displayValue}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onShowHistory()
        }}
        className="opacity-0 group-hover:opacity-100 text-basalt hover:text-ember transition-opacity p-0.5"
        title="View history"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  )
}

