import express, { Request, Response } from 'express'
// import { Signup } from '../controller/user'
import bcrypt from 'bcrypt'
import { logger } from '../common/utils/logger'
import passport from '../lib/passport'
const router = express.Router()
import { User } from '../models/user'

// Register route
router.post('/register', async (req, res, next) => {
  //console.log(req.body)
  const user = req.body
  const errors = []
  let message = ''
  // Hash and Salt the password before storing the user in the Database
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(user.password, salt)

  try {
    const registeredUser = await new User(user).save()
    if (registeredUser._id) {
      req.login(registeredUser, function (err) {
        if (err) {
          //console.log(err.message)
          return next(err)
        }
        //console.log('added newly registered user to the req.user')
        res.json({ registered: true })
      })
    } else res.json({ registered: false })
  } catch (err) {
    //console.log(err)
    if (err.code === 11000) {
      message = 'Username Already Exists'
      errors.push(message)
      res.json({ registered: false, message, errors })
    } else {
      message = 'Unknown Serverside Error'
      errors.push(message)
      res.json({ registered: false, message, errors })
    }
  }
})

// Login route
router.post('/login', (req, res, next) => {
  // Store any necessary information in the session or request body
  req.session.someData = 'some value'

  // Call passport.authenticate without passReqToCallback
  passport.authenticate('local', async (err, user, data) => {
    try {
      if (err) {
        console.error(err.message)
        return res.json({ authenticated: false, message: 'Other Server error' })
      }

      console.log('test')

      if (!user) {
        return res.json({ authenticated: false, message: data.message })
      }

      console.log('test')

      // Regenerate session with a new Id
      console.log(req.session)
      console.log(req.session.passport)

      if (!req.session.passport || !req.session.passport.user) {
        // Perform session regeneration logic
        req.session.regenerate(async (regenErr) => {
          console.log('test')

          if (regenErr) {
            console.error(regenErr)
            return next(regenErr)
          }

          req.session.type = 'loggedIn'
          req.session.user = user.username
          req.session.visits = 1

          // Set the cookie age to a month if 'Remember Me' is set
          if (req.body.rememberMe) {
            req.session.rememberMe = true
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000 // 1 month
          }

          console.log('test')

          // Log the user in to the passport session
          req.login(user, async (loginErr) => {
            try {
              if (loginErr) {
                console.error(loginErr.message)
                return next(loginErr)
              }

              const nonSensitiveUser = {
                username: user.username,
                email: user.email,
                token: user.token,
              }

              return res.json({ authenticated: true, user: nonSensitiveUser })
            } catch (jsonErr) {
              console.error(jsonErr.message)
              return next(jsonErr)
            }
          })
        })
      }
    } catch (catchErr) {
      console.error(catchErr.message)
      return next(catchErr)
    }
  })(req, res, next)
})

// Logout route
router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('connect.sid')
  req.logout(function (err) {
    console.log(err)
    req.session.destroy(function (err) {
      // destroys the session
      logger.error(err)
      res.send('Logged out')
    })
  })
})

// Route to check if the user is authorized
router.get('/check-auth', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'User is authorized', user: req.user })
  } else {
    res.json({ message: 'User is not authorized' })
  }
})

export { router as UserRoutes }
