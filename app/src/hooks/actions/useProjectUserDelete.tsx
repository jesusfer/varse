import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useLoadProjectUserList from '../data/useProjectUserList'

export default function useProjectUserDelete() {
  const { deleteProjectUser } = useProject()
  const project = useActiveProject()
  const loadProjectUsers = useLoadProjectUserList()

  return useCallback(
    async (projectUserId: string) => {
      try {
        if (!project) throw new Error('No active project')

        await deleteProjectUser(project.id, projectUserId)

        await loadProjectUsers()
      } catch (error) {}
    },
    [project, deleteProjectUser, loadProjectUsers],
  )
}
