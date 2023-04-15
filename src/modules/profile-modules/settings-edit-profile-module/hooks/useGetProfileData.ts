import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { getAccountData } from '@/modules/profile-modules/settings-edit-profile-module'

export const useGetProfileData = (userId: number | undefined) => {
  return useQuery({
    queryKey: ['get-profile', userId],
    queryFn: () => getAccountData(userId),
    onSuccess: data => {
      console.log(data, 'data')
    },
    onError: err => {
      console.log(err, 'err')
    },
    enabled: !!userId,
    retry: false,
    ...noRefetch,
    select: data => data?.data,
  })
}
