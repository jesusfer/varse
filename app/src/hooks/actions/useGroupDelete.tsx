import { useCallback } from 'react'
import useLoadGroups from '../data/useLoadGroups'
import useLoadVariables from '../data/useLoadVariables'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'

export default function useGroupDelete() {
  const { deleteGroup } = useProject()
  const project = useActiveProject()
  const loadGroups = useLoadGroups()
  const loadVariables = useLoadVariables()

  return useCallback(
    async (groupId: string) => {
      try {
        if (!project) throw new Error('No active project')

        await deleteGroup(project.id, groupId)

        await loadGroups()
        await loadVariables()
      } catch (e) {}
    },
    [project, deleteGroup, loadGroups, loadVariables],
  )
}
