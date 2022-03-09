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
  CDataTable,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import {
  getTotalAmount,
  getFilteredTrainingSessions,
  getAssignedTrainingSessions
} from 'src/services/APIUtils'

const TrainingSessionsReport = React.forwardRef((props, ref) => {
  const history = useHistory()
  const fname = localStorage.getItem('fname')
  const lname = localStorage.getItem('lname')
  const email = localStorage.getItem('email')
  const userId = localStorage.getItem('userId')
  const roleId = localStorage.getItem('roleId')

  const [filteredSessions, setFilteredSessions] = useState([])
  const [assignedSessions, setAssignedSessions] = useState([])
  const [totalSessions, setTotalSessions] = useState(0)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [startTime, onChangeStartTime] = useState(new Date())
  const [endTime, onChangeEndTime] = useState(new Date())
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
      const response = await getFilteredTrainingSessions({ startTime, endTime })
      setFilteredSessions(response.data.updatedSessions.trainingSessions)
      // setTotalPayments(response.data.updatedTotals.payments)
      setTotalSessions(response.data.updatedSessions.totalSessions)
      setPage(response?.data?.updatedSessions.currentPage)
      //setSubmitting(false)
      //notify()
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  const handleSubmitThree = async event => {
    event.preventDefault()
    //setSubmitting(true)
    // const search1 = { ...search }
    try {
      const response = await getAssignedTrainingSessions({
        userId,
        startTime,
        endTime
      })
      setAssignedSessions(response.data.updatedSessions.trainingSessions)
      // setTotalPayments(response.data.updatedTotals.payments)
      setTotalSessions(response.data.updatedSessions.totalSessions)
      setPage(response?.data?.updatedSessions.currentPage)
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
            <h3>Training Sessions Report</h3>
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
                <div className='text-muted'>Contact Great Body Gym Limited via</div>
                <strong>Our number 0712456789</strong>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
        <CRow>
          <CCol>
        {roleId === '1' && (
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
                          onChange={onChangeStartTime}
                          value={startTime}
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
                          onChange={onChangeEndTime}
                          value={endTime}
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
                  items={filteredSessions}
                  fields={[
                    { key: 'id', _classes: 'font-weight-bold' },
                    { key: 'serviceId', label: 'Service Id' },
                    { key: 'maxMembers', label: 'Max Members' },
                    { key: 'startTime', label: 'Start Time' },
                    { key: 'endTime', label: 'End Time' },
                    { key: 'trainerId', label: 'Trainer Id' },
                    { key: 'roomId', label: 'Room Id' },
                    { key: 'state', label: 'State' }
                  ]}
                  hover
                  striped
                  sorter
                  itemsPerPage={5}
                  activePage={page}
                  pagination
                  scopedSlots={{
                    state: item => (
                      <td>
                        <CBadge color={'primary'}>{item.state}</CBadge>
                      </td>
                    ),
                    startTime: item => (
                      <td>
                        <CBadge color={'primary'}>
                          {moment(item.startTime).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </CBadge>
                      </td>
                    ),
                    endTime: item => (
                      <td>
                        <CBadge color={'primary'}>
                          {moment(item.endTime).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </CBadge>
                      </td>
                    )
                  }}
                />
                <br />

                <div className='clearfix'>
                  <div className='float-left'>
                    <strong>
                      The total sessions registered between{' '}
                      {moment(startTime).format('MMMM Do YYYY, h:mm:ss a')} and{' '}
                      {moment(endTime).format('MMMM Do YYYY, h:mm:ss a')} is{' '}
                      {/* {Math.ceil(sessionsNumber / totalRooms)} */}
                    </strong>
                    <strong>{totalSessions} trainingSessions(s)</strong>
                  </div>
                </div>
              </CCardBody>
            </CCard>
        )}
        {roleId === '2' && (
          <>
            <form onSubmit={handleSubmitThree}>
            <>
                    <div>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                          id='fromTime'
                          name='fromTime'
                          label='From Time'
                          onChange={onChangeStartTime}
                          value={startTime}
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
                          onChange={onChangeEndTime}
                          value={endTime}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </>
              <CModalFooter>
                <CButton color='primary' type='submit'>
                  View my assigned sessions
                </CButton>
              </CModalFooter>
            </form>
            <CDataTable
              items={assignedSessions}
              fields={[
                { key: 'id', _classes: 'font-weight-bold' },
                { key: 'serviceId', label: 'Service Id' },
                { key: 'maxMembers', label: 'Max Members' },
                { key: 'startTime', label: 'Start Time' },
                { key: 'endTime', label: 'End Time' },
                { key: 'roomId', label: 'Room Id' },
                { key: 'state', label: 'State' }
              ]}
              hover
              striped
              sorter
              itemsPerPage={5}
              activePage={page}
              pagination
              scopedSlots={{
                state: item => (
                  <td>
                    <CBadge color={'primary'}>{item.state}</CBadge>
                  </td>
                ),
                startTime: item => (
                  <td>
                    <CBadge color={'primary'}>
                      {moment(item.startTime).format('MMMM Do YYYY, h:mm:ss a')}
                    </CBadge>
                  </td>
                ),
                endTime: item => (
                  <td>
                    <CBadge color={'primary'}>
                      {moment(item.endTime).format('MMMM Do YYYY, h:mm:ss a')}
                    </CBadge>
                  </td>
                )
              }}
            />
            </>
            )}
          </CCol>
        </CRow>
      </div>
    </>
  )
})

export default TrainingSessionsReport
