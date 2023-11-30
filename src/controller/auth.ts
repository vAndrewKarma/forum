import { Request, Response, NextFunction } from 'express'
import { UserDocument } from '../models/user'
import { logger } from '../common/utils/logger'
import passport from '../config/passport'
import CredentialsError from '../common/errors/custom/CredentialsError'
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      'local',
      async function (
        err: Error,
        user: UserDocument,
        info: { message: string }
      ) {
        if (err) {
          return next(err)
        }

        if (!user) throw new CredentialsError(info.message)

        await new Promise<void>((resolve, reject) => {
          req.logIn(user, (err) => {
            if (err) reject(err)
            resolve()
          })
        })
        res.status(200).send('Authorized')
      }
    )(req, res, next)
  } catch (err) {
    return next(err)
  }
}

export const Logout = async (req: Request, res: Response) => {
  res.clearCookie('user_sid')
  req.logout(undefined)
  req.sessionID = ''
  req.logout(function (err) {
    console.log(err)
    req.session.destroy(function (err) {
      // destroys the session
      logger.error(err)
      res.send('Logged out')
    })
  })
}
