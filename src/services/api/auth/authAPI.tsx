import { AxiosResponse } from 'axios'

import { authInstance } from '@/services/api/auth/instanse'
import {
  RegConfirmation,
  RegEmailResenging,
  ReqLogin,
  ReqNewPassword,
  ReqPasswordRecovery,
  ReqPasswordRecoveryWithRecaptcha,
  ResCheckRecoveryCode,
  ResLogin,
} from '@/types/'

export const authAPI: IAuthAPI = {
  passwordRecovery: data => {
    const { email } = data

    return authInstance.post('auth/password-recovery', { email })
  },
  passwordRecoveryEmailResending: data => {
    const { email } = data

    return authInstance.post('auth/password-recovery-email-resending', { email })
  },
  createNewPassword: data => {
    const { newPassword, recoveryCode } = data

    return authInstance.post('auth/new-password', { newPassword, recoveryCode })
  },
  registrationConfirmation: data => {
    const { confirmationCode } = data

    return authInstance.post('/auth/registration-confirmation', { confirmationCode })
  },
  registrationEmailResending: data => {
    const { email } = data

    return authInstance.post('/auth/registration-email-resending', { email })
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
  passwordRecovery: (data: ReqPasswordRecovery) => Promise<AxiosResponse>
  passwordRecoveryEmailResending: (data: { email: string | null }) => Promise<AxiosResponse>
  createNewPassword: (data: ReqNewPassword) => Promise<AxiosResponse>
  registrationConfirmation: (data: RegConfirmation) => Promise<AxiosResponse>
  registrationEmailResending: (data: RegEmailResenging) => Promise<AxiosResponse>
  checkRecoveryCode: (
    data: Omit<ReqNewPassword, 'newPassword'>
  ) => Promise<AxiosResponse<ResCheckRecoveryCode>>
  passwordRecoveryWithRecaptcha: (data: ReqPasswordRecoveryWithRecaptcha) => Promise<AxiosResponse>
}
