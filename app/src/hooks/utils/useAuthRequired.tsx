import { useEffect } from 'react'
import useBackend from '../services/useBackend'
import useNav from './useNav'

const useAuthRequired = () => {
  const navigate = useNav()
  const backendService = useBackend()

  useEffect(() => {
    backendService
      .validate()
      .then(() => {})
      .catch(() => {
        navigate('login')
      })
  }, [backendService, navigate])
}

export default useAuthRequired
