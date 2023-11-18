import express, { NextFunction, Response, Request } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { logRequest } from '../middleware/logRequest'
import errorHandler from '../middleware/errorHandler'
import NotFound from '../errors/custom/NotFound'
import { corsOptions, helmetOptions } from '../config/cors-helmet'
export default async function ExpressInit() {
  const app = express()
  app.use(express.json()) //  used for handling encoded json data
  app.use(express.urlencoded({ extended: false, limit: '30mb' })) // used for handling url encoded form data like name=Example+Test&age=20
  app.enable('trust proxy') // show ip which can be behind a reverse proxy
  app.use(helmet(helmetOptions))
  app.use(cors(corsOptions))
  app.use(logRequest)

  //ROUTE FOR STATUS CHECKING
  app.get('/alive', (req, res) => res.sendStatus(200)) // a simple status endpoint to check if the server is alive
  app.head('/alive', (req, res) => res.sendStatus(200)) // same thing but we retrieve only response headers

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new NotFound('Route does not exist')
  })

  app.use(errorHandler)
  return app
}
