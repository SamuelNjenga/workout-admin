import React, { useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import toast, { Toaster } from 'react-hot-toast'

import { postAdminLogin } from 'src/services/APIUtils'
import { useLogin } from 'src/contexts/LoginContext'
//import { useLogin } from '../../contexts/LoginContext'

const notify = () =>
  toast.success('Admin has logged in successfully.', {
    duration: 4000
  })

const errorNotification = error => toast.error(`${error}`)
const Login = () => {
  const history = useHistory()
  const { setAuthentication } = useLogin()
  // useEffect(() => {
  //   setAuthentication(false)
  //   localStorage.removeItem('admintoken')
  // }, [setAuthentication])

  const [item, setItem] = useState({
    email: '',
    password: ''
  })

  const handleChange = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setItem({ ...item, [event.target.name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    //setSubmitting(true)
    const item1 = { ...item }
    try {
      const response = await postAdminLogin(item1)
      if (response.status === 200) {
        notify()
        setAuthentication(true)
        history.push('/home')
        localStorage.setItem('admintoken', response.data.accessToken)
        localStorage.setItem('fname', response.data.data.firstName)
        localStorage.setItem('lname', response.data.data.lastName)
        localStorage.setItem('roleId', response.data.data.roleId)
        localStorage.setItem('email', response.data.data.email)
        localStorage.setItem('userId', response.data.data.id)

        //setSubmitting(false)
      }
    } catch (err) {
      errorNotification(err.response.data.message)
      //setSubmitting(false)
    }
  }

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='6'>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  <Toaster />
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className='text-muted'>Sign In to your account</p>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='text'
                        placeholder='Enter your email'
                        autoComplete='email'
                        onChange={handleChange}
                        value={item.email}
                        name='email'
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-4'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-lock-locked' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='password'
                        placeholder='Enter your password'
                        autoComplete='current-password'
                        onChange={handleChange}
                        value={item.password}
                        name='password'
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs='6'>
                        <CButton color='primary' className='px-4' type='submit'>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs='6' className='text-right'>
                        <CButton color='link' className='px-0'>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard
                className='text-white bg-primary py-5 d-md-down-none'
                style={{ width: '44%' }}
              >
                <CCardBody className='text-center'>
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to='/register'>
                      <CButton
                        color='primary'
                        className='mt-3'
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
