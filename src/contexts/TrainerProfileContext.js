import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { getTrainerProfiles } from '../services/APIUtils'

export const TrainerProfileContext = createContext()

export function useTrainerProfiles () {
  return useContext(TrainerProfileContext)
}

export const TrainerProfileProvider = props => {
  const [trainerProfiles, setTrainerProfiles] = useState([])
  const [count, setCount] = useState(null)
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const fetchTrainerProfiles = useCallback(async () => {
    const res = await getTrainerProfiles(page)
    const data = res?.data?.trainerProfiles
    const curr = res?.data?.currentPage
    const num = res?.data?.totalPages
    setCount(num)
    setPage(curr)
    setTrainerProfiles(data)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchTrainerProfiles()
  }, [fetchTrainerProfiles])

  return (
    <TrainerProfileContext.Provider
      value={{
        trainerProfiles,
        setTrainerProfiles,
        count,
        page,
        setCount,
        setPage,
        isLoading,
        setLoading
      }}
    >
      {props.children}
    </TrainerProfileContext.Provider>
  )
}
