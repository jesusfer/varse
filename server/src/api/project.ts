import { Request, Response, Router } from 'express'
import { ProjectService } from '../project/project'
import { AuthMiddleware } from '../auth/auth.middleware'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ServiceError } from '../project/types'

export class ProjectRoutes {
  private projectService: ProjectService
  private authMiddleware: AuthMiddleware

  constructor(projectService: ProjectService, authMiddleware: AuthMiddleware) {
    this.projectService = projectService
    this.authMiddleware = authMiddleware
  }

  addRoutes = (router: Router) => {
    router.post(
      '/project',
      this.authMiddleware.authenticate,
      this.createProject
    )
    router.get('/project', this.authMiddleware.authenticate, this.getProjects)
    router.delete(
      '/project/:projectId',
      this.authMiddleware.verifyAccess,
      this.deleteProject
    )

    router.post(
      '/project/:projectId/apikeys',
      this.authMiddleware.verifyAccess,
      this.createApiKey
    )
    router.get(
      '/project/:projectId/apikeys',
      this.authMiddleware.verifyAccess,
      this.getApiKeys
    )
    router.delete(
      '/project/:projectId/apikeys/:apiKeyId',
      this.authMiddleware.verifyAccess,
      this.deleteApiKey
    )

    router.post(
      '/project/:projectId/groups',
      this.authMiddleware.verifyAccess,
      this.createGroup
    )
    router.get(
      '/project/:projectId/groups',
      this.authMiddleware.verifyAccess,
      this.getGroups
    )
    router.post(
      '/project/:projectId/groups/:groupId',
      this.authMiddleware.verifyAccess,
      this.updateGroup
    )
    router.delete(
      '/project/:projectId/groups/:groupId',
      this.authMiddleware.verifyAccess,
      this.deleteGroup
    )

    router.post(
      '/project/:projectId/variables',
      this.authMiddleware.verifyAccess,
      this.createVariable
    )
    router.get(
      '/project/:projectId/variables',
      this.authMiddleware.verifyAccess,
      this.getVariables
    )
    router.get(
      '/project/:projectId/variables/:variableId',
      this.authMiddleware.verifyAccess,
      this.getVariableById
    )
    router.put(
      '/project/:projectId/variables/:variableId',
      this.authMiddleware.verifyAccess,
      this.updateVariable
    )
    router.delete(
      '/project/:projectId/variables/:variableId',
      this.authMiddleware.verifyAccess,
      this.deleteVariable
    )

    router.get(
      '/project/:projectId/share',
      this.authMiddleware.verifyAccess,
      this.shareProject
    )
    router.post(
      '/project/:projectId/share/:linkId',
      this.authMiddleware.authenticate,
      this.acceptShareLink
    )

    router.get(
      '/project/:projectId/users',
      this.authMiddleware.verifyAccess,
      this.getProjectUsers
    )
    router.delete(
      '/project/:projectId/users/:userId',
      this.authMiddleware.verifyAccess,
      this.deleteProjectUser
    )
  }

  private createProject = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }

      const project = await this.projectService.createProject(
        req.body,
        req.user.id
      )
      res.json(project)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }

      const projects = await this.projectService.getProjects(req.user.id)
      res.json(projects)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private deleteProject = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this.projectService.deleteProject(req.params.projectId)
      res.json({ message: 'Project deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private createApiKey = async (req: Request, res: Response): Promise<void> => {
    try {
      const apiKey = await this.projectService.createApiKey(
        req.params.projectId,
        req.body.name
      )
      res.json(apiKey)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getApiKeys = async (req: Request, res: Response): Promise<void> => {
    try {
      const apiKeys = await this.projectService.getApiKeys(req.params.projectId)
      res.json(apiKeys)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private deleteApiKey = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.projectService.deleteApiKey(req.params.apiKeyId)
      res.json({ message: 'Api key deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const group = await this.projectService.createGroup(
        req.params.projectId,
        req.body.name
      )
      res.json(group)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const groups = await this.projectService.getGroups(req.params.projectId)
      res.json(groups)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private updateGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const group = await this.projectService.updateGroup(
        req.params.groupId,
        req.body.name
      )
      res.json(group)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private deleteGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.projectService.deleteGroup(
        req.params.projectId,
        req.params.groupId
      )
      res.json({ message: 'Group deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private createVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const variable = await this.projectService.createVariable(
        req.params.projectId,
        req.body.groupId,
        req.body.key,
        req.body.value
      )
      res.json(variable)
    } catch (error) {
      var message = 'Internal server error'
      var status = 500
      if (error instanceof ServiceError) {
        message = error.message
        status = error.status
      }
      res.status(status).json({ message })
    }
  }

  private getVariables = async (req: Request, res: Response): Promise<void> => {
    try {
      const variables = await this.projectService.getVariables(
        req.params.projectId
      )
      res.json(variables)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getVariableById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const variable = await this.projectService.getVariableById(
        req.params.variableId
      )
      res.json(variable)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private updateVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this.projectService.updateVariable(
        req.params.variableId,
        req.body.value
      )
      res.json({ message: 'Variable updated' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private deleteVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this.projectService.deleteVariable(req.params.variableId)
      res.json({ message: 'Variable deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private shareProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const link = await this.projectService.createShareLink(
        req.params.projectId
      )
      res.json(link)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private acceptShareLink = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }

      await this.projectService.acceptShareLink(req.user.id, req.params.linkId)
      res.json({ message: 'Project shared' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getProjectUsers = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const projectUsers = await this.projectService.getProjectUsers(
        req.params.projectId
      )
      res.json(projectUsers)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private deleteProjectUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this.projectService.deleteProjectUser(
        req.params.userId,
        req.params.projectId
      )
      res.json({ message: 'Project user deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
