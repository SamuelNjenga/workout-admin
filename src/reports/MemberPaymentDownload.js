import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import MemberPaymentsReport from './MemberPaymentsReport'

const MemberPaymentDownload = () => {
  const componentRef = useRef()
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <MemberPaymentsReport ref={componentRef} />
    </div>
  )
}

export default MemberPaymentDownload
