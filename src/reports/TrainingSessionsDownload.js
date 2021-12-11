import { CButton } from '@coreui/react'
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import TrainingSessionsReport from './TrainingSessionsReport'

const TrainingSessionsDownload = () => {
  const componentRef = useRef()
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <TrainingSessionsReport ref={componentRef} />
    </div>
  )
}

export default TrainingSessionsDownload
