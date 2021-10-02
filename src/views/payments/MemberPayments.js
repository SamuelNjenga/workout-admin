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
import moment from 'moment'

import { usePayments } from '../../contexts/PaymentContext'

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

const MemberPayments = () => {
  const history = useHistory()
  const { payments, isLoading, count, page, setPage } = usePayments()
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
          <CCardHeader>Member Payments</CCardHeader>
          <CCardBody>
            <CDataTable
              items={payments}
              fields={[
                { key: 'memberId', _classes: 'font-weight-bold' },
                'amount',
                { key: 'from', label: 'From Date' },
                { key: 'to', label: 'Renew Date' },
                { key: 'MemberRegistration' }
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/users/${item.id}`)}
              scopedSlots={{
                MemberRegistration: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.MemberRegistration.status}
                    </CBadge>
                  </td>
                ),
                to: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {moment(item.to).format('MMMM Do YYYY, h:mm:ss a')}
                    </CBadge>
                  </td>
                ),
                from: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {moment(item.from).format('MMMM Do YYYY, h:mm:ss a')}
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
      </CCol>
    </CRow>
  )
}

export default MemberPayments
