import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import useNav from '../utils/useNav'
import { activeProjectAtom } from '../../state/state'
import { Project } from '../../backend/types'

export default function useProjectSelect() {
  const navigate = useNav()
  const setActiveProject = useSetRecoilState(activeProjectAtom)

  return useCallback(
    async (project: Project) => {
      setActiveProject(project)
      navigate('variable-list')
    },
    [setActiveProject, navigate],
  )
}
