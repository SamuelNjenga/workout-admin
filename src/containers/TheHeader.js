import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { getMemberDetails } from 'src/services/APIUtils'

const TheHeader = () => {
  const [modalOne, setModalOne] = useState(false)
  const [memberId, setMemberId] = useState('')
  const [memberDetails, setMemberDetails] = useState({})
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

  const toggleOne = () => {
    setModalOne(!modalOne)
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
                    Phone Number <strong>{memberDetails.User.phoneNumber}</strong>
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
    </>
  )
}

export default TheHeader
