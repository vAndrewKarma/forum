import { NextFunction, Request, Response } from 'express'
import BadRequest from '../common/errors/custom/BadRequest'
import sanitize from '../common/utils/mongo-sanitize'
import {
  validateTokenUid,
  validateRegister,
  validateResetPassword,
  validateNewPasswordReset,
} from '../common/utils/validation'

import { User, UserDocument } from '../models/user'
import { UserMethods } from '../services/user.service'
import { logger } from '../common/utils/logger'
import { redServ } from '../services/redis.service'
import CredentialsError from '../common/errors/custom/CredentialsError'
import { EmailServ } from '../services/mail.service'
import { generateCsrf } from '../utils/generateCsrf'
import BadCookie from '../common/errors/custom/BadCookie'

type TuserController = {
  Signup: (req: Request, res: Response, next: NextFunction) => void
  newz_Location: (req: Request, res: Response, next: NextFunction) => void
  reset_password_on_account: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
  new_password_profile: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
  reset_password: (req: Request, res: Response, next: NextFunction) => void
  about_me: (req: Request, res: Response, next: NextFunction) => void
  check_link_password_reset: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
  check_link_password_reset_profile: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
  new_password: (req: Request, res: Response, next: NextFunction) => void
  activate_email: (req: Request, res: Response, next: NextFunction) => void
  request_email_verification_code: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
}
export const usersController: TuserController = {
  Signup: undefined,
  newz_Location: undefined,
  about_me: undefined,
  reset_password: undefined,
  check_link_password_reset: undefined,
  new_password: undefined,
  activate_email: undefined,
  check_link_password_reset_profile: undefined,
  request_email_verification_code: undefined,
  reset_password_on_account: undefined,
  new_password_profile: undefined,
}

usersController.Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = JSON.parse(JSON.stringify(validateRegister(req.body)))
    const sanitized: UserDocument = sanitize(data)
    const username_exists = await UserMethods.findUserBy(
      'username',
      sanitized.username.toLowerCase()
    )
    if (username_exists)
      throw new BadRequest('Username already used', 'username')

    const email_exists = await UserMethods.findUserBy(
      'email',
      sanitized.email.toLowerCase()
    )
    if (email_exists) throw new BadRequest('Email already used', 'email')

    const user = UserMethods.createUser({
      ...sanitized,
      ip: req.socket.remoteAddress,
    })
    await UserMethods.saveUser(user)
    if (user._id) {
      await new Promise<void>((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) reject(err)
          resolve()
        })
      })
    }
    logger.debug(user)
    EmailServ.VerifyEmail(sanitized.email, user._id)
    return res.json({
      data: {
        loggedIn: true,
        message: 'User created',
      },
    })
  } catch (err) {
    return next(err)
  }
}

usersController.newz_Location = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = JSON.parse(JSON.stringify(validateTokenUid(req.body)))
    const token = sanitize(data.token)
    const uid = sanitize(data.uid)
    const rez = JSON.parse(await redServ.redfindBy(`new_location: ${token}`))

    if (rez == null || rez !== uid) throw new CredentialsError('Invalid link')

    await redServ.redDel(`new_location: ${token}`)

    const user = await UserMethods.findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')

    if (!user.ip.includes(req.socket.remoteAddress)) {
      user.ip.push(req.socket.remoteAddress)

      await UserMethods.saveUser(user)

      return res.json({ success: true, message: 'Location updated' })
    }

    return res.json({ success: true, message: 'Location already updated' })
  } catch (err) {
    return next(err)
  }
}

usersController.reset_password = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = JSON.parse(JSON.stringify(validateResetPassword(req.body)))
    const email = sanitize(data.email)
    const user = await UserMethods.findUserBy('email', email)

    if (!user) throw new CredentialsError('Email not found')

    EmailServ.NewPassword(email, user._id)

    return res.json({ message: 'Verify your email', success: true })
  } catch (err) {
    return next(err)
  }
}

usersController.reset_password_on_account = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sanitized = sanitize(req.session.passport.user)
    const email = sanitized.email
    const user = await UserMethods.findUserBy('email', email)
    if (!user) throw new CredentialsError('User does not exists anymore')
    EmailServ.NewPasswordForget(email, sanitized.id)
    return res.json({ message: 'Verify your email', success: true })
  } catch (err) {
    return next(err)
  }
}

usersController.check_link_password_reset_profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = JSON.parse(JSON.stringify(validateTokenUid(req.body)))
    const token = sanitize(data.token)
    const uid = sanitize(data.uid)
    const rez = JSON.parse(
      await redServ.redfindBy(`reset_password_profile: ${token}`)
    )

    if (rez.verified === true) throw new CredentialsError('Link already used')
    if (rez == null || rez !== uid) throw new CredentialsError('Invalid link')

    const user = await UserMethods.findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')

    return res.json({ message: 'Good link' })
  } catch (err) {
    return next(err)
  }
}

