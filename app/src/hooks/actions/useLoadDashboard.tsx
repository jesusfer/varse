import { useEffect } from 'react'
import useReloadDashboard from './useReloadDashboard'
import useUserInfo from '../state/useUserInfo'
import useAccount from '../services/useAccount'
import { userInfoAtom } from '../../state/state'
import { useSetRecoilState } from 'recoil'

export default function useLoadDashboard() {
  const { getUserInfo } = useAccount()
  const userInfo = useUserInfo()
  const reloadDashboard = useReloadDashboard()
  const setUserInfo = useSetRecoilState(userInfoAtom)

  useEffect(() => {
    reloadDashboard()

    if (!userInfo) {
      getUserInfo().then((userInfo) => setUserInfo(userInfo))
    }
  }, [reloadDashboard, userInfo, getUserInfo, setUserInfo])
}
