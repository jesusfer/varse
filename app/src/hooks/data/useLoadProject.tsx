import { useSetRecoilState } from 'recoil'
import useActiveProject from '../state/useActiveProject'
import {
  apiKeyListAtom,
  projectUserListAtom,
  variableListAtom,
} from '../../state/state'
import { useCallback } from 'react'
import useProject from '../services/useProject'

const useLoadProject = () => {
  const { getVariables, getApiKeys, getProjectUsers } = useProject()

  const activeProject = useActiveProject()

  const setVariableList = useSetRecoilState(variableListAtom)
  const setApiKeyList = useSetRecoilState(apiKeyListAtom)
  const setProjectUserList = useSetRecoilState(projectUserListAtom)

  return useCallback(async () => {
    if (!activeProject) return

    const [variables, apiKeys, projectUsers] = await Promise.all([
      getVariables(activeProject.id),
      getApiKeys(activeProject.id),
      getProjectUsers(activeProject.id),
    ])

    setVariableList(variables)
    setApiKeyList(apiKeys)
    setProjectUserList(projectUsers)
  }, [
    activeProject,
    getVariables,
    getApiKeys,
    getProjectUsers,
    setVariableList,
    setApiKeyList,
    setProjectUserList,
  ])
}

export default useLoadProject
