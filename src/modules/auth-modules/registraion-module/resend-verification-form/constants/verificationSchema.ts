import * as yup from 'yup'

export const verificationSchema = yup.object({
  email: yup.string(),
})
export type FormDataVerification = yup.InferType<typeof verificationSchema>
