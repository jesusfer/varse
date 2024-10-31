import { useRecoilValue } from 'recoil'
import { activeProjectAtom } from '../../state/state'
import { Project } from '../../backend/types'

export default function useActiveProject(): Project | null {
  return useRecoilValue(activeProjectAtom)
}
