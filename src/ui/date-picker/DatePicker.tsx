import 'react-datepicker/dist/react-datepicker.css'

import { ComponentProps, FC } from 'react'

import clsx from 'clsx'
import { ReactDatePicker } from 'react-datepicker'

import s from '../date-picker/datePicker.module.scss'

import { CustomHeader, CustomInput } from '@/ui'

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

export const DateCalendar: FC<DatePickerProps> = ({
  startDate,
  setStartDate,
  placeholder,
  label,
  error,
  errorMessage,
  endDate,
  setEndDate,
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

  const isRange = !!endDate

  const DatePickerHandler = (dates: [Date | null, Date | null] | Date | null) => {
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
        selectsRange={isRange}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth, ...rest }) => (
          <CustomHeader
            date={date}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
            {...rest}
          />
        )}
        onChange={(dates: [Date | null, Date | null] | Date | null) => DatePickerHandler(dates)}
        customInput={
          <CustomInput isRange={isRange} label={label} error={error} disabled={disabled} />
        }
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
