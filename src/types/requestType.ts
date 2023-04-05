export type ReqLogin = {
  email: string
  password: string
}

export type ReqPasswordRecovery = {
  email: string
}

export type ReqNewPassword = {
  newPassword: string
  recoveryCode: string
}
