import { useCallback } from 'react'
import { useResetRecoilState } from 'recoil'
import useAccount from '../services/useAccount'
import useNav from '../utils/useNav'
import {
  userInfoAtom,
  projectListAtom,
  activeProjectAtom,
  variableListAtom,
  apiKeyListAtom,
  projectUserListAtom,
} from '../../state/state'

export default function useLogout() {
  const navigate = useNav()
  const { logout } = useAccount()

  const resetUserInfo = useResetRecoilState(userInfoAtom)
  const resetProjectList = useResetRecoilState(projectListAtom)
  const resetActiveProject = useResetRecoilState(activeProjectAtom)
  const resetVariableList = useResetRecoilState(variableListAtom)
  const resetApiKeyList = useResetRecoilState(apiKeyListAtom)
  const resetProjectUserList = useResetRecoilState(projectUserListAtom)

  const handleLogout = useCallback(async () => {
    try {
      await logout()

      resetUserInfo()
      resetProjectList()
      resetActiveProject()
      resetVariableList()
      resetApiKeyList()
      resetProjectUserList()

      navigate('login')
    } catch (error) {
      console.error('Failed to logout:', error)
      throw error
    }
  }, [
    logout,
    navigate,
    resetUserInfo,
    resetProjectList,
    resetActiveProject,
    resetVariableList,
    resetApiKeyList,
    resetProjectUserList,
  ])

  return handleLogout
}
