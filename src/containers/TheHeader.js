import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CButton,
  CInput,
  CModalFooter,
  CModal,
  CModalHeader,
  CModalBody,
  CLabel,
  CCol,
  CCard,
  CRow,
  CContainer,
  CCardHeader,
  CCardBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { TheHeaderDropdown, TheHeaderDropdownNotif } from './index'
import {
  getMemberDetails,
  getTrainingSessionDetails
} from 'src/services/APIUtils'
import MemberPaymentDownload from 'src/reports/MemberPaymentDownload'
import RoomsDownload from 'src/reports/RoomsDownload'
import TrainingSessionsDownload from 'src/reports/TrainingSessionsDownload'

const TheHeader = () => {
  const roleId = localStorage.getItem('roleId')
  const [modalOne, setModalOne] = useState(false)
  const [modalTwo, setModalTwo] = useState(false)
  const [modalThree, setModalThree] = useState(false)
  const [modalFour, setModalFour] = useState(false)
  const [modalFive, setModalFive] = useState(false)
  const [modalSix, setModalSix] = useState(false)

  const [memberId, setMemberId] = useState('')
  const [memberDetails, setMemberDetails] = useState({})
  const [sessionId, setSessionId] = useState('')
  const [trainingSessionDetails, setTrainingSessionDetails] = useState({})
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const handleChange = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setMemberId(value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    //setSubmitting(true)
    try {
      const response = await getMemberDetails({ memberId })
      setMemberDetails(response.data)
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  const handleChangeTwo = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setSessionId(value)
  }

  const handleSubmitTwo = async event => {
    event.preventDefault()
    //setSubmitting(true)
    try {
      const response = await getTrainingSessionDetails({ sessionId })
      setTrainingSessionDetails(response.data)
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

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

  const toggleFive = () => {
    setModalFive(!modalFive)
  }

  const toggleSix = () => {
    setModalSix(!modalSix)
  }

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow)
      ? false
      : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow)
      ? true
      : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const isEmpty = obj => {
    if (obj === undefined) return true
    if (obj === null) return true
    return Object.keys(obj).length === 0
  }

  return (
    <>
      <CHeader withSubheader>
        <CToggler
          inHeader
          className='ml-md-3 d-lg-none'
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className='ml-3 d-md-down-none'
          onClick={toggleSidebar}
        />
        <CHeaderBrand className='mx-auto d-lg-none' to='/'>
          <CIcon name='logo' height='48' alt='Logo' />
        </CHeaderBrand>

        <CHeaderNav className='d-md-down-none mr-auto'>
          {roleId === '1' && (
            <>
              <CHeaderNavItem className='px-3'>
                <CHeaderNavLink to='/dashboard'>Dashboard</CHeaderNavLink>
              </CHeaderNavItem>
              <CHeaderNavItem className='px-3'>
                <CHeaderNavLink to='/users'>Users</CHeaderNavLink>
              </CHeaderNavItem>
              <CHeaderNavItem className='px-3'>
                <CButton onClick={toggleOne} className='mr-1'>
                  View Member Details
                </CButton>
              </CHeaderNavItem>
            </>
          )}

          {roleId === '2' && (
            <>
              <CHeaderNavItem className='px-3'>
                <CButton onClick={toggleTwo} className='mr-1'>
                  View Training Session Details
                </CButton>
              </CHeaderNavItem>
            </>
          )}
          <CHeaderNavItem className='px-3'>
            <CButton onClick={toggleThree} className='mr-1'>
              Open print
            </CButton>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className='px-3'>
          <TheHeaderDropdownNotif />
          <TheHeaderDropdown />
        </CHeaderNav>

        <CSubheader className='px-3 justify-content-between'>
          <CBreadcrumbRouter
            className='border-0 c-subheader-nav m-0 px-0 px-md-3'
            routes={routes}
          />
          {roleId === '1' && (
            <div className='d-md-down-none mfe-2 c-subheader-nav'>
              <CLink
                className='c-subheader-nav-link'
                aria-current='page'
                to='/dashboard'
              >
                <CIcon name='cil-graph' alt='Dashboard' />
                &nbsp;Dashboard
              </CLink>
            </div>
          )}
          {/* <MemberPaymentDownload /> */}
        </CSubheader>
      </CHeader>
      <CModal show={modalOne} onClose={toggleOne}>
        <CModalHeader closeButton>Cancel the session</CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody>
            <CLabel htmlFor='memberId'>Member ID</CLabel>
            <CInput
              id='memberId'
              placeholder='Enter the member ID'
              required
              onChange={handleChange}
              value={memberId}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color='primary' type='submit'>
              Search
            </CButton>{' '}
            <CButton color='secondary' onClick={toggleOne}>
              Close
            </CButton>
          </CModalFooter>
        </form>

        {!isEmpty(memberDetails) && (
          <CContainer fluid>
            <CRow>
              <CCol sm='6'>
                <CCard>
                  <CCardHeader>
                    First Name <strong>{memberDetails.User.firstName}</strong>
                  </CCardHeader>
                  <CCardHeader>
                    Last Name <strong>{memberDetails.User.lastName}</strong>
                  </CCardHeader>
                  <CCardBody>
                    Email <strong>{memberDetails.User.email}</strong>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm='6'>
                <CCard>
                  <CCardHeader>
                    Phone Number{' '}
                    <strong>{memberDetails.User.phoneNumber}</strong>
                  </CCardHeader>
                  <CCardHeader>
                    Gender <strong>{memberDetails.User.gender}</strong>
                  </CCardHeader>
                  {/* <CCardBody>
                    Password <strong>{memberDetails.User.password}</strong>
                  </CCardBody> */}
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        )}
      </CModal>
      <CModal show={modalTwo} onClose={toggleTwo}>
        <CModalHeader closeButton>Cancel the session</CModalHeader>
        <form onSubmit={handleSubmitTwo}>
          <CModalBody>
            <CLabel htmlFor='sessionId'>Session ID</CLabel>
            <CInput
              id='sessionId'
              placeholder='Enter the training session ID'
              required
              onChange={handleChangeTwo}
              value={sessionId}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color='primary' type='submit'>
              Search
            </CButton>{' '}
            <CButton color='secondary' onClick={toggleTwo}>
              Close
            </CButton>
          </CModalFooter>
        </form>

        {!isEmpty(trainingSessionDetails) && (
          <CContainer fluid>
            <CRow>
              <CCol sm='6'>
                <CCard>
                  <CCardHeader>
                    Service Name{' '}
                    <strong>{trainingSessionDetails.ServiceType.name}</strong>
                  </CCardHeader>
                  <CCardHeader>
                    Start Time{' '}
                    <strong>
                      {moment(trainingSessionDetails.startTime).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </strong>
                  </CCardHeader>
                  <CCardBody>
                    End Time{' '}
                    <strong>
                      {moment(trainingSessionDetails.endTime).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </strong>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm='6'>
                <CCard>
                  <CCardHeader>
                    Room ID <strong>{trainingSessionDetails.roomId}</strong>
                  </CCardHeader>
                  <CCardHeader>
                    Trainer ID{' '}
                    <strong>{trainingSessionDetails.trainerId}</strong>
                  </CCardHeader>
                  <CCardBody>
                    Members so far{' '}
                    <strong>{trainingSessionDetails.membersSoFar}</strong>
                  </CCardBody>
                  <CCardBody>
                    Max No of Members{' '}
                    <strong>{trainingSessionDetails.maxMembers}</strong>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        )}
      </CModal>
      <CModal show={modalThree} onClose={toggleThree}>
        <CModalHeader closeButton>Close</CModalHeader>
        <CModalBody>
        {roleId === '1' && (
          <CButton onClick={toggleFour}>Print Member Payments Records</CButton>
        )}
          <CButton onClick={toggleFive}>Print Rooms Reports Records</CButton>
          <CButton onClick={toggleSix}>Print Training Sessions Records</CButton>
        </CModalBody>
      </CModal>
      <CModal show={modalFour} onClose={toggleFour}>
        <CModalHeader closeButton>Close</CModalHeader>
        <CModalBody>
          <MemberPaymentDownload />
        </CModalBody>
      </CModal>
      <CModal show={modalFive} onClose={toggleFive}>
        <CModalHeader closeButton>Close</CModalHeader>
        <CModalBody>
          <RoomsDownload />
        </CModalBody>
      </CModal>
      <CModal show={modalSix} onClose={toggleSix}>
        <CModalHeader closeButton>Close</CModalHeader>
        <CModalBody>
          <TrainingSessionsDownload />
        </CModalBody>
      </CModal>
    </>
  )
}

export default TheHeader
