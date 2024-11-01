import { useCallback } from 'react'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'
import useReloadDashboard from './useReloadDashboard'
import useNav from '../utils/useNav'

export default function useProjectDelete() {
  const { deleteProject } = useProject()
  const activeProject = useActiveProject()
  const reloadDashboard = useReloadDashboard()
  const navigate = useNav()

  return useCallback(async () => {
    try {
      if (!activeProject) throw new Error('No active project')

      await deleteProject(activeProject.id)
      await reloadDashboard()
      navigate('variable-list')
    } catch (e) {}
  }, [activeProject, deleteProject, reloadDashboard, navigate])
}
