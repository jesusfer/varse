import { useSetRecoilState } from 'recoil'
import { activeProjectAtom } from '../../state/state'
import useProject from '../services/useProject'
import useNav from '../utils/useNav'

const useAcceptShareLink = () => {
  const navigate = useNav()
  const { acceptShareLink, getProjects } = useProject()
  const setActiveProject = useSetRecoilState(activeProjectAtom)

  return async (projectId: string, linkId: string) => {
    await acceptShareLink(projectId, linkId)

    const projects = await getProjects()
    setActiveProject(projects.find((p) => p.id === projectId) || null)

    navigate('variables')
  }
}

export default useAcceptShareLink
