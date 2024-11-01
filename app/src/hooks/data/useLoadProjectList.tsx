import { useCallback } from 'react'
import useProject from '../services/useProject'
import { useSetRecoilState } from 'recoil'
import { projectListAtom } from '../../state/state'

const useLoadProjectList = () => {
  const { getProjects } = useProject()
  const setProjectList = useSetRecoilState(projectListAtom)

  return useCallback(async () => {
    const projects = await getProjects()
    setProjectList(projects)
  }, [getProjects, setProjectList])
}

export default useLoadProjectList
