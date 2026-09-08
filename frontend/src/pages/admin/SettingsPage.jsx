import { useEffect, useState } from 'react'
import { settingsApi } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/ui/Button'
import Skeleton from '../../components/ui/Skeleton'

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30'

const empty = {
  nameAr: '',
  nameEn: '',
  welcomeAr: '',
  welcomeEn: '',
  addressAr: '',
  addressEn: '',
  openingHoursAr: '',
  openingHoursEn: '',
  phone: '',
  whatsapp: '',
  instagram: '',
  mapsUrl: '',
  isOpen: true,
}

function Field({ label, children, className }) {
  return (
    <label className={`block ${className || ''}`}>
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      {children}
    </label>
  )
}

export default function SettingsPage() {
  const { t } = useLanguage()
  const { showToast } = useToast()
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await settingsApi.get()
        if (!cancelled && res) {
          setForm({
            nameAr: res.nameAr || res.restaurantNameAr || '',
            nameEn: res.nameEn || res.restaurantNameEn || '',
            welcomeAr: res.welcomeAr || '',
            welcomeEn: res.welcomeEn || '',
            addressAr: res.addressAr || '',
            addressEn: res.addressEn || '',
            openingHoursAr: res.openingHoursAr || '',
            openingHoursEn: res.openingHoursEn || '',
            phone: res.phone || '',
            whatsapp: res.whatsapp || '',
            instagram: res.instagram || '',
            mapsUrl: res.mapsUrl || '',
            isOpen: res.isOpen !== false,
          })
        }
      } catch (err) {
        if (!cancelled) showToast(err.message || t.errorGeneric, 'error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [showToast, t.errorGeneric])

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await settingsApi.update(form)
      showToast(t.successSave)
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-3xl text-ink">{t.settings}</h1>

      <form
        onSubmit={onSave}
        className="grid gap-4 rounded-2xl border border-line bg-surface p-5 shadow-soft sm:grid-cols-2 sm:p-6"
      >
        <Field label={t.restaurantNameAr}>
          <input
            className={inputClass}
            value={form.nameAr}
            onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
          />
        </Field>
        <Field label={t.restaurantNameEn}>
          <input
            className={inputClass}
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
          />
        </Field>
        <Field label={t.welcomeAr} className="sm:col-span-2">
          <textarea
            rows={2}
            className={inputClass}
            value={form.welcomeAr}
            onChange={(e) => setForm({ ...form, welcomeAr: e.target.value })}
          />
        </Field>
        <Field label={t.welcomeEn} className="sm:col-span-2">
          <textarea
            rows={2}
            className={inputClass}
            value={form.welcomeEn}
            onChange={(e) => setForm({ ...form, welcomeEn: e.target.value })}
          />
        </Field>
        <Field label={t.addressAr}>
          <input
            className={inputClass}
            value={form.addressAr}
            onChange={(e) => setForm({ ...form, addressAr: e.target.value })}
          />
        </Field>
        <Field label={t.addressEn}>
          <input
            className={inputClass}
            value={form.addressEn}
            onChange={(e) => setForm({ ...form, addressEn: e.target.value })}
          />
        </Field>
        <Field label={t.openingHoursAr}>
          <input
            className={inputClass}
            value={form.openingHoursAr}
            onChange={(e) => setForm({ ...form, openingHoursAr: e.target.value })}
          />
        </Field>
        <Field label={t.openingHoursEn}>
          <input
            className={inputClass}
            value={form.openingHoursEn}
            onChange={(e) => setForm({ ...form, openingHoursEn: e.target.value })}
          />
        </Field>
        <Field label={t.phone}>
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
        <Field label={t.whatsapp}>
          <input
            className={inputClass}
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
        </Field>
        <Field label={t.instagram}>
          <input
            className={inputClass}
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          />
        </Field>
        <Field label={t.mapsUrl}>
          <input
            className={inputClass}
            value={form.mapsUrl}
            onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={form.isOpen}
            onChange={(e) => setForm({ ...form, isOpen: e.target.checked })}
          />
          {t.isOpen}
        </label>
        <div className="sm:col-span-2 flex justify-end">
          <Button type="submit" loading={saving}>
            {t.save}
          </Button>
        </div>
      </form>
    </div>
  )
}
