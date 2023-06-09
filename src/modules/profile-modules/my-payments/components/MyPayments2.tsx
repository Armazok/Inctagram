import React, { useState } from 'react'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table'

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
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  })
  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }
  // const dataQuery = useQuery(
  //     ['data', fetchDataOptions],
  //     () => fetchData(fetchDataOptions),
  //     { keepPreviousData: true }
  // )
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const { data, isSuccess } = useGetMyPayments()

  setMyPaymentsDataEffect(data, isSuccess, setMyPaymentsData)

  const columns: ColumnDef<myPaymentsType>[] = React.useMemo(
    () => [
      {
        accessor: 'dateOfPayment',
        header: 'Date of Payment',
        cell: (params: any) => dateChangesFormat(params.getValue()),
        accessorKey: 'dateOfPayment',
      },
      {
        accessor: 'endDateOfSubscription',
        header: 'End date of subscription',
        cell: (params: any) => dateChangesFormat(params.getValue()),
        accessorKey: 'endDateOfSubscription',
      },
      {
        accessor: 'price',
        header: 'Price',
        cell: (params: any) => '$' + params.getValue(),
        accessorKey: 'price',
      },
      {
        accessor: 'subscriptionType',
        header: 'Subscription Type',
        cell: (params: any) => capitalizeFirstLetter(params.getValue()),
        accessorKey: 'subscriptionType',
      },
      {
        accessor: 'paymentType',
        header: 'Payment Type',
        cell: (params: any) => capitalizeFirstLetter(params.getValue()),
        accessorKey: 'paymentType',
      },
    ],
    []
  )

  const tableProps = useReactTable({
    data: myPaymentsData,
    columns: columns,
    state: {
      pagination,
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    getSortedRowModel: getSortedRowModel(),
  })

  // console.log(sorting)
  // console.log(pageSize)
  // console.log(pageIndex)
  console.log('1')

  return (
    <>
      <div className="text-accent-500 p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
        <div className={s.container}>
          <table className="w-full ">
            <thead>
              {tableProps.getHeaderGroups().map((headerGroup, key) => (
                // eslint-disable-next-line react/jsx-key
                <tr key={key}>
                  {headerGroup.headers.map(header => (
                    // eslint-disable-next-line react/jsx-key
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {/*{header.getContext()}*/}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableProps.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id} style={{ width: cell.column.getSize() }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => tableProps.setPageIndex(0)}
              disabled={!tableProps.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => tableProps.previousPage()}
              disabled={!tableProps.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => tableProps.nextPage()}
              disabled={!tableProps.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => tableProps.setPageIndex(tableProps.getPageCount() - 1)}
              disabled={!tableProps.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {tableProps.getState().pagination.pageIndex + 1} of {tableProps.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={tableProps.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0

                  tableProps.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={tableProps.getState().pagination.pageSize}
              onChange={e => {
                tableProps.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            {/*{dataQuery.isFetching ? 'Loading...' : null}*/}
          </div>
          <div>{tableProps.getRowModel().rows.length} Rows</div>
          {/*<div>*/}
          {/*  <button onClick={() => rerender()}>Force Rerender</button>*/}
          {/*</div>*/}
          {/*<pre>{JSON.stringify(pagination, null, 2)}</pre>*/}
        </div>
      </div>
    </>
  )
}
