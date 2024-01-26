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
    logger.debug(email)

    const invalidCrednetials = () =>
      done(new CredentialsError('Invalid credentials'), false)

    try {
      const data = JSON.parse(
        JSON.stringify(validateLogin({ email, password }))
      )
      const uname = sanitize(data.email)
      const user = await UserMethods.findUserBy('email', uname)
      if (!user) {
        return invalidCrednetials()
      }

      const match = await User.comparePassword(
        sanitize(data.password),
        user.password
      )
      if (!match) {
        return invalidCrednetials()
      }

      return done(undefined, user)
    } catch (e) {
      return done(e)
    }
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
