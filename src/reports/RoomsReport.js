import React, { useState, useEffect } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { getTotalSessionsPerRoom } from 'src/services/APIUtils'
import { useRooms } from 'src/contexts/RoomContext'

const RoomsReport = () => {
  const { totalRooms } = useRooms()
  const [roomSessions, setRoomSessions] = useState([])
  const [sessionsNumber, setSessionsNumber] = useState(null)
  const [fromTime, onChangeFromTime] = useState(new Date())
  const [toTime, onChangeToTime] = useState(new Date())

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
    getRoomSessions()
  }, [])

  return (
    <>
      <CCard>
        <CCardBody>
          <h3>Rooms Details Report</h3>
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
              <strong>Name</strong>
              <div className='text-muted'>Email Address </div>
              <strong>Email</strong>
            </CCol>
            <CCol md sm='12' className='mb-sm-2 mb-0'>
              <div className='text-muted'>Generated on </div>
              <strong>Date</strong>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <br />
              {roomSessions.map(item => (
                <table className='table table-hover table-outline mb-0 d-none d-sm-table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Room Label </th>
                      <th>No of TrainingSession(s)</th>
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
              <div className='clearfix'>
                <div className='float-left'>
                  <strong>
                    Average number of training sessions per room is{' '}
                    {Math.ceil(sessionsNumber / totalRooms)}
                  </strong>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default RoomsReport
