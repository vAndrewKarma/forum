import { Request, Response, NextFunction } from 'express'
import NotAuthorized from '../errors/custom/NotAuthorized'

export default function checkAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated()) throw new NotAuthorized('User not authorized')
  return next()
}
