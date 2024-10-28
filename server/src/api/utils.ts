import { Request } from 'express'

export const getTokenFromRequest = (req: Request): string | undefined => {
  return req.headers.authorization?.split(' ')[1]
}
