import 'react-datepicker/dist/react-datepicker.css'

import { ComponentProps, FC } from 'react'

import clsx from 'clsx'
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
  error,
  errorMessage,
  endDate,
  setEndDate,
  disabled,
  maxDate,
  ...rest
}) => {
  const classNames = {
    input: clsx(s.blockContainer, error && s.errorBlockContainer, disabled && s.disabledText),
    calendar: s.calendar,
    popper: s.popper,
    errorText: clsx(error && s.errorText),
    day: () => s.day,
  }

  /**
   * @param {isRange} - здесь проверка на enDate (конечую дату), если через пропсы передать endDate, то мы сможешь выбрать период даты с какую по какую,
   * иначе будет возможность выбрать только одну дату.
   */
  const isRange = !!endDate

  /**
   * Функция которая принмает dates, если мы передаем в DateCalendar только startDate, без endDate, то сюда придет строка,
   * если мы в DateСalendar передадим endDate, то в Dates будет лежать массив Array. Дальше идет проверка
   * @param dates
   * @constructor
   */
  const DatePickerHandler = (dates: [Date | null, Date | null] | Date | null) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates

      setStartDate(start)
      setEndDate(end)
    } else {
      setStartDate(dates)
    }
  }

  /**
   * @param - {string} dateForm - формат даты, меняющий порядок месяц/день/год в поле input
   * @oaram - {Date} selected показывает выбранную дату в календаре, когда нажимаем на инпут.
   * @param - {function} startDate дата, которая будет отображаться в поле input
   * @param - {boolean} preventOpenOnFocus если стоит true, то при нажати на странице кнопки tab, выделится только поле inpyt, но календарь не откроется.
   * поставь false, и при нажатии tab, выделиться input и откроется окно календарь
   * @param - {function} renderCustomHeader функция для отрисовки заголовка календаря (месяца, дней недели и кнопок переключения между месяцами)
   * @param - {function} customInput - компонент для отображения поля input c svg каледаря.
   * @param - {boolean} showPopperArrow - если стоит true, в календаре отображается маленький треугольник, указывающий на поле input. Если стоит false, треугольник скрыт..
   * @param - {number} calendarStartDay - отвечает за отображение стартового дня недели в календаре (0 - воскресенье, 1 - понедельник и т.д.)
   * @param - {boolean} disabled блокирует форму. в customInput disabled не передает, реальзуем в DatePicker
   * @param {object} - popperModifiers - объект, содержащий модификаторы для Popper.js, отвечающие за расположение календаря (изменение значений может повлиять на положение календаря)
   */
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
          <CustomInput isRange={isRange} disabledLabelText={disabled} label={label} error={error} />
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
      {error && <span className={classNames.errorText}>{errorMessage}</span>}
    </div>
  )
}
