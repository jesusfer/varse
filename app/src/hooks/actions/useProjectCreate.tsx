import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'
import { activeProjectAtom } from '../../state/state'

export default function useProjectCreate() {
  const navigate = useNav()
  const { createProject } = useProject()

  const setActiveProject = useSetRecoilState(activeProjectAtom)

  return useCallback(
    async (name: string) => {
      try {
        const newProject = await createProject(name)

        setActiveProject(newProject)

        navigate('variable-list')
      } catch (e) {}
    },
    [createProject, setActiveProject, navigate],
  )
}
