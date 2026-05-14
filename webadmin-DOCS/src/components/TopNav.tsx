import { useState, useEffect } from 'react'
import type { FC } from 'react'

type TopNavProps = {
  onMenuClick: () => void
  onSearchClick: () => void
}

const TopNav: FC<TopNavProps> = ({ onMenuClick, onSearchClick }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('docs-theme') as 'dark' | 'light') ?? 'dark',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('docs-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <header className="topnav">
      <div className="topnav-left">
        <button className="hamburger" onClick={onMenuClick} aria-label="Toggle sidebar">
          <span />
          <span />
          <span />
        </button>
        <span className="brand-name">WebAdmin DOCS</span>
      </div>

      <div className="topnav-center">
        <button className="search-bar" onClick={onSearchClick} aria-label="Open search">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M8.5 3a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 8.5a6.5 6.5 0 1111.436 4.23l3.857 3.857a.75.75 0 01-1.06 1.06l-3.857-3.856A6.5 6.5 0 012 8.5z"
              fill="currentColor"
            />
          </svg>
          <span className="search-placeholder">ค้นหา</span>
          <kbd className="search-kbd">⌘K</kbd>
        </button>
      </div>

      <div className="topnav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default TopNav
