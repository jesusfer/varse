import { useMemo } from 'react'
import { BackendService } from '../../backend/backend'
import { HTTPService } from '../../backend/http'
import useAuthService from './useAuthService'

const { REACT_APP_SERVER_ADDRESS } = process.env
const SERVER_ADDRESS = REACT_APP_SERVER_ADDRESS
  ? REACT_APP_SERVER_ADDRESS
  : 'http://localhost:3001'

const useBackend = () => {
  const authService = useAuthService()

  return useMemo(() => {
    return new BackendService(new HTTPService(SERVER_ADDRESS), authService)
  }, [authService])
}

export default useBackend
