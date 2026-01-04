import { Link } from './link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb navigation component for hierarchical page structure.
 * The last item is displayed as bold text (current page), while other items are links.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-oxblood dark:text-coral">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <span>/</span>}
            {isLast ? (
              <span className="font-semibold">{item.label}</span>
            ) : item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

