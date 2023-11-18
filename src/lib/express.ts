import express, { NextFunction, Response, Request } from 'express'
import helmet from 'helmet'
import config from '../config'
import cors from 'cors'
import { logRequest } from '../common/middleware/logRequest'
import errorHandler from '../common/middleware/errorHandler'
import NotFound from '../common/errors/custom/NotFound'
import { corsOptions, helmetOptions } from '../config/cors-helmet'

export default async function ExpressInit() {
  const app = express()
  app.use(express.json({ limit: '30mb' })) //  used for handling encoded json data
  app.use(express.urlencoded({ extended: false, limit: '30mb' })) // used for handling url encoded form data like name=Example+Test&age=20
  app.use(express.raw({ limit: '30mb' }))
  if (config.NODE_ENV === 'production') app.set('trust proxy', 1)
  app.use(helmet(helmetOptions))
  app.use(cors(corsOptions))
  app.use(logRequest)
  //ROUTE FOR STATUS CHECKING
  // i will try using _variable-name  for unused variables
  app.get('/alive', (_req, res) => res.sendStatus(200)) // a simple status endpoint to check if the server is alive
  app.head('/alive', (_req, res) => res.sendStatus(200)) // same thing but we retrieve only response headers

  app.all('*', (_req: Request, _res: Response, _next: NextFunction) => {
    throw new NotFound('Route does not exist')
  })

  app.use(errorHandler)
  return app
}
