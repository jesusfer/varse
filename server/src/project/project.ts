import { ApiKey, Prisma, PrismaClient, Variable } from '@prisma/client'
import { ProjectInfo } from './types'

export class ProjectService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  createProject = async (
    input: Prisma.ProjectCreateInput,
    userId: string
  ): Promise<ProjectInfo> => {
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

  getProjects = async (userId: string): Promise<ProjectInfo[]> => {
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

  createApiKey = async (projectId: string, name: string): Promise<void> => {
    const key = crypto.randomUUID()
    await this.prisma.apiKey.create({
      data: { name, key, projectId },
    })
  }

  getApiKeys = async (projectId: string): Promise<ApiKey[]> => {
    const apiKeys = await this.prisma.apiKey.findMany({
      where: { projectId },
    })
    return apiKeys
  }

  deleteApiKey = async (apiKeyId: string): Promise<void> => {
    await this.prisma.apiKey.delete({ where: { id: apiKeyId } })
  }

  createVariable = async (
    projectId: string,
    key: string,
    value: string
  ): Promise<void> => {
    await this.prisma.variable.create({ data: { projectId, key, value } })
  }

  getVariables = async (projectId: string): Promise<Variable[]> => {
    const variables = await this.prisma.variable.findMany({
      where: { projectId },
    })
    return variables
  }

  getVariableById = async (variableId: string): Promise<Variable | null> => {
    const variable = await this.prisma.variable.findUnique({
      where: { id: variableId },
    })
    return variable
  }

  updateVariable = async (variableId: string, value: string): Promise<void> => {
    await this.prisma.variable.update({
      where: { id: variableId },
      data: { value },
    })
  }

  deleteVariable = async (variableId: string): Promise<void> => {
    await this.prisma.variable.delete({ where: { id: variableId } })
  }

  verifyProjectAccess = async (
    userId: string,
    projectId: string
  ): Promise<boolean> => {
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
