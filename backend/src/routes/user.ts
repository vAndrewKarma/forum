import { Router } from 'express'

import protected_route from '../common/utils/protected_route'
import endpoint from '../config/api-endpoints'
const router = Router()

// Register route
router.post(
  endpoint.user.register.route,
  protected_route({
    authenthication_route: true,
  }),
  endpoint.user.register.controller
)

router.post(
  endpoint.user.new_location.route,
  endpoint.user.new_location.controller
)
router.post(
  endpoint.user.reset_password.route,
  endpoint.user.reset_password.controller
)
export { router as UserRoutes }
