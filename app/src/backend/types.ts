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

export type Variable = {
  key: string
  name: string
  value: string
}

export type PendingVariable = {
  key: string
  name: string
  currentValue: string
  pendingValue: string
  createdAt: Date
}

export type HistoryVariable = {
  key: string
  name: string
  originalValue: string
  updatedValue: string
  createdAt: Date
}
