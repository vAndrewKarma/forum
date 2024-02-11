import { randomBytes } from 'crypto'
import { Request, Response, NextFunction } from 'express'
import { redServ } from '../services/redis.service'
import sanitize from '../common/utils/mongo-sanitize'
export async function generateCsrf(
  req: Request,
  _res: Response,
  _next: NextFunction
) {
  const token = sanitize(randomBytes(20).toString('hex'))
  const info = req.socket.remoteAddress
  await redServ.redSetEx(`csrf: ${sanitize(token.toString())}`, 3600, info)
  return token
}
