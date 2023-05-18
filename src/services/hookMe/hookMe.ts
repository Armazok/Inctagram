import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { meSendRequest } from '@/services'

export const useMeQuery = (
  saveUserId?: (userId: number) => void,
  setHasBusinessAccount?: (hasBusinessAccount: boolean) => void
) => {
  return useQuery({
    queryFn: meSendRequest,
    onSuccess: data => {
      if (saveUserId) {
        saveUserId(data.data.userId)
      }
      if (setHasBusinessAccount) {
        setHasBusinessAccount(data.data.hasBusinessAccount)
      }
    },
    queryKey: ['me'],
    retry: false,
    staleTime: 300000,
    ...noRefetch,
  })
}
