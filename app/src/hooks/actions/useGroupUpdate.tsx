import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useLoadGroups from '../data/useLoadGroups'

export default function useGroupUpdate() {
  const { updateGroup } = useProject()
  const project = useActiveProject()
  const loadGroups = useLoadGroups()

  return useCallback(
    async (groupId: string, name: string) => {
      try {
        if (!project) throw new Error('No active project')

        await updateGroup(project.id, groupId, name)

        await loadGroups()
      } catch (e) {}
    },
    [project, updateGroup, loadGroups],
  )
}
