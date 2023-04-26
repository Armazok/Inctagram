import { AxiosResponse } from 'axios'

import { authInstance } from '@/services'
import { ReqNewPassword, ReqPasswordRecoveryWithRecaptcha, ResCheckRecoveryCode } from '@/types/'

export const passwordRecoveryAPI: IAuthAPI = {
  createNewPassword: data => {
    const { newPassword, recoveryCode } = data

    return authInstance.post('auth/new-password', { newPassword, recoveryCode })
  },
  checkRecoveryCode: data => {
    const { recoveryCode } = data

    return authInstance.post('auth/check-recovery-code', { recoveryCode })
  },
  passwordRecoveryWithRecaptcha: data => {
    const { email, recaptcha } = data

    return authInstance.post('auth/password-recovery', { email, recaptcha })
  },
}

interface IAuthAPI {
  createNewPassword: (data: ReqNewPassword) => Promise<AxiosResponse>
  checkRecoveryCode: (
    data: Omit<ReqNewPassword, 'newPassword'>
  ) => Promise<AxiosResponse<ResCheckRecoveryCode>>
  passwordRecoveryWithRecaptcha: (data: ReqPasswordRecoveryWithRecaptcha) => Promise<AxiosResponse>
}
