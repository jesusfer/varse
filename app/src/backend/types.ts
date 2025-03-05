export type SignupRequest = {
  email: string
  password: string
}

export type SignupResponse = {
  user: UserInfo
  token: AuthToken
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: AuthToken
}

export type UserInfo = {
  id: string
  email: string
}

export type AuthToken = {
  token: string
}

export type Project = {
  id: string
  name: string
}

export type ProjectUser = {
  id: string
  email: string
  role: ProjectRole
}

export enum ProjectRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export type ApiKey = {
  id: string
  name: string
  key: string
  lastUsed: Date | null
}

export type Group = {
  id: string
  name: string
  isDefault: boolean
}

export type Variable = {
  id: string
  key: string
  value: string
}

export type ProjectShareLink = {
  id: string
  projectId: string
  expiresAt: Date
}

export type Referal = {
  id: string
  projectId: string
}
