import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useLoadVariables from '../data/useLoadVariables'

export default function useVariableUpdate() {
  const { updateVariable } = useProject()
  const project = useActiveProject()
  const loadVariables = useLoadVariables()

  return useCallback(
    async (variableId: string, value: string, groupId = '') => {
      try {
        if (!project) throw new Error('No active project')

        await updateVariable(project.id, variableId, value, groupId)

        await loadVariables()
      } catch (e) {}
    },
    [project, loadVariables, updateVariable],
  )
}
