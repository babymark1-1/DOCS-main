import type { FC, ReactNode } from 'react'
import Toc from './Toc'
import type { TocItem } from './Toc'
import type { PageId } from '../data/navigation'
import { orderedPages } from '../data/navigation'

type DocLayoutProps = {
  title: string
  description?: string
  breadcrumb: string[]
  toc?: TocItem[]
  prev?: PageId
  next?: PageId
  navigate: (page: PageId) => void
  children: ReactNode
}

const DocLayout: FC<DocLayoutProps> = ({
  title,
  description,
  breadcrumb,
  toc,
  prev,
  next,
  navigate,
  children,
}) => {
  return (
    <div className="doc-layout">
      <div className="doc-main">
        <nav className="breadcrumb" aria-label="breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="breadcrumb-segment">
              {i > 0 && <span className="breadcrumb-sep">›</span>}
              <span className={i === breadcrumb.length - 1 ? 'breadcrumb-current' : 'breadcrumb-part'}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>

        <h1 className="page-title">{title}</h1>
        {description && <p className="page-description">{description}</p>}

        <div className="doc-content">{children}</div>

        <div className="page-footer">
          <div className="nav-buttons">
            {prev && (() => {
              const prevPage = orderedPages.find((p) => p.id === prev)
              return prevPage ? (
                <button className="prev-button" onClick={() => navigate(prev)}>
                  <span className="nav-label">← ก่อนหน้า</span>
                  <span className="nav-page">{prevPage.label}</span>
                </button>
              ) : null
            })()}
            {next && (() => {
              const nextPage = orderedPages.find((p) => p.id === next)
              return nextPage ? (
                <button className="next-button" onClick={() => navigate(next)}>
                  <span className="nav-label">ถัดไป</span>
                  <span className="nav-page">{nextPage.label} →</span>
                </button>
              ) : null
            })()}
          </div>
        </div>
      </div>

      {toc && toc.length > 0 && <Toc items={toc} />}
    </div>
  )
}

export default DocLayout
