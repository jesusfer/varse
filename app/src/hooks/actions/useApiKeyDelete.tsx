import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import { apiKeyListAtom } from '../../state/state'
import useActiveProject from '../state/useActiveProject'

export default function useApiKeyDelete() {
  const { deleteApiKey, getApiKeys } = useProject()
  const activeProject = useActiveProject()
  const setApiKeyList = useSetRecoilState(apiKeyListAtom)

  const handleDeleteApiKey = useCallback(
    async (apiKeyId: string) => {
      try {
        if (!activeProject) {
          throw new Error('No active project')
        }

        await deleteApiKey(activeProject.id, apiKeyId)

        const updatedApiKeys = await getApiKeys(activeProject.id)
        setApiKeyList(updatedApiKeys)
      } catch (e) {}
    },
    [activeProject, deleteApiKey, getApiKeys, setApiKeyList],
  )

  return handleDeleteApiKey
}
