import React, { createContext, useState, useContext } from 'react'

export const LoginContext = createContext()

export function useLogin () {
  return useContext(LoginContext)
}

export const LoginProvider = props => {
  const [isAuthenticated, setAuthentication] = useState(
    localStorage.getItem('admintoken') ? true : false
  )

  return (
    <LoginContext.Provider value={{ isAuthenticated, setAuthentication }}>
      {props.children}
    </LoginContext.Provider>
  )
}
