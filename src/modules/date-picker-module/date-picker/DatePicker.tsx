import { ComponentProps, FC, forwardRef, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

import clsx from 'clsx'
import { format } from 'date-fns'
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import s from './datePicker.module.scss'

type CommonProps = {
  placeholder?: string
  startDate: Date | null
  setStartDate: (date: Date | null) => void
  label?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
} & ComponentProps<'div'>

type ConditionalProps =
  | {
      endDate: Date | null
      setEndDate: (date: Date | null) => void
    }
  | {
      endDate: never
      setEndDate: never
    }

export type DatePickerProps = CommonProps & ConditionalProps

const DateCalendar: FC<DatePickerProps> = ({
  // startDate,
  // setStartDate,
  placeholder,
  label,
  error,
  errorMessage,
  // endDate,
  // setEndDate,
  disabled,
  ...rest
}) => {
  const classNames = {
    input: clsx(s.blockContainer, error && s.errorBlockContainer),
    calendar: s.calendar,
    popper: s.popper,
    errorText: clsx(error && s.errorText),
    day: () => s.day,
  }

  //Необходимо убрать два useState перед export в Profile
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)

  const isRange = endDate !== undefined

  const DatePickerHandler = (dates: [Date | null, Date | null] | Date | null) => {
    console.log(dates)
    if (Array.isArray(dates)) {
      const [start, end] = dates

      setStartDate(start)
      setEndDate(end)
    } else {
      setStartDate(dates)
    }
  }

  return (
    <div {...rest}>
      <ReactDatePicker
        dateFormat="dd-MM-yyyy"
        startDate={startDate}
        endDate={endDate}
        selected={startDate}
        preventOpenOnFocus={true}
        //isRange прописать вместо true
        selectsRange={true}
        renderCustomHeader={CustomHeader}
        onChange={(dates: [Date | null, Date | null] | Date | null) => DatePickerHandler(dates)}
        customInput={<CustomInput label={label} error={error} disabled={true} />}
        dayClassName={classNames.day}
        calendarClassName={classNames.calendar}
        className={classNames.input}
        popperClassName={classNames.popper}
        showPopperArrow={false}
        calendarStartDay={1}
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 0],
            },
          },
        ]}
      />
      {error && <span className={classNames.errorText}>{errorMessage}</span>}
    </div>
  )
}

type CustomInputProps = {
  disabled?: boolean
  label?: string
  error?: boolean
}

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, disabled, error, ...rest }, ref) => {
    const classNames = {
      inputContainer: s.customInput,
      iconContainer: s.iconContainer,
      svgStyle: clsx(error ? '#CC1439' : 'white'),
    }

    return (
      <div className={classNames.inputContainer}>
        <input {...rest} />
        <div className={classNames.iconContainer}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_301_3622)">
              <path
                d="M18 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4V4ZM6 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H18C18.2652 6 18.5196 6.10536 18.7071 6.29289C18.8946 6.48043 19 6.73478 19 7V11H5V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6V6ZM18 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V13H19V19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20Z"
                fill={classNames.svgStyle}
              />
              <path
                d="M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z"
                fill="black"
              />
              <path
                d="M16 15H12C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17H16C16.2652 17 16.5196 16.8946 16.7071 16.7071C16.8946 16.5196 17 16.2652 17 16C17 15.7348 16.8946 15.4804 16.7071 15.2929C16.5196 15.1054 16.2652 15 16 15Z"
                fill={classNames.svgStyle}
              />
            </g>
            <defs>
              <clipPath id="clip0_301_3622">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    )
  }
)

const CustomHeader = ({ date, decreaseMonth, increaseMonth }: ReactDatePickerCustomHeaderProps) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
  }

  const headerText = capitalizeFirstLetter(format(date, 'LLLL Y'))

  return (
    <div className={classNames.header}>
      <div>{headerText}</div>
      <div className={classNames.buttonBox}>
        <button className={classNames.button} onClick={decreaseMonth}>
          <svg
            width="8"
            height="15"
            viewBox="0 0 8 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.83001 15C6.68062 15.0005 6.53301 14.9675 6.39803 14.9035C6.26305 14.8395 6.14413 14.746 6.05001 14.63L1.22001 8.63C1.07293 8.45107 0.992523 8.22663 0.992523 7.995C0.992523 7.76338 1.07293 7.53893 1.22001 7.36L6.22001 1.36C6.38975 1.15578 6.63366 1.02736 6.89809 1.00298C7.16251 0.978601 7.42579 1.06026 7.63001 1.23C7.83423 1.39974 7.96265 1.64365 7.98703 1.90808C8.01141 2.1725 7.92975 2.43578 7.76001 2.64L3.29001 8L7.61001 13.36C7.73229 13.5068 7.80997 13.6855 7.83385 13.8751C7.85773 14.0646 7.82681 14.257 7.74476 14.4296C7.6627 14.6021 7.53294 14.7475 7.37083 14.8486C7.20872 14.9497 7.02104 15.0022 6.83001 15Z"
              fill="white"
            />
          </svg>
        </button>

        <button className={classNames.button} onClick={increaseMonth}>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.99999 15C1.76634 15.0005 1.5399 14.9191 1.35999 14.77C1.25873 14.6861 1.17503 14.583 1.11368 14.4666C1.05233 14.3503 1.01453 14.223 1.00245 14.092C0.990378 13.961 1.00426 13.8289 1.0433 13.7033C1.08235 13.5777 1.14579 13.4611 1.22999 13.36L5.70999 8L1.38999 2.63C1.30692 2.52771 1.24489 2.41002 1.20746 2.28368C1.17003 2.15734 1.15794 2.02485 1.17187 1.89382C1.18581 1.76279 1.22551 1.63581 1.28868 1.52017C1.35186 1.40454 1.43726 1.30252 1.53999 1.22C1.64346 1.12897 1.76462 1.0603 1.89588 1.01831C2.02715 0.976319 2.16567 0.961916 2.30276 0.976001C2.43986 0.990085 2.57256 1.03236 2.69254 1.10016C2.81252 1.16796 2.9172 1.25983 2.99999 1.37L7.82999 7.37C7.97707 7.54893 8.05748 7.77338 8.05748 8.005C8.05748 8.23663 7.97707 8.46107 7.82999 8.64L2.82999 14.64C2.72967 14.761 2.60224 14.8567 2.45803 14.9192C2.31382 14.9818 2.1569 15.0095 1.99999 15Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1)
}

export default DateCalendar
