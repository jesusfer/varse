import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useLoadVariables from '../data/useLoadVariables'
import { AxiosError } from 'axios'

export default function useVariableCreate() {
  const { createVariable } = useProject()
  const project = useActiveProject()
  const loadVariables = useLoadVariables()

  return useCallback(
    async (groupId: string, key: string, value: string) => {
      try {
        if (!project) throw new Error('No active project')

        await createVariable(project.id, groupId, key, value)

        await loadVariables()
      } catch (e) {
        if (e instanceof AxiosError) {
          console.error(e.response?.data.message)
          if (e.status === 400) throw new Error(e.response?.data.message)
        }
      }
    },
    [project, createVariable, loadVariables],
  )
}
