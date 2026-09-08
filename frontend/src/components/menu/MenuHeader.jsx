import { Languages, Moon, Sun } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'
import { StatusPill } from '../ui/Badge'
import { cn } from '../../utils/helpers'

function LogoMark({ className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-11 w-11', className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M24 10c-2.2 6.5-8 10.5-8 17a8 8 0 0 0 16 0c0-6.5-5.8-10.5-8-17z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M24 14c1.2 3.2 3.8 5.6 4.8 9"
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

export function MenuHeader({ settings, tagline }) {
  const { t, lang, toggleLang, localize } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const isOpen = settings?.isOpen !== false
  const brandName =
    localize(settings?.nameAr, settings?.nameEn) || t.brand
  const secondaryName =
    lang === 'ar' && settings?.nameEn && settings.nameEn !== brandName
      ? settings.nameEn
      : lang === 'en' && settings?.nameAr && settings.nameAr !== brandName
        ? settings.nameAr
        : null

  return (
    <header className="relative px-4 pt-8 pb-6 text-center animate-fade-up">
      <div className="absolute top-4 end-4 flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLang}
          aria-label={t.language}
          className="rounded-full"
        >
          <Languages className="h-[18px] w-[18px]" />
          <span className="text-[10px] font-semibold">{lang === 'ar' ? 'EN' : 'AR'}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={isDark ? t.lightMode : t.darkMode}
          className="rounded-full"
        >
          {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </Button>
      </div>

      <div className="absolute top-4 start-4">
        <StatusPill
          active={isOpen}
          activeLabel={t.openNow}
          inactiveLabel={t.closedNow}
        />
      </div>

      <div className="mx-auto flex flex-col items-center gap-3 max-w-xl pt-6">
        <div className="text-[var(--color-green)] dark:text-[var(--color-gold)]">
          <LogoMark />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-gold)] mb-1">
            Mediterranean
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[var(--color-green)] dark:text-[var(--color-gold)] leading-none">
            {brandName}
          </h1>
          {secondaryName && (
            <p className="mt-2 font-display text-lg text-[var(--color-text-muted)] italic">
              {secondaryName}
            </p>
          )}
        </div>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-md">
          {tagline || t.tagline}
        </p>
      </div>
    </header>
  )
}

export { LogoMark }
