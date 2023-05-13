import { useQuery } from '@tanstack/react-query'

import { getMyPayments } from '@/modules/profile-modules/my-payments/api/my-payments-api'

export const useGetMyPayments = () => {
  const { data } = useQuery({
    queryKey: ['get-my-payments'],
    queryFn: async () => {
      const res = await getMyPayments()

      return res.json()
    },
  })

  return { data }
}
