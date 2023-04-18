import { useState } from 'react'

import { DateCalendar } from '@/ui'

const Test = () => {
  const [state, setState] = useState<Date | null>(new Date())

  return (
    <></>
    // <div>
    //   <DateCalendar
    //     startDate={state}
    //     setStartDate={setState}
    //     endDate={null}
    //     setEndDate={() => null}
    //   />
    // </div>
  )
}

export default Test
