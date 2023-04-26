import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { getPost } from '@/modules/post-modules/latest-posts/api/latest-posts-api'

export const useGetPost = (postId: number | null) => {
  const {
    data: post,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [`post_${postId}`],
    queryFn: () => getPost(postId),
    enabled: !!postId,
    ...noRefetch,
  })

  return { post, isError, isLoading }
}
