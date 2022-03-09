import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CButton,
  CModal,
  CModalHeader,
  CLabel,
  CInput,
  CModalBody,
  CModalFooter,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { useTrainingSessions } from '../../contexts/TrainingSessionContext'
import {
  endSession,
  postponeSession,
  cancelSession,
  postSession
} from 'src/services/APIUtils'

const getBadge = status => {
  switch (status) {
    case status <= new Date():
      return 'success'
    case '1':
      return 'secondary'
    case '13':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

const getStatus = status => {
  if (status < new Date()) {
    console.log('Status A', status)
    return 'inactive'
  } else if (status >= new Date()) {
    console.log('Status B', status)
    return 'active'
  } else {
    console.log('Status C', status)
    return 'being processed'
  }
}

const notify = error => toast.error(`${error}`)
const successNotification = () =>
  toast.success('Session registered successfully.')
const cancelNotification = sessionId =>
  toast.success(`Session ${sessionId} has been cancelled successfully.`)
const endNotification = sessionId =>
  toast.success(`Session ${sessionId} has been ended successfully.`)
const postponeNotification = sessionId =>
  toast.success(`Session ${sessionId} has been postponed successfully.`)

const TrainingSessions = () => {
  const history = useHistory()
  const [fromATime, onChangeFromATime] = useState(new Date())
  const [toATime, onChangeToATime] = useState(new Date())
  const [fromBTime, onChangeFromBTime] = useState(new Date())
  const [toBTime, onChangeToBTime] = useState(new Date())

  const [modalOne, setModalOne] = useState(false)
  const [modalTwo, setModalTwo] = useState(false)
  const [modalThree, setModalThree] = useState(false)
  const [modalFour, setModalFour] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [sessionThreeId, setSessionThreeId] = useState('')

  const [errOne, setErrorOne] = useState('')

  const [item, setItem] = useState({
    sessionId: '',
    startTime: '',
    trainerId: ''
  })

  const [session, setSession] = useState({
    serviceId: '',
    maxMembers: '',
    startTime: '',
    endTime: '',
    roomId: '',
    trainerId: '',
    image: ''
  })

  const toggleOne = () => {
    setModalOne(!modalOne)
  }
  const toggleTwo = () => {
    setModalTwo(!modalTwo)
  }

  const toggleThree = () => {
    setModalThree(!modalThree)
  }
  const toggleFour = () => {
    setModalFour(!modalFour)
  }

  const handleChange = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setSessionId(value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    //setSubmitting(true)
    try {
      await cancelSession({ sessionId })
      //setSubmitting(false)
      cancelNotification(sessionId)
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  const handleChangeTwo = event => {
    const target = event.target
    const value = target.value
    setItem({ ...item, [event.target.name]: value })
  }

  const handleSubmitTwo = async event => {
    event.preventDefault()
    //setSubmitting(true)
    const item1 = { ...item }
    try {
      await postponeSession({
        sessionId: item.sessionId,
        startTime: fromATime,
        endTime: toATime,
        roomId: item.roomId,
        trainerId: item.trainerId
      })
      //setSubmitting(false)
      postponeNotification(item1.sessionId)
    } catch (err) {
      notify(err.response.data.message)
    }
  }

  const handleChangeThree = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setSessionThreeId(value)
  }

  const handleSubmitThree = async event => {
    event.preventDefault()
    //setSubmitting(true)
    try {
      await endSession({ sessionId: sessionThreeId })
      //setSubmitting(false)
      endNotification(sessionThreeId)
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  const handleChangeFour = event => {
    const target = event.target
    const value = target.value
    setSession({ ...session, [event.target.name]: value })
  }
  const handleSubmitFour = async event => {
    event.preventDefault()
    //setSubmitting(true)
    // const session1 = { ...session }
    try {
      await postSession({
        serviceId: session.serviceId,
        maxMembers: session.maxMembers,
        startTime: fromBTime,
        endTime: toBTime,
        roomId: session.roomId,
        trainerId: session.trainerId,
        image: session.image
      })
      //setSubmitting(false)
      successNotification()
    } catch (err) {
      notify(err.response.data.message)
      //setSubmitting(false)
    }
  }

  const {
    trainingSessions,
    isLoading,
    count,
    page,
    setPage
  } = useTrainingSessions()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  //const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/trainingSessions?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <Toaster />
          <CCardHeader>Training Sessions</CCardHeader>
          <CCardBody>
            <CDataTable
              items={trainingSessions}
              fields={[
                {
                  key: 'id',
                  _classes: 'font-weight-bold',
                  label: 'Session ID'
                },
                { key: 'serviceId', label: 'Service Type Id' },
                { key: 'active', label: 'Active' },
                { key: 'maxMembers', label: 'Max No' },
                { key: 'membersSoFar', label: 'Members So Far' },
                { key: 'startTime', label: 'Start Time' },
                { key: 'endTime', label: 'End Time' },
                { key: 'roomId', label: 'Room Id' },
                { key: 'state', label: 'Status' },
                { key: 'trainerId', label: 'Trainer Id' }
              ]}
              hover
              striped
              sorter
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/trainingSessions/${item.id}`)}
              scopedSlots={{
                state: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.state}</CBadge>
                  </td>
                ),
                startTime: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {moment(item.startTime).format('MMMM Do YYYY, h:mm:ss a')}
                    </CBadge>
                  </td>
                ),
                endTime: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {moment(item.endTime).format('MMMM Do YYYY, h:mm:ss a')}
                    </CBadge>
                  </td>
                )
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align='center'
            />
          </CCardBody>
        </CCard>
        <CButton onClick={toggleFour} className='mr-1'>
          Register Session
        </CButton>
        <CButton onClick={toggleOne} className='mr-1'>
          Cancel Session
        </CButton>
        <CButton onClick={toggleTwo} className='mr-1'>
          Postpone Session
        </CButton>
        <CButton onClick={toggleThree} className='mr-1'>
          End Session
        </CButton>

        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Cancel the session</CModalHeader>
          <form onSubmit={handleSubmit}>
            <CModalBody>
              <CLabel htmlFor='sessionId'>Session ID</CLabel>
              <CInput
                id='sessionId'
                placeholder='Enter the session ID'
                required
                onChange={handleChange}
                value={sessionId}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color='primary' type='submit'>
                Confirm
              </CButton>{' '}
              <CButton color='secondary' onClick={toggleOne}>
                Close
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
        <CModal show={modalTwo} onClose={toggleTwo}>
          <CModalHeader closeButton>Postpone the session</CModalHeader>
          <form onSubmit={handleSubmitTwo}>
            <CModalBody>
              <CLabel htmlFor='sessionId'>Session ID</CLabel>
              <CInput
                id='sessionId'
                placeholder='Enter the session ID'
                required
                name='sessionId'
                onChange={handleChangeTwo}
                value={item.sessionId}
              />
              <br />
              <CLabel htmlFor='fromTime'>From</CLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  id='fromTime'
                  name='fromTime'
                  // label="From Time"
                  onChange={onChangeFromATime}
                  value={fromATime}
                />
                <CLabel htmlFor='toTime'>To </CLabel>
                <DateTimePicker
                  id='toTime'
                  name='toTime'
                  // label="To Time"
                  onChange={onChangeToATime}
                  value={toATime}
                />
              </MuiPickersUtilsProvider>
              <br />
              <br />
              <CLabel htmlFor='sessionId'>Room ID</CLabel>
              <CInput
                id='roomId'
                placeholder='Enter the room ID'
                required
                name='roomId'
                onChange={handleChangeTwo}
                value={item.roomId}
              />
              <CLabel htmlFor='trainerId'>Trainer ID</CLabel>
              <CInput
                id='trainerId'
                placeholder='Enter the trainer ID'
                required
                name='trainerId'
                onChange={handleChangeTwo}
                value={item.trainerId}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color='primary' type='submit'>
                Confirm
              </CButton>{' '}
              <CButton color='secondary' onClick={toggleTwo}>
                Close
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
        <CModal show={modalThree} onClose={toggleThree}>
          <CModalHeader closeButton>End the session</CModalHeader>
          <form onSubmit={handleSubmitThree}>
            <CModalBody>
              <CLabel htmlFor='sessionId'>Session ID</CLabel>
              <CInput
                id='sessionId'
                placeholder='Enter the session ID'
                required
                onChange={handleChangeThree}
                value={sessionThreeId}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color='primary' type='submit'>
                Confirm
              </CButton>{' '}
              <CButton color='secondary' onClick={toggleThree}>
                Close
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
        <CModal show={modalFour} onClose={toggleFour}>
          <CModalHeader closeButton>Register the session</CModalHeader>
          <form onSubmit={handleSubmitFour}>
            <CModalBody>
              <CLabel htmlFor='sessionId'>Service ID</CLabel>
              <CInput
                id='serviceId'
                placeholder='Enter the service ID'
                required
                name='serviceId'
                onChange={handleChangeFour}
                value={session.serviceId}
              />
              <CLabel htmlFor='maxMembers'>Max Members</CLabel>
              <CInput
                id='maxMembers'
                placeholder='Enter the max members'
                required
                name='maxMembers'
                onChange={handleChangeFour}
                value={session.maxMembers}
              />
              <br />
              <CLabel htmlFor='fromTime'>From</CLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  id='fromTime'
                  name='fromTime'
                  // label="From Time"
                  onChange={onChangeFromBTime}
                  value={fromBTime}
                />
                <CLabel htmlFor='toTime'>To </CLabel>
                <DateTimePicker
                  id='toTime'
                  name='toTime'
                  // label="To Time"
                  onChange={onChangeToBTime}
                  value={toBTime}
                />
              </MuiPickersUtilsProvider>
              <br />
              <br />
              <CLabel htmlFor='trainerId'>Trainer ID</CLabel>
              <CInput
                id='trainerId'
                placeholder='Enter the trainer ID'
                required
                name='trainerId'
                onChange={handleChangeFour}
                value={session.trainerId}
              />
              <CLabel htmlFor='sessionId'>Room ID</CLabel>
              <CInput
                id='roomId'
                placeholder='Enter the room ID'
                required
                name='roomId'
                onChange={handleChangeFour}
                value={session.roomId}
              />
              <CLabel htmlFor='sessionId'>Image</CLabel>
              <CInput
                id='image'
                placeholder='Enter the session image'
                required
                name='image'
                onChange={handleChangeFour}
                value={session.image}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color='primary' type='submit'>
                Confirm
              </CButton>{' '}
              <CButton color='secondary' onClick={toggleFour}>
                Close
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default TrainingSessions
