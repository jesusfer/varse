import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useLoadKeys from '../data/useLoadKeys'

export default function useKeyDelete() {
  const { deleteApiKey } = useProject()
  const project = useActiveProject()
  const loadApiKeys = useLoadKeys()

  return useCallback(
    async (apiKeyId: string) => {
      try {
        if (!project) throw new Error('No active project')

        await deleteApiKey(project.id, apiKeyId)

        await loadApiKeys()
      } catch (e) {}
    },
    [project, deleteApiKey, loadApiKeys],
  )
}
