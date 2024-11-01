import { useCallback } from 'react'
import useAccount from '../services/useAccount'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'

interface ReferralInfo {
  projectId: string
  id: string
}

export default function useSignup() {
  const navigate = useNav()
  const { signup } = useAccount()
  const { acceptShareLink } = useProject()

  return useCallback(
    async (email: string, password: string, referral?: ReferralInfo) => {
      try {
        await signup(email, password)

        if (referral) {
          await acceptShareLink(referral.projectId, referral.id)
          navigate('variable-list')
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
