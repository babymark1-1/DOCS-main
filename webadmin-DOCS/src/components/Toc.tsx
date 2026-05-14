import { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'

export type TocItem = {
  id: string
  label: string
  level: 2 | 3
}

type TocProps = {
  items: TocItem[]
}

const Toc: FC<TocProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('')
  const isClickScrolling = useRef(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const OFFSET = 80 // px below top of viewport to trigger

    const updateActive = () => {
      if (isClickScrolling.current) return

      // If scrolled to bottom, always highlight last item
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50
      if (nearBottom && items.length > 0) {
        setActiveId(items[items.length - 1].id)
        return
      }

      const scrollY = window.scrollY + OFFSET
      let current = ''
      for (const { id } of items) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive() // run once on mount

    return () => window.removeEventListener('scroll', updateActive)
  }, [items])

  const handleClick = (id: string) => {
    setActiveId(id)
    isClickScrolling.current = true
    if (lockTimer.current) clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => {
      isClickScrolling.current = false
    }, 800)
  }

  return (
    <aside className="toc">
      <p className="toc-title">≡ เนื้อหาในหน้านี้</p>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id} className={`toc-item toc-level-${item.level}`}>
            <a
              href={`#${item.id}`}
              className={`toc-link${activeId === item.id ? ' toc-link-active' : ''}`}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Toc
