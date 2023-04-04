import { AxiosResponse } from 'axios'

import { authInstance } from '@/services/api/auth/instanse'
import { ReqLogin, ResLogin } from '@/types/'

interface IAuthAPI {
  login: (data: ReqLogin) => Promise<AxiosResponse<ResLogin>>
}

export const authAPI: IAuthAPI = {
  login: data => {
    const { email, password } = data

    debugger

    return authInstance.post('auth/login', { email, password })
  },
}
