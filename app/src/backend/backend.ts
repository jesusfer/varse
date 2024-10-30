import { AuthService } from './auth'
import { HTTPService } from './http'
import {
  ApiKey,
  LoginRequest,
  LoginResponse,
  Project,
  SignupRequest,
  SignupResponse,
} from './types'

export class BackendService {
  private httpService: HTTPService
  private authService: AuthService

  constructor(httpService: HTTPService, authService: AuthService) {
    this.httpService = httpService
    this.authService = authService
  }

  async signup(signupRequest: SignupRequest): Promise<SignupResponse> {
    const user = await this.httpService.request<SignupResponse>(
      '/user',
      'POST',
      signupRequest,
    )
    this.authService.setToken(user.token.token)
    return user
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.httpService.request<LoginResponse>(
      '/login',
      'POST',
      loginRequest,
    )
    this.authService.setToken(user.token.token)
    return user
  }

  async validate(): Promise<void> {
    await this.httpService.request(
      '/validate',
      'POST',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async createProject(projectName: string): Promise<void> {
    await this.httpService.request(
      '/project',
      'POST',
      { name: projectName },
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async getProjects(): Promise<Project[]> {
    return this.httpService.request(
      '/project',
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async createApiKey(projectId: string, name: string): Promise<void> {
    await this.httpService.request(
      `/project/${projectId}/apikeys`,
      'POST',
      { name },
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async getApiKeys(projectId: string): Promise<ApiKey[]> {
    return this.httpService.request(
      `/project/${projectId}/apikeys`,
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async deleteApiKey(projectId: string, apiKeyId: string): Promise<void> {
    await this.httpService.request(
      `/project/${projectId}/apikeys/${apiKeyId}`,
      'DELETE',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async logout(): Promise<void> {
    this.authService.clearToken()
  }
}
