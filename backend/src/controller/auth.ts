import { Request, Response, NextFunction } from 'express'
import { UserDocument } from '../models/user'
import passport from '../config/passport'
import CredentialsError from '../common/errors/custom/CredentialsError'
import { logger } from '../common/utils/logger'
import { EmailServ } from '../services/mail.service'
import sanitize from '../common/utils/mongo-sanitize'
import { validateLogin } from '../common/utils/validation'
type TAuthController = {
  Login: (req: Request, res: Response, next: NextFunction) => void
  Logout: (req: Request, res: Response, _next: NextFunction) => void
}
export const AuthController: TAuthController = {
  Login: undefined,
  Logout: undefined,
}

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000
const THREE_HOURS = 3 * 60 * 60 * 1000

AuthController.Login = async (
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
        try {
          if (err) {
            throw err
          } else if (!user) {
            throw new CredentialsError(info.message)
          }

          if (!user.ip.includes(req.socket.remoteAddress)) {
            try {
              EmailServ.NewLocation(user.email, user._id)
              return res
                .status(403)
                .json({ message: 'New location detected. Verify your email' })
            } catch (err) {
              return next(err)
            }
          }

          await new Promise<void>((resolve, reject) => {
            req.logIn(user, (err) => {
              if (err) reject(err)
              resolve()
            })
          })
          logger.debug(req.body.rememberMe)
          req.session.cookie.maxAge = sanitize(req.body.rememberMe)
            ? ONE_WEEK
            : THREE_HOURS

          res.status(200).json({
            data: {
              loggedIn: true,
              success: true,
              message: 'User logged in',
            },
          })
        } catch (err) {
          return next(err)
        }
      }
    )(req, res, next)
  } catch (err) {
    return next(err)
  }
}

AuthController.Logout = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  req.logout(() => {
    logger.debug('Logged out')
  })
  if (req.session.user) {
    res.clearCookie('user_sid')
    req.session.destroy(function (err) {
      if (err) logger.error(err)
    })
  }

  logger.debug('User Logged out, session destroyed')

  return res.status(200).json({
    data: { loggedIn: false, message: 'User Successfully Logged Out' },
  })
}
