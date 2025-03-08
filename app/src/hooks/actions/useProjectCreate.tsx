import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import { activeProjectAtom } from '../../state/state'
import useLoadProjectList from '../data/useLoadProjectList'

export default function useProjectCreate() {
  const navigate = useNav()
  const { createProject } = useProject()
  const loadProjectList = useLoadProjectList()

  const setActiveProject = useSetRecoilState(activeProjectAtom)

  return useCallback(
    async (name: string) => {
      try {
        const newProject = await createProject(name)

        setActiveProject(newProject)

        await loadProjectList()

        navigate('variables')
      } catch (e) {}
    },
    [createProject, setActiveProject, loadProjectList, navigate],
  )
}
