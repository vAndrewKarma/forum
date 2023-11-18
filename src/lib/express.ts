import express, { NextFunction, Response, Request } from 'express'
import helmet, { HelmetOptions } from 'helmet'
import cors from 'cors'
import { logRequest } from '../middleware/logRequest'
import config from '../config'
import { logger } from '../config/logger'
import errorHandler from '../middleware/errorHandler'
import NotFound from '../errors/custom/NotFound'
export default async function ExpressInit() {
  const app = express()
  const clients = [config.client] // i will use a random client, but here you configure the clients which can use your api
  const corsopt = {
    // btw here's a tip, never use cors() cause you basically allow requests for any client, and let's say it is not the best practice if you are building an api
    credentials: true, // when set to true, it shows that the request which was made can include credentials, like cookies, http auth
    allowedHeaders: [
      'Authorization',
      'Content-type',
      'Content-Lenght',
      'Origin',
    ],
    origin: function (
      origin: string,
      callback: (arg0: Error, arg1: boolean) => void
    ) {
      if (!origin) return callback(null, true)
      if (clients.includes(origin)) {
        // if origin exists in clients
        callback(null, true)
      } else {
        // error logging
        const error = new Error(`${origin} not allowed`)
        logger.error(error)
        callback(error, false)
      }
    },
  }
  app.enable('trust proxy') // show ip which can be behind a reverse proxy

  const helmetOptions: HelmetOptions = {
    dnsPrefetchControl: { allow: true },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'"],
      },
    },
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    frameguard: {
      action: 'deny',
    },
    xssFilter: true,
    noSniff: true,
  }

  app.use(helmet(helmetOptions))
  app.use(cors(corsopt))
  app.use(logRequest)
  app.use(errorHandler)
  //ROUTE FOR STATUS CHECKING
  app.get('/alive', (req, res) => res.sendStatus(200)) // a simple status endpoint to check if the server is alive
  app.head('/alive', (req, res) => res.sendStatus(200)) // same thing but we retrieve only response headers
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new NotFound('Route does not exist')
  })

  app.use(express.json()) //  used for handling encoded json data

  app.use(express.urlencoded({ extended: false, limit: '30mb' })) // used for handling url encoded form data like name=Example+Test&age=20

  return app
}
