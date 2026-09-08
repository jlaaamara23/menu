import { cn } from '../../utils/helpers'

export default function Skeleton({ className }) {
  return <div className={cn('skeleton-shimmer rounded-xl', className)} />
}

export function ProductCardSkeleton({ horizontal = false }) {
  if (horizontal) {
    return (
      <div className="flex gap-3 rounded-2xl bg-surface p-3 shadow-soft">
        <Skeleton className="size-24 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2 py-1">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-4 w-16 mt-2" />
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-2xl bg-surface overflow-hidden shadow-soft">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-4 w-20 mt-2" />
      </div>
    </div>
  )
}

export function MenuSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-3 px-4 pt-6">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-4 w-72 mx-auto" />
        <Skeleton className="h-12 w-full max-w-md mx-auto rounded-2xl" />
      </div>
      <div className="flex gap-2 overflow-hidden px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="sm:hidden">
            <ProductCardSkeleton horizontal />
          </div>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`g-${i}`} className="hidden sm:block">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}
