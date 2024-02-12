import express, { NextFunction, Response, Request, Application } from 'express'
import helmet from 'helmet'
import config from '../config'
import compression from 'compression'
import Get_Session_Details from '../config/session'
import session from 'express-session'
import cors from 'cors'
import passport from '../config/passport'
import { logRequest } from '../common/middleware/logRequest'
import errorHandler from '../middleware/errorHandler'
import { corsOptions, helmetOptions } from '../config/cors-helmet'
import { UserRoutes } from '../routes/user'
import { StatusRoute } from '../routes/status'
import { AuthRoutes } from '../routes/auth'
import Notfound from '../common/errors/custom/notfound'
import { InformationRoute } from '../routes/information'
export default async function ExpressInit(): Promise<Application> {
  const app: Application = express()
  app.set('port', config.app.port)
  app.use(express.json({ limit: '50kb' })) //  used for handling encoded json data
  app.use(express.urlencoded({ extended: false, limit: '50kb' })) // used for handling url encoded form data like name=Example+Test&age=20
  app.use(express.raw({ limit: '50kb' }))
  if (config.NODE_ENV === 'production')
    app.set('trust proxy', 1), app.use(compression)
  else app.use(compression({ level: 3 }))

  const { sconfig } = await Get_Session_Details()

  app.use(session(sconfig))
  app.use(passport.initialize())
  app.use(passport.session())

  // used to reduce the size of the files
  app.use(helmet(helmetOptions))
  app.use(cors(corsOptions))
  app.use(logRequest)
  // i will try using _variable-name  for unused variables

  //ROUTES
  app.use(StatusRoute)
  app.use(InformationRoute)
  app.use(UserRoutes)
  app.use(AuthRoutes)
  app.all('*', (_req: Request, _res: Response, _next: NextFunction) => {
    throw new Notfound(`Route couldn't be found`)
  })
  app.use(errorHandler)
  return app
}
