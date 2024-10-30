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

  const createApiKey = useCallback(
    async (projectId: string, name: string) => {
      return backendService.createApiKey(projectId, name)
    },
    [backendService],
  )

  const getApiKeys = useCallback(
    async (projectId: string) => {
      return backendService.getApiKeys(projectId)
    },
    [backendService],
  )

  const deleteApiKey = useCallback(
    async (projectId: string, apiKeyId: string) => {
      return backendService.deleteApiKey(projectId, apiKeyId)
    },
    [backendService],
  )

  return { createProject, getProjects, createApiKey, getApiKeys, deleteApiKey }
}

export default useProject
