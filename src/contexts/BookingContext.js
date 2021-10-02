import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getBookings } from '../services/APIUtils'

export const BookingContext = createContext()

export function useBookings () {
  return useContext(BookingContext)
}

export const BookingProvider = props => {
  const [bookings, setBookings] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    const res = await getBookings(page)
    const data = res?.data?.bookings
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setBookings(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </BookingContext.Provider>
  )
}
