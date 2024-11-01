import useBackend from '../services/useBackend'
import useNav from './useNav'

const useAuthRequired = () => {
  const navigate = useNav()
  const backendService = useBackend()

  const validateAuth = async () => {
    try {
      await backendService.validate()
    } catch (e) {
      navigate('login')
    }
  }

  validateAuth()
}

export default useAuthRequired
