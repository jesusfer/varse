import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import { apiKeyListAtom } from '../../state/state'
import useActiveProject from '../state/useActiveProject'

export default function useApiKeyCreate() {
  const { createApiKey, getApiKeys } = useProject()
  const activeProject = useActiveProject()
  const setApiKeyList = useSetRecoilState(apiKeyListAtom)

  const handleCreateApiKey = useCallback(
    async (name: string) => {
      try {
        if (!activeProject) {
          throw new Error('No active project')
        }

        await createApiKey(activeProject.id, name)

        const updatedApiKeys = await getApiKeys(activeProject.id)
        setApiKeyList(updatedApiKeys)
      } catch (e) {}
    },
    [activeProject, createApiKey, getApiKeys, setApiKeyList],
  )

  return handleCreateApiKey
}
