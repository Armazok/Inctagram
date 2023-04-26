import { AxiosResponse } from 'axios'

import { authInstance } from '@/services'
import { RegConfirmation } from '@/types'

export const sendCode = (data: RegConfirmation): Promise<AxiosResponse> => {
  const { confirmationCode } = data

  return authInstance.post('/auth/registration-confirmation', { confirmationCode })
}
