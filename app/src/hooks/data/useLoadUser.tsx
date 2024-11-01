import { useCallback } from 'react'
import useAccount from '../services/useAccount'
import { useSetRecoilState } from 'recoil'
import { userInfoAtom } from '../../state/state'

const useLoadUser = () => {
  const { getUserInfo } = useAccount()
  const setUserInfo = useSetRecoilState(userInfoAtom)

  return useCallback(async () => {
    const userInfo = await getUserInfo()
    setUserInfo(userInfo)
  }, [getUserInfo, setUserInfo])
}

export default useLoadUser
