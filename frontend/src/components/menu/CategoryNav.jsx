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
      className="sticky top-0 z-30 border-b border-line bg-cream"
      aria-label="Categories"
    >
      <div className="hide-scrollbar mx-auto flex max-w-3xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
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
                'shrink-0 border-b-2 px-3 py-2.5 text-sm transition',
                active
                  ? 'border-brand font-semibold text-brand'
                  : 'border-transparent text-muted hover:text-ink',
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
