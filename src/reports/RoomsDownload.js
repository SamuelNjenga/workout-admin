import { CButton } from '@coreui/react'
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import RoomsReport from './RoomsReport'
const RoomsDownload = () => {
  const componentRef = useRef()
  return (
    <div>
      <ReactToPrint
        trigger={() => <CButton>Print this out!</CButton>}
        content={() => componentRef.current}
      />
      <RoomsReport ref={componentRef} />
    </div>
  )
}

export default RoomsDownload
