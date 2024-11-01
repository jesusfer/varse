import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import {
  activeProjectAtom,
  projectListAtom,
  variableListAtom,
  apiKeyListAtom,
} from '../../state/state'

export default function useProjectCreate() {
  const navigate = useNav()
  const { createProject } = useProject()

  const setActiveProject = useSetRecoilState(activeProjectAtom)
  const setProjectList = useSetRecoilState(projectListAtom)
  const setVariableList = useSetRecoilState(variableListAtom)
  const setApiKeyList = useSetRecoilState(apiKeyListAtom)

  const handleCreateProject = useCallback(
    async (name: string) => {
      try {
        const newProject = await createProject(name)

        setProjectList((currentProjects) => [...currentProjects, newProject])

        setActiveProject(newProject)

        setVariableList([])
        setApiKeyList([])

        navigate('variable-list')

        return newProject
      } catch (e) {}
    },
    [
      createProject,
      setActiveProject,
      setProjectList,
      setVariableList,
      setApiKeyList,
      navigate,
    ],
  )

  return handleCreateProject
}
