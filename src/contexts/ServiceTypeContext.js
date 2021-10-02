import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getServiceTypes } from '../services/APIUtils'

export const ServiceTypeContext = createContext()

export function useServiceTypes () {
  return useContext(ServiceTypeContext)
}

export const ServiceTypeProvider = props => {
  const [serviceTypes, setServiceTypes] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchServiceTypes = useCallback(async () => {
    const res = await getServiceTypes(page)
    const data = res?.data?.serviceTypes
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setServiceTypes(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchServiceTypes()
  }, [fetchServiceTypes])

  return (
    <ServiceTypeContext.Provider
      value={{
        serviceTypes,
        setServiceTypes,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </ServiceTypeContext.Provider>
  )
}
