import { useSetRecoilState } from 'recoil'
import useActiveProject from '../state/useActiveProject'
import { groupListAtom } from '../../state/state'
import { useCallback } from 'react'
import useProject from '../services/useProject'

const useLoadGroups = () => {
  const { getGroups } = useProject()

  const activeProject = useActiveProject()
  const setGroupList = useSetRecoilState(groupListAtom)

  return useCallback(async () => {
    if (!activeProject) return

    const groups = await getGroups(activeProject.id)
    setGroupList(groups)
  }, [activeProject, getGroups, setGroupList])
}

export default useLoadGroups
