import React, { useMemo, useState } from 'react'

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

import { capitalizeFirstLetter } from '@/common'
import {
  dateChangesFormat,
  myPaymentsType, setMyPaymentsDataEffect,
  useGetMyPayments,
} from '@/modules/profile-modules/my-payments'
import { SkeletonMyPayments } from '@/ui/skeletons/SkeletonMyPayments'

export const MyPayments = () => {
  const [myPaymentsData, setMyPaymentsData] = useState<any[]>([])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const sort = sorting.map(({ id }) => `${id}`)
  const dir = sorting.map(({ desc }) => `${desc ? 'DESC' : 'ASC'}`)
  const sortBy = sort.length > 0 ? sort[0] : ''
  const sortDirection = dir.length > 0 ? dir[0] : ''

  const fetchDataOptions = {
    pageNumber: pageIndex,
    pageSize: pageSize,
    sortBy: sortBy,
    sortDirection: sortDirection,
  }

  // {
  //   pageNumber:
  //   sortDrection asd desc
  //   pageSize
  //   sortBy id
  // }
  //SortBy = asc | desc
  // sortDirection = id
  // console.log(fetchDataOptions)

  // sorting.map(s => `${s.id}:${s.desc ? 'DESC' : 'ASC'}`).join(','),
  // const dataQuery = useQuery(
  //     ['data', fetchDataOptions],
  //     () => fetchData(fetchDataOptions),
  //     { keepPreviousData: true }
  // )

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const { data, isSuccess, isLoading } = useGetMyPayments()

  setMyPaymentsDataEffect(data, isSuccess, isLoading, setMyPaymentsData)

  const columns: ColumnDef<myPaymentsType>[] = useMemo(
    () => [
      {
        accessor: 'dateOfPayment',
        header: 'Date of Payment',
        cell: (params: any) =>
          isLoading || !isSuccess ? <SkeletonMyPayments /> : dateChangesFormat(params.getValue()),
        accessorKey: 'dateOfPayment',
      },
      {
        accessor: 'endDateOfSubscription',
        header: 'End date of subscription',
        cell: (params: any) =>
          isLoading || !isSuccess ? <SkeletonMyPayments /> : dateChangesFormat(params.getValue()),
        accessorKey: 'endDateOfSubscription',
      },
      {
        accessor: 'price',
        header: 'Price',
        cell: (params: any) =>
          isLoading || !isSuccess ? <SkeletonMyPayments /> : '$' + params.getValue(),
        accessorKey: 'price',
      },
      {
        accessor: 'subscriptionType',
        header: 'Subscription Type',
        cell: (params: any) =>
          isLoading || !isSuccess ? (
            <SkeletonMyPayments />
          ) : (
            capitalizeFirstLetter(params.getValue())
          ),
        accessorKey: 'subscriptionType',
      },
      {
        accessor: 'paymentType',
        header: 'Payment Type',
        cell: (params: any) =>
          isLoading || !isSuccess ? (
            <SkeletonMyPayments />
          ) : (
            capitalizeFirstLetter(params.getValue())
          ),
        accessorKey: 'paymentType',
      },
    ],
    [isSuccess, isLoading]
  )

  const tableProps = useReactTable({
    data: myPaymentsData,
    columns: columns,
    state: {
      pagination,
      sorting,
    },
    // manualSorting: true,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div className=" text-accent-500 p-2 block max-w-full ">
        <div className={`max-w-[972px]`}>
          <table>
            <thead
              className={
                'h-12 bg-dark-500 border-2 border-dark-500 border-r-2 text-light-100 font-semibold text-sm'
              }
            >
              {tableProps.getHeaderGroups().map((headerGroup, key) => (
                <tr key={key}>
                  {headerGroup.headers.map(header => (
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
                  <tr
                    className={'border-[1px] border-dark-500 text-light-100 font-normal text-sm'}
                    key={row.id}
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          className={'pb-3 pt-3 text-center'}
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                        >
                          <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="h-2" />
          <div className="pt-2 flex items-center gap-2 text-light-100 font-normal text-sm">
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
                className="border p-1 rounded w-16 bg-dark-500 text-light-100 text-sm font-normal"
              />
            </span>
            <select
              className={'bg-dark-500 text-light-100 text-sm font-normal'}
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
