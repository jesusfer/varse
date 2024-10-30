import { Prisma, PrismaClient } from '@prisma/client'
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
}
