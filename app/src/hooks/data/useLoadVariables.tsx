import { useSetRecoilState } from 'recoil'
import useActiveProject from '../state/useActiveProject'
import { variableListAtom } from '../../state/state'
import { useCallback } from 'react'
import useProject from '../services/useProject'

const useLoadVariables = () => {
  const { getVariables } = useProject()

  const activeProject = useActiveProject()
  const setVariableList = useSetRecoilState(variableListAtom)

  return useCallback(async () => {
    if (!activeProject) return

    const variables = await getVariables(activeProject.id)
    setVariableList(variables)
  }, [activeProject, getVariables, setVariableList])
}

export default useLoadVariables
