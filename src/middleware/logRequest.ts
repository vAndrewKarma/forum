import { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger'

export function logRequest(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()

  res.on('close', () => {
    if (req?.route?.path) {
      // make sure it is not undefined and the path actually exists

      const duration = Date.now() - start
      logger.debug(`${req.method}${req.route.path} - ${duration}ms`)
    }
  })
  next()
}
