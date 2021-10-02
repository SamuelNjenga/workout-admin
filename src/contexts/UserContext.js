import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getUsers } from '../services/APIUtils'

export const UserContext = createContext()

export function useUsers () {
  return useContext(UserContext)
}

export const UserProvider = props => {
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    const res = await getUsers(page)
    const data = res?.data?.users
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setUsers(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
