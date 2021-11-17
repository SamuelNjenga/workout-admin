import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Users = React.lazy(() => import('./views/users/Users'))
const Rooms = React.lazy(() => import('./views/rooms/Rooms'))
const Room = React.lazy(() => import('./views/rooms/Room'))
const Registrations = React.lazy(() => import('./views/registrations/Registrations'))
const User = React.lazy(() => import('./views/users/User'))
const Payment = React.lazy(() => import('./views/payments/MemberPayment'))
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
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/rooms', exact: true, name: 'Rooms', component: Rooms },
  { path: '/registrations', exact: true, name: 'Registrations', component: Registrations },
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
  { path: '/rooms/:id', exact: true, name: 'Room Details', component: Room },
  { path: '/memberPayments/:id', exact: true, name: 'Payment Details', component: Payment }
]

export default routes
