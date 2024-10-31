import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import {
  projectListAtom,
  activeProjectAtom,
  variableListAtom,
  apiKeyListAtom,
} from '../../state/state'

export default function useReloadDashboard() {
  const navigate = useNav()
  const { getProjects, getVariables, getApiKeys } = useProject()

  const setProjectList = useSetRecoilState(projectListAtom)
  const setActiveProject = useSetRecoilState(activeProjectAtom)
  const setVariableList = useSetRecoilState(variableListAtom)
  const setApiKeyList = useSetRecoilState(apiKeyListAtom)

  const activeProject = useRecoilValue(activeProjectAtom)

  return useCallback(async () => {
    try {
      const projects = await getProjects()
      setProjectList(projects)

      if (projects.length === 0) {
        setActiveProject(null)
        setVariableList([])
        setApiKeyList([])
        navigate('first-project')
        return
      }

      let project = activeProject

      if (!project || !projects.find((p) => p.id === project?.id)) {
        project = projects[0]
      }

      setActiveProject(project)

      const [variables, apiKeys] = await Promise.all([
        getVariables(project.id),
        getApiKeys(project.id),
      ])

      setVariableList(variables)
      setApiKeyList(apiKeys)

      return projects
    } catch (error) {
      console.error('Failed to reload dashboard:', error)
      throw error
    }
  }, [
    getProjects,
    getVariables,
    getApiKeys,
    setProjectList,
    setActiveProject,
    setVariableList,
    setApiKeyList,
    activeProject,
    navigate,
  ])
}
