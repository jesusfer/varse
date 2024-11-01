import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import { projectUserListAtom } from '../../state/state'
import useActiveProject from '../state/useActiveProject'

export default function useProjectUserDelete() {
  const { deleteProjectUser, getProjectUsers } = useProject()
  const activeProject = useActiveProject()
  const setProjectUserList = useSetRecoilState(projectUserListAtom)

  const handleDeleteProjectUser = useCallback(
    async (projectUserId: string) => {
      try {
        if (!activeProject) {
          throw new Error('No active project')
        }

        await deleteProjectUser(activeProject.id, projectUserId)

        const updatedProjectUsers = await getProjectUsers(activeProject.id)
        setProjectUserList(updatedProjectUsers)
      } catch (error) {
        console.error('Failed to delete project user:', error)
        throw error
      }
    },
    [activeProject, deleteProjectUser, getProjectUsers, setProjectUserList],
  )

  return handleDeleteProjectUser
}
