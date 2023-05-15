import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import s from './myPayments.module.scss'

import { myPaymentsType } from '@/modules/profile-modules/my-payments/api/my-payments-api'
import { useGetMyPayments } from '@/modules/profile-modules/my-payments/hooks/useGetMyPayments'

export const MyPayments = () => {
  const [state, setState] = useState<myPaymentsType[]>([])

  const { data, isSuccess } = useGetMyPayments()

  console.log(data)
  console.log(isSuccess)
  useEffect(() => {
    if (data) {
      setState(data)
    }
  }, [isSuccess])
  const columnDefs = [
    { field: 'startDate', header: 'Date of Payment' },
    { field: 'endDate', header: 'End date of subscription' },
    {
      field: 'price',
      header: 'Price',
      valueFormatter: (params: any) => '$' + params.data.price,
    },
    { field: 'subscription', header: 'Subscription Type' },
    { field: 'payments', header: 'Payment Type' },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  )
  const gridRef = useRef<any>()
  const onPageSizeChanged = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value

    gridRef.current.api.paginationSetPageSize(value)
  }, [])

  return (
    <div className={`ag-theme-alpine-dark ${s.myPayments} `} style={{ height: 500, width: 972 }}>
      <AgGridReact
        ref={gridRef}
        animateRows={true}
        rowSelection={'multiple'}
        rowData={state}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={8}
        suppressHorizontalScroll={true}
        gridOptions={{
          suppressPropertyNamesCheck: true,
        }}
      />
      <select className={s.optionsBlock} onChange={e => onPageSizeChanged(e)}>
        <option value={'25'}>25</option>
        <option value={'50'}>50</option>
        <option value={'75'}>75</option>
        <option value={'100'}>100</option>
      </select>
    </div>
  )
}
