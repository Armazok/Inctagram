export type ResLogin = {
  accessToken: string
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
