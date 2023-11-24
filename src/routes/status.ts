import { Router } from 'express'
import { metrics } from '../controller/status'
const router = Router()

router.get('/_alivez', (_req, res) => res.sendStatus(200)) // a simple status endpoint to check if the server is alive
router.head('/_alivez', (_req, res) => res.sendStatus(200)) // same thing but we retrieve only response headers
router.get('/_metricz', metrics)
export { router as StatusRoute }
