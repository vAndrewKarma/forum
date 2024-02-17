import { Router } from 'express'
import endpoint from '../config/api-endpoints'
import protected_route from '../common/utils/protected_route'

const router = Router()

router.post(
  endpoint.notes.createNotez.route,
  protected_route({ authenthication_route: false }),
  endpoint.notes.createNotez.controller
)

export { router as NotesRoute }
