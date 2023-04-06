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

export type RegConfirmation = {
  confirmationCode: string
}

export type RegEmailResenging = {
  email: string
}
