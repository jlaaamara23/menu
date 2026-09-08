import { Clock, MapPin, MessageCircle, Map } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { pickLocalized } from '../../utils/helpers'
import { LogoMark } from './MenuHeader'

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function MenuFooter({ settings }) {
  const { t, lang } = useLanguage()
  const hours =
    pickLocalized(settings || {}, 'hours', lang) ||
    pickLocalized(settings || {}, 'openingHours', lang) ||
    settings?.hours
  const address = pickLocalized(settings || {}, 'address', lang) || settings?.address
  const pageUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : ''
  const qrSrc = pageUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=8&data=${encodeURIComponent(pageUrl)}`
    : null

  const whatsapp = settings?.whatsapp || settings?.whatsApp
  const instagram = settings?.instagram
  const mapsUrl = settings?.mapsUrl || settings?.googleMapsUrl
  const phone = settings?.phone

  const waLink = whatsapp
    ? whatsapp.startsWith('http')
      ? whatsapp
      : `https://wa.me/${String(whatsapp).replace(/[^\d+]/g, '').replace('+', '')}`
    : null

  const igLink = instagram
    ? instagram.startsWith('http')
      ? instagram
      : `https://instagram.com/${instagram.replace('@', '')}`
    : null

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]/80">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--color-green)] dark:text-[var(--color-gold)]">
            <LogoMark className="h-9 w-9" />
            <span className="font-display text-2xl">{t.brand}</span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-md leading-relaxed">
            {t.tagline}
          </p>

          <div className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
            {(hours || settings?.hoursAr || settings?.hoursEn) && (
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <div className="font-medium text-[var(--color-text)]">{t.hours}</div>
                  <div>{hours || pickLocalized(settings, 'hours', lang)}</div>
                </div>
              </div>
            )}
            {(address || settings?.addressAr || settings?.addressEn) && (
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <div className="font-medium text-[var(--color-text)]">{t.address}</div>
                  <div>{address || pickLocalized(settings, 'address', lang)}</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2 text-sm hover:border-[var(--color-gold)] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {t.whatsapp}
              </a>
            )}
            {igLink && (
              <a
                href={igLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2 text-sm hover:border-[var(--color-gold)] transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
                {t.instagram}
              </a>
            )}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2 text-sm hover:border-[var(--color-gold)] transition-colors"
              >
                <Map className="h-4 w-4" />
                Google Maps
              </a>
            )}
            {phone && !waLink && (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2 text-sm hover:border-[var(--color-gold)] transition-colors"
              >
                {phone}
              </a>
            )}
          </div>
        </div>

        {qrSrc && (
          <div className="flex flex-col items-center md:items-end justify-center gap-3">
            <div className="rounded-2xl bg-white p-3 shadow-sm border border-[var(--color-border)]">
              <img src={qrSrc} alt={t.scanQr} width={140} height={140} className="rounded-lg" />
            </div>
            <div className="text-center md:text-end">
              <div className="font-display text-lg">{t.scanQr}</div>
              <p className="text-xs text-[var(--color-text-muted)] max-w-[200px]">{t.qrHint}</p>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} Maison Olivéa
      </div>
    </footer>
  )
}
