import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { useBookings } from '../../contexts/BookingContext'

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

const BookedSessions = () => {
  const history = useHistory()
  const { bookings, isLoading, count, page, setPage } = useBookings()
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
          <CCardHeader>Booked Sessions List</CCardHeader>
          <CCardBody>
            <CDataTable
              items={bookings}
              fields={[
                {
                  key: 'id',
                  _classes: 'font-weight-bold',
                  label: 'Booking ID'
                },
                { key: 'sessionId', label: 'Session ID' },
                { key: 'memberId', label: 'Member ID' },
                { key: 'status', label: 'STATUS' }
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: item => (
                  <td>
                    <CBadge color='primary'>{item.status}</CBadge>
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
      </CCol>
    </CRow>
  )
}

export default BookedSessions
