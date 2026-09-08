import { useCallback, useEffect, useState } from 'react'
import { GripVertical, Pencil, Plus, Trash2 } from 'lucide-react'
import { categoriesApi } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Modal from '../../components/ui/Modal'
import Skeleton from '../../components/ui/Skeleton'
import { cn } from '../../utils/helpers'

const emptyForm = {
  nameAr: '',
  nameEn: '',
  descriptionAr: '',
  descriptionEn: '',
  isVisible: true,
  sortOrder: 0,
}

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30'

export default function CategoriesPage() {
  const { t, localized } = useLanguage()
  const { showToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [dragIndex, setDragIndex] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await categoriesApi.list()
      const list = Array.isArray(res) ? res : res?.content || []
      list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      setItems(list)
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast, t.errorGeneric])

  useEffect(() => {
    load()
  }, [load])

  const openCreate = () => {
    setEditingId(null)
    setForm({ ...emptyForm, sortOrder: items.length })
    setFormOpen(true)
  }

  const openEdit = (cat) => {
    setEditingId(cat.id)
    setForm({
      nameAr: cat.nameAr || '',
      nameEn: cat.nameEn || '',
      descriptionAr: cat.descriptionAr || '',
      descriptionEn: cat.descriptionEn || '',
      isVisible: cat.isVisible !== false,
      sortOrder: cat.sortOrder ?? 0,
    })
    setFormOpen(true)
  }

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) await categoriesApi.update(editingId, form)
      else await categoriesApi.create(form)
      showToast(t.successSave)
      setFormOpen(false)
      load()
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await categoriesApi.remove(deleteTarget.id)
      showToast(t.successDelete)
      setDeleteTarget(null)
      load()
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setDeleting(false)
    }
  }

  const toggleVisibility = async (cat) => {
    try {
      await categoriesApi.setVisibility(cat.id, !cat.isVisible)
      showToast(t.successSave)
      load()
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    }
  }

  const onDragStart = (index) => setDragIndex(index)

  const onDragOver = (e, index) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(index, 0, moved)
      return next
    })
    setDragIndex(index)
  }

  const onDragEnd = async () => {
    setDragIndex(null)
    try {
      await categoriesApi.reorder(items.map((c) => c.id))
      showToast(t.successSave)
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
      load()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-ink">{t.categories}</h1>
          <p className="mt-1 text-sm text-muted">{t.dragHint}</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          {t.addCategory}
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-surface px-4 py-12 text-center text-muted">
          {t.noData}
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((cat, index) => (
            <li
              key={cat.id}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={(e) => onDragOver(e, index)}
              onDragEnd={onDragEnd}
              className={cn(
                'flex items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-3 shadow-soft transition',
                dragIndex === index && 'opacity-60 ring-2 ring-gold',
              )}
            >
              <button type="button" className="cursor-grab text-muted active:cursor-grabbing" aria-label={t.dragHint}>
                <GripVertical className="size-5" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{localized(cat.nameAr, cat.nameEn)}</p>
                {(cat.descriptionAr || cat.descriptionEn) && (
                  <p className="truncate text-xs text-muted">
                    {localized(cat.descriptionAr, cat.descriptionEn)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleVisibility(cat)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs font-medium',
                  cat.isVisible !== false
                    ? 'bg-brand/10 text-brand'
                    : 'bg-cream-deep text-muted',
                )}
              >
                {cat.isVisible !== false ? t.visible : t.hidden}
              </button>
              <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                <Pencil className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(cat)}>
                <Trash2 className="size-4 text-red-600" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? t.editCategory : t.addCategory}
        size="md"
      >
        <form onSubmit={onSave} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">{t.nameAr}</span>
            <input
              required
              className={inputClass}
              value={form.nameAr}
              onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">{t.nameEn}</span>
            <input
              required
              className={inputClass}
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">{t.descAr}</span>
            <textarea
              rows={2}
              className={inputClass}
              value={form.descriptionAr}
              onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">{t.descEn}</span>
            <textarea
              rows={2}
              className={inputClass}
              value={form.descriptionEn}
              onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
            />
            {t.visible}
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setFormOpen(false)}>
              {t.cancel}
            </Button>
            <Button type="submit" loading={saving}>
              {t.save}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={onDelete}
        loading={deleting}
        title={t.deleteCategory}
      />
    </div>
  )
}
