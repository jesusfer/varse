import { useCallback } from 'react'
import useBackend from './useBackend'

const useLogin = () => {
  const backendService = useBackend()

  const login = useCallback(
    async (email: string, password: string) => {
      return backendService.login({ email, password })
    },
    [backendService],
  )

  return { login }
}

export default useLogin
