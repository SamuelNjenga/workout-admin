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

import { useTrainingSessions } from '../../contexts/TrainingSessionContext'

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
  const { trainingSessions, isLoading, count, page, setPage } = useTrainingSessions()
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
      </CCol>
    </CRow>
  )
}

export default TrainingSessions
