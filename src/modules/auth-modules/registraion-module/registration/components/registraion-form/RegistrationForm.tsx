import React, { useState } from 'react'

import { useGlobalForm } from '@/common'
import { Confirm } from '@/components/modals/confirm/Confirm'
import {
  FormDataRegistered,
  registrationSchema,
  useRegisterMutation,
} from '@/modules/auth-modules/registraion-module'
import { GlobalButton, GlobalInput, InputWithEye, Preloader } from '@/ui'

const titleForModal = 'Email sent'
const messageModal = 'We have sent a link to confirm your email to'

export const RegistrationForm = () => {
  const [toggleModal, setToggleModal] = useState(false)

  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(registrationSchema)
  const { sendRegisteredData, isLoading, variables } = useRegisterMutation(
    () => setToggleModal(true),
    () => reset(),
    setCustomError
  )

  const registeredDataSubmit = (data: FormDataRegistered | any) => {
    sendRegisteredData(data)
  }

  const modalToggle = () => setToggleModal(!toggleModal)

  return (
    <>
      {isLoading && <Preloader />}
      <form
        className="flex flex-col grow gap-[22px] pt-[22px]  pb-[18px] w-full gap-[24px]"
        onSubmit={handleSubmit(registeredDataSubmit)}
      >
        <GlobalInput
          type="text"
          id="Username"
          label="Username"
          error={errors?.userName?.message}
          {...register('userName')}
        />
        <GlobalInput
          type="email"
          id="email"
          label="Email"
          error={errors?.email?.message}
          {...register('email')}
        />
        <InputWithEye
          label="Password"
          id="password"
          error={errors?.password?.message}
          {...register('password')}
        />
        <InputWithEye
          label="Password Confirmation"
          id="confirmPassword"
          error={errors?.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <GlobalButton variant="default" type="submit">
          Sign Up
        </GlobalButton>
        <Confirm
          isOpen={toggleModal}
          onConfirm={modalToggle}
          onClose={modalToggle}
          title={titleForModal}
          text={`${messageModal} ${variables?.email || ''}`}
          confirmButtonText="OK"
        />
      </form>
    </>
  )
}
