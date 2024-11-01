import { useCallback } from 'react'
import useBackend from './useBackend'
import { sha256 } from 'js-sha256'

const useAccount = () => {
  const backendService = useBackend()

  const login = useCallback(
    async (email: string, password: string) => {
      const hashedPassword = await hashPassword(password)
      return backendService.login({ email, password: hashedPassword })
    },
    [backendService],
  )

  const logout = useCallback(async () => {
    return backendService.logout()
  }, [backendService])

  const signup = useCallback(
    async (email: string, password: string) => {
      const hashedPassword = await hashPassword(password)
      return backendService.signup({ email, password: hashedPassword })
    },
    [backendService],
  )

  const getUserInfo = useCallback(async () => {
    return backendService.getUserInfo()
  }, [backendService])

  return { login, logout, signup, getUserInfo, hashPassword }
}

export default useAccount

async function hashPassword(password: string) {
  return sha256(password)
}
