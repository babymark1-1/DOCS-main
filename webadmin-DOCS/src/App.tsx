import { useState, useEffect } from 'react'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import SearchModal from './components/SearchModal'
import CategoryPage from './pages/CategoryPage'
import NamingPage from './pages/NamingPage'
import FormattingPage from './pages/FormattingPage'
import DesignPatternPage from './pages/DesignPatternPage'
import type { PageId } from './data/navigation'

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(
    () => (localStorage.getItem('docs-page') as PageId) ?? 'foundation',
  )
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const navigate = (page: PageId, anchor?: string) => {
    setCurrentPage(page)
    localStorage.setItem('docs-page', page)
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'foundation': return <CategoryPage navigate={navigate} />
      // case 'overview': return <OverviewPage navigate={navigate} />
      case 'naming': return <NamingPage navigate={navigate} />
      case 'formatting': return <FormattingPage navigate={navigate} />
      case 'design-pattern': return <DesignPatternPage navigate={navigate} />
      default: return <CategoryPage navigate={navigate} />
    }
  }

  return (
    <>
      <TopNav
        onMenuClick={() => setSidebarOpen((o) => !o)}
        onSearchClick={() => setSearchOpen(true)}
      />
      <div className="layout">
        <Sidebar currentPage={currentPage} navigate={navigate} open={sidebarOpen} />
        <main className={`main-content${sidebarOpen ? '' : ' sidebar-hidden'}`}>
          {renderContent()}
        </main>
      </div>
      {searchOpen && (
        <SearchModal
          onClose={() => setSearchOpen(false)}
          navigate={navigate}
        />
      )}
    </>
  )
}

export default App
