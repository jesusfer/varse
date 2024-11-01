import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import { variableListAtom } from '../../state/state'
import useActiveProject from '../state/useActiveProject'

export default function useVariableUpdate() {
  const { updateVariable, getVariables } = useProject()
  const activeProject = useActiveProject()
  const setVariableList = useSetRecoilState(variableListAtom)

  const handleUpdateVariable = useCallback(
    async (variableId: string, value: string) => {
      try {
        if (!activeProject) {
          throw new Error('No active project')
        }

        await updateVariable(activeProject.id, variableId, value)

        const updatedVariables = await getVariables(activeProject.id)
        setVariableList(updatedVariables)
      } catch (e) {}
    },
    [activeProject, updateVariable, getVariables, setVariableList],
  )

  return handleUpdateVariable
}
