import { Request, Response, NextFunction } from 'express'
import BadCookie from '../errors/custom/BadCookie'
import { logger } from './logger'

export default function protected_route(info: {
  authenthication_route?: boolean
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== 'test') {
      if (info.authenthication_route) {
        if (req.isAuthenticated()) {
          if (
            !req.session.passport.user.ip.includes(req.socket.remoteAddress)
          ) {
            logger.debug('ip s do not match')
            throw new BadCookie('Bad cookie') // if user authenthicated and ip s do not match with the one inside of the coookie delete cookie
          }
          return res.json({
            data: {
              loggedIn: true,
              message: 'User already loggedIn',
            },
          })
        }
      } else {
        if (!req.isAuthenticated())
          return res.status(401).json({
            data: {
              loggedIn: false,
              message: 'User not loggedIn',
            },
          })
        else if (
          !req.session.passport.user.ip.includes(req.socket.remoteAddress)
        ) {
          logger.debug('ip s do not match')
          throw new BadCookie('Bad cookie')
        }
      }
    }
    return next()
  }
}
