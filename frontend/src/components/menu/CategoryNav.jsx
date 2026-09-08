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
    <nav
      ref={containerRef}
      className="sticky top-0 z-30 border-b border-line/60 bg-cream/90 backdrop-blur-md"
      aria-label="Categories"
    >
      <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
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
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition duration-200',
                active
                  ? 'bg-brand text-cream shadow-soft'
                  : 'bg-surface text-muted border border-line hover:border-gold hover:text-ink',
              )}
            >
              {localized(cat.nameAr, cat.nameEn)}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
