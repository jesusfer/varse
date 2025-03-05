import { useRecoilValue } from 'recoil'
import { groupListAtom } from '../../state/state'
import { Group } from '../../backend/types'

export default function useGroupList(): Group[] {
  return useRecoilValue(groupListAtom)
}
