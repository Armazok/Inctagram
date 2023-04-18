import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { noRefetch } from '@/common'
import { getAccountData } from '@/modules/profile-modules/settings-edit-profile-module'

export const useGetProfileData = () => {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: getAccountData,
    onSuccess: data => {},
    onError: err => {
      toast.error('Ooops Error')
    },
    retry: false,
    ...noRefetch,
    staleTime: 0,
    select: (data: any) => data?.data,
  })
}
