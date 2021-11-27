import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import toast, { Toaster } from 'react-hot-toast'

import { useUsers } from 'src/contexts/UserContext'
import { updateUserData } from 'src/services/APIUtils'

const editNotification = userName =>
  toast.success(`User ${userName} has been edited successfully.`)

const User = ({ match }) => {
  
  const { users, isLoading, count, page, setPage } = useUsers()
  // const [item, setItem] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   gender: '',
  //   phoneNumber: '',
  //   roleId: ''
  // })

  const handleChange = event => {
    event.persist()
    const target = event.target
    const value = target.value
    setItem({ ...item, [event.target.name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const item1 = { ...item }
    //setSubmitting(true)
    try {
      await updateUserData(match.params.id, item1)
      //await postContact({ ...item })
      //setSubmitting(false)
      editNotification(item1.firstName)
      console.log('Hitted', item1)
    } catch (err) {
      console.log(err)
      //setSubmitting(false)
    }
  }

  const user = users.find(user => user.id.toString() === match.params.id)

  const [item, setItem] = useState(user)
  const userDetails = user
    ? Object.entries(user)
    : [
        [
          'id',
          <span>
            <CIcon className='text-muted' name='cui-icon-ban' /> Not found
          </span>
        ]
      ]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
        <Toaster />
          <CCardHeader>User id: {match.params.id}</CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit}>
              <table className='table table-striped table-hover'>
                <tbody>
                  {userDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${key}:`}</td>
                        <td>
                          <input
                            // value={value}
                            defaultValue={value}
                            name={key}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <button type='submit'>Edit</button>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
