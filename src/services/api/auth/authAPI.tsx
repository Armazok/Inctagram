import { AxiosResponse } from 'axios'

import { authInstance } from '@/services/api/auth/instanse'
import { RegConfirmation, RegEmailResenging, ReqLogin, ReqNewPassword, ReqPasswordRecovery, ResLogin } from "@/types/";

interface IAuthAPI {
  login: (data: ReqLogin) => Promise<AxiosResponse<ResLogin>>
  passwordRecovery: (data: ReqPasswordRecovery) => Promise<AxiosResponse>
  passwordRecoveryEmailResending: (data: ReqPasswordRecovery) => Promise<AxiosResponse>
  createNewPassword: (data: ReqNewPassword) => Promise<AxiosResponse>
  registrationConfirmation: (data: RegConfirmation) => Promise<AxiosResponse>
  registrationEmailResending: (data: RegEmailResenging ) => Promise<AxiosResponse>

}

export const authAPI: IAuthAPI = {
  login: data => {
    const { email, password } = data

    return authInstance.post('auth/login', { email, password })
  },
  passwordRecovery: data => {
    const { email } = data
    return authInstance.post('auth/password-recovery', { email })
  },
  passwordRecoveryEmailResending: data => {
    const { email } = data
    return authInstance.post('auth/password-recovery-email-resending', { email })
  },
  createNewPassword: data => {
    const { newPassword, recoveryCode  } = data
    return authInstance.post('auth/new-password', { newPassword, recoveryCode })
  },
  registrationConfirmation: data => {
    const { confirmationCode } = data
    return authInstance.post('/auth/registration-confirmation' , { confirmationCode })
  },
  registrationEmailResending: data => {
    const { email } = data
    return authInstance.post('/auth/registration-email-resending', { email })
  }
}
