import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useLoadKeys from '../data/useLoadKeys'

export default function useKeyCreate() {
  const { createApiKey } = useProject()
  const project = useActiveProject()
  const loadApiKeys = useLoadKeys()

  return useCallback(
    async (name: string) => {
      try {
        if (!project) throw new Error('No active project')

        await createApiKey(project.id, name)

        await loadApiKeys()
      } catch (e) {}
    },
    [project, createApiKey, loadApiKeys],
  )
}
