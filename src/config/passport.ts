import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User, UserDocument } from '../models/user'
import jwt from 'jsonwebtoken'
passport.use(
  'local',
  new LocalStrategy(async function (email, password, done) {
    let user
    // 1. Check if the user is found
    try {
      user = await User.findByUsername(email)
      if (!user) {
        return done(null, false, { message: 'No user found by that email' })
      }
    } catch (e) {
      return done(e)
    }

    // 2. Check if password matches
    try {
      const match = await User.comparePassword(password, user.password)
      if (!match) {
        return done(null, false, { message: 'Password is incorrect' })
      }
    } catch (e) {
      return done(e)
    }

    // 3. User successfully found/authenticated
    const token = `JWT ${jwt.sign({ id: user._id }, 'dsadsadsa')}`
    user.token = token
    delete user.password
    console.log('workks')
    return done(null, user)
  })
)

passport.serializeUser((user: UserDocument, done) => {
  console.log(`Serialize`)
  //console.log(user)
  done(null, { id: user._id, username: user.username, gender: user.gender })
})

passport.deserializeUser(async (id, done) => {
  console.log(`Deserialize`)
  //console.log(id)
  try {
    const user = await User.findById(id)
    if (!user) {
      return done(new Error('user not found'))
    }
    done(null, user)
  } catch (e) {
    done(e)
  }
})

export default passport
