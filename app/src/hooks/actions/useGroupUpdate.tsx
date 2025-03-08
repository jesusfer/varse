import { useCallback } from 'react'
import useLoadGroups from '../data/useLoadGroups'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'

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
