import { useCallback } from 'react'
import useAccount from '../services/useAccount'
import useNav from '../utils/useNav'
import useAcceptShareLink from './useAcceptShareLink'

interface ReferralInfo {
  projectId: string
  id: string
}

export default function useSignup() {
  const navigate = useNav()
  const { signup } = useAccount()
  const acceptShareLink = useAcceptShareLink()

  return useCallback(
    async (email: string, password: string, referral?: ReferralInfo) => {
      try {
        await signup(email, password)

        if (referral) {
          await acceptShareLink(referral.projectId, referral.id)
        } else {
          navigate('first-project')
        }
      } catch (error) {
        console.error('Failed to signup:', error)
        throw error
      }
    },
    [signup, acceptShareLink, navigate],
  )
}
