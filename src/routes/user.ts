import express, { Request, Response } from 'express'
import { Signup } from '../controller/user'
import { Login, Logout } from '../controller/auth'
import checkAuth from '../common/utils/check-auth'
const router = express.Router()

// Register route
router.post('/register', Signup)

// Login route
router.post('/login', Login)

// Logout route
router.get('/logout', Logout)

router.get('/check-auth', checkAuth, (_req: Request, res: Response) =>
  res.send('User authorized')
)

export { router as UserRoutes }
