import { useQuery } from '@tanstack/react-query'

import { getMyPayments } from '@/modules/profile-modules/my-payments/api/my-payments-api'

export const useGetMyPayments = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['get-my-payments'],
    queryFn: () => getMyPayments(),
  })

  return { data, isSuccess }
}
