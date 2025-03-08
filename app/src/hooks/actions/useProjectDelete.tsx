import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useNav from '../utils/useNav'

export default function useProjectDelete() {
  const { deleteProject } = useProject()
  const project = useActiveProject()
  const navigate = useNav()

  return useCallback(async () => {
    try {
      if (!project) throw new Error('No active project')

      await deleteProject(project.id)

      navigate('variables')
    } catch (e) {}
  }, [project, deleteProject, navigate])
}
