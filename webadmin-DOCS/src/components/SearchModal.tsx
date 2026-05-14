import { useState, useEffect, useRef, useMemo } from 'react'
import type { FC, KeyboardEvent, ReactNode } from 'react'
import { searchIndex } from '../data/navigation'
import type { PageId, SearchItem, SearchItemKind } from '../data/navigation'

type SearchModalProps = {
  onClose: () => void
  navigate: (page: PageId, anchor?: string) => void
}

const ICON: Record<SearchItemKind, ReactNode> = {
  page: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707L9.293 0zM9.5 1v2.5a1 1 0 0 0 1 1H13v8.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
    </svg>
  ),
  heading: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.258zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
    </svg>
  ),
  text: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 4h12v1H2V4zm0 3h12v1H2V7zm0 3h8v1H2v-1z" />
    </svg>
  ),
}

const GROUP_LABEL: Record<SearchItemKind, string> = {
  page: 'หน้า',
  heading: 'หัวข้อ',
  text: 'ข้อความ',
}

function highlight(text: string, query: string): ReactNode {
  if (!query.trim()) return text
  const q = query.trim()
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="search-highlight">{part}</mark>
    ) : (
      part
    ),
  )
}

const SearchModal: FC<SearchModalProps> = ({ onClose, navigate }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered: SearchItem[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return searchIndex.filter((item) => item.kind === 'page')
    return searchIndex.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.context.toLowerCase().includes(q),
    )
  }, [query])

  const groupsWithIdx = useMemo(() => {
    const defs: SearchItemKind[] = ['page', 'heading', 'text']
    let flatIdx = 0
    return defs
      .map((kind) => ({
        kind,
        items: filtered
          .filter((item) => item.kind === kind)
          .map((item) => ({ item, idx: flatIdx++ })),
      }))
      .filter((g) => g.items.length > 0)
  }, [filtered])

  const total = filtered.length

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, total - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      let i = 0
      for (const g of groupsWithIdx) {
        for (const { item } of g.items) {
          if (i === selected) {
            navigate(item.pageId, item.anchor)
            onClose()
            return
          }
          i++
        }
      }
    }
  }

  const handleSelect = (item: SearchItem) => {
    navigate(item.pageId, item.anchor)
    onClose()
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="search-input-wrapper">
          <svg className="search-icon-lg" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M8.5 3a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 8.5a6.5 6.5 0 1111.436 4.23l3.857 3.857a.75.75 0 01-1.06 1.06l-3.857-3.856A6.5 6.5 0 012 8.5z"
              fill="currentColor"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="ค้นหาเอกสาร..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(0)
            }}
            onKeyDown={handleKey}
            autoComplete="off"
          />
          {query ? (
            <button
              className="search-clear"
              onClick={() => {
                setQuery('')
                setSelected(0)
                inputRef.current?.focus()
              }}
              aria-label="ล้าง"
            >
              ล้าง
            </button>
          ) : (
            <kbd className="search-esc">Esc</kbd>
          )}
        </div>

        <div className="search-results" role="listbox">
          {total === 0 ? (
            <p className="search-empty">ไม่พบผลลัพธ์สำหรับ &ldquo;{query}&rdquo;</p>
          ) : (
            groupsWithIdx.map((group) => (
              <div key={group.kind} className="search-group">
                <p className="search-group-label">{GROUP_LABEL[group.kind]}</p>
                {group.items.map(({ item, idx }) => (
                  <button
                    key={`${item.pageId}-${item.anchor ?? item.kind}-${idx}`}
                    className={`search-result-item${idx === selected ? ' search-result-selected' : ''}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelected(idx)}
                    role="option"
                    aria-selected={idx === selected}
                  >
                    <span className="search-result-icon">{ICON[item.kind]}</span>
                    <span className="search-result-body">
                      <span className="search-result-title">{highlight(item.label, query)}</span>
                      <span className="search-result-desc">{highlight(item.context, query)}</span>
                    </span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="search-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> เลื่อน
          </span>
          <span>
            <kbd>↵</kbd> เปิด
          </span>
          <span>
            <kbd>Esc</kbd> ปิด
          </span>
          <span className="search-footer-count">ผลการค้นหา {total} รายการ</span>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
