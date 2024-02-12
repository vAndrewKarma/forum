import { Router } from 'express'
import endpoint from '../config/api-endpoints'
const router = Router()

router.post(
  endpoint.information.userInfo.route,
  endpoint.information.userInfo.controller
)
router.post(
  endpoint.information.getSingleUser.route,
  endpoint.information.getSingleUser.controller
)
export { router as InformationRoute }
