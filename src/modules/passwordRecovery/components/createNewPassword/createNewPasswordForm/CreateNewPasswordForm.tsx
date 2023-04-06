import React from 'react';
import {FieldValues, SubmitHandler} from 'react-hook-form';
import InputWithEye from '@/ui/Inputs/InputWithEye/InputWithEye';
import GlobalButton from '@/ui/buttons/GlobalButton';
import {useGlobalForm} from '@/common';
import {schema} from '@/modules/passwordRecovery/constants/createNewPasswordSchema';


type PropsType = {
    onSubmitHandler: (password: string) => void;
}

const CreateNewPasswordForm = ({onSubmitHandler}: PropsType) => {

    const { errors, register, reset, handleSubmit } = useGlobalForm(schema)

    const onSubmit: SubmitHandler<FieldValues> = data => {
        const { password } = data
        onSubmitHandler(password)
        reset()
    }

    return (
            <form
                className="flex flex-col grow gap-[10px] pt-[22px]  pb-[18px] w-full gap-[24px]"
                onSubmit={handleSubmit(onSubmit)}
            >

                <InputWithEye
                    label="Password"
                    id="password"
                    placeholder=""
                    //@ts-ignore
                    error={errors?.password?.message}
                    {...register('password')}
                />
                <InputWithEye
                    placeholder=""
                    label="Password"
                    id="confirmPassword"
                    error={errors?.confirmPassword?.message}
                    {...register('confirmPassword')}
                />
                <GlobalButton variant="default" type="submit">
                    Create new password
                </GlobalButton>
            </form>
    );
};

export default CreateNewPasswordForm;