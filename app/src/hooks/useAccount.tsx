import { useCallback } from 'react'
import useBackend from './useBackend'

const useAccount = () => {
  const backendService = useBackend()

  const login = useCallback(
    async (email: string, password: string) => {
      return backendService.login({ email, password })
    },
    [backendService],
  )

  const logout = useCallback(async () => {
    return backendService.logout()
  }, [backendService])

  const signup = useCallback(
    async (email: string, password: string) => {
      return backendService.signup({ email, password })
    },
    [backendService],
  )

  const getUserInfo = useCallback(async () => {
    return backendService.getUserInfo()
  }, [backendService])

  return { login, logout, signup, getUserInfo }
}

export default useAccount
