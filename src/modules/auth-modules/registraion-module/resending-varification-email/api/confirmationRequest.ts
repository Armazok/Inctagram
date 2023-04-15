import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { registerAPI } from '@/modules/auth-modules/registraion-module'

export const useConfirmationQuery = (confirmationCode: string) => {
  return useQuery({
    queryKey: ['regConfirmation'],
    queryFn: () => registerAPI.registrationConfirmation({ confirmationCode }),
    enabled: !!confirmationCode,
    retry: false,
    ...noRefetch,
  })
}
