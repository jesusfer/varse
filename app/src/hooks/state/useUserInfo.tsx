import { useRecoilValue } from 'recoil'
import { userInfoAtom } from '../../state/state'
import { UserInfo } from '../../backend/types'

export default function useUserInfo(): UserInfo | null {
  return useRecoilValue(userInfoAtom)
}
