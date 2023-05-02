import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { meSendRequest } from '@/services'

export const useMeQuery = (saveUserId?: (userId: number) => void) => {
  return useQuery({
    queryFn: meSendRequest,
    onSuccess: data => {
      if (saveUserId) {
        saveUserId(data.data.userId)
      }
    },
    queryKey: ['me'],
    retry: false,
    staleTime: 300000,
    ...noRefetch,
  })
}
