import { NextFunction, Request, Response } from 'express'
import { redServ } from '../services/redis.service'
import sanitize from '../common/utils/mongo-sanitize'
import Csrf from '../common/errors/custom/CsrfError'

export async function checkCsrf(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = sanitize(req.body.csrf)

    if (token === '' || !token || token === null) {
      throw new Csrf('Unauthorized')
    }

    // Log the token for debugging
    console.log('Token:', token)

    // Fetch data from Redis
    const redisResult = await redServ.redfindBy(token)

    if (redisResult === null) {
      throw new Csrf('Unauthorized') // or handle the null case accordingly
    }

    // Parse the Redis result
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
