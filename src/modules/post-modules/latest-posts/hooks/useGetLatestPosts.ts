import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { getLatestPosts } from '@/modules/post-modules/latest-posts/api/unsplashAPI'

export const useGetLatestPosts = () => {
  return useQuery({
    queryKey: ['latest-posts'],
    queryFn: getLatestPosts,
    ...noRefetch,
    retry: false,
  })
}
