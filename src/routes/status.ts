import { Router, Request, Response } from 'express'

import { metrics } from '../controller/status'

const router = Router()

router.get('/_alivez', (req: Request, res: Response) => {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + req.session.cookie.maxAge / 1000 + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

router.head('/_alivez', (_req, res) => res.sendStatus(200))

router.get('/_metricz', metrics)

export { router as StatusRoute }
