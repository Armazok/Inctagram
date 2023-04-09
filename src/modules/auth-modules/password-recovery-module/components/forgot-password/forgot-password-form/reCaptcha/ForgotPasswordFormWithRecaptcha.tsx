import React from 'react'

// import ReCAPTCHA from 'react-google-recaptcha'
// import { FieldValues, SubmitHandler } from 'react-hook-form'
//
// import { useGlobalForm } from '@/common'
// import { schema } from '@/modules/auth-modules/password-recovery-module/constants/forgotPasswordValidateSchema'
// import GlobalButton from '@/ui/buttons/GlobalButton'
// import GlobalInput from '@/ui/Inputs/Input/Input'
//
// // const siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
// // const siteKey = 'correct key in tg'
//
// type PropsType = {
//   onSubmitHandler: (email: string) => void
//   // onSubmitHandler: (email: string, recaptcha: string) => void
// }
//
// const ForgotPasswordFormWithC = ({ onSubmitHandler }: PropsType) => {
//   const { errors, register, reset, handleSubmit, setCustomError } = useGlobalForm(schema)
//   const recaptchaRef = React.createRef()
//   const [recaptcha, setRecaptcha] = useState('')
//
//   const onSubmit: SubmitHandler<FieldValues> = async data => {
//     const { email } = data
//
//     onSubmitHandler(email)
//     // onSubmitHandler(email, recaptcha)
//     reset()
//   }
//
//   return (
//     <div className={'relative flex flex-col place-content-center w-4/5'}>
//       <form
//         className="flex flex-col grow gap-[10px] pt-[22px]  pb-[18px] w-full gap-[24px]"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <GlobalInput
//           type="email"
//           id="email"
//           placeholder=""
//           label="Email"
//           //@ts-ignore
//           error={errors?.email?.message}
//           {...register('email')}
//         />
//
//         <div className={'pt-[18px] pb-[12px] text-[16px] leading-[24px] text-grey-100 font-normal'}>
//           Enter your email address and we will send you further instructions
//         </div>
//         {/*<ReCAPTCHA*/}
//         {/*    ref={recaptchaRef}*/}
//         {/*    // sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}*/}
//         {/*    sitekey={siteKey}*/}
//         {/*    onChange={onReCAPTCHAChange}*/}
//         {/*/>*/}
//
//         <GlobalButton variant="default" type="submit">
//           Send instructions
//         </GlobalButton>
//       </form>
//     </div>
//   )
// }
//
// export default ForgotPasswordFormWithC
