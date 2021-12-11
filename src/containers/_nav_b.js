import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav_b = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
    badge: {
      color: 'info',
      text: 'Welcome'
    }
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Components']
  // },
  // {
  //   _tag: 'CSidebarNavDivider'
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Extras']
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Components',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Register',
      //   to: '/register'
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Rooms',
        to: '/rooms'
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
        name: 'Equipment',
        to: '/equipments'
      }
    ]
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Disabled',
  //   icon: 'cil-ban',
  //   badge: {
  //     color: 'secondary',
  //     text: 'NEW'
  //   },
  //   addLinkClass: 'c-disabled',
  //   disabled: true
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    route: '/reports',
    icon: 'cil-star',
    _children: [
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Register',
      //   to: '/register'
      // },

      {
        _tag: 'CSidebarNavItem',
        name: 'RoomsReport',
        to: '/roomsReport'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'TrainingSessionsReport',
        to: '/trainingSessionsReport'
      }
    ]
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

export default _nav_b
