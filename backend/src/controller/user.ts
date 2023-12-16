import { NextFunction, Request, Response } from 'express'
import BadRequest from '../common/errors/custom/BadRequest'
import sanitize from '../common/utils/mongo-sanitize'
import {
  validateNewLocation,
  validateRegister,
} from '../common/utils/validation'

import { UserDocument } from '../models/user'
import { createUser, findUserBy } from '../services/user.service'
import { logger } from '../config/logger'
import { redfindBy } from '../services/redis.service'
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
    const username_exists = await findUserBy(
      'username',
      sanitized.username.toLowerCase()
    )
    if (username_exists)
      throw new BadRequest('Username already used', 'username')

    const email_exists = await findUserBy(
      'email',
      sanitized.email.toLowerCase()
    )
    if (email_exists) throw new BadRequest('Email already used', 'email')

    const user = createUser({ ...sanitized, ip: req.socket.remoteAddress })
    await user.save()
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
    //TODO MAKE IT FIND BY TOKEN
    const { uid, token } = req.body
    const rez = await redfindBy(`new_location: ${uid}`)
    if (rez == null || rez !== token) throw new CredentialsError('Invalid link')
    const user = await findUserBy('_id', uid)
    if (!user) throw new CredentialsError('Invalid link')
    user.ip = req.socket.remoteAddress
    user.save()
    // TODO delete from redis link
    res.json({ succes: true })
  } catch (err) {
    return next(err)
  }
}
