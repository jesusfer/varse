import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useNav from '../utils/useNav'
import useLoadVariables from '../data/useLoadVariables'

export default function useVariableCreate() {
  const navigate = useNav()
  const { createVariable } = useProject()
  const project = useActiveProject()
  const loadVariables = useLoadVariables()

  return useCallback(
    async (groupId: string, key: string, value: string) => {
      try {
        if (!project) throw new Error('No active project')

        const newVariable = await createVariable(
          project.id,
          groupId,
          key,
          value,
        )

        await loadVariables()

        // navigate('variable-details', newVariable.id)
      } catch (e) {}
    },
    [project, createVariable, loadVariables, navigate],
  )
}