usersController.new_password_profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.logout(() => {
      logger.debug('Logged out')
    })
    if (req.session.user) {
      res.clearCookie('user_sid')
      req.session.destroy(function (err) {
        if (err) logger.error(err)
      })
    }

    const data = JSON.parse(JSON.stringify(validateNewPasswordReset(req.body)))

    const token = sanitize(data.token)
    const password = sanitize(data.password)
    const uid = sanitize(data.uid)

    const rez = JSON.parse(
      await redServ.redfindBy(`reset_password_profile: ${token}`)
    )

    if (rez === null || rez !== uid) throw new CredentialsError('Invalid link')

    const user = await UserMethods.findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')

    const match = await User.comparePassword(password, user.password)
    if (match)
      throw new CredentialsError(
        'The new password cannot be the same as the current one'
      )

    await redServ.redSetEx(`reset_password_profile: ${token}`, 3600, {
      verified: true,
    })

    user.password = password
    await UserMethods.saveUser(user)

    return res.json({ message: 'worked', succes: true })
  } catch (err) {
    return next(err)
  }
}

usersController.check_link_password_reset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.logout(() => {
      logger.debug('Logged out')
    })
    if (req.session.user) {
      res.clearCookie('user_sid')
      req.session.destroy(function (err) {
        if (err) logger.error(err)
      })
    }

    const data = JSON.parse(JSON.stringify(validateTokenUid(req.body)))
    const token = sanitize(data.token)
    const uid = sanitize(data.uid)
    const rez = JSON.parse(await redServ.redfindBy(`reset_password: ${token}`))

    if (rez == null || rez !== uid) throw new CredentialsError('Invalid link')

    const user = await UserMethods.findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')

    return res.json({ message: 'Good link' })
  } catch (err) {
    return next(err)
  }
}

usersController.new_password = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.logout(() => {
      logger.debug('Logged out')
    })
    if (req.session.user) {
      res.clearCookie('user_sid')
      req.session.destroy(function (err) {
        if (err) logger.error(err)
      })
    }

    const data = JSON.parse(JSON.stringify(validateNewPasswordReset(req.body)))

    const token = sanitize(data.token)
    const password = sanitize(data.password)
    const uid = sanitize(data.uid)

    const rez = JSON.parse(await redServ.redfindBy(`reset_password: ${token}`))

    if (rez === null || rez !== uid) throw new CredentialsError('Invalid link')

    const user = await UserMethods.findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')

    const match = await User.comparePassword(password, user.password)
    if (match)
      throw new CredentialsError(
        'The new password cannot be the same as the current one'
      )

    await redServ.redDel(`reset_password: ${token}`)

    user.password = password
    await UserMethods.saveUser(user)

    return res.json({ message: 'worked', succes: true })
  } catch (err) {
    return next(err)
  }
}

// route1
usersController.about_me = async (req, res, next) => {
  try {
    const token = await generateCsrf(req, res, next)

    if (req.isAuthenticated()) {
      if (!req.session.passport.user.ip.includes(req.socket.remoteAddress)) {
        logger.debug('ip s do not match')
        throw new BadCookie('Bad cookie') // if user authenthicated and ip s do not match with the one inside of the coookie delete cookie
      }
      return res.json({
        loggedIn: true,
        message: 'User loggedIn',
        csrf: token,
        user: req.session.passport.user,
      })
    }
    if (!req.isAuthenticated())
      return res.json({
        loggedIn: false,
        message: 'User not loggedIn',
        csrf: token,
      })
  } catch (err) {
    return next(err)
  }
}

usersController.activate_email = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug(req.session.id)
    const data = JSON.parse(JSON.stringify(validateTokenUid(req.body)))

    const token = sanitize(data.token)
    const uid = sanitize(data.uid)

    const rez = JSON.parse(await redServ.redfindBy(`email_verify: ${token}`))

    if (rez === null || rez !== uid) throw new CredentialsError('Invalid link')

    const user = await UserMethods.findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')

    await redServ.redDel(`email_verify: ${token}`)
    if (user.verified) throw new CredentialsError('email already verified')
    user.verified = true
    await UserMethods.saveUser(user)
    if (user._id) {
      await new Promise<void>((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) reject(err)
          resolve()
        })
      })
    }
    return res.json({ message: 'worked', succes: true })
  } catch (err) {
    return next(err)
  }
}

usersController.request_email_verification_code = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sanitized = sanitize(req.session.passport.user)
    if (sanitized.verified) throw new CredentialsError('email already verified')
    EmailServ.VerifyEmail(sanitized.email, sanitized.id)
    return res.json({ message: 'worked', succes: true })
  } catch (err) {
    return next(err)
  }
}
