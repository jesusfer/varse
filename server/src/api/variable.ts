import { Request, Response, Router } from 'express'
import { AuthMiddleware } from '../auth/auth.middleware'
import { ProjectService } from '../project/project'
import { getLogger } from '../utils/logging'

const logger = getLogger('api:variable')

export class VariableRoutes {
  private projectService: ProjectService
  private authMiddleware: AuthMiddleware

  constructor(projectService: ProjectService, authMiddleware: AuthMiddleware) {
    this.projectService = projectService
    this.authMiddleware = authMiddleware
  }

  addRoutes = (router: Router) => {
    router.get(
      '/variable/:key',
      this.authMiddleware.authenticateProject,
      this.getVariable
    )
    router.get(
      '/groups/:groupId/variables',
      this.authMiddleware.authenticateProject,
      this.getVariablesByGroup
    )
  }

  getVariable = async (req: Request, res: Response): Promise<void> => {
    if (!req.projectId) {
      logger.info('getVariable: project not found')
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    try {
      const variable = await this.projectService.getVariableByKey(
        req.projectId,
        req.params.key
      )
      res.json(variable)
      logger.info(
        `Requested variable ${req.params.key} in project ${req.projectId}`
      )
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message)
      }
      res.status(404).json({ message: 'Variable not found' })
    }
  }

  private getVariablesByGroup = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const variables = await this.projectService.getVariablesByGroup(
        req.params.groupId
      )
      res.json(variables)
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message)
      }
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
