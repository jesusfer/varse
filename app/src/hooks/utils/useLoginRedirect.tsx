import { useEffect } from 'react'
import useBackend from '../services/useBackend'
import useNav from './useNav'
import useReferalCode from './useReferalCode'
import useProject from '../services/useProject'

const useLoginRedirect = () => {
  const navigate = useNav()
  const referral = useReferalCode()
  const backendService = useBackend()
  const { acceptShareLink } = useProject()

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await backendService.validate()
        if (referral) {
          acceptShareLink(referral.projectId, referral.id)
        }
        navigate('variable-list')
      } catch (e) {
        navigate('login')
      }
    }

    validateAuth()
  }, [acceptShareLink, backendService, navigate, referral])
}

export default useLoginRedirect
