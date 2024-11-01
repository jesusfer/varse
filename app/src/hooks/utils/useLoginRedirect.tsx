import { useEffect } from 'react'
import useBackend from '../services/useBackend'
import useNav from './useNav'
import useReferalCode from './useReferalCode'
import useProject from '../services/useProject'
import useAccount from '../services/useAccount'
import { useSetRecoilState } from 'recoil'
import { userInfoAtom } from '../../state/state'

const useLoginRedirect = () => {
  const navigate = useNav()
  const referral = useReferalCode()
  const backendService = useBackend()
  const { acceptShareLink } = useProject()
  const { getUserInfo } = useAccount()
  const setUserInfo = useSetRecoilState(userInfoAtom)

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await backendService.validate()
        if (referral) {
          acceptShareLink(referral.projectId, referral.id)
        }
        getUserInfo().then((userInfo) => setUserInfo(userInfo))
        navigate('variable-list')
      } catch (e) {
        navigate('login')
      }
    }

    validateAuth()
  }, [
    acceptShareLink,
    backendService,
    navigate,
    referral,
    getUserInfo,
    setUserInfo,
  ])
}

export default useLoginRedirect
