import { useState } from 'react'
import type { FC } from 'react'
import { sections } from '../data/navigation'
import type { PageId } from '../data/navigation'

type SidebarProps = {
  currentPage: PageId
  navigate: (page: PageId) => void
  open: boolean
}

const Sidebar: FC<SidebarProps> = ({ currentPage, navigate, open }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['foundation'])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }

  return (
    <aside className={`sidebar${open ? ' sidebar-open' : ' sidebar-closed'}`}>
      <nav className="sidebar-nav">
        {sections.map((section) => {
          const expanded = expandedSections.includes(section.id)
          const isActive = currentPage === section.id
          return (
            <div key={section.id} className="nav-section">
              <button
                className={`nav-section-header${isActive ? ' active' : ''}`}
                onClick={() => {
                  toggleSection(section.id)
                  navigate(section.id)
                }}
              >
                <span>{section.label}</span>
                <svg
                  className={`chevron${expanded ? ' expanded' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {expanded && (
                <ul className="nav-items">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`nav-item${currentPage === item.id ? ' nav-item-active' : ''}`}
                        onClick={() => navigate(item.id)}
                      >
                        <span>{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
