'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { navigation } from '@/lib/navigation'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  async function handleLogout() {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    window.location.href = '/login'
  }

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-screen bg-white border-r border-opal transition-all duration-300 flex flex-col',
        isCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-opal">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-ember flex items-center justify-center">
              <span className="text-white font-semibold text-sm">M</span>
            </div>
            <span className="font-semibold text-oxblood">Marketing</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navigation.map((section, sectionIdx) => (
          <div key={section.title} className={clsx(sectionIdx > 0 && 'mt-6')}>
            {!isCollapsed && (
              <div className="px-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
            )}
            <div className="space-y-1 px-2">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group relative',
                      isActive
                        ? 'bg-ember text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={clsx('w-5 h-5 flex-shrink-0', isActive ? 'text-white' : 'text-gray-600')} />
                    {!isCollapsed && (
                      <>
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-green-100 text-green-700 rounded">
                            NEW
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {item.label}
                        {item.isNew && (
                          <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold bg-green-500 text-white rounded">
                            NEW
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-opal p-2">
        <button
          onClick={handleLogout}
          className={clsx(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100 w-full',
            isCollapsed && 'justify-center'
          )}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
