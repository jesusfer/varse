import { useRecoilValue } from 'recoil'
import { projectListAtom } from '../../state/state'
import { Project } from '../../backend/types'

export default function useProjectList(): Project[] {
  return useRecoilValue(projectListAtom)
}
