export type ResponseError = {
  response: {
    data: {
      messages: {
        message: string
        field: string
      }[]
    }
  }
}
