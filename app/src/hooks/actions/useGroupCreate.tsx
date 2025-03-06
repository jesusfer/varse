import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useLoadGroups from '../data/useLoadGroups'

export default function useGroupCreate() {
  const { createGroup } = useProject()
  const project = useActiveProject()
  const loadGroups = useLoadGroups()

  return useCallback(
    async (name: string) => {
      try {
        if (!project) throw new Error('No active project')

        await createGroup(project.id, name)

        await loadGroups()
      } catch (e) {}
    },
    [project, createGroup, loadGroups],
  )
}
