import express, { Request, Response } from 'express'
// import { Signup } from '../controller/user'
import bcrypt from 'bcrypt'
import { logger } from '../common/utils/logger'
import passport from '../config/passport'
const router = express.Router()
import { User } from '../models/user'
import checkAuth from '../common/utils/check-auth'

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
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log(info)
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(401).json({
        err: info,
      })
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user',
        })
      }

      res.status(200).json({
        status: 'Login successful!',
      })
    })
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
router.get('/check-auth', checkAuth, (req: Request, res: Response) => {
  console.log(JSON.stringify(req.user))
  res.send('authorized')
})

export { router as UserRoutes }
