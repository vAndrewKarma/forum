import { Router } from 'express'
import protected_route from '../common/utils/protected_route'
import endpoint from '../config/api-endpoints'
const router = Router()

router.post(
  endpoint.auth.login.route,
  protected_route({
    authenthication_route: true,
  }),
  endpoint.auth.login.controller
)

router.post(
  endpoint.auth.check_auth.route,
  protected_route({
    authenthication_route: false,
  }),
  endpoint.auth.check_auth.controller
)
router.post(endpoint.auth.logout.route, endpoint.auth.logout.controller)

export { router as AuthRoutes }
