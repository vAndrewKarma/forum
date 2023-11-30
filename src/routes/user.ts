import express, { Request, Response } from 'express'
import { Signup } from '../controller/user'
import { logger } from '../common/utils/logger'
import passport from '../config/passport'
const router = express.Router()
import { UserDocument } from '../models/user'
import checkAuth from '../common/utils/check-auth'

// Register route
router.post('/register', Signup)

// Login route
router.post('/login', function (req, res, next) {
  passport.authenticate(
    'local',
    function (err: Error, user: UserDocument, info) {
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
    }
  )(req, res, next)
})

// Logout route
router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('connect.sid')
  req.logout(undefined)
  req.sessionID = ''
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
  res.send('authorized')
})

export { router as UserRoutes }
