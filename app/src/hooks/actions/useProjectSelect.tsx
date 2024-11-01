import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import {
  activeProjectAtom,
  variableListAtom,
  apiKeyListAtom,
} from '../../state/state'
import { Project } from '../../backend/types'

export default function useProjectSelect() {
  const navigate = useNav()
  const { getVariables, getApiKeys } = useProject()

  const setActiveProject = useSetRecoilState(activeProjectAtom)
  const setVariableList = useSetRecoilState(variableListAtom)
  const setApiKeyList = useSetRecoilState(apiKeyListAtom)

  const handleSelectProject = useCallback(
    async (project: Project) => {
      try {
        setActiveProject(project)

        const [variables, apiKeys] = await Promise.all([
          getVariables(project.id),
          getApiKeys(project.id),
        ])

        setVariableList(variables)
        setApiKeyList(apiKeys)

        navigate('variable-list')
      } catch (e) {}
    },
    [
      getVariables,
      getApiKeys,
      setActiveProject,
      setVariableList,
      setApiKeyList,
      navigate,
    ],
  )

  return handleSelectProject
}
