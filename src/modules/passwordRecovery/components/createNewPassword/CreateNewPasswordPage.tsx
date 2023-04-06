import React from 'react'
import {NameTitle} from '@/components/atoms/title/nameTitle'
import CreateNewPasswordForm from '@/modules/passwordRecovery/components/createNewPassword/createNewPasswordForm/CreateNewPasswordForm';
import {useCreateNewPasswordMutation} from '@/services/api/auth/hoook';
import {useRouter} from 'next/router'
import Preloader from '@/components/atoms/preloader/Preloader';
import FormLayout from '@/components/FormLayout/FormLayout';

type PropsType = {
    recoveryCode: string
}

export const CreateNewPasswordPage = ({recoveryCode= ''}: PropsType) => {
    const router = useRouter();

    const { mutate: createNewPassword, isLoading } = useCreateNewPasswordMutation()

    const onSubmitHandler = async (newPassword: string) => {
        await createNewPassword({newPassword, recoveryCode})
        router.push('/')
    }

    if (isLoading) return <Preloader />

  return (
      <FormLayout className="mt-[60px]">
        <NameTitle nameTitle={'Create New Password'}
                   className="font-bold text-light-100 text-[20px] leading-[36px]"
        />
        <CreateNewPasswordForm onSubmitHandler={onSubmitHandler}/>
      </FormLayout>
  )
}
