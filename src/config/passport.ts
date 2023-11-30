import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User, UserDocument } from '../models/user'
import { findUserBy } from '../services/user.service'

interface Isession {
  id: string
  username: string
  gender: string
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
      user = await findUserBy('username', username)
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' })
      }
    } catch (e) {
      return done(e)
    }

    // 2. Check if password matches
    try {
      const match = await User.comparePassword(password, user.password)
      if (!match) {
        return done(null, false, { message: 'Invalid email or password' })
      }
    } catch (e) {
      return done(e)
    }

    return done(undefined, user)
  })
)

passport.serializeUser((user: UserDocument, done) => {
  console.log('serialize')
  done(undefined, {
    id: user._id,
    username: user.username,
    gender: user.gender,
    email: user.email,
  })
})

passport.deserializeUser(async (session: Isession, done) => {
  try {
    const user = await User.findById(session.id)
    if (!user) {
      return done(new Error('Invalid credentials'))
    }
    done(undefined, user)
  } catch (e) {
    done(e)
  }
})

export default passport
