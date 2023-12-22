import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User, UserDocument } from '../models/user'
import { UserMethods } from '../services/user.service'
import CredentialsError from '../common/errors/custom/CredentialsError'
import BadCookie from '../common/errors/custom/BadCookie'
interface Isession {
  id: string
  username: string
  gender: string
  ip: string
}

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'username' }, async function (
    username,
    password,
    done
  ) {
    let user: UserDocument
    // 1. Check if the user is found
    try {
      user = await UserMethods.findUserBy('username', username)
      if (!user) {
        return done(new CredentialsError('Invalid credentials'), false)
      }
    } catch (e) {
      return done(e)
    }
    // 2. Check if password matches
    try {
      const match = await User.comparePassword(password, user.password)
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
