import {
  ApiKey,
  Prisma,
  PrismaClient,
  ProjectShareLink,
  ProjectUser,
  Variable,
} from '@prisma/client'
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

  deleteProject = async (projectId: string): Promise<void> => {
    await this.prisma.project.delete({ where: { id: projectId } })
  }

  createApiKey = async (projectId: string, name: string): Promise<void> => {
    const key = crypto.randomUUID()
    await this.prisma.apiKey.create({
      data: { name, key, projectId },
    })
  }

  getApiKeys = async (projectId: string): Promise<ApiKey[]> => {
    return await this.prisma.apiKey.findMany({
      where: { projectId },
    })
  }

  getApiKeyByKey = async (key: string): Promise<ApiKey | null> => {
    return await this.prisma.apiKey.findFirst({
      where: { key },
    })
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
    return await this.prisma.variable.findMany({
      where: { projectId },
    })
  }

  getVariableById = async (variableId: string): Promise<Variable | null> => {
    return await this.prisma.variable.findUnique({
      where: { id: variableId },
    })
  }

  getVariableByKey = async (
    projectId: string,
    key: string
  ): Promise<Variable | null> => {
    return await this.prisma.variable.findUnique({
      where: { projectId_key: { projectId, key } },
    })
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

  createShareLink = async (projectId: string): Promise<ProjectShareLink> => {
    return await this.prisma.projectShareLink.create({
      data: {
        projectId: projectId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  }

  acceptShareLink = async (userId: string, linkId: string): Promise<void> => {
    const link = await this.prisma.projectShareLink.findUnique({
      where: { id: linkId },
    })
    if (!link || link.expiresAt < new Date()) {
      throw new Error('Invalid share link')
    }

    await this.prisma.projectUser.create({
      data: {
        userId: userId,
        projectId: link.projectId,
        role: 'MEMBER',
      },
    })
  }

  getProjectUsers = async (projectId: string): Promise<ProjectUser[]> => {
    const users = await this.prisma.projectUser.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    })

    return users.map((u) => ({
      id: u.userId,
      projectId: u.projectId,
      userId: u.userId,
      email: u.user.email,
      role: u.role,
    }))
  }
}
