import { Router, Request, Response } from 'express'

import { metrics } from '../controller/status'

const router = Router()

router.get('/_alivez', (req: Request, res: Response) => res.sendStatus(200))

router.head('/_alivez', (_req, res) => res.sendStatus(200))

router.get('/_metricz', metrics)

export { router as StatusRoute }
