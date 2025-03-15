import cors from 'cors'
import express, { Express } from 'express'
import { AuthRoutes } from './api/auth'
import { HealthRoutes } from './api/health'
import { ProjectRoutes } from './api/project'
import { UserRoutes } from './api/user'
import { VariableRoutes } from './api/variable'
import { AuthService } from './auth/auth'
import { AuthMiddleware } from './auth/auth.middleware'
import { JwtService } from './auth/jwt'
import { ProjectService } from './project/project'
import { UserInfo } from './user/types'
import { UserService } from './user/user'
import { getLogger } from './utils/logging'
import { SettingsService } from './utils/settings'

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo
      projectId?: string
    }
  }
}

const logger = getLogger('server')

const app: Express = express()
const port = SettingsService.get('PORT', '80')

const jwtService = new JwtService()
const userService = new UserService()
const projectService = new ProjectService()
const authService = new AuthService(userService, jwtService)
const authMiddleware = new AuthMiddleware(authService, projectService)

const userRoutes = new UserRoutes(userService, authService, authMiddleware)
const projectRoutes = new ProjectRoutes(projectService, authMiddleware)
const authRoutes = new AuthRoutes(userService, authService)
const variableRoutes = new VariableRoutes(projectService, authMiddleware)
const healthRoutes = new HealthRoutes()

app.use(express.json())
app.use(cors())

userRoutes.addRoutes(app)
authRoutes.addRoutes(app)
projectRoutes.addRoutes(app)
variableRoutes.addRoutes(app)
healthRoutes.addRoutes(app)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
