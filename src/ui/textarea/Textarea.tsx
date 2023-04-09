import React, {ChangeEvent, ForwardedRef} from 'react'
import {FieldValues} from 'react-hook-form'


type PropsType = {
    value: string
    label?: string
    id?: string
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
    error?: string | FieldValues | any
    rows?: string
    cols?: string,
    textAreaClassName?: string
    ref?: ForwardedRef<any>

}

export const Textarea = ({
                             ref, id,
                             value,
                             label,
                             onChange,
                             error, rows = '3', cols = '30',
                             textAreaClassName
                         }: PropsType) => {

    return (
        <div>
            {label && <label
                className={'block pb-[5px] text-light-900 text-[14px] text-weight-400'}>{label}</label>}
            }

            <textarea
                className={`py-[6px] px-[12px] border-light-900 border-[1px] bg-bgLogBorder rounded-[1px] text-light-900 text-[16px] text-weight-400 ${textAreaClassName}`}
                onChange={onChange}
                value={value}
                rows={rows}
                cols={cols}
                ref={ref}
                id={id}
            />

            {error && (
                <div className={'text-danger-500 text-[14px] text-weight-400'}>
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}
