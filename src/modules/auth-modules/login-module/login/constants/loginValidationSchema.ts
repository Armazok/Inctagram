import * as yup from 'yup'

export type FormData = yup.InferType<typeof schemaLogin>

export const schemaLogin = yup.object({
  email: yup.string().required('Email is required filed'),
  password: yup.string().required('Password is required filed'),
})
