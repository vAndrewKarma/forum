import { NextFunction, Request, Response } from 'express'
import { redServ } from '../services/redis.service'
import sanitize from '../common/utils/mongo-sanitize'
import Csrf from '../common/errors/custom/CsrfError'
import { logger } from '../common/utils/logger'

export async function checkCsrf(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = sanitize(req.body.csrf)
    logger.debug(`TOKEN --- ${token}`)
    if (token === '' || !token || token === null) {
      throw new Csrf('Unauthorized')
    }

    console.log('Token:', token)

    const redisResult = await redServ.redfindBy(`csrf: ${token}`)

    if (redisResult === null) {
      throw new Csrf('Unauthorized')
    }

    const info = `${req.socket.remoteAddress}`
    const rez = JSON.parse(redisResult)

    if (rez === null || rez !== info) {
      throw new Csrf('Unauthorized')
    }

    return next()
  } catch (err) {
    return next(err)
  }
}
