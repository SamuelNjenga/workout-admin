import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getTrainingSessions } from '../services/APIUtils'

export const TrainingSessionsContext = createContext()

export function useTrainingSessions () {
  return useContext(TrainingSessionsContext)
}

export const TrainingSessionProvider = props => {
  const [trainingSessions, setTrainingSessions] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchTrainingSessions = useCallback(async () => {
    const res = await getTrainingSessions(page)
    const data = res?.data?.trainingSessions
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setTrainingSessions(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchTrainingSessions()
  }, [fetchTrainingSessions])

  return (
    <TrainingSessionsContext.Provider
      value={{
        trainingSessions,
        setTrainingSessions,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </TrainingSessionsContext.Provider>
  )
}
