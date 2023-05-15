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
        component: 'DatePicker - this is a component designed for date selection ',
      },
    },
  },
  argTypes: {
    errorMessage: {
      options: [null, 'ErrorMessage'],
      control: { type: 'radio' },
      description: 'print an error message and show it in red',
    },
    label: {
      control: { type: 'text' },
      description: 'Add a name above the component',
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
      description: 'Lock the button',
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
