import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { groupListAtom } from '../../state/state'
import useProject from '../services/useProject'
import useActiveProject from '../state/useActiveProject'

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
