import React, { useState } from 'react'

import {
  getTableProps,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  getPaginationRowModel,
  SortingState,
} from '@tanstack/react-table'
import { useTable } from 'react-table'

import s from './index.module.scss'

import { capitalizeFirstLetter } from '@/common'
import {
  dateChangesFormat,
  myPaymentsType,
  useGetMyPayments,
} from '@/modules/profile-modules/my-payments'
import { setMyPaymentsDataEffect } from '@/modules/profile-modules/my-payments/custom/setMyPaymentsDataEffect'
export const MyPayments2 = () => {
  const [myPaymentsData, setMyPaymentsData] = useState<any[]>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const { data, isSuccess } = useGetMyPayments()

  setMyPaymentsDataEffect(data, isSuccess, setMyPaymentsData)
  const columns = React.useMemo(
    () => [
      {
        accessor: 'dateOfPayment',
        Header: 'Date of Payment',
        Cell: (params: any) => dateChangesFormat(params.value),
      },
      {
        accessor: 'endDateOfSubscription',
        Header: 'End date of subscription',
        Cell: (params: any) => dateChangesFormat(params.value),
      },
      {
        accessor: 'price',
        Header: 'Price',
        Cell: (params: any) => '$' + params.value,
      },
      {
        accessor: 'subscriptionType',
        Header: 'Subscription Type',
        Cell: (params: any) => capitalizeFirstLetter(params.value),
      },
      {
        accessor: 'paymentType',
        Header: 'Payment Type',
        Cell: (params: any) => capitalizeFirstLetter(params.value),
      },
    ],
    []
  )
  //@ts-ignore
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: myPaymentsData,
  })

  const tableProps = useReactTable({
    data: myPaymentsData,
    columns: columns,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    manualSorting: true,
  })

  return (
    <>
      <div className="text-accent-500 p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
        <div className={s.container}>
          <table className="w-full " {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                // eslint-disable-next-line react/jsx-key
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    // eslint-disable-next-line react/jsx-key
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)

                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      // eslint-disable-next-line react/jsx-key
                      <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
