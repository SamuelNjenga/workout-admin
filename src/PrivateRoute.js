// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useLogin } from './contexts/LoginContext'

const PrivateRoute = ({
  component: Component = null,
  render: Render = null,
  ...rest
}) => {
  // Add authentication on the below line.
  const { isAuthenticated } = useLogin()

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          Render ? (
            Render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
