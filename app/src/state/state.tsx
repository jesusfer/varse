import { atom } from 'recoil'
import {
  Project,
  Variable,
  ApiKey,
  ProjectUser,
  UserInfo,
} from '../backend/types'
import persistAtom from './persistAtom'

export const userInfoAtom = atom<UserInfo | null>(
  persistAtom({
    key: 'userInfo',
    default: null,
    persistMode: 'local',
  }),
)

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

export const projectUserListAtom = atom<ProjectUser[]>({
  key: 'projectUserList',
  default: [],
})
