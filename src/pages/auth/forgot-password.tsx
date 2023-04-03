import React from 'react'

import {NextPage} from 'next'
import {InputWithValidation} from '@/components /InputWithValidation/InputWithValidation';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import style from '@/pages/auth/pageLogin.module.scss';
import {NameTitle} from '@/components /atoms/title/nameTitle';
import Button from '@/components /atoms/buttons/button';
import Link from '@/components /atoms/link/Link';

const MAX_LENGTH_EMAIL = 100;
const MIN_LENGTH_EMAIL = 5;

const ForgotPassword: NextPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm({mode: 'onSubmit', defaultValues: {email: ''}})

    const onSubmit: SubmitHandler<FieldValues> = data => {
        const {email} = data
        console.log(email)
        reset()
    }

    return (
        <div className={style.container}>
            <div
                className={
                    'flex flex-col items-center content-center max-w-full border border-bgLogBorder w-4/12 bg-bgLog mt-24 mr-auto ml-auto mb-36'
                }
            >
                <NameTitle nameTitle={'Forgot Password'} className={style.nameTitle}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputWithValidation name={'email'}
                                         label={'Email'}
                                         register={register}
                                         maxLength={MAX_LENGTH_EMAIL}
                                         minLength={MIN_LENGTH_EMAIL}
                                         errors={errors.email ? errors.email : undefined}
                                         control={control}
                    />

                    <div>Enter your email address and we will send you further instructions</div>
                    <Button type={'submit'} textBtn={'Send instructions'} tag={'btn'} callback={() => {
                    }}/>
                </form>
                <Link href={'/auth/login'} title={'Back to Sign In'} className={'text-blue-600'}/>
            </div>
        </div>
    )
}

export default ForgotPassword
