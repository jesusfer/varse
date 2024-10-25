import { useCallback } from 'react'
import useBackend from './useBackend'

const useSignup = () => {
  const backendService = useBackend()

  const signup = useCallback(
    async (email: string, password: string) => {
      return backendService.signup({ email, password })
    },
    [backendService],
  )

  return { signup }
}

export default useSignup
