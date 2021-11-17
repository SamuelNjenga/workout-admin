import React, { useState } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import toast, { Toaster } from 'react-hot-toast'

import { usePayments } from '../../contexts/PaymentContext'
import { updatePaymentData } from 'src/services/APIUtils'

const updateNotification = () =>
  toast.success('Payment Details updated successfully.')

const MemberPayment = ({ match }) => {
  const { payments } = usePayments()

  const handleChange = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setItem({ ...item, [event.target.name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const item1 = { ...item }
    //setSubmitting(true)
    try {
      await updatePaymentData(match.params.id, item1)
      //await postContact({ ...item })
      //setSubmitting(false)
      updateNotification()
      console.log('Hitted', item1)
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  const payment = payments.find(room => room.id.toString() === match.params.id)

  const [item, setItem] = useState(payment)
  const paymentDetails = payment
    ? Object.entries(payment)
    : [
        [
          'id',
          <span>
            <CIcon className='text-muted' name='cui-icon-ban' /> Not found
          </span>
        ]
      ]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <Toaster />
          <CCardHeader>Payment id: {match.params.id}</CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit}>
              <table className='table table-striped table-hover'>
                <tbody>
                  {paymentDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${key}:`}</td>
                        <td>
                          <input
                            defaultValue={value}
                            name={key}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <button type='submit'>Edit</button>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MemberPayment
