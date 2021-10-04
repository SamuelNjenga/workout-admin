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

import { useTrainingSessions } from '../../contexts/TrainingSessionContext'
import {
  endSession,
  postponeSession,
  cancelSession
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

const TrainingSessions = () => {
  const history = useHistory()
  const [modalOne, setModalOne] = useState(false)
  const [modalTwo, setModalTwo] = useState(false)
  const [modalThree, setModalThree] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [sessionThreeId, setSessionThreeId] = useState('')
  const [item, setItem] = useState({
    sessionId: '',
    startTime: '',
    endTime: ''
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
      //notify()
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
      await postponeSession(item1)
      //setSubmitting(false)
      //notify()
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
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
      //notify()
    } catch (err) {
      console.log(err)
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
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
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
                { key: 'trainerId', label: 'Trainer Id' }
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/users/${item.id}`)}
              scopedSlots={{
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
                Cancel
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
              <CLabel htmlFor='startTime'>Time to start</CLabel>
              <CInput
                id='startTime'
                placeholder='Enter the new start time'
                required
                name='startTime'
                onChange={handleChangeTwo}
                value={item.startTime}
              />
              <CLabel htmlFor='startTime'>Time to end</CLabel>
              <CInput
                id='endTime'
                placeholder='Enter the new end time'
                required
                name='endTime'
                onChange={handleChangeTwo}
                value={item.endTime}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color='primary' type='submit'>
                Confirm
              </CButton>{' '}
              <CButton color='secondary' onClick={toggleTwo}>
                Cancel
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
                Cancel
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default TrainingSessions
