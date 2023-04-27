import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import './../../../styles/globals.scss'

import { GlobalButton } from '@/ui'

const meta: Meta<typeof GlobalButton> = {
  title: 'GlobalButton',
  component: GlobalButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Button view display',
      options: ['default', 'white', 'transparent', 'black'],
      control: { type: 'inline-radio' },
      table: {
        type: { summary: 'default | white | transparent | black ' },
        defaultValue: { summary: 'default' },
      },
    },
    type: {
      type: { required: true, name: 'other', value: 'string' },
      description: 'How type should the button be?',
      options: ['button', 'submit', 'reset'],
      control: { type: 'inline-radio' },
      defaultValue: { summary: 'button' },
      table: {
        type: { summary: 'button | submit | reset' },
      },
    },
    children: {
      description: 'Button contents',
      defaultValue: { summary: 'button' },
      //  type: { required: true, name: 'other', value: 'string' },
      table: {
        type: { summary: 'string | any' },
      },
    },
    disabled: {
      description: 'Button in loading',
      control: { type: 'boolean' },
      active: { control: 'boolean' },
      defaultValue: { summary: false },
      table: {
        type: { summary: 'boolean' },
      },
    },
    callback: {
      action: 'clicked',
      description: 'optional click handler',
      table: {
        type: { summary: '(() => void )' },
      },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?node-id=303-3570&t=cksZ7wePFj6gaKVa-0',
    },
    docs: {
      description: {
        component: 'global application button ',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GlobalButton>
const wrapper = 'w-full flex justify-center items-center bg-secondBgColor h-60'

export const Button: Story = {
  render: args => (
    <div className={wrapper}>
      <GlobalButton {...args} callback={args.callback} type={args.type} variant={args.variant}>
        {args.children}
      </GlobalButton>
    </div>
  ),
  args: {
    children: 'button',
    type: 'button',
    variant: 'default',
    callback: action('clicked'),
  },
}
