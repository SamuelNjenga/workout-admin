import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Typography = React.lazy(() =>
  import('./views/theme/typography/Typography')
)
const Users = React.lazy(() => import('./views/users/Users'))
const Rooms = React.lazy(() => import('./views/rooms/Rooms'))
const Room = React.lazy(() => import('./views/rooms/Room'))
const User = React.lazy(() => import('./views/users/User'))
const MemberPayments = React.lazy(() =>
  import('./views/payments/MemberPayments')
)
const ServiceTypes = React.lazy(() =>
  import('./views/serviceTypes/ServiceTypes')
)
const TrainerProfiles = React.lazy(() =>
  import('./views/trainerProfiles/TrainerProfiles.js')
)
const TrainingSessions = React.lazy(() =>
  import('./views/trainingSessions/TrainingSessions.js')
)
const BookedSessions = React.lazy(() =>
  import('./views/bookedSessions/BookedSessions.js')
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/rooms', exact: true, name: 'Rooms', component: Rooms },
  {
    path: '/memberPayments',
    exact: true,
    name: 'MemberPayments',
    component: MemberPayments
  },
  {
    path: '/serviceTypes',
    exact: true,
    name: 'ServiceTypes',
    component: ServiceTypes
  },
  {
    path: '/trainerProfiles',
    exact: true,
    name: 'TrainerProfiles',
    component: TrainerProfiles
  },
  {
    path: '/trainingSessions',
    exact: true,
    name: 'TrainingSessions',
    component: TrainingSessions
  },
  {
    path: '/bookedSessions',
    exact: true,
    name: 'BookedSessions',
    component: BookedSessions
  },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/rooms/:id', exact: true, name: 'Room Details', component: Room }
]

export default routes
