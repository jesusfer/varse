import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import { variableListAtom } from '../../state/state'
import useActiveProject from '../state/useActiveProject'

export default function useVariableDelete() {
  const navigate = useNav()
  const { deleteVariable, getVariables } = useProject()
  const activeProject = useActiveProject()
  const setVariableList = useSetRecoilState(variableListAtom)

  const handleDeleteVariable = useCallback(
    async (variableId: string) => {
      try {
        if (!activeProject) {
          throw new Error('No active project')
        }

        await deleteVariable(activeProject.id, variableId)

        const updatedVariables = await getVariables(activeProject.id)
        setVariableList(updatedVariables)

        navigate('variable-list')
      } catch (error) {
        console.error('Failed to delete variable:', error)
        throw error
      }
    },
    [activeProject, deleteVariable, getVariables, setVariableList, navigate],
  )

  return handleDeleteVariable
}
