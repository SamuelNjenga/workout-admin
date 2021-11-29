import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getEquipments } from '../services/APIUtils'

export const EquipmentContext = createContext()

export function useEquipments () {
  return useContext(EquipmentContext)
}

export const EquipmentProvider = props => {
  const [equipments, setEquipments] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchEquipments = useCallback(async () => {
    const res = await getEquipments(page)
    const data = res?.data?.equipments
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setEquipments(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchEquipments()
  }, [fetchEquipments])

  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        setEquipments,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </EquipmentContext.Provider>
  )
}
