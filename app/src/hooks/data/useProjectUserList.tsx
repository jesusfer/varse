import { useSetRecoilState } from 'recoil'
import useActiveProject from '../state/useActiveProject'
import { projectUserListAtom } from '../../state/state'
import { useCallback } from 'react'
import useProject from '../services/useProject'

const useLoadProjectUserList = () => {
  const { getProjectUsers } = useProject()

  const activeProject = useActiveProject()

  const setProjectUserList = useSetRecoilState(projectUserListAtom)

  return useCallback(async () => {
    if (!activeProject) return

    const projectUsers = await getProjectUsers(activeProject.id)
    setProjectUserList(projectUsers)
  }, [activeProject, getProjectUsers, setProjectUserList])
}

export default useLoadProjectUserList
