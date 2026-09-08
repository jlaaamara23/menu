import { useEffect, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { mediaUrl } from '../../api/client'
import { cn } from '../../utils/helpers'
import { Skeleton } from './Skeleton'

export function SoftImage({
  src,
  alt = '',
  className,
  imgClassName,
  aspect = 'aspect-[4/3]',
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const url = mediaUrl(src)

  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [url])

  if (!url || error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-[var(--color-cream-deep)] to-[var(--color-cream)] text-[var(--color-gold)]',
          aspect,
          className,
        )}
      >
        <div className="flex flex-col items-center gap-1 opacity-70">
          <ImageOff className="h-7 w-7" strokeWidth={1.25} />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', aspect, className)}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}
