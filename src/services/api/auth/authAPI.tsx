import { AxiosResponse } from 'axios'

import { authInstance } from '@/services/api/auth/instanse'
import { RegConfirmation, ReqLogin, ResLogin, ResRegConfirmation } from "@/types/";

interface IAuthAPI {
  login: (data: ReqLogin) => Promise<AxiosResponse<ResLogin>>
  registrationConfirmation: (data: RegConfirmation) => Promise<AxiosResponse<ResRegConfirmation>>
}

export const authAPI: IAuthAPI = {
  login: data => {
    const { email, password } = data

    debugger

    return authInstance.post('auth/login', { email, password })
  },
  registrationConfirmation: data => {
    const { confirmationCode } = data
    return authInstance.post('/auth/registration-confirmation' , { confirmationCode })
  }
}
