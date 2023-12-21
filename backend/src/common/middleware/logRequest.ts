import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

export function logRequest(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()

  res.on('close', () => {
    if (req?.route?.path) {
      const duration = Date.now() - start
      logger.debug(
        `${req.socket.remoteAddress} --> ${req.method}${req.route.path} - ${duration}ms`
      )
    }
  })
  next()
}
