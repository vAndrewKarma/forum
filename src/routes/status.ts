import { Router } from 'express'
import endpoint from '../config/api-endpoints'

const router = Router()

router.get(endpoint._alivez.route, endpoint._alivez.controller)

router.head(endpoint._alivez.route, endpoint._alivez.controller)

router.get(endpoint._metricz.route, endpoint._metricz.controller)

export { router as StatusRoute }
