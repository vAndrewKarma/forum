import { Router } from 'express'
import endpoint from '../config/api-endpoints'

const router = Router()

router.get(endpoint.status._alivez.route, endpoint.status._alivez.controller)

router.head(endpoint.status._alivez.route, endpoint.status._alivez.controller)

router.get(endpoint.status._metricz.route, endpoint.status._metricz.controller)

export { router as StatusRoute }
