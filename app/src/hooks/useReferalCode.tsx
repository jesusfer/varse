import { useLocation } from 'react-router-dom'

interface ReferralInfo {
  id: string
  projectId: string
}

const useReferalCode = (): ReferralInfo | null => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const referral = searchParams.get('referral')
  const projectId = searchParams.get('project')
  const id = searchParams.get('id')
  if (!referral || !projectId || !id) {
    return null
  }

  return { id, projectId }
}

export default useReferalCode
