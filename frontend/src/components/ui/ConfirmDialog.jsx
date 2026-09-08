import Modal from './Modal'
import Button from './Button'
import { useLanguage } from '../../context/LanguageContext'

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading = false,
  danger = true,
}) {
  const { t } = useLanguage()

  return (
    <Modal open={open} onClose={onClose} title={title || t.confirmDelete} size="sm">
      <p className="text-muted mb-6">{message || t.confirmDeleteMsg}</p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {t.cancel}
        </Button>
        <Button
          variant={danger ? 'danger' : 'primary'}
          onClick={onConfirm}
          loading={loading}
        >
          {t.confirm}
        </Button>
      </div>
    </Modal>
  )
}
