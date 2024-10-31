import { useRecoilValue } from 'recoil'
import { projectUserListAtom } from '../../state/state'
import { ProjectUser } from '../../backend/types'

export default function useProjectUserList(): ProjectUser[] {
  return useRecoilValue(projectUserListAtom)
}
