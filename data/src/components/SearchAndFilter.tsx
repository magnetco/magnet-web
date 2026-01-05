import { useState, useEffect, useMemo } from 'react'

export const MAX_RECORDS = 10000

interface FilterOption {
  key: string
  label: string
  options: string[]
}

interface SearchAndFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filters: FilterOption[]
  activeFilters: Record<string, string>
  onFilterChange: (key: string, value: string) => void
  totalCount: number
  displayedCount: number
  placeholder?: string
}

export default function SearchAndFilter({
  searchValue,
  onSearchChange,
  filters,
  activeFilters,
  onFilterChange,
  totalCount,
  displayedCount,
  placeholder = 'Search...',
}: SearchAndFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search Row */}
      <div className="flex items-center gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-basalt"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 text-sm bg-snow border border-opal rounded-lg focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember transition-all"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-basalt hover:text-oxblood transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <select
            key={filter.key}
            value={activeFilters[filter.key] || ''}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="px-3 py-2 text-sm bg-snow border border-opal rounded-lg focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember transition-all min-w-[140px]"
          >
            <option value="">All {filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}

        {/* Clear Filters */}
        {(searchValue || Object.values(activeFilters).some((v) => v)) && (
          <button
            onClick={() => {
              onSearchChange('')
              filters.forEach((f) => onFilterChange(f.key, ''))
            }}
            className="px-3 py-2 text-sm text-basalt hover:text-oxblood transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Count and Truncation Warning */}
      {totalCount > MAX_RECORDS && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            Showing {displayedCount.toLocaleString()} of {totalCount.toLocaleString()} records.
            Use search or filters to narrow results.
          </span>
        </div>
      )}
    </div>
  )
}

// Fuzzy search utility
export function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true
  if (!text) return false
  
  const searchLower = query.toLowerCase()
  const textLower = text.toLowerCase()
  
  // Exact substring match
  if (textLower.includes(searchLower)) return true
  
  // Fuzzy match - all characters must appear in order
  let searchIndex = 0
  for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
    if (textLower[i] === searchLower[searchIndex]) {
      searchIndex++
    }
  }
  return searchIndex === searchLower.length
}

// Search across multiple fields
export function searchRecord<T extends Record<string, unknown>>(
  record: T,
  query: string,
  searchFields: string[]
): boolean {
  if (!query) return true
  
  return searchFields.some((field) => {
    const value = record[field]
    if (value === null || value === undefined) return false
    return fuzzyMatch(String(value), query)
  })
}

// Apply filters to a record
export function applyFilters<T extends Record<string, unknown>>(
  record: T,
  filters: Record<string, string>
): boolean {
  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true
    const recordValue = record[key]
    if (recordValue === null || recordValue === undefined) return value === ''
    return String(recordValue) === value
  })
}

// Get unique values for a field
export function getUniqueValues<T extends Record<string, unknown>>(
  data: T[],
  field: string
): string[] {
  const values = new Set<string>()
  data.forEach((record) => {
    const value = record[field]
    if (value !== null && value !== undefined && value !== '') {
      values.add(String(value))
    }
  })
  return Array.from(values).sort()
}

