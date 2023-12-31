import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User, UserDocument } from '../models/user'
import { UserMethods } from '../services/user.service'
import CredentialsError from '../common/errors/custom/CredentialsError'
import BadCookie from '../common/errors/custom/BadCookie'
import { validateLogin } from '../common/utils/validation'
import sanitize from '../common/utils/mongo-sanitize'
import { logger } from '../common/utils/logger'
interface Isession {
  id: string
  username: string
  gender: string
  ip: string
}

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async function (
    // instead of using the username i will use the email...
    email,
    password,
    done
  ) {
    let user: UserDocument
    logger.debug(email)
    try {
      const data = JSON.parse(
        JSON.stringify(validateLogin({ email: email, password: password }))
      )
      const uname = sanitize(data.email)
      user = await UserMethods.findUserBy('email', uname)
      if (!user) {
        return done(new CredentialsError('Invalid credentials'), false)
      }
    } catch (e) {
      return done(e)
    }
    try {
      const data = JSON.parse(
        JSON.stringify(validateLogin({ email: email, password: password }))
      )
      const match = await User.comparePassword(
        sanitize(data.password),
        user.password
      )
      if (!match) {
        return done(new CredentialsError('Invalid credentials'), false)
      }
    } catch (e) {
      return done(e)
    }

    return done(undefined, user)
  })
)

passport.serializeUser((user: UserDocument, done) => {
  done(undefined, {
    id: user._id,
    username: user.username,
    gender: user.gender,
    ip: user.ip,
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
  })
})

passport.deserializeUser(async (session: Isession, done) => {
  try {
    const user = await User.findById(session.id)
    if (!user) {
      return done(new BadCookie('User not exists'), false) // if user does not exist but session still exists delete session
    }
    done(undefined, user)
  } catch (e) {
    done(e)
  }
})

export default passport
