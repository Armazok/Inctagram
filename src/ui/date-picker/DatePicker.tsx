import 'react-datepicker/dist/react-datepicker.css'

import { ComponentProps, FC } from 'react'

import { clsx } from 'clsx'
import { getYear } from 'date-fns'
import { range } from 'lodash'
// eslint-disable-next-line import/no-named-as-default
import ReactDatePicker from 'react-datepicker'

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
  maxDate?: Date | null
}
//& ComponentProps<'div'>
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

/**
 *
 * DatePicker - компонент, который может использоваться как для выбора одной даты, так и для выбора диапазона дат.
 * @param {Date} startDate - начальная дата, которая будет отображаться в поле input при рендеринге.
 * @param {function} setStartDate - функция для изменения начальной даты.
 * @param {string} label - имя, отображаемое над полем input в качестве подписи.
 * @param {boolean} error - флаг, указывающий, нужно ли выделить форму красным в случае ошибки.
 * @param {string} errorMessage - сообщение об ошибке, отображаемое под полем input.
 * @param {Date} endDate - конечная дата выбранного диапазона (используется только при выборе диапазона).
 * @param {function} setEndDate - функция для изменения конечной даты выбранного диапазона (используется только при выборе диапазона).
 * @param {boolean} disabled - флаг, указывающий, нужно ли заблокировать форму.
 * @param {maxDate} - максимальная дата ограничивает выбор даты. Сюда передаем дату, после которой блокируем выбор даты.
 * Пример - сегодня 14.04.23 и я не хочу чтобы могли выбрать завтрашний и последующие дни, поэтому я могу сюда передать текущую дату.
 * @constructor
 * {@link https://reactdatepicker.com/#example-custom-input}
 */
export const DateCalendar: FC<DatePickerProps> = ({
  startDate,
  setStartDate,
  placeholder,
  label,
  errorMessage,
  endDate,
  setEndDate,
  disabled,
  maxDate,
  ...rest
}) => {
  const classNames = {
    input: clsx(
      s.blockContainer,
      errorMessage && s.errorBlockContainer,
      disabled && s.disabledText
    ),
    calendar: s.calendar,
    popper: s.popper,
    errorText: clsx(errorMessage && s.errorText),
    day: () => s.day,
  }

  const years = range(1900, getYear(new Date()) + 1, 1)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

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
        maxDate={maxDate}
        dateFormat="dd-MM-yyyy"
        startDate={startDate}
        endDate={endDate}
        selected={startDate}
        preventOpenOnFocus={true}
        selectsRange={isRange}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          ...rest
        }) => (
          <CustomHeader
            date={date}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
            changeYear={changeYear}
            years={years}
            months={months}
            changeMonth={changeMonth}
            {...rest}
          />
        )}
        onChange={(dates: [Date | null, Date | null] | Date | null) => DatePickerHandler(dates)}
        customInput={
          <CustomInput
            isRange={isRange}
            disabledLabelText={disabled}
            label={label}
            errorMessage={errorMessage}
          />
        }
        dayClassName={classNames.day}
        calendarClassName={classNames.calendar}
        className={classNames.input}
        popperClassName={classNames.popper}
        showPopperArrow={false}
        calendarStartDay={1}
        disabled={disabled}
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 0],
            },
          },
        ]}
      />
      {errorMessage && <span className={classNames.errorText}>{errorMessage}</span>}
    </div>
  )
}
