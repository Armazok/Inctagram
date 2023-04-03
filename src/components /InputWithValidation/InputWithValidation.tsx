import React from 'react';
import {FieldError, UseFormRegister, UseFormWatch, FieldValues, Controller, Control,} from 'react-hook-form';
import {Input} from '@/components /atoms/input+pass+showEye/input';
import style from './InputWithValidation.module.scss';

type AuthFormType = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

type InputType = 'email' | 'password' | 'text';

type PropsType = {
    label?: string;
    name: keyof AuthFormType | any;
    // register: UseFormRegister<AuthFormType>;
    maxLength: number;
    minLength: number;
    placeholder?: string;
    watch?: UseFormWatch<FieldValues>;
    errors?: FieldError | undefined;
    type: InputType;
    control: any;
}

const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


export const InputWithValidation = ({
                                        label = '', name, placeholder = '', maxLength, minLength,
                                        errors, watch, type, control
                                    }: PropsType) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({field: {onChange, value}}) => (
                    <>
                        <Input
                            typeInput={type}
                            nameInput={name}
                            labelName={label!}
                            placeholder={placeholder!}
                            value={value}
                            onChange={onChange}
                        />
                    </>
                )}

                rules={{
                    required: 'This field is required',
                    maxLength: {value: maxLength || 100, message: `Max length exceeded, ${maxLength || 100} symbols`},
                    minLength: {value: minLength || 1, message: `Min length required, ${minLength || 1} symbols`},
                    validate: (value: string) => {
                        const trimmedValue = value.trim();
                        if (!trimmedValue) {
                            return 'This field is required.';
                        }
                        if (name === 'email' && !regExpEmail.test(value)) {
                            return 'Email is not valid'
                        }
                        //@ts-ignore
                        if (watch && watch('password') !== value) {
                            return 'Your passwords do no match';
                        }
                        return true;
                    },
                } as any}
            />

            <div className={style.error}>{<span>{errors?.message}</span>}</div>
        </div>
    );
};