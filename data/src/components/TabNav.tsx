type Tab = 'companies' | 'people' | 'clients' | 'leads' | 'applicants' | 'vendors' | 'invoices'

interface TabNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'companies', label: 'Companies' },
  { id: 'people', label: 'People' },
  { id: 'clients', label: 'Clients' },
  { id: 'leads', label: 'Leads' },
  { id: 'applicants', label: 'Applicants' },
  { id: 'vendors', label: 'Vendors' },
  { id: 'invoices', label: 'Invoices' },
]

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="flex gap-1 mb-6 border-b border-opal">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors relative
            ${activeTab === tab.id
              ? 'text-oxblood'
              : 'text-basalt hover:text-oxblood'
            }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ember" />
          )}
        </button>
      ))}
    </nav>
  )
}

