import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { meSendRequest } from '@/services'

export const useMeQuery = () => {
  return useQuery({
    queryFn: meSendRequest,
    queryKey: ['me'],
    retry: false,
    ...noRefetch,
  })
}
