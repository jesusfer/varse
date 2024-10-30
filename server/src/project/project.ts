import { ApiKey, Prisma, PrismaClient } from '@prisma/client'
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
