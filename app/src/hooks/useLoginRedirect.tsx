import { useEffect } from 'react'
import useBackend from './useBackend'
import useNav from './useNav'

const useLoginRedirect = () => {
  const navigate = useNav()
  const backendService = useBackend()

  useEffect(() => {
    backendService
      .validate()
      .then(() => {
        navigate('variable-list')
      })
      .catch(() => {})
  }, [backendService, navigate])
}

export default useLoginRedirect
