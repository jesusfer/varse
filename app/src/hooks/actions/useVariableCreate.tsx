import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import { variableListAtom } from '../../state/state'
import useActiveProject from '../state/useActiveProject'

export default function useVariableCreate() {
  const { createVariable, getVariables } = useProject()
  const activeProject = useActiveProject()
  const setVariableList = useSetRecoilState(variableListAtom)

  const handleCreateVariable = useCallback(
    async (key: string, value: string) => {
      try {
        if (!activeProject) {
          throw new Error('No active project')
        }

        await createVariable(activeProject.id, key, value)

        const updatedVariables = await getVariables(activeProject.id)
        setVariableList(updatedVariables)
      } catch (e) {}
    },
    [activeProject, createVariable, getVariables, setVariableList],
  )

  return handleCreateVariable
}
