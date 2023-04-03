import React from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {InputWithValidation} from '@/components /InputWithValidation/InputWithValidation';
import style from '@/pages/auth/pageLogin.module.scss';
import {NameTitle} from '@/components /atoms/title/nameTitle';
import Button from '@/components /atoms/buttons/button';

const MAX_LENGTH_PASSWORD = 20;
const MIN_LENGTH_PASSWORD = 6;

const CreateNewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { password, passwordConfirmation } = data
    console.log(password, passwordConfirmation )
    reset()
  }

  return (
      <div className={style.container}>
        <div
            className={
              'flex flex-col items-center content-center max-w-full border border-bgLogBorder w-4/12 bg-bgLog mt-24 mr-auto ml-auto mb-36'
            }
        >
          <NameTitle nameTitle={'Create New Password'} className={style.nameTitle} />

          <form onSubmit={handleSubmit(onSubmit)}>

          <InputWithValidation name={'password'}
                               label={"New password"}
                               register={register}
                               maxLength={MAX_LENGTH_PASSWORD}
                               minLength={MIN_LENGTH_PASSWORD}
                               errors={errors.password ? errors.password : undefined}
                               type={"password"}
                               control={control}
          />
          <InputWithValidation name={'passwordConfirmation'}
                               label={"Password confirmation"}
                               register={register}
                               maxLength={MAX_LENGTH_PASSWORD}
                               minLength={MIN_LENGTH_PASSWORD}
                               errors={errors.passwordConfirmation ? errors.passwordConfirmation : undefined}
                               watch={watch}
                               type={"password"}
                               control={control}
          />
            <Button type={'submit'} textBtn={'Create new password'} tag={'btn'} callback={() => {}} />

          {/*  <button type="submit" onClick={() => {}}>*/}
          {/*  Create new password*/}
          {/*</button>*/}
        </form>
      </div>
    </div>
  )
}

export default CreateNewPassword;
