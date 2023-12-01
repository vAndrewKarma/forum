import express from 'express'

import protected_route from '../common/utils/protected_route'
import endpoint from '../config/api-endpoints'
const router = express.Router()

// Register route
router.post(
  '/register',
  protected_route({
    authenthication_route: true,
  }),
  endpoint.user.register.controller
)

export { router as UserRoutes }
