import { Router } from 'express'

import protected_route from '../common/utils/protected_route'
import endpoint from '../config/api-endpoints'
import { checkCsrf } from '../middleware/checkCsrf'
const router = Router()

router.post(
  endpoint.user.register.route,
  protected_route({
    authenthication_route: true,
  }),
  checkCsrf,
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
router.post(
  endpoint.user.check_link_password_reset.route,
  endpoint.user.check_link_password_reset.controller
)
router.post(
  endpoint.user.new_password.route,
  endpoint.user.new_password.controller
)
router.get(endpoint.user.about_me.route, endpoint.user.about_me.controller)
export { router as UserRoutes }
