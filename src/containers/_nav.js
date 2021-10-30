import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Member Payments',
        to: '/memberPayments'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Rooms',
        to: '/rooms'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Member Registrations',
        to: '/registrations'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Service Types',
        to: '/serviceTypes'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Trainers Profile',
        to: '/trainerProfiles'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Training Sessions',
        to: '/trainingSessions'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Booked Sessions',
        to: '/bookedSessions'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500'
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Disabled',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW'
    },
    addLinkClass: 'c-disabled',
    disabled: true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
