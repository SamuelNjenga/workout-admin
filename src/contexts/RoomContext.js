import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getRooms } from '../services/APIUtils'

export const RoomContext = createContext()

export function useRooms () {
  return useContext(RoomContext)
}

export const RoomProvider = props => {
  const [rooms, setRooms] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchRooms = useCallback(async () => {
    const res = await getRooms(page)
    const data = res?.data?.rooms
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setRooms(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchRooms()
  }, [fetchRooms])

  return (
    <RoomContext.Provider
      value={{
        rooms,
        setRooms,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </RoomContext.Provider>
  )
}
