import { CButton } from '@coreui/react'
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import RoomBReport from './RoomBReport'
const RoomsDownload = () => {
  const componentRef = useRef()
  return (
    <div>
      <ReactToPrint
        trigger={() => <CButton>Print this out!</CButton>}
        content={() => componentRef.current}
      />
      <RoomBReport ref={componentRef} />
    </div>
  )
}

export default RoomsDownload
