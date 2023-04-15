import * as yup from 'yup'

// export type FormData = yup.InferType<typeof forgotPassSchema>

export const forgotPassSchema = yup.object({
  email: yup.string().trim().required('Email is required field').email('Email is invalid'),
})
