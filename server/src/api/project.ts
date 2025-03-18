import { Request, Response, Router } from 'express'
import { AuthMiddleware } from '../auth/auth.middleware'
import { ProjectService } from '../project/project'
import { ServiceError } from '../project/types'
import { getLogger } from '../utils/logging'

const logger = getLogger('api:project')

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
    if (!req.user) {
      logger.warning(`createProject: missing user`)
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const project = await this.projectService.createProject(
      req.body,
      req.user.id
    )
    res.json(project)
  }

  private getProjects = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      logger.warning('getProjects: missing user')
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const projects = await this.projectService.getProjects(req.user.id)
    res.json(projects)
  }

  private deleteProject = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.projectService.deleteProject(req.params.projectId)
    res.json({ message: 'Project deleted' })
  }

  private createApiKey = async (req: Request, res: Response): Promise<void> => {
    const apiKey = await this.projectService.createApiKey(
      req.params.projectId,
      req.body.name
    )
    res.json(apiKey)
  }

  private getApiKeys = async (req: Request, res: Response): Promise<void> => {
    const apiKeys = await this.projectService.getApiKeys(req.params.projectId)
    res.json(apiKeys)
  }

  private deleteApiKey = async (req: Request, res: Response): Promise<void> => {
    await this.projectService.deleteApiKey(req.params.apiKeyId)
    res.json({ message: 'Api key deleted' })
  }

  private createGroup = async (req: Request, res: Response): Promise<void> => {
    const group = await this.projectService.createGroup(
      req.params.projectId,
      req.body.name
    )
    res.json(group)
  }

  private getGroups = async (req: Request, res: Response): Promise<void> => {
    const groups = await this.projectService.getGroups(req.params.projectId)
    res.json(groups)
  }

  private updateGroup = async (req: Request, res: Response): Promise<void> => {
    const group = await this.projectService.updateGroup(
      req.params.groupId,
      req.body.name
    )
    res.json(group)
  }

  private deleteGroup = async (req: Request, res: Response): Promise<void> => {
    await this.projectService.deleteGroup(
      req.params.projectId,
      req.params.groupId
    )
    res.json({ message: 'Group deleted' })
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
      if (error instanceof ServiceError) {
        logger.error(error.message)
        res.status(error.status).json({ message: error.message })
        return
      }
      throw error
    }
  }

  private getVariables = async (req: Request, res: Response): Promise<void> => {
    const variables = await this.projectService.getVariables(
      req.params.projectId
    )
    res.json(variables)
  }

  private getVariableById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const variable = await this.projectService.getVariableById(
      req.params.variableId
    )
    res.json(variable)
  }

  private updateVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.projectService.updateVariable(
      req.params.variableId,
      req.body.value,
      req.body.groupId
    )
    res.json({ message: 'Variable updated' })
  }

  private deleteVariable = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.projectService.deleteVariable(req.params.variableId)
    res.json({ message: 'Variable deleted' })
  }

  private shareProject = async (req: Request, res: Response): Promise<void> => {
    const link = await this.projectService.createShareLink(req.params.projectId)
    res.json(link)
  }

  private acceptShareLink = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      logger.warning('acceptShareLink: missing user')
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    await this.projectService.acceptShareLink(req.user.id, req.params.linkId)
    res.json({ message: 'Project shared' })
  }

  private getProjectUsers = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const projectUsers = await this.projectService.getProjectUsers(
      req.params.projectId
    )
    res.json(projectUsers)
  }

  private deleteProjectUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.projectService.deleteProjectUser(
      req.params.userId,
      req.params.projectId
    )
    res.json({ message: 'Project user deleted' })
  }
}
