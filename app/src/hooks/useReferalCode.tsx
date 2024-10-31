import { useLocation } from 'react-router-dom'

interface ReferralInfo {
  projectId: string
  linkId: string
}

const useReferalCode = (): ReferralInfo | null => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const referral = searchParams.get('referral')
  const projectId = searchParams.get('projectId')
  const linkId = searchParams.get('linkId')
  if (!referral || !projectId || !linkId) {
    return null
  }

  return { projectId, linkId }
}

export default useReferalCode
