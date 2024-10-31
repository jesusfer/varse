import { useRecoilValue } from 'recoil'
import { variableListAtom } from '../../state/state'
import { Variable } from '../../backend/types'

export default function useVariableList(): Variable[] {
  return useRecoilValue(variableListAtom)
}
