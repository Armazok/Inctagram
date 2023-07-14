import { Skeleton } from '@/ui/skeletons/Skeleton'

export const SkeletonPost = () => {
  const className = 'w-full h-full object-contain'

  return (
    <div className="aspect-square">
      <Skeleton classes={className} />
    </div>
  )
}
