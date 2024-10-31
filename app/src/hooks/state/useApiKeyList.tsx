import { useRecoilValue } from 'recoil'
import { apiKeyListAtom } from '../../state/state'
import { ApiKey } from '../../backend/types'

export default function useApiKeyList(): ApiKey[] {
  return useRecoilValue(apiKeyListAtom)
}
