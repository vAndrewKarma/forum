import { Request, Response, NextFunction } from 'express'
import { UserDocument } from '../models/user'
import { logger } from '../config/logger'
import passport from '../config/passport'
import CredentialsError from '../common/errors/custom/CredentialsError'
import { validateLogin } from '../common/utils/validation'
import page from '../config/pages-ejs'
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateLogin(req.body)
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
        res.redirect(page.profile.route)
      }
    )(req, res, next)
  } catch (err) {
    return next(err)
  }
}

export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie('user_sid')
  req.logout(undefined)
  req.sessionID = ''
  req.logout(function (err) {
    if (err) return next(err)
    req.session.destroy(function (err) {
      // destroys the session
      logger.error(err)
      res.send('Logged out')
    })
  })
}
