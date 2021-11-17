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

import { useRegistrations } from '../../contexts/RegistrationContext'
import {
  activateUser,
  diactivateUser,
  postMemberRegistration
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

const Registrations = () => {
  const history = useHistory()
  const { registrations, isLoading, count, page, setPage } = useRegistrations()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  //const [page, setPage] = useState(currentPage)
  const [modalOne, setModalOne] = useState(false)
  const [modalTwo, setModalTwo] = useState(false)
  const [modalThree, setModalThree] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [sessionThreeId, setSessionThreeId] = useState('')
  const [userId, setUserId] = useState('')

  const toggleOne = () => {
    setModalOne(!modalOne)
  }
  const toggleTwo = () => {
    setModalTwo(!modalTwo)
  }
  const toggleUser = () => {
    setModalThree(!modalThree)
  }

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/rooms?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const handleUserChange = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setUserId(value)
  }

  const handleUserSubmit = async event => {
    event.preventDefault()
    //setSubmitting(true)
    try {
      await postMemberRegistration({ userId: userId })
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
      await diactivateUser({ memberId: sessionThreeId })
      //setSubmitting(false)
      //notify()
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
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
      await activateUser({ memberId: sessionId })
      //setSubmitting(false)
      //notify()
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>Registration List</CCardHeader>
          <CCardBody>
            <CDataTable
              items={registrations}
              fields={[
                {
                  key: 'id',
                  _classes: 'font-weight-bold',
                  label: 'Registration ID'
                },
                { key: 'userId', label: 'User Id' },
                { key: 'status', label: 'Member Status' }
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/registrations/${item.id}`)}
              scopedSlots={{
                status: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
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
        <CButton onClick={toggleUser} className='mr-1'>
          Register User
        </CButton>
        <CButton onClick={toggleOne} className='mr-1'>
          Activate Member
        </CButton>
        <CButton onClick={toggleTwo} className='mr-1'>
          Diactivate Member
        </CButton>
        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Activate the member</CModalHeader>
          <form onSubmit={handleSubmit}>
            <CModalBody>
              <CLabel htmlFor='memberId'>Member ID</CLabel>
              <CInput
                id='memberId'
                placeholder='Enter the member ID'
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
          <CModalHeader closeButton>Diactivate the member</CModalHeader>
          <form onSubmit={handleSubmitThree}>
            <CModalBody>
              <CLabel htmlFor='memberId'>Member ID</CLabel>
              <CInput
                id='memberId'
                placeholder='Enter the member ID'
                required
                onChange={handleChangeThree}
                value={sessionThreeId}
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
        <CModal show={modalThree} onClose={toggleUser}>
          <CModalHeader closeButton>Register the member</CModalHeader>
          <form onSubmit={handleUserSubmit}>
            <CModalBody>
              <CLabel htmlFor='userId'>User ID</CLabel>
              <CInput
                id='userId'
                placeholder='Enter the user ID'
                required
                onChange={handleUserChange}
                value={userId}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color='primary' type='submit'>
                Confirm
              </CButton>{' '}
              <CButton color='secondary' onClick={toggleUser}>
                Cancel
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default Registrations
