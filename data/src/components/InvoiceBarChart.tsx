import { useState, useMemo } from 'react'
import { Invoice } from '../lib/api'

interface InvoiceBarChartProps {
  invoices: Invoice[]
  title?: string
}

interface MonthData {
  month: string
  label: string
  open: number
  paid: number
  total: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${Math.round(amount / 1000).toLocaleString()}k`
  }
  return `$${Math.round(amount).toLocaleString()}`
}

function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export default function InvoiceBarChart({ invoices, title = 'Invoices issued' }: InvoiceBarChartProps) {
  // Get available years from invoices
  const availableYears = useMemo(() => {
    const years = new Set<number>()
    invoices.forEach((inv) => {
      if (inv.issue_date) {
        years.add(new Date(inv.issue_date).getFullYear())
      }
    })
    return Array.from(years).sort((a, b) => b - a)
  }, [invoices])

  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(() => {
    if (availableYears.includes(currentYear)) return currentYear
    return availableYears[0] || currentYear
  })

  const [hoveredMonth, setHoveredMonth] = useState<MonthData | null>(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  // Aggregate data by month for the selected year
  const monthlyData = useMemo(() => {
    const data: MonthData[] = MONTHS.map((label, index) => ({
      month: `${selectedYear}-${String(index + 1).padStart(2, '0')}`,
      label,
      open: 0,
      paid: 0,
      total: 0,
    }))

    invoices.forEach((inv) => {
      if (!inv.issue_date) return
      const date = new Date(inv.issue_date)
      if (date.getFullYear() !== selectedYear) return

      const monthIndex = date.getMonth()
      const amount = Number(inv.amount)

      if (inv.status === 'paid') {
        data[monthIndex].paid += amount
      } else {
        data[monthIndex].open += amount
      }
      data[monthIndex].total += amount
    })

    return data
  }, [invoices, selectedYear])

  // Calculate max for scale
  const maxAmount = useMemo(() => {
    return Math.max(...monthlyData.map((d) => d.total), 1)
  }, [monthlyData])

  // Calculate Y-axis labels (nice round numbers)
  const yAxisLabels = useMemo(() => {
    const step = maxAmount / 4
    const magnitude = Math.pow(10, Math.floor(Math.log10(step)))
    const niceStep = Math.ceil(step / magnitude) * magnitude
    const labels: number[] = []
    for (let i = 4; i >= 0; i--) {
      labels.push(niceStep * i)
    }
    return labels
  }, [maxAmount])

  const yAxisMax = yAxisLabels[0] || maxAmount

  const canGoBack = availableYears.some(y => y < selectedYear)
  const canGoForward = selectedYear < currentYear

  const handlePrevYear = () => {
    if (canGoBack) setSelectedYear((y) => y - 1)
  }

  const handleNextYear = () => {
    if (canGoForward) setSelectedYear((y) => y + 1)
  }

  const handleMouseMove = (e: React.MouseEvent, data: MonthData) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
    setHoveredMonth(data)
  }

  if (invoices.length === 0) {
    return null
  }

  const chartHeight = 180

  return (
    <div className="relative">
      {/* Header with navigation */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevYear}
            disabled={!canGoBack}
            className="p-1.5 rounded hover:bg-opal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 text-basalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNextYear}
            disabled={!canGoForward}
            className="p-1.5 rounded hover:bg-opal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 text-basalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <h3 className="text-lg font-medium text-charcoal">
          {title} in {selectedYear}
        </h3>
        
        {/* Legend */}
        <div className="flex items-center gap-4 ml-auto text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-200" />
            <span className="text-basalt">Open</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-basalt">Paid</span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="flex gap-2">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-right pr-2 shrink-0" style={{ height: chartHeight }}>
          {yAxisLabels.map((val, i) => (
            <span key={i} className="text-xs text-basalt tabular-nums leading-none">
              {formatCurrency(val)}
            </span>
          ))}
        </div>

        {/* Bars container */}
        <div className="flex-1 flex items-end gap-1.5" style={{ height: chartHeight }}>
          {monthlyData.map((data) => {
            const paidHeight = yAxisMax > 0 ? (data.paid / yAxisMax) * chartHeight : 0
            const openHeight = yAxisMax > 0 ? (data.open / yAxisMax) * chartHeight : 0

            return (
              <div
                key={data.month}
                className="flex-1 flex flex-col justify-end items-center cursor-pointer group"
                style={{ height: chartHeight }}
                onMouseEnter={(e) => handleMouseMove(e, data)}
                onMouseMove={(e) => handleMouseMove(e, data)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Stacked bar - grows upward from bottom */}
                <div className="w-full flex flex-col-reverse transition-opacity group-hover:opacity-80">
                  {/* Paid (bottom, dark green) */}
                  {paidHeight > 0 && (
                    <div
                      className="w-full bg-emerald-500 rounded-t-sm"
                      style={{ height: Math.max(paidHeight, 2) }}
                    />
                  )}
                  {/* Open (top, light green) */}
                  {openHeight > 0 && (
                    <div
                      className="w-full bg-emerald-200"
                      style={{ height: Math.max(openHeight, 2) }}
                    />
                  )}
                </div>

                {/* Month label */}
                <span className="text-xs text-basalt mt-2 leading-none">{data.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredMonth && hoveredMonth.total > 0 && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-lg border border-opal p-3 pointer-events-none"
          style={{
            left: hoverPosition.x,
            top: hoverPosition.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="font-medium text-charcoal mb-2">
            {title} {hoveredMonth.label} {selectedYear}
          </p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200" />
                <span className="text-basalt">Open</span>
              </div>
              <span className="font-medium text-charcoal tabular-nums">
                {formatCurrencyFull(hoveredMonth.open)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span className="text-basalt">Paid</span>
              </div>
              <span className="font-medium text-charcoal tabular-nums">
                {formatCurrencyFull(hoveredMonth.paid)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
