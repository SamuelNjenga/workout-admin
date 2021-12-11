import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import trainerNavigation from './_nav_b'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const roleId = localStorage.getItem('roleId')

  return (
    <CSidebar
      show={show}
      onShowChange={val => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className='d-md-down-none' to='/'>
        <CIcon
          className='c-sidebar-brand-minimized'
          name='sygnet'
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        {roleId === '1' && (
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        )}
        {roleId === '2' && (
          <CCreateElement
            items={trainerNavigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        )}
      </CSidebarNav>
      <CSidebarMinimizer className='c-d-md-down-none' />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
