import React from 'react'

import { Meta, Story } from '@storybook/react'

import { TabComponent } from '@/ui'

// eslint-disable-next-line storybook/story-exports
export default {
  title: 'Components/TabComponent',
  component: TabComponent,
  parameters: {
    docs: {
      description: {
        component: `Компонента "TabComponent" - это компонента для создания вкладок (табов) на странице.
    Она принимает следующие параметры:

    - "label" - текст, который будет отображаться на вкладке.
    - "activeTab" - текст, указывающий на текущую активную вкладку.
    - "setActiveTab" - функция, которая будет вызываться при клике на вкладку и устанавливать текущую активную вкладку.

    Компонента создает div-контейнер, внутри которого находится еще один div-элемент с текстом вкладки.
    В зависимости от параметров компоненты, классы контейнера меняются - если текущая вкладка активна,
    то к контейнеру добавляется класс "tabsSelected", а если неактивна, то "tabsUnselected".
    При клике на вкладку вызывается переданная функция "setActiveTab" с параметром "label", что позволяет
    обновить состояние компоненты и изменить текущую активную вкладку.
    Компонента также использует библиотеку "clsx" для удобного объединения классов CSS в зависимости
    от параметров компоненты.`,
      },
    },
  },
} as Meta

interface ITabComponentType {
  label: string | undefined
  activeTab?: string | undefined
  setActiveTab?: (activeTab: string | undefined) => void
}

const Template: Story<ITabComponentType> = args => <TabComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Tab 1',
  activeTab: 'Tab 1',
  setActiveTab: activeTab => console.log('Active tab:', activeTab),
}

export const UnselectedTab = Template.bind({})

UnselectedTab.args = {
  label: 'Tab 2',
  activeTab: 'Tab 1',
  setActiveTab: activeTab => console.log('Active tab:', activeTab),
}

export const SelectedTab = Template.bind({})

SelectedTab.args = {
  label: 'Tab 1',
  activeTab: 'Tab 1',
  setActiveTab: activeTab => console.log('Active tab:', activeTab),
}
