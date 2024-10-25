import { useMemo } from 'react'
import { AuthService } from '../backend/auth'

const useAuthService = (): AuthService => {
  return useMemo(() => {
    return new AuthService()
  }, [])
}

export default useAuthService
