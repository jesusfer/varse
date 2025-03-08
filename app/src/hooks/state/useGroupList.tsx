import { useRecoilValue } from 'recoil'
import { Group } from '../../backend/types'
import { groupListAtom } from '../../state/state'

export default function useGroupList(): Group[] {
  return useRecoilValue(groupListAtom)
}
