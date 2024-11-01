import { useEffect } from 'react'
import useBackend from '../services/useBackend'
import useNav from './useNav'

const useAuthRequired = () => {
  const navigate = useNav()
  const backendService = useBackend()

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await backendService.validate()
      } catch (e) {
        navigate('login')
      }
    }

    validateAuth()
  }, [backendService, navigate])
}

export default useAuthRequired
