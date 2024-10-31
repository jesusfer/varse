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

export type ApiKey = {
  id: string
  name: string
  key: string
  lastUsed: Date | null
}

export type Variable = {
  id: string
  key: string
  value: string
}
