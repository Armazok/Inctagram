import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { DateCalendar } from '@/ui'

const meta: Meta<typeof DateCalendar> = {
  title: 'DatePicker/SelectedDate',
  component: DateCalendar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?node-id=348-7008&t=HHfCtWgkLGffVNsb-4.',
    },
    docs: {
      description: {
        component: ' DatePicker - это компонент, предназначенный для выбора даты ',
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
      // options: ['Date', null],
      control: { type: 'text' },
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

const SelectedWithHooks = (args: any) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <DateCalendar
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={null}
      setEndDate={() => null}
      {...args}
    />
  )
}

export const SelectedDate: Story = {
  render: args => <SelectedWithHooks {...args} />,
}
