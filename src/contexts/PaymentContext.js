import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getMemberPayments } from '../services/APIUtils'

export const PaymentContext = createContext()

export function usePayments () {
  return useContext(PaymentContext)
}

export const PaymentProvider = props => {
  const [payments, setPayments] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchPayments = useCallback(async () => {
    const res = await getMemberPayments(page)
    const data = res?.data?.payments
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setPayments(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchPayments()
  }, [fetchPayments])

  return (
    <PaymentContext.Provider
      value={{
        payments,
        setPayments,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  )
}
