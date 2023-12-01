import express from 'express'
import { Signup } from '../controller/user'
import protected_route from '../common/utils/protected_route'
const router = express.Router()

// Register route
router.post(
  '/register',
  protected_route('/login', { authenthication_route: true }),
  Signup
)

export { router as UserRoutes }
