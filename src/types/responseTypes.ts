export type ResLogin = {
  accessToken: string
}

export type ResMe = {
  userId: number
  userName: string
  email: string
}

export type ResRegConfirmation = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    }
  ]
  error: string
}

export type ResCheckRecoveryCode = {
  email: string
}

export type ResCreateProfile = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: string
  aboutMe: string
}
