import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CModalFooter,
  CDataTable
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import {
  getTotalAmount,
  getFilteredMemberPayments
} from 'src/services/APIUtils'
import MemberPaymentDownload from './MemberPaymentDownload'

const MemberPaymentsReport = React.forwardRef((props, ref) => {
  const fname = localStorage.getItem('fname')
  const lname = localStorage.getItem('lname')
  const email = localStorage.getItem('email')

  const history = useHistory()
  const [filteredPayments, setFilteredPayments] = useState([])
  const [totalPayments, setTotalPayments] = useState([])
  const [totalCash, setTotalCash] = useState(0)
  const [totalMembers, setTotalMembers] = useState(0)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [fromTime, onChangeFromTime] = useState(new Date())
  const [toTime, onChangeToTime] = useState(new Date())
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

  const pageChange = newPage => {
    currentPage !== newPage &&
      history.push(`/memberPaymentsReport?page=${newPage}`)
  }

  const getTotal = async () => {
    try {
      const res = await getTotalAmount()
      setTotal(res?.data[0]?.total_amount)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTotal()
  }, [])

  const handleSubmitTwo = async event => {
    event.preventDefault()
    //setSubmitting(true)
    // const search1 = { ...search }
    try {
      const response = await getFilteredMemberPayments({ fromTime, toTime })
      setFilteredPayments(response.data.updatedPayments.payments)
      setTotalPayments(response.data.updatedTotals.payments)
      setTotalMembers(response.data.updatedTotals.payments.length)
      setPage(response?.data?.updatedPayments.currentPage)
      setTotalCash(response?.data?.totalAmount[0].total_amount)
      //setSubmitting(false)
      //notify()
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  return (
    <>
    <div ref={ref}>
      <CCard>
        <CCardBody>
          <h3 ref={ref}>Member Payment Details Report</h3>
          <CRow>
            <CCol sm='5'>
              <h4 id='traffic' className='card-title mb-0'>
                Great Body Gym Limited
              </h4>
            </CCol>
            <CCol sm='7' className='d-none d-md-block'>
              <CButton color='primary' className='float-right'>
                <CIcon name='cil-cloud-download' />
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow className='text-center'>
            <CCol md sm='12' className='mb-sm-2 mb-0'>
              <div className='text-muted'>Prepared By </div>
              <strong>
                {fname} {lname}
              </strong>
              <div className='text-muted'>Email Address </div>
              <strong>{email}</strong>
            </CCol>
            <CCol md sm='12' className='mb-sm-2 mb-0'>
              <div className='text-muted'>Generated on </div>
              <strong>
                {moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
              </strong>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmitTwo}>
                <>
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        id='fromTime'
                        name='fromTime'
                        label='From Time'
                        onChange={onChangeFromTime}
                        value={fromTime}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <br />
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        id='toTime'
                        name='toTime'
                        label='To Time'
                        onChange={onChangeToTime}
                        value={toTime}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </>
                <CModalFooter>
                  <CButton color='primary' type='submit'>
                    Search
                  </CButton>
                </CModalFooter>
              </form>
              <br />
              <CDataTable
                items={filteredPayments}
                fields={[
                  { key: 'id', _classes: 'font-weight-bold' },
                  'amount',
                  { key: 'memberId', label: 'Member Id' }
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={page}
                pagination
                scopedSlots={{
                  MemberRegistration: item => (
                    <td>
                      <CProgress
                        className='progress-xs'
                        color='danger'
                        value={(item.amount / 15000) * 100}
                      />
                    </td>
                  ),
                  amount: item => (
                    <td>
                      <CProgress
                        className='progress-xs'
                        color='danger'
                        value={(item.amount / 15000) * 100}
                      />{' '}
                      {item.amount}
                    </td>
                  )
                }}
              />
              <br />
              {totalPayments.map(item => (
                <>
                  <h6>
                    {' '}
                    Total amount paid by member id {item.memberId} between{' '}
                    {moment(fromTime).format('MMMM Do YYYY, h:mm:ss a')} and{' '}
                    {moment(toTime).format('MMMM Do YYYY, h:mm:ss a')} is:
                  </h6>
                  <table className='table table-hover table-outline mb-0 d-none d-sm-table'>
                    <thead className='thead-light'>
                      <tr>
                        <th>Member Id </th>
                        <th>Amount </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className='clearfix'>
                            <div className='float-left'>
                              <strong>{item.memberId}</strong>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className='clearfix'>
                            <div className='float-right'>
                              <small className='text-muted'>
                                {item.total_amount}
                              </small>
                            </div>
                          </div>
                          <CProgress
                            className='progress-xs'
                            color='danger'
                            value={(item.total_amount / totalCash) * 100}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ))}
              <div className='clearfix'>
                <div className='float-left'>
                  <strong>
                    The total amount collected between{' '}
                    {moment(fromTime).format('MMMM Do YYYY, h:mm:ss a')} and{' '}
                    {moment(toTime).format('MMMM Do YYYY, h:mm:ss a')} is KSH{' '}
                    {totalCash}
                    {/* {Math.ceil(sessionsNumber / totalRooms)} */}
                  </strong>
                  <strong>
                    {' '}
                    For {totalMembers} member(s) whose average is KSH{' '}
                    {totalCash / totalMembers}
                  </strong>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      </div>
    </>
  )
})

export default MemberPaymentsReport
