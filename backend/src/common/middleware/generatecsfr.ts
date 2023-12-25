import { NextFunction, Request, Response } from 'express'

export const generatecsfr = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.csfrTooken = req.csrfToken()
  return next()
}
