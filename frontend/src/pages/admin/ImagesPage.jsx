import { useState } from 'react'
import { Upload } from 'lucide-react'
import { imageUrl, uploadApi } from '../../api/client'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
export default function ImagesPage() {
  const { t } = useLanguage()
  const { showToast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploaded, setUploaded] = useState([])
  const [dragOver, setDragOver] = useState(false)

  const handleFile = async (file) => {
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const res = await uploadApi.upload(file)
      const path = res.url || res.path || res.imageUrl || res.imagePath || ''
      setUploaded((prev) => [{ path, name: file.name, at: Date.now() }, ...prev])
      showToast(t.successUpload)
    } catch (err) {
      showToast(err.message || t.errorGeneric, 'error')
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-ink">{t.images}</h1>
        <p className="mt-1 text-sm text-muted">{t.dropOrClick}</p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`rounded-3xl border-2 border-dashed p-10 text-center transition ${
          dragOver ? 'border-gold bg-gold/10' : 'border-line bg-surface'
        }`}
      >
        <Upload className="mx-auto size-10 text-gold" />
        <p className="mt-3 text-muted">{t.dropOrClick}</p>
        <label className="mt-5 inline-flex cursor-pointer">
          <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-cream shadow-soft transition hover:bg-brand-soft">
            {uploading && (
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {t.uploadImage}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>

      {preview && (
        <div>
          <p className="mb-2 text-sm text-muted">{t.uploadPreview}</p>
          <img
            src={preview}
            alt={t.uploadPreview}
            className="h-48 w-auto rounded-2xl border border-line object-cover shadow-soft"
          />
        </div>
      )}

      {uploaded.length > 0 && (
        <div>
          <h2 className="mb-3 font-display text-xl text-ink">{t.images}</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploaded.map((item) => (
              <li
                key={`${item.path}-${item.at}`}
                className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft"
              >
                <img
                  src={imageUrl(item.path)}
                  alt={item.name}
                  className="aspect-video w-full object-cover bg-cream-deep"
                />
                <div className="p-3">
                  <p className="truncate text-sm text-ink">{item.name}</p>
                  <p className="truncate text-xs text-muted">{item.path}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
