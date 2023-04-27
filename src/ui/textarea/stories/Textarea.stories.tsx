import type { Meta, StoryObj, ComponentStory } from '@storybook/react'

import { Textarea } from '@/ui'

const meta: Meta<typeof Textarea> = {
  title: 'Textarea',
  component: Textarea,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?node-id=316-8163&t=NqPSrBsqcr7pfepy-4',
    },
    docs: {
      description: {
        component: 'It is a reusable textarea component with optional label and error message',
      },
    },
  },

  argTypes: {
    error: {
      options: [null, 'Max length is exceeded'],
      control: { type: 'radio' },
      description: 'show error message',
    },
    label: {
      options: ['Add description', null],
      control: { type: 'radio' },
      description: 'show textarea with label',
    },
    rows: {
      options: [3, 10],
      control: { type: 'radio' },
      description: 'show textarea with 10 rows',
    },
    cols: {
      options: [30, 50],
      control: { type: 'radio' },
      description: 'show textarea with 50 cols',
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
      description: 'show textarea with disabled state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = args => <Textarea {...args} />

export const BaseTextarea = Template.bind({})
BaseTextarea.args = {}

// export const WithError = Template.bind({})
// WithError.args = {
//   error: 'Max length is exceeded'
// }

// export const WithLabel = Template.bind({})
// WithLabel.args = {
//   label: 'Add description',
// }
