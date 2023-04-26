import { useQuery } from '@tanstack/react-query'

import { sendMyPosts } from '@/modules/post-modules/latest-posts/api/unsplashAPI'

export const useGetLatestPosts = (userId: number | undefined) => {
  return useQuery(['latest-posts'], () => sendMyPosts(userId))
}
