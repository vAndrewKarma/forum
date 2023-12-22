import { NextFunction, Request, Response } from 'express'
import BadRequest from '../common/errors/custom/BadRequest'
import sanitize from '../common/utils/mongo-sanitize'
import {
  validateNewLocation,
  validateRegister,
} from '../common/utils/validation'

import { UserDocument } from '../models/user'
import { UserMethods } from '../services/user.service'
import { logger } from '../common/utils/logger'
import { redServ } from '../services/redis.service'
import CredentialsError from '../common/errors/custom/CredentialsError'

type TuserController = {
  Signup: (req: Request, res: Response, next: NextFunction) => void
  newz_Location: (req: Request, res: Response, next: NextFunction) => void
}
export const usersController: TuserController = {
  Signup: undefined,
  newz_Location: undefined,
}

usersController.Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRegister(req.body)
    const sanitized: UserDocument = sanitize(req.body)
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
    validateNewLocation(req.body)
    const { uid, token } = req.body
    const rez = await redServ.redfindBy(`new_location: ${token}`)
    if (rez == null || rez !== uid) throw new CredentialsError('Invalid link')
    // TODO delete from redis link below here.
    const user = await UserMethods.findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')

    if (!user.ip.includes(req.socket.remoteAddress)) {
      user.ip.push(req.socket.remoteAddress)
      await UserMethods.saveUser(user)
      return res.json({ succes: true, message: 'Location updated' })
    }

    return res.json({ succes: true, message: 'Location already updated' })
  } catch (err) {
    return next(err)
  }
}
