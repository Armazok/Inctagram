import React from 'react';
import {FieldError, UseFormRegister, UseFormWatch, FieldValues} from 'react-hook-form';

type AuthFormType = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

type PropsType = {
    label?: string;
    name: keyof AuthFormType;
    register: UseFormRegister<AuthFormType>;
    maxLength: number;
    minLength: number;
    placeholder?: string;
    watch?: UseFormWatch<FieldValues>;
    errors?: FieldError | undefined;
    className?: string;
}

const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


export const InputWithValidation = ({label = '', name, register, placeholder = '', maxLength, minLength,
                                        errors, watch, className}: PropsType) => {
    return (
        <div>
            <label>{label}</label>
            <input placeholder={placeholder}
                type={name !== 'email' ? 'password' : 'text'}
                   className={className ? className : ''}
                   {...register(name,
                    {
                        required: {value: true, message: 'This is required'},
                        maxLength: {value: maxLength, message: `Max length exceeded, ${maxLength} symbols`},
                        minLength: {value: minLength, message: `Max length exceeded, ${minLength} symbols`},
                        validate: (value: string) => {
                            const trimmedValue = value.trim();
                            if (!trimmedValue) {
                                return "This field is required.";
                            }
                            if(name === 'email' && !regExpEmail.test(value)) {
                                return 'Email is not valid'
                            }
                            //@ts-ignore
                            if (watch && watch('password') !== value) {
                                return 'Your passwords do no match';
                            }
                            return true;
                        },
                        // pattern: {value: patternValue, message: patternMessage},
                    })}
            />
            <div>{<span>{errors?.message}</span>}</div>
        </div>
    );
};