import { Request, Response, NextFunction } from 'express'
import { UserDocument } from '../models/user'
import passport from '../config/passport'
import CredentialsError from '../common/errors/custom/CredentialsError'
import { validateLogin } from '../common/utils/validation'

import { logger } from '../config/logger'
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
        res.status(200).json({
          data: {
            loggedIn: true,
            messsage: 'User logged in',
          },
        })
      }
    )(req, res, next)
  } catch (err) {
    return next(err)
  }
}

export const Logout = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  req.logout(() => {
    logger.debug('Logged out')
  })
  // clear the session cookie on the server and the client
  if (req.session.user) {
    res.clearCookie('user_sid')
    req.session.destroy(function (err) {
      if (err) console.log(err)
    })
  }

  console.log('User Logged out, session destroyed')

  return res
    .status(200)
    .json({
      data: { loggedOut: true, message: 'User Successfully Logged Out' },
    })
}
