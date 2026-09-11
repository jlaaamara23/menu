import { useEffect, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'

export default function CategoryNav({ categories, activeId, onSelect }) {
  const { localized } = useLanguage()
  const containerRef = useRef(null)
  const itemRefs = useRef({})

  useEffect(() => {
    const el = itemRefs.current[activeId]
    if (el && containerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeId])

  if (!categories?.length) return null

  return (
    <nav className="menu-nav" aria-label="Categories">
      <div ref={containerRef} className="menu-nav__track hide-scrollbar">
        {categories.map((cat) => {
          const active = cat.id === activeId
          return (
            <button
              key={cat.id}
              type="button"
              ref={(node) => {
                itemRefs.current[cat.id] = node
              }}
              onClick={() => onSelect?.(cat.id)}
              aria-current={active ? 'true' : undefined}
              className={cn('menu-nav__item', active && 'is-active')}
            >
              {localized(cat.nameAr, cat.nameEn)}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
