import React from 'react';
import {InputWithValidation} from '@/components/InputWithValidation/InputWithValidation';
import Button from '@/components/atoms/buttons/button';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';

const MAX_LENGTH_PASSWORD = 20
const MIN_LENGTH_PASSWORD = 6

type PropsType = {
    onSubmitHandler: (password: string) => void;
}

const CreateNewPasswordForm = ({onSubmitHandler}: PropsType) => {
    const {
        handleSubmit, watch, reset, control, formState: { errors },
    } = useForm({
        mode: 'onSubmit', defaultValues: {password: '', passwordConfirmation: ''},
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        const { password, passwordConfirmation } = data
        onSubmitHandler(password)
        reset()
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWithValidation
                    name={'password'}
                    label={'New password'}
                    maxLength={MAX_LENGTH_PASSWORD}
                    minLength={MIN_LENGTH_PASSWORD}
                    errors={errors.password ? errors.password : undefined}
                    type={'password'}
                    control={control}
                />
                <InputWithValidation
                    name={'passwordConfirmation'}
                    label={'Password confirmation'}
                    maxLength={MAX_LENGTH_PASSWORD}
                    minLength={MIN_LENGTH_PASSWORD}
                    errors={errors.passwordConfirmation ? errors.passwordConfirmation : undefined}
                    watch={watch}
                    type={'password'}
                    control={control}
                />
                <Button type={'submit'} textBtn={'Create new password'} tag={'btn'} callback={() => {}} />
            </form>
        </div>
    );
};

export default CreateNewPasswordForm;