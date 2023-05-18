import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridReact } from 'ag-grid-react'

import s from './myPayments.module.scss'

import { capitalizeFirstLetter } from '@/common'
import { dateChangesFormat, useGetMyPayments } from '@/modules/profile-modules/my-payments'

/**
 * My payments - a component for displaying paid subscriptions
 * @property {React.RefObject} ref - Reference to the grid component
 * @property {boolean} animateRows - Flag whether rows should be animated
 * @property {string|undefined} rowSelection - Sets row selection mode ('single', 'multiple', undefined)
 * @property {Array} rowData - Array of payment data objects to be displayed in the grid
 * @property {Array} columnDefs - Array of column definitions for the grid
 * @property {object} defaultColDef - Default column definitions for the grid
 * @property {boolean} pagination - Flag whether pagination should be enabled
 * @property {number} paginationPageSize - Number of payments to show per page in pagination
 * @property {boolean} suppressHorizontalScroll - Flag whether horizontal scroll should be suppressed
 * @property {boolean} suppressPropertyNamesCheck - Flag whether property name checks should be suppressed
 * @property {string} overlayLoadingTemplate - Template displayed when data is being loaded
 * @property {string} overlayNoRowsTemplate - Template displayed when no payments are available or when an error occurred on the server
 *
 * columnDefs - An array containing column definitions for the table
 * @type {Array}
 *
 * onPageSizeChanged - A callback function to handle changes in the table page selection
 * @returns {Function} The callback function that updates the table page size
 *
 * defaultColDef - The default column definition settings for the table, with sorting enabled
 * @type {Object}
 * @const
 * {@link https://www.ag-grid.com/react-data-grid/}
 */
export const MyPayments = () => {
  const [myPaymentsData, setMyPaymentsData] = useState<any>([])

  const { data, isSuccess } = useGetMyPayments()
  const gridRef = useRef<any>()

  const columnDefs = [
    {
      field: 'dateOfPayment',
      header: 'Date of Payment',
      valueFormatter: (params: any) => dateChangesFormat(params.value),
    },
    {
      field: 'endDateOfSubscription',
      header: 'End date of subscription',
      valueFormatter: (params: any) => dateChangesFormat(params.value),
    },
    {
      field: 'price',
      header: 'Price',
      valueFormatter: (params: any) => '$' + params.value,
    },
    {
      field: 'subscriptionType',
      header: 'Subscription Type',
      valueFormatter: (params: any) => capitalizeFirstLetter(params.value),
    },
    {
      field: 'paymentType',
      header: 'Payment Type',
      valueFormatter: (params: any) => capitalizeFirstLetter(params.value),
    },
  ]

  const onPageSizeChanged = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value)

    gridRef.current.api.paginationSetPageSize(value)
  }, [])

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  )

  useEffect(() => {
    if (data) {
      setMyPaymentsData(data)
    }
  }, [isSuccess])

  return (
    <div className={`ag-theme-alpine-dark ${s.myPayments} `} style={{ height: 500, width: 972 }}>
      <AgGridReact
        ref={gridRef}
        animateRows={true}
        rowSelection={'multiple'}
        rowData={myPaymentsData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={8}
        suppressHorizontalScroll={true}
        suppressPropertyNamesCheck={true}
        // overlayNoRowsTemplate={
        //   !isSuccess
        //     ? 'Error on the server, try again or contact technical support'
        //     : 'You have no payments'
        // }
      />
      <select
        className={s.optionsBlock}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onPageSizeChanged(e)}
      >
        <option value={'25'}>25</option>
        <option value={'50'}>50</option>
        <option value={'75'}>75</option>
        <option value={'100'}>100</option>
      </select>
    </div>
  )
}
