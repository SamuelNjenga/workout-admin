import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getMemberRegistrations } from '../services/APIUtils'

export const RegistrationContext = createContext()

export function useRegistrations () {
  return useContext(RegistrationContext)
}

export const RegistrationProvider = props => {
  const [registrations, setRegistrations] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchRegistrations = useCallback(async () => {
    const res = await getMemberRegistrations(page)
    const data = res?.data?.registrations
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setRegistrations(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        setRegistrations,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </RegistrationContext.Provider>
  )
}
