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
  CPagination,
  CModal,
  CModalHeader,
  CModalBody,
  CLabel,
  CInput,
  CModalFooter,
  CButton
} from '@coreui/react'
import toast, { Toaster } from 'react-hot-toast'

import { useTrainerProfiles } from 'src/contexts/TrainerProfileContext'
import { postTrainerProfile } from 'src/services/APIUtils'

const getBadge = status => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

const successNotification = () =>
  toast.success('Trainer profile registered successfully.')

const TrainerProfiles = () => {
  const [modalOne, setModalOne] = useState(false)
  const [item, setItem] = useState({
    userId: '',
    specialization: ''
  })
  const history = useHistory()
  const {
    trainerProfiles,
    isLoading,
    count,
    page,
    setPage
  } = useTrainerProfiles()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  //const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/trainerProfiles?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [page, currentPage])

  const toggleOne = () => {
    setModalOne(!modalOne)
  }

  const handleChange = event => {
    const target = event.target
    const value = target.value
    setItem({ ...item, [event.target.name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    //setSubmitting(true)
    const item1 = { ...item }
    try {
      await postTrainerProfile(item1)
      //setSubmitting(false)
      successNotification()
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
        <Toaster />
          <CCardHeader>Trainer Profiles</CCardHeader>
          <CCardBody>
            <CDataTable
              items={trainerProfiles}
              fields={[
                {
                  key: 'id',
                  label: 'Trainer Id',
                  _classes: 'font-weight-bold'
                },
                { key: 'specialization', label: 'Main Specialization Area' },
                {key:'userId', label: 'User Id'}
              ]}
              hover
              striped
              sorter
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/trainerProfiles/${item.id}`)}
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

        <CButton onClick={toggleOne} className='mr-1'>
          Register Trainer Profile
        </CButton>

        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Enter Trainer's Profile</CModalHeader>
          <form onSubmit={handleSubmit}>
            <CModalBody>
              <CLabel htmlFor='userId'>User Id</CLabel>
              <CInput
                id='userId'
                placeholder='Enter the User Id'
                required
                name='userId'
                onChange={handleChange}
                value={item.userId}
              />
              <CLabel htmlFor='specialization'>Specialization Area(s)</CLabel>
              <CInput
                id='specialization'
                placeholder='Enter the specialization area'
                required
                name='specialization'
                onChange={handleChange}
                value={item.specialization}
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
      </CCol>
    </CRow>
  )
}

export default TrainerProfiles
