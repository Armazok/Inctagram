import { useState } from 'react'

import DatePicker from '../../ui/date-picker/DatePicker'

const Test = () => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <div>
      <DatePicker
        endDate={null}
        setEndDate={() => null}
        setStartDate={() => setStartDate}
        startDate={startDate}
        // error={true}
        // errorMessage={'asdfasd'}
        disabled={true}
      />
    </div>
  )
}

export default Test
