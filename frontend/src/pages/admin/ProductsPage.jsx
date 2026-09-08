import { useCallback, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import {
  categoriesApi,
  imageUrl,
  productsApi,
  uploadApi,
} from '../../api/client'
import { BADGE_OPTIONS } from '../../i18n/translations'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Modal from '../../components/ui/Modal'
import SearchBar from '../../components/ui/SearchBar'
import Skeleton from '../../components/ui/Skeleton'
import { cn, formatPrice } from '../../utils/helpers'

const emptyForm = {
  nameAr: '',
  nameEn: '',
  descriptionAr: '',
  descriptionEn: '',
  ingredientsAr: '',
  ingredientsEn: '',
  allergensAr: '',
  allergensEn: '',
  price: '',
  categoryId: '',
  badge: '',
  imageUrl: '',
  imagePath: '',
  isVisible: true,
  isAvailable: true,
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30'

export default function ProductsPage() {
  const { t, localized } = useLanguage()
  const { showToast } = useToast()
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [visibilityFilter, setVisibilityFilter] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {
        page,
        size: 10,
        q: search || undefined,
        categoryId: categoryFilter || undefined,
      }
      if (visibilityFilter === 'visible') params.isVisible = true
      if (visibilityFilter === 'hidden') params.isVisible = false

      const [productsRes, catsRes] = await Promise.all([
        productsApi.list(params),
        categoriesApi.list(),
      ])

      const list = Array.isArray(productsRes)
        ? productsRes
        : productsRes?.content || productsRes?.items || []
      setItems(list)
      setTotalPages(
        productsRes?.totalPages ??
          Math.max(1, Math.ceil((productsRes?.totalElements || list.length) / 10)),
      )
      setCategories(Array.isArray(catsRes) ? catsRes : catsRes?.content || [])
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setLoading(false)
    }
  }, [page, search, categoryFilter, visibilityFilter, showToast, t.errorGeneric])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    setPage(0)
  }, [search, categoryFilter, visibilityFilter])

  const openCreate = () => {
    setEditingId(null)
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ? String(categories[0].id) : '',
    })
    setFormOpen(true)
  }

  const openEdit = (product) => {
    setEditingId(product.id)
    setForm({
      nameAr: product.nameAr || '',
      nameEn: product.nameEn || '',
      descriptionAr: product.descriptionAr || '',
      descriptionEn: product.descriptionEn || '',
      ingredientsAr: product.ingredientsAr || '',
      ingredientsEn: product.ingredientsEn || '',
      allergensAr: product.allergensAr || '',
      allergensEn: product.allergensEn || '',
      price: product.price ?? '',
      categoryId: String(product.categoryId || product.category?.id || ''),
      badge: product.badge || '',
      imageUrl: product.imageUrl || product.imagePath || '',
      imagePath: product.imagePath || product.imageUrl || '',
      isVisible: product.isVisible !== false,
      isAvailable: product.isAvailable !== false,
    })
    setFormOpen(true)
  }

  const onUpload = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const res = await uploadApi.upload(file)
      const path = res.url || res.path || res.imageUrl || res.imagePath || ''
      setForm((f) => ({ ...f, imageUrl: path, imagePath: path }))
      showToast(t.successUpload)
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setUploading(false)
    }
  }

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        badge: form.badge || null,
        imageUrl: form.imageUrl || form.imagePath || null,
        imagePath: form.imagePath || form.imageUrl || null,
      }
      if (editingId) await productsApi.update(editingId, payload)
      else await productsApi.create(payload)
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
      await productsApi.remove(deleteTarget.id)
      showToast(t.successDelete)
      setDeleteTarget(null)
      load()
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setDeleting(false)
    }
  }

  const toggleAvailability = async (product) => {
    try {
      await productsApi.setAvailability(product.id, !product.isAvailable)
      showToast(t.successSave)
      load()
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    }
  }

  const toggleVisibility = async (product) => {
    try {
      await productsApi.setVisibility(product.id, !product.isVisible)
      showToast(t.successSave)
      load()
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    }
  }

  const categoryName = (product) => {
    const cat =
      product.category ||
      categories.find((c) => c.id === product.categoryId)
    return cat ? localized(cat.nameAr, cat.nameEn) : '—'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">{t.products}</h1>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          {t.addProduct}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <SearchBar value={search} onChange={setSearch} placeholder={t.search} />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={inputClass}
        >
          <option value="">{t.filterCategory}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {localized(c.nameAr, c.nameEn)}
            </option>
          ))}
        </select>
        <select
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value)}
          className={inputClass}
        >
          <option value="">{t.filterVisibility}</option>
          <option value="visible">{t.visible}</option>
          <option value="hidden">{t.hidden}</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-surface px-4 py-12 text-center text-muted">
          {t.noData}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-soft">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-line bg-cream-deep/50 text-muted">
              <tr>
                <th className="px-4 py-3 text-start font-medium">{t.image}</th>
                <th className="px-4 py-3 text-start font-medium">{t.nameEn}</th>
                <th className="px-4 py-3 text-start font-medium">{t.category}</th>
                <th className="px-4 py-3 text-start font-medium">{t.price}</th>
                <th className="px-4 py-3 text-start font-medium">{t.availability}</th>
                <th className="px-4 py-3 text-start font-medium">{t.visibility}</th>
                <th className="px-4 py-3 text-start font-medium">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((product) => (
                <tr key={product.id} className="hover:bg-cream/40">
                  <td className="px-4 py-3">
                    <div className="size-12 overflow-hidden rounded-xl bg-cream-deep">
                      {(product.imageUrl || product.imagePath) && (
                        <img
                          src={imageUrl(product.imageUrl || product.imagePath)}
                          alt=""
                          className="size-full object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-ink">
                        {localized(product.nameAr, product.nameEn)}
                      </span>
                      {product.badge && <Badge type={product.badge} className="w-fit" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{categoryName(product)}</td>
                  <td className="px-4 py-3 text-brand font-medium">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleAvailability(product)}
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs font-medium',
                        product.isAvailable !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-cream-deep text-muted',
                      )}
                    >
                      {product.isAvailable !== false ? t.available : t.unavailable}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleVisibility(product)}
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs font-medium',
                        product.isVisible !== false
                          ? 'bg-brand/10 text-brand'
                          : 'bg-cream-deep text-muted',
                      )}
                    >
                      {product.isVisible !== false ? t.visible : t.hidden}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(product)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteTarget(product)}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 0}
            onClick={() => setPage((p) => p - 1)}
          >
            {t.prev}
          </Button>
          <span className="text-sm text-muted">
            {t.page} {page + 1} {t.of} {totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            {t.next}
          </Button>
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? t.editProduct : t.addProduct}
        size="xl"
        bottomSheet
      >
        <form onSubmit={onSave} className="grid gap-4 sm:grid-cols-2">
          <Field label={t.nameAr}>
            <input
              required
              className={inputClass}
              value={form.nameAr}
              onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
            />
          </Field>
          <Field label={t.nameEn}>
            <input
              required
              className={inputClass}
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            />
          </Field>
          <Field label={t.descAr}>
            <textarea
              rows={3}
              className={inputClass}
              value={form.descriptionAr}
              onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
            />
          </Field>
          <Field label={t.descEn}>
            <textarea
              rows={3}
              className={inputClass}
              value={form.descriptionEn}
              onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
            />
          </Field>
          <Field label={t.ingredientsAr}>
            <textarea
              rows={2}
              className={inputClass}
              value={form.ingredientsAr}
              onChange={(e) => setForm({ ...form, ingredientsAr: e.target.value })}
            />
          </Field>
          <Field label={t.ingredientsEn}>
            <textarea
              rows={2}
              className={inputClass}
              value={form.ingredientsEn}
              onChange={(e) => setForm({ ...form, ingredientsEn: e.target.value })}
            />
          </Field>
          <Field label={t.allergensAr}>
            <input
              className={inputClass}
              value={form.allergensAr}
              onChange={(e) => setForm({ ...form, allergensAr: e.target.value })}
            />
          </Field>
          <Field label={t.allergensEn}>
            <input
              className={inputClass}
              value={form.allergensEn}
              onChange={(e) => setForm({ ...form, allergensEn: e.target.value })}
            />
          </Field>
          <Field label={t.priceLabel}>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              className={inputClass}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </Field>
          <Field label={t.selectCategory}>
            <select
              required
              className={inputClass}
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              <option value="">{t.selectCategory}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {localized(c.nameAr, c.nameEn)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t.badge}>
            <select
              className={inputClass}
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
            >
              <option value="">{t.noBadge}</option>
              {BADGE_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {t.badges[b]}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex flex-wrap gap-4 items-end pb-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isVisible}
                onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
              />
              {t.visible}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
              />
              {t.available}
            </label>
          </div>

          <div className="sm:col-span-2">
            <Field label={t.uploadImage}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onUpload(e.target.files?.[0])}
                  disabled={uploading}
                  className="text-sm"
                />
                {(form.imageUrl || form.imagePath) && (
                  <img
                    src={imageUrl(form.imageUrl || form.imagePath)}
                    alt={t.uploadPreview}
                    className="h-24 w-24 rounded-xl object-cover border border-line"
                  />
                )}
              </div>
            </Field>
          </div>

          <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setFormOpen(false)}>
              {t.cancel}
            </Button>
            <Button type="submit" loading={saving || uploading}>
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
        title={t.deleteProduct}
      />
    </div>
  )
}
