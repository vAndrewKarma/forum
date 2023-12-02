import { NextFunction, Request, Response } from 'express'
import BadRequest from '../common/errors/custom/BadRequest'
import sanitize from '../common/utils/mongo-sanitize'
import { validateRegister } from '../common/utils/validation'

import { UserDocument } from '../models/user'
import { createUser, findUserBy } from '../services/user.service'
import { logger } from '../config/logger'
export const Signup = async (
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

    const user = createUser({...sanitized,ip:req.socket.remoteAddress})
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
