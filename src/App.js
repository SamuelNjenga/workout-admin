import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { PaymentProvider } from './contexts/PaymentContext'
import { UserProvider } from './contexts/UserContext'
import { RoomProvider } from './contexts/RoomContext'
import { ServiceTypeProvider } from './contexts/ServiceTypeContext'
import { TrainerProfileProvider } from './contexts/TrainerProfileContext'
import { TrainingSessionProvider } from './contexts/TrainingSessionContext'
import { BookingProvider } from './contexts/BookingContext'
import { RegistrationProvider } from './contexts/RegistrationContext'

import './scss/style.scss'

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render () {
    return (
      <PaymentProvider>
        <UserProvider>
          <RoomProvider>
            <ServiceTypeProvider>
              <TrainerProfileProvider>
                <TrainingSessionProvider>
                  <BookingProvider>
                    <RegistrationProvider>
                      <HashRouter>
                        <React.Suspense fallback={loading}>
                          <Switch>
                            <Route
                              exact
                              path='/login'
                              name='Login Page'
                              render={props => <Login {...props} />}
                            />
                            <Route
                              exact
                              path='/register'
                              name='Register Page'
                              render={props => <Register {...props} />}
                            />
                            <Route
                              exact
                              path='/404'
                              name='Page 404'
                              render={props => <Page404 {...props} />}
                            />
                            <Route
                              exact
                              path='/500'
                              name='Page 500'
                              render={props => <Page500 {...props} />}
                            />
                            <Route
                              path='/'
                              name='Home'
                              render={props => <TheLayout {...props} />}
                            />
                          </Switch>
                        </React.Suspense>
                      </HashRouter>
                    </RegistrationProvider>
                  </BookingProvider>
                </TrainingSessionProvider>
              </TrainerProfileProvider>
            </ServiceTypeProvider>
          </RoomProvider>
        </UserProvider>
      </PaymentProvider>
    )
  }
}

export default App
