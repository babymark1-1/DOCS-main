import type { FC } from 'react'
import { sections } from '../data/navigation'
import type { PageId } from '../data/navigation'

type CategoryPageProps = {
  navigate: (page: PageId) => void
}

const CategoryPage: FC<CategoryPageProps> = ({ navigate }) => {
  const section = sections[0]

  return (
    <div className="doc-layout">
      <div className="doc-main">
        <nav className="breadcrumb">
          <span className="breadcrumb-segment">
            <span className="breadcrumb-part">🏠</span>
          </span>
          <span className="breadcrumb-segment">
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{section.label}</span>
          </span>
        </nav>

        <h1 className="page-title">{section.label}</h1>
        <p className="page-subtitle">{section.items.length} หน้าในหมวดนี้</p>

        <div className="card-grid">
          {section.items.map((item) => (
            <button key={item.id} className="doc-card" onClick={() => navigate(item.id)}>
              <span className="doc-card-title">
                {item.label}
                {item.badge && <span className="card-badge">{item.badge}</span>}
              </span>
              <p>{item.description}</p>
            </button>
          ))}
        </div>

        <div className="page-footer">
          <div className="nav-buttons">
            <button className="next-button" onClick={() => navigate('naming')}>
              <span className="nav-label">ถัดไป</span>
              <span className="nav-page">Naming Convention →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
