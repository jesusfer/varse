import { AuthService } from './auth'
import { HTTPService } from './http'
import {
  ApiKey,
  Group,
  LoginRequest,
  LoginResponse,
  Project,
  ProjectShareLink,
  ProjectUser,
  SignupRequest,
  SignupResponse,
  UserInfo,
  Variable,
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

  async getUserInfo(): Promise<UserInfo> {
    return this.httpService.request(
      '/user',
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
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

  async createProject(projectName: string): Promise<Project> {
    return this.httpService.request(
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

  async deleteProject(projectId: string): Promise<void> {
    await this.httpService.request(
      `/project/${projectId}`,
      'DELETE',
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

  async createGroup(projectId: string, name: string): Promise<Group> {
    return this.httpService.request(
      `/project/${projectId}/groups`,
      'POST',
      { name },
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async getGroups(projectId: string): Promise<Group[]> {
    return this.httpService.request(
      `/project/${projectId}/groups`,
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async updateGroup(
    projectId: string,
    groupId: string,
    name: string,
  ): Promise<Group> {
    return this.httpService.request(
      `/project/${projectId}/groups/${groupId}`,
      'POST',
      { name },
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async deleteGroup(projectId: string, groupId: string): Promise<Group> {
    return this.httpService.request(
      `/project/${projectId}/groups/${groupId}`,
      'DELETE',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async createVariable(
    projectId: string,
    groupId: string,
    key: string,
    value: string,
  ): Promise<Variable> {
    return this.httpService.request(
      `/project/${projectId}/variables`,
      'POST',
      { groupId, key, value },
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async getVariables(projectId: string): Promise<Variable[]> {
    return this.httpService.request(
      `/project/${projectId}/variables`,
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async getVariableById(
    projectId: string,
    variableId: string,
  ): Promise<Variable> {
    return this.httpService.request(
      `/project/${projectId}/variables/${variableId}`,
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async updateVariable(
    projectId: string,
    variableId: string,
    value: string,
    groupId: string,
  ): Promise<void> {
    await this.httpService.request(
      `/project/${projectId}/variables/${variableId}`,
      'PUT',
      { value, groupId },
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async deleteVariable(projectId: string, variableId: string): Promise<void> {
    await this.httpService.request(
      `/project/${projectId}/variables/${variableId}`,
      'DELETE',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async shareProject(projectId: string): Promise<ProjectShareLink> {
    return this.httpService.request(
      `/project/${projectId}/share`,
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async acceptShareLink(projectId: string, linkId: string): Promise<void> {
    await this.httpService.request(
      `/project/${projectId}/share/${linkId}`,
      'POST',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async getProjectUsers(projectId: string): Promise<ProjectUser[]> {
    return this.httpService.request(
      `/project/${projectId}/users`,
      'GET',
      {},
      {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    )
  }

  async deleteProjectUser(projectId: string, userId: string): Promise<void> {
    await this.httpService.request(
      `/project/${projectId}/users/${userId}`,
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
