import { useEffect } from 'react'
import useBackend from '../services/useBackend'
import useNav from './useNav'
import useReferalCode from './useReferalCode'
import useProject from './useProject'

const useLoginRedirect = () => {
  const navigate = useNav()
  const referral = useReferalCode()
  const backendService = useBackend()
  const { acceptShareLink } = useProject()

  useEffect(() => {
    backendService
      .validate()
      .then(() => {
        if (referral) {
          acceptShareLink(referral.projectId, referral.linkId)
        }
        navigate('variable-list')
      })
      .catch(() => {})
  }, [acceptShareLink, backendService, navigate, referral])
}

export default useLoginRedirect
