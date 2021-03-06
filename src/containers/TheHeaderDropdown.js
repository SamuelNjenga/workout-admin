import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'

const TheHeaderDropdown = () => {
  const history = useHistory()
  const handleSignOut = () => {
    localStorage.removeItem('admintoken')
    history.push('/login')
    console.log('Log out')
  }
  return (
    <CDropdown inNav className='c-header-nav-items mx-2' direction='down'>
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <div className='c-avatar'>
          <CImg
            src={'avatars/avatar-19.png'}
            className='c-avatar-img'
            alt='admin@bootstrapmaster.com'
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownItem header tag='div' color='light' className='text-center'>
          <strong>Account</strong>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name='cil-bell' className='mfe-2' />
          Updates
          <CBadge color='info' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name='cil-envelope-open' className='mfe-2' />
          Messages
          <CBadge color='success' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name='cil-task' className='mfe-2' />
          Tasks
          <CBadge color='danger' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem header tag='div' color='light' className='text-center'>
          <strong>Settings</strong>
        </CDropdownItem> */}
        <CDropdownItem>
          <CIcon name='cil-user' className='mfe-2' />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name='cil-settings' className='mfe-2' />
          Settings
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name='cil-credit-card' className='mfe-2' />
          Payments
          <CBadge color='secondary' className='mfs-auto'>
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownItem divider />
        <CDropdownItem>
          <button onClick={handleSignOut}>
            <CIcon name='cil-lock-locked' className='mfe-2' />
            Sign Out
          </button>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
