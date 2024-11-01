import { useCallback } from 'react'
import useAccount from '../services/useAccount'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import { userInfoAtom } from '../../state/state'
import { useSetRecoilState } from 'recoil'

interface ReferralInfo {
  projectId: string
  id: string
}

export default function useSignup() {
  const navigate = useNav()
  const { signup, getUserInfo } = useAccount()
  const { acceptShareLink } = useProject()
  const setUserInfo = useSetRecoilState(userInfoAtom)

  const handleSignup = useCallback(
    async (email: string, password: string, referral?: ReferralInfo) => {
      try {
        await signup(email, password)

        if (referral) {
          await acceptShareLink(referral.projectId, referral.id)
          navigate('variable-list')
        } else {
          navigate('first-project')
        }

        const userInfo = await getUserInfo()
        setUserInfo(userInfo)
      } catch (error) {
        console.error('Failed to signup:', error)
        throw error
      }
    },
    [signup, acceptShareLink, navigate, getUserInfo, setUserInfo],
  )

  return handleSignup
}
