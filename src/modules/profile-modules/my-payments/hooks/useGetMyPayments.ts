import { useQuery } from '@tanstack/react-query'

import { getMyPayments } from '@/modules/profile-modules/my-payments'

export const useGetMyPayments = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['get-my-payments'],
    queryFn: () => getMyPayments(),
    onError: err => {
      console.log(err)
    },
  })

  return { data, isSuccess, isLoading }
}
