import { useCallback } from 'react'
import useAccount from '../services/useAccount'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import { useSetRecoilState } from 'recoil'
import { userInfoAtom } from '../../state/state'

export default function useLogin() {
  const navigate = useNav()
  const { login } = useAccount()
  const { getProjects } = useProject()
  const { getUserInfo } = useAccount()
  const setUserInfo = useSetRecoilState(userInfoAtom)

  return useCallback(
    async (email: string, password: string) => {
      try {
        await login(email, password)
        const projects = await getProjects()
        navigate(projects.length > 0 ? 'variable-list' : 'first-project')

        const userInfo = await getUserInfo()
        setUserInfo(userInfo)
      } catch (error) {
        console.error('Failed to login:', error)
        throw error
      }
    },
    [login, getProjects, navigate, getUserInfo, setUserInfo],
  )
}
