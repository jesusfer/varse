import { useRecoilValue } from 'recoil'
import { apiKeyListAtom as keyListAtom } from '../../state/state'
import { ApiKey } from '../../backend/types'

export default function useKeyList(): ApiKey[] {
  return useRecoilValue(keyListAtom)
}
