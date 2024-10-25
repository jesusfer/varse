export class AuthService {
  getToken(): string {
    return localStorage.getItem('bearerToken') || ''
  }

  setToken(token: string): void {
    localStorage.setItem('bearerToken', token)
  }

  clearToken(): void {
    localStorage.removeItem('bearerToken')
  }
}
