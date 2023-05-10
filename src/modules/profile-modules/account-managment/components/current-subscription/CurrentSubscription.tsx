import React from 'react'

import { Checkbox } from '@/ui'

export const CurrentSubscription = () => {
  return (
    <div className={'flex flex-col gap-3 my-6'}>
      <div className={'text-base'}>Current Subscription:</div>
      <table className={'table-auto bg-dark-500 border border-dark-300 rounded-sm border-collapse'}>
        <thead className={'text-sm text-light-900 text-left'}>
          <tr>
            <th className={'px-6 pt-3 font-normal'}>Date of payment</th>
            <th className={'px-6 pt-3 font-normal'}>End date of subscription</th>
          </tr>
        </thead>
        <tbody className={'text-sm text-light-100'}>
          <tr>
            <td className={'px-6 py-3'}>12.12.2022</td>
            <td className={'px-6 py-3 '}>12.01.2023</td>
          </tr>
        </tbody>
      </table>
      <Checkbox>Auto-Renewal</Checkbox>
    </div>
  )
}
