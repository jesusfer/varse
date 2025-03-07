import {
  ApiKey,
  Group,
  Prisma,
  PrismaClient,
  ProjectShareLink,
  ProjectUser,
  Variable,
} from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { v4 } from 'uuid'
import { ProjectInfo, ServiceError } from './types'

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
        groups: {
          create: {
            name: 'Default',
            isDefault: true,
          },
        },
      },
      include: {
        members: true,
        groups: true,
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
    const key = `pk_${v4().replace(/-/g, '')}`
    try {
      await this.prisma.apiKey.create({
        data: { name, key, projectId },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  getApiKeys = async (projectId: string): Promise<ApiKey[]> => {
    return await this.prisma.apiKey.findMany({
      where: { projectId },
    })
  }

  getApiKeyByKey = async (key: string): Promise<ApiKey | null> => {
    return await this.prisma.apiKey.findUnique({
      where: { key },
    })
  }

  deleteApiKey = async (apiKeyId: string): Promise<void> => {
    await this.prisma.apiKey.delete({ where: { id: apiKeyId } })
  }

  createGroup = async (projectId: string, name: string): Promise<Group> => {
    return await this.prisma.group.create({
      data: { name, projectId },
    })
  }

  getGroups = async (projectId: string): Promise<Group[]> => {
    return await this.prisma.group.findMany({
      where: { projectId },
    })
  }

  updateGroup = async (groupId: string, newName: string): Promise<void> => {
    await this.prisma.group.update({
      where: { id: groupId },
      data: { name: newName },
    })
  }

  deleteGroup = async (projectId: string, groupId: string) => {
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: projectId },
      include: {
        groups: true,
      },
    })
    const group = project.groups.find((g) => g.id === groupId)
    if (!group) {
      throw new Error('Group not found in project')
    }
    if (group.isDefault) {
      throw new Error('Cannot delete the default group')
    }
    const defaultGroupId = project.groups.find((g) => g.isDefault)?.id
    const variables = await this.prisma.variable.findMany({
      where: { groupId: groupId },
    })
    if (variables.length > 0) {
      await this.prisma.variable.updateMany({
        where: { groupId: groupId },
        data: { groupId: defaultGroupId },
      })
    }
    await this.prisma.group.delete({
      where: { id: groupId },
    })
  }

  createVariable = async (
    projectId: string,
    groupId: string,
    key: string,
    value: string
  ): Promise<Variable> => {
    try {
      return await this.prisma.variable.create({
        data: { projectId, groupId, key, value },
      })
    } catch (error) {
      let message = 'Internal server error: query error'
      let status = 500
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            message = 'A variable with that key already exists'
            status = 400
            break
          default:
            break
        }
      }
      throw new ServiceError(message, status)
    }
  }

  getVariables = async (projectId: string): Promise<Variable[]> => {
    const groups = await this.prisma.group.findMany({
      where: { projectId },
      include: { variables: true },
    })
    return groups.flatMap((value, index, array) => value.variables)
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

  getVariablesByGroup = async (groupId: string): Promise<Variable[]> => {
    return await this.prisma.variable.findMany({
      where: { groupId },
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

  deleteProjectUser = async (
    userId: string,
    projectId: string
  ): Promise<void> => {
    await this.prisma.projectUser.delete({
      where: { userId_projectId: { userId, projectId } },
    })
  }
}
