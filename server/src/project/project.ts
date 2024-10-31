import { ApiKey, Prisma, PrismaClient, Variable } from '@prisma/client'
import { ProjectInfo } from './types'

export class ProjectService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createProject(
    input: Prisma.ProjectCreateInput,
    userId: string
  ): Promise<ProjectInfo> {
    const project = await this.prisma.project.create({
      data: {
        ...input,
        members: {
          create: {
            userId,
            role: 'OWNER',
          },
        },
      },
      include: {
        members: true,
      },
    })
    return { id: project.id, name: project.name }
  }

  async getProjects(userId: string): Promise<ProjectInfo[]> {
    const projects = await this.prisma.project.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    })
    return projects
  }

  async createApiKey(projectId: string, name: string): Promise<void> {
    const key = crypto.randomUUID()
    await this.prisma.apiKey.create({
      data: { name, key, projectId },
    })
  }

  async getApiKeys(projectId: string): Promise<ApiKey[]> {
    const apiKeys = await this.prisma.apiKey.findMany({
      where: { projectId },
    })
    return apiKeys
  }

  async deleteApiKey(apiKeyId: string): Promise<void> {
    await this.prisma.apiKey.delete({ where: { id: apiKeyId } })
  }

  async createVariable(
    projectId: string,
    key: string,
    value: string
  ): Promise<void> {
    await this.prisma.variable.create({ data: { projectId, key, value } })
  }

  async getVariables(projectId: string): Promise<Variable[]> {
    const variables = await this.prisma.variable.findMany({
      where: { projectId },
    })
    return variables
  }

  async getVariableById(variableId: string): Promise<Variable | null> {
    const variable = await this.prisma.variable.findUnique({
      where: { id: variableId },
    })
    return variable
  }

  async updateVariable(variableId: string, value: string): Promise<void> {
    await this.prisma.variable.update({
      where: { id: variableId },
      data: { value },
    })
  }

  async deleteVariable(variableId: string): Promise<void> {
    await this.prisma.variable.delete({ where: { id: variableId } })
  }

  async verifyProjectAccess(
    userId: string,
    projectId: string
  ): Promise<boolean> {
    const membership = await this.prisma.projectUser.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })
    return !!membership
  }
}
