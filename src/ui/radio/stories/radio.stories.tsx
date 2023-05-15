import type { Meta } from '@storybook/react'

import { Radio } from '@/ui/radio/Radio'

const meta: Meta<typeof Radio> = {
  title: 'Radio',
  component: Radio,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=3663-10765&t=Iyv8MYPGA5HqzrVI-4',
    },
    docs: {
      description: {
        component: ' Radio view display ',
      },
    },
  },
  argTypes: {
    checked: {
      options: [true, false],
      defaultValue: true,
      control: { type: 'boolean' },
      description: 'Select the active radio button',
    },
    value: {
      control: { type: 'text' },
      description:
        'Contains the value of the radio button. The value attribute is used to determine exactly which of the radio buttons was selected by the user',
    },
    name: {
      control: { type: 'text' },
      description: 'The name field for grouping radio buttons.',
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
      description: 'Block the radio',
    },
    onClick: { action: 'clicked' },
  },
}

export default meta
const wrapper = 'w-full flex justify-center items-center bg-secondBgColor h-60 gap-2'

export const RadioUI: {
  // @ts-ignore
  render: (args) => JSX.Element
} = {
  render: args => (
    <div className={wrapper}>
      <Radio id={'1'} value={'Radio 1'} name={'radio'} {...args} />
      <Radio id={'2'} value={'Radio 2'} name={'radio'} {...args} />
    </div>
  ),
}
