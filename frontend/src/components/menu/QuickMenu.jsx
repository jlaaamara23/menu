import { useEffect, useId, useRef, useState } from 'react'
import { List, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../utils/helpers'

export default function QuickMenu({ categories, activeId, onSelect }) {
  const { t, localized } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    let onPointer = null
    // Defer so the opening click does not immediately close the panel.
    const timer = window.setTimeout(() => {
      onPointer = (e) => {
        if (rootRef.current && !rootRef.current.contains(e.target)) {
          setOpen(false)
        }
      }
      document.addEventListener('pointerdown', onPointer)
    }, 0)

    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      if (onPointer) document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  if (!categories?.length) return null

  return (
    <div className="quick-menu" ref={rootRef}>
      {open && (
        <div
          id={panelId}
          className="quick-menu__panel"
          role="menu"
          aria-label={t.quickMenu}
        >
          <div className="quick-menu__panel-header">{t.jumpToCategory}</div>
          <div className="quick-menu__list hide-scrollbar">
            {categories.map((cat) => {
              const active = cat.id === activeId
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="menuitem"
                  className={cn('quick-menu__option', active && 'is-active')}
                  onClick={() => {
                    onSelect?.(cat.id)
                    setOpen(false)
                  }}
                >
                  <span>{localized(cat.nameAr, cat.nameEn)}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        className="quick-menu__fab"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-haspopup="menu"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
      >
        {open ? <X className="size-4" aria-hidden="true" /> : <List className="size-4" aria-hidden="true" />}
        <span>{open ? t.close : t.quickMenu}</span>
      </button>
    </div>
  )
}
