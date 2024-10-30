import { useCallback } from 'react'
import useBackend from './useBackend'

const useProject = () => {
  const backendService = useBackend()

  const createProject = useCallback(
    async (projectName: string) => {
      return backendService.createProject(projectName)
    },
    [backendService],
  )

  const getProjects = useCallback(async () => {
    return backendService.getProjects()
  }, [backendService])

  return { createProject, getProjects }
}

export default useProject
