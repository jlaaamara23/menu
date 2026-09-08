import { useEffect, useRef, useState } from 'react'
import { adminApi } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input, Textarea, Select, Toggle } from '../ui/Input'
import { SoftImage } from '../ui/SoftImage'
import { badgeLabels } from '../../i18n/translations'

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
  image: '',
  isVisible: true,
  isAvailable: true,
  sortOrder: 0,
}

export function ProductFormModal({ open, onClose, product, categories, onSaved }) {
  const { t } = useLanguage()
  const toast = useToast()
  const fileRef = useRef(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!open) return
    if (product) {
      setForm({
        ...emptyForm,
        nameAr: product.nameAr || '',
        nameEn: product.nameEn || '',
        descriptionAr: product.descriptionAr || '',
        descriptionEn: product.descriptionEn || '',
        ingredientsAr: product.ingredientsAr || '',
        ingredientsEn: product.ingredientsEn || '',
        allergensAr: product.allergensAr || '',
        allergensEn: product.allergensEn || '',
        price: product.price ?? '',
        categoryId: product.categoryId || product.category?.id || '',
        badge: product.badge || '',
        image: product.image || product.imageUrl || '',
        isVisible: product.isVisible !== false,
        isAvailable: product.isAvailable !== false,
        sortOrder: product.sortOrder ?? 0,
      })
    } else {
      setForm({
        ...emptyForm,
        categoryId: categories[0]?.id || '',
      })
    }
  }, [open, product, categories])

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await adminApi.upload(file)
      const url = res.url || res.path || res.imageUrl || res.location
      if (url) set('image', url)
      toast.success(t.successUpload)
    } catch {
      toast.error(t.errorGeneric)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.nameAr || !form.nameEn || !form.categoryId || form.price === '') {
      toast.error(t.required)
      return
    }
    setLoading(true)
    const body = {
      nameAr: form.nameAr,
      nameEn: form.nameEn,
      descriptionAr: form.descriptionAr,
      descriptionEn: form.descriptionEn,
      ingredientsAr: form.ingredientsAr,
      ingredientsEn: form.ingredientsEn,
      allergensAr: form.allergensAr,
      allergensEn: form.allergensEn,
      price: Number(form.price),
      sortOrder: Number(form.sortOrder) || 0,
      badge: form.badge || null,
      categoryId: form.categoryId,
      image: form.image || null,
      isVisible: form.isVisible,
      isAvailable: form.isAvailable,
    }
    try {
      if (product?.id) await adminApi.updateProduct(product.id, body)
      else await adminApi.createProduct(body)
      toast.success(t.successSave)
      onSaved?.()
    } catch {
      toast.error(t.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product ? t.editProduct : t.addProduct}
      size="xl"
      bottomSheet
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {t.cancel}
          </Button>
          <Button onClick={onSubmit} loading={loading}>
            {t.save}
          </Button>
        </>
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <Input
          label={t.nameAr}
          value={form.nameAr}
          onChange={(e) => set('nameAr', e.target.value)}
          required
        />
        <Input
          label={t.nameEn}
          value={form.nameEn}
          onChange={(e) => set('nameEn', e.target.value)}
          required
        />
        <Textarea
          label={t.descriptionAr}
          value={form.descriptionAr}
          onChange={(e) => set('descriptionAr', e.target.value)}
        />
        <Textarea
          label={t.descriptionEn}
          value={form.descriptionEn}
          onChange={(e) => set('descriptionEn', e.target.value)}
        />
        <Textarea
          label={t.ingredientsAr}
          value={form.ingredientsAr}
          onChange={(e) => set('ingredientsAr', e.target.value)}
        />
        <Textarea
          label={t.ingredientsEn}
          value={form.ingredientsEn}
          onChange={(e) => set('ingredientsEn', e.target.value)}
        />
        <Textarea
          label={t.allergensAr}
          value={form.allergensAr}
          onChange={(e) => set('allergensAr', e.target.value)}
        />
        <Textarea
          label={t.allergensEn}
          value={form.allergensEn}
          onChange={(e) => set('allergensEn', e.target.value)}
        />
        <Input
          label={`${t.price} (₪)`}
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => set('price', e.target.value)}
          required
        />
        <Select
          label={t.category}
          value={form.categoryId}
          onChange={(e) => set('categoryId', e.target.value)}
          required
        >
          <option value="">{t.selectCategory}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameAr || c.nameEn}
            </option>
          ))}
        </Select>
        <Select
          label={t.badge}
          value={form.badge}
          onChange={(e) => set('badge', e.target.value)}
        >
          <option value="">{t.noBadge}</option>
          {Object.keys(badgeLabels).map((key) => (
            <option key={key} value={key}>
              {badgeLabels[key].en} / {badgeLabels[key].ar}
            </option>
          ))}
        </Select>
        <Input
          label={t.sortOrder}
          type="number"
          value={form.sortOrder}
          onChange={(e) => set('sortOrder', e.target.value)}
        />

        <div className="sm:col-span-2 space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <Input
                label={t.image}
                value={form.image}
                onChange={(e) => set('image', e.target.value)}
              />
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUpload}
            />
            <Button
              type="button"
              variant="secondary"
              loading={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {t.uploadImage}
            </Button>
          </div>
          {form.image && (
            <SoftImage
              src={form.image}
              className="max-w-xs rounded-2xl"
              aspect="aspect-video"
            />
          )}
        </div>

        <div className="sm:col-span-2 flex flex-wrap gap-6 pt-2">
          <Toggle
            checked={form.isAvailable}
            onChange={(v) => set('isAvailable', v)}
            label={t.availability}
          />
          <Toggle
            checked={form.isVisible}
            onChange={(v) => set('isVisible', v)}
            label={t.visibility}
          />
        </div>
      </form>
    </Modal>
  )
}
