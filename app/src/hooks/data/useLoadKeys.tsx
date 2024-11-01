import { useSetRecoilState } from 'recoil'
import useActiveProject from '../state/useActiveProject'
import { apiKeyListAtom } from '../../state/state'
import { useCallback } from 'react'
import useProject from '../services/useProject'

const useLoadKeys = () => {
  const { getApiKeys } = useProject()

  const activeProject = useActiveProject()
  const setApiKeyList = useSetRecoilState(apiKeyListAtom)

  return useCallback(async () => {
    if (!activeProject) return

    const apiKeys = await getApiKeys(activeProject.id)
    setApiKeyList(apiKeys)
  }, [activeProject, getApiKeys, setApiKeyList])
}

export default useLoadKeys
