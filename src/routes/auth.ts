import express from 'express'
import { Login, Logout } from '../controller/auth'
import protected_route from '../common/utils/protected_route'
import page from '../config/pages-ejs'
const router = express.Router()

// Login route
router.post(
  '/login',
  protected_route(page.profile.route, { authenthication_route: true }),
  Login
)

// Logout route
router.get('/logout', Logout)

export { router as AuthRoutes }
