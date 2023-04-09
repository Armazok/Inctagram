import * as yup from 'yup'

export type FormData = yup.InferType<typeof schema>

//@ts-ignore
export const schema = yup.object({
  email: yup.string().trim().required('Email is required field').email('Email is invalid'),
})
