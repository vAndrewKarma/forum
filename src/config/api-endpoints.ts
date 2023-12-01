import { Request, Response, NextFunction } from 'express'
import { metrics } from '../controller/status'

type ApiEndpoint = {
  route: string
  controller: (req: Request, res: Response, next: NextFunction) => void
  type: string
}

type ApiEndpoints = {
  [key: string]: ApiEndpoint
}
const endpoint: ApiEndpoints = {
  _alivez: {
    route: '/_alivez',
    controller: (_req, res) => res.sendStatus(200),
    type: 'status',
  },
  _metricz: {
    route: '/_metricz',
    controller: metrics,
    type: 'status',
  },
}
export default endpoint
