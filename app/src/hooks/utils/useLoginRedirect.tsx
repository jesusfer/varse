import useBackend from '../services/useBackend'
import useNav from './useNav'
import useReferalCode from './useReferalCode'
import useAcceptShareLink from '../actions/useAcceptShareLink'

const LOGIN_PATHS = ['/login', '/signup']

const useLoginRedirect = () => {
  const navigate = useNav()
  const referral = useReferalCode()
  const backendService = useBackend()
  const acceptShareLink = useAcceptShareLink()

  const validateAuth = async () => {
    try {
      await backendService.validate()
      if (referral) {
        acceptShareLink(referral.projectId, referral.id)
      } else {
        navigate('variables')
      }
    } catch (e) {
      if (LOGIN_PATHS.includes(getPathname())) return
      navigate('login')
    }
  }

  validateAuth()
}

export default useLoginRedirect

function getPathname() {
  return new URL(window.location.href).pathname.replace(/\/$/, '').split('?')[0]
}
