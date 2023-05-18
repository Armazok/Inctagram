import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridReact } from 'ag-grid-react'

import s from './myPayments.module.scss'

import { myPaymentsType, useGetMyPayments } from '@/modules/profile-modules/my-payments'
import { columnDefs } from '@/modules/profile-modules/my-payments/constants/arrayOfColumnDefinitionsForTheGrid'
import { setMyPaymentsDataEffect } from '@/modules/profile-modules/my-payments/custom/setMyPaymentsDataEffect'

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
  const [myPaymentsData, setMyPaymentsData] = useState<myPaymentsType[]>([])

  const { data, isSuccess } = useGetMyPayments()

  const gridRef = useRef<any>()

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

  setMyPaymentsDataEffect(data, isSuccess, setMyPaymentsData)

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
