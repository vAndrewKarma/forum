import BadRequest from '../common/errors/custom/BadRequest'
import sanitize from '../common/utils/mongo-sanitize'
import { validateRegister } from '../common/utils/validation'
import { UserDocument } from '../models/user'
import { findUserBy } from '../services/user.service'
export const Signup = async (req, res, next) => {
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
    res.send(sanitized)
  } catch (err) {
    return next(err)
  }
}
