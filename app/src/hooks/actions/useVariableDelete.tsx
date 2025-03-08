import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import useActiveProject from '../state/useActiveProject'
import useLoadVariables from '../data/useLoadVariables'

export default function useVariableDelete() {
  const navigate = useNav()
  const { deleteVariable } = useProject()
  const project = useActiveProject()
  const loadVariables = useLoadVariables()

  return useCallback(
    async (variableId: string) => {
      try {
        if (!project) throw new Error('No active project')

        await deleteVariable(project.id, variableId)

        await loadVariables()

        navigate('variables')
      } catch (e) {}
    },
    [project, loadVariables, deleteVariable, navigate],
  )
}
