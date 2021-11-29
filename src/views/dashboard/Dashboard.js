import React, { useState, useEffect } from 'react'

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  getTotalAmount,
  getTotalUsers,
  getTotalUsersByCategory,
  getTotalSessionsPerRoom
} from 'src/services/APIUtils'

const Dashboard = () => {
  const [total, setTotal] = useState(0)
  const [users, setUsers] = useState(0)
  const [userCategories, setUserCategories] = useState([])
  const [roomSessions, setRoomSessions] = useState([])
  const [sessionsNumber, setSessionsNumber] = useState(null)

  const getTotal = async () => {
    try {
      const res = await getTotalAmount()
      setTotal(res?.data[0]?.total_amount)
    } catch (err) {
      console.log(err)
    }
  }

  const getUsers = async () => {
    try {
      const res = await getTotalUsers()
      setUsers(res?.data[0]?.total_users)
    } catch (err) {
      console.log(err)
    }
  }

  const getUsersByCategory = async () => {
    try {
      const res = await getTotalUsersByCategory()
      setUserCategories(res?.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getRoomSessions = async () => {
    try {
      const res = await getTotalSessionsPerRoom()
      setRoomSessions(res?.data?.totalSessions)
      setSessionsNumber(res?.data?.totalNumber[0]?.total_number)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTotal()
    getUsers()
    getUsersByCategory()
    getRoomSessions()
  }, [])

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm='5'>
              <h4 id='traffic' className='card-title mb-0'>
                Great Body Gym Limited
              </h4>
              <div className='small text-muted'>2021</div>
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
              <div className='text-muted'>Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress
                className='progress-xs mt-2'
                precision={1}
                color='success'
                value={10}
              />
            </CCol>
            <CCol md sm='12' className='mb-sm-2 mb-0'>
              <div className='text-muted'>Total Amount Made So Far</div>
              <strong>KSH {total}</strong>
              <CProgress
                className='progress-xs mt-2'
                precision={1}
                color='warning'
                value={40}
              />
            </CCol>
            <CCol md sm='12' className='mb-sm-2 mb-0'>
              <div className='text-muted'>Number Of Users</div>
              <strong>{users} Users</strong>
              <CProgress
                className='progress-xs mt-2'
                precision={1}
                color='danger'
                value={40}
              />
              {userCategories.map(item => (
                <React.Fragment>
                  <div className='text-muted'>{item.Role.roleName}</div>
                  <strong>
                    {item.total_count} {item.Role.roleName}(s)
                  </strong>
                </React.Fragment>
              ))}
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Great Body Ltd Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs='12' md='6' xl='6'>
                  <CRow>
                    <CCol sm='6'>
                      <CCallout color='info'>
                        <small className='text-muted'>New Clients</small>
                        <br />
                        <strong className='h4'>9</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm='6'>
                      <CCallout color='danger'>
                        <small className='text-muted'>Gym Trainers</small>
                        <br />
                        <strong className='h4'>2</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                  <hr className='mt-0' />
                  <div className='legend text-center'>
                    <small>
                      <sup className='px-1'>
                        <CBadge shape='pill' color='info'>
                          &nbsp;
                        </CBadge>
                      </sup>
                      New clients &nbsp;
                      <sup className='px-1'>
                        <CBadge shape='pill' color='danger'>
                          &nbsp;
                        </CBadge>
                      </sup>
                      Gym Trainers
                    </small>
                  </div>
                </CCol>
                <CCol xs='12' md='6' xl='6'>
                  <CRow>
                    <CCol sm='6'>
                      <CCallout color='warning'>
                        <small className='text-muted'>Pageviews</small>
                        <br />
                        <strong className='h4'>78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm='6'>
                      <CCallout color='success'>
                        <small className='text-muted'>Organic</small>
                        <br />
                        <strong className='h4'>49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className='mt-0' />

                  <div className='progress-group mb-4'>
                    <div className='progress-group-header'>
                      <CIcon className='progress-group-icon' name='cil-user' />
                      <span className='title'>Male</span>
                      <span className='ml-auto font-weight-bold'>43%</span>
                    </div>
                    <div className='progress-group-bars'>
                      <CProgress
                        className='progress-xs'
                        color='warning'
                        value='43'
                      />
                    </div>
                  </div>
                  <div className='progress-group mb-5'>
                    <div className='progress-group-header'>
                      <CIcon
                        className='progress-group-icon'
                        name='cil-user-female'
                      />
                      <span className='title'>Female</span>
                      <span className='ml-auto font-weight-bold'>37%</span>
                    </div>
                    <div className='progress-group-bars'>
                      <CProgress
                        className='progress-xs'
                        color='warning'
                        value='37'
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
              <br />

              {roomSessions.map(item => (
                <table className='table table-hover table-outline mb-0 d-none d-sm-table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Room Label </th>
                      <th>No of TrainingSession(s) {sessionsNumber}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className='clearfix'>
                          <div className='float-left'>
                            <strong>{item.Room.label}</strong>
                          </div>
                          <div className='float-right'>
                            <small className='text-muted'>
                              {item.total_count}
                            </small>
                          </div>
                        </div>
                        <CProgress
                          className='progress-xs'
                          color='danger'
                          value={(item.total_count / sessionsNumber) * 100}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
