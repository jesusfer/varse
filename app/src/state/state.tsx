import { atom } from 'recoil'
import { Project, Variable, ApiKey } from '../backend/types'
import persistAtom from './persistAtom'

export const activeProjectAtom = atom<Project | null>(
  persistAtom({
    key: 'activeProject',
    default: null,
    persistMode: 'local',
  }),
)

export const projectListAtom = atom<Project[]>(
  persistAtom({
    key: 'projectList',
    default: [],
    persistMode: 'local',
  }),
)

export const variableListAtom = atom<Variable[]>({
  key: 'variableList',
  default: [],
})

export const apiKeyListAtom = atom<ApiKey[]>({
  key: 'apiKeyList',
  default: [],
})
