import React from 'react'

import {NextPage} from 'next'

import Link from '@/components/link/Link'
import containerBlock from '@/styles/container.module.scss'
import style from './registration.module.scss'
import Heading from '@/components/Heading';
import Button from '@/components/buttons/button';
import {InputWithValidation} from '@/components/InputWithValidation/InputWithValidation';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';



const MAX_LENGTH = 100;
const MIN_LENGTH = 5;

const ForgotPassword: NextPage = () => {
    const {register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({defaultValues: {email: ''}})

    const onSubmit: SubmitHandler<FieldValues> = data => {
        const { email } = data
        reset()
    }

    return (
        <div className={`${containerBlock.container} ${style.registerBlock}`}>
            <Heading style={style.title} tag={'h1'} text={'Forgot Password'}/>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

                <div className={style.inputContainer}>
                    <InputWithValidation name={'email'}
                                         label={'Email'}
                                         register={register}
                                         maxLength={MAX_LENGTH}
                                         minLength={MIN_LENGTH}
                                         errors={errors.email ? errors.email : undefined}
                    />
                    <div>Enter your email address and we will send you further instructions</div>
                </div>
                <button type={'submit'}>Send instructions</button>
                {/*<Button text={'Send instructions'} tag={'h3'} type={'submit'}/>*/}
            </form>=
            <Link href={'/auth/sing-in'} title={'Back to Sign In'} className={style.descriptionSignIn}/>
        </div>
    )
}

export default ForgotPassword
