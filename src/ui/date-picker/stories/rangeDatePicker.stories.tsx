import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { DateCalendar } from '@/ui'

const meta: Meta<typeof DateCalendar> = {
  title: 'DatePicker/RangeDate',
  component: DateCalendar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?node-id=348-7008&t=HHfCtWgkLGffVNsb-4.',
    },
    docs: {
      description: {
        component: ' rangeDatePicker - это компонент, предназначенный для выбора диапазона дат. ',
      },
    },
  },
  argTypes: {
    errorMessage: {
      options: [null, 'ErrorMessage'],
      control: { type: 'radio' },
      description: 'вывести сообщение об ошибки и показать красным цветом',
    },
    label: {
      options: ['Date', null],
      control: { type: 'radio' },
      description: 'Добавить имя над компонентой',
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
      description: 'Заблокировать кнопку',
    },
  },
}

export default meta
type Story = StoryObj<typeof DateCalendar>

const RangeWithHooks = (args: any) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  return (
    <DateCalendar
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      isRange={true}
      {...args}
    />
  )
}

export const RangeDate: Story = {
  render: args => <RangeWithHooks {...args} />,
}
