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

import { getTotalAmount, getTotalUsers } from 'src/services/APIUtils'

const Dashboard = () => {
  const [total, setTotal] = useState(0)
  const [users, setUsers] = useState(0)

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

  useEffect(() => {
    getTotal()
    getUsers()
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
              <table className='table table-hover table-outline mb-0 d-none d-sm-table'>
                <thead className='thead-light'>
                  <tr>
                    <th className='text-center'>
                      <CIcon name='cil-people' />
                    </th>
                    <th>User</th>
                    <th>Usage</th>
                    <th className='text-center'>Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-center'>
                      <div className='c-avatar'>
                        <img
                          src={'avatars/1.jpg'}
                          className='c-avatar-img'
                          alt='admin@bootstrapmaster.com'
                        />
                        <span className='c-avatar-status bg-success'></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className='small text-muted'>
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <strong>50%</strong>
                        </div>
                        <div className='float-right'>
                          <small className='text-muted'>
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className='progress-xs'
                        color='success'
                        value='50'
                      />
                    </td>
                    <td className='text-center'>
                      <CIcon height={25} name='cib-cc-mastercard' />
                    </td>
                    <td>
                      <div className='small text-muted'>Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center'>
                      <div className='c-avatar'>
                        <img
                          src={'avatars/2.jpg'}
                          className='c-avatar-img'
                          alt='admin@bootstrapmaster.com'
                        />
                        <span className='c-avatar-status bg-danger'></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className='small text-muted'>
                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <strong>10%</strong>
                        </div>
                        <div className='float-right'>
                          <small className='text-muted'>
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className='progress-xs'
                        color='info'
                        value='10'
                      />
                    </td>
                    <td className='text-center'>
                      <CIcon height={25} name='cib-cc-visa' />
                    </td>
                    <td>
                      <div className='small text-muted'>Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center'>
                      <div className='c-avatar'>
                        <img
                          src={'avatars/3.jpg'}
                          className='c-avatar-img'
                          alt='admin@bootstrapmaster.com'
                        />
                        <span className='c-avatar-status bg-warning'></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className='small text-muted'>
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <strong>74%</strong>
                        </div>
                        <div className='float-right'>
                          <small className='text-muted'>
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className='progress-xs'
                        color='warning'
                        value='74'
                      />
                    </td>
                    <td className='text-center'>
                      <CIcon height={25} name='cib-stripe' />
                    </td>
                    <td>
                      <div className='small text-muted'>Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center'>
                      <div className='c-avatar'>
                        <img
                          src={'avatars/4.jpg'}
                          className='c-avatar-img'
                          alt='admin@bootstrapmaster.com'
                        />
                        <span className='c-avatar-status bg-secondary'></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className='small text-muted'>
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <strong>98%</strong>
                        </div>
                        <div className='float-right'>
                          <small className='text-muted'>
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className='progress-xs'
                        color='danger'
                        value='98'
                      />
                    </td>
                    <td className='text-center'>
                      <CIcon height={25} name='cib-paypal' />
                    </td>
                    <td>
                      <div className='small text-muted'>Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center'>
                      <div className='c-avatar'>
                        <img
                          src={'avatars/5.jpg'}
                          className='c-avatar-img'
                          alt='admin@bootstrapmaster.com'
                        />
                        <span className='c-avatar-status bg-success'></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className='small text-muted'>
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <strong>22%</strong>
                        </div>
                        <div className='float-right'>
                          <small className='text-muted'>
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className='progress-xs'
                        color='info'
                        value='22'
                      />
                    </td>
                    <td className='text-center'>
                      <CIcon height={25} name='cib-google-pay' />
                    </td>
                    <td>
                      <div className='small text-muted'>Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center'>
                      <div className='c-avatar'>
                        <img
                          src={'avatars/6.jpg'}
                          className='c-avatar-img'
                          alt='admin@bootstrapmaster.com'
                        />
                        <span className='c-avatar-status bg-danger'></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className='small text-muted'>
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <strong>43%</strong>
                        </div>
                        <div className='float-right'>
                          <small className='text-muted'>
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className='progress-xs'
                        color='success'
                        value='43'
                      />
                    </td>
                    <td className='text-center'>
                      <CIcon height={25} name='cib-cc-amex' />
                    </td>
                    <td>
                      <div className='small text-muted'>Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
