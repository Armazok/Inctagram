import React, { useState } from 'react'

import { useGlobalForm } from '@/common'
import Preloader from '@/components/atoms/preloader/Preloader'
import { Confirm } from '@/components/modals/confirm/Confirm'
import { schema, FormData } from '@/modules/registration/constants/registerValidateSchema'
import { useRegisterMutation } from '@/modules/registration/hooks/useRegister'
import GlobalButton from '@/ui/buttons/GlobalButton'
import GlobalInput from '@/ui/Inputs/Input/Input'
import InputWithEye from '@/ui/Inputs/InputWithEye/InputWithEye'

const titleForModal = 'Email sent'
const messageModal = 'We have sent a link to confirm your email to'

const RegistrationForm = () => {
  const [toggleModal, setToggleModal] = useState(false)

  const { errors, register, reset, handleSubmit, setCustomError } = useGlobalForm(schema)
  const { sendRegisteredData, isLoading, variables } = useRegisterMutation(
    setCustomError,
    setToggleModal,
    reset
  )

  const formSubmit = (data: any) => {
    const { email, password } = data

    sendRegisteredData({ email, password })
  }

  const modalToggle = () => setToggleModal(!toggleModal)

  return (
    <>
      {isLoading && <Preloader />}
      <form
        className="flex flex-col grow gap-[10px] pt-[22px]  pb-[18px] w-full gap-[24px]"
        onSubmit={handleSubmit(formSubmit)}
      >
        <GlobalInput
          type="email"
          id="email"
          placeholder="Epam@epam.com"
          label="Email"
          error={errors?.email?.message}
          {...register('email')}
        />
        <InputWithEye
          label="Password"
          id="password"
          placeholder="******************"
          error={errors?.password?.message}
          {...register('password')}
        />
        <InputWithEye
          placeholder="******************"
          label="Password"
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
          confirmButtonText={'OK'}
        />
      </form>
    </>
  )
}

export default RegistrationForm
