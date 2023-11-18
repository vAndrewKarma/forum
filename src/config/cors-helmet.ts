import { HelmetOptions } from 'helmet'
import { logger } from '../common/utils/logger'
import config from '.'
const clients = [config.client] // i will use a random client, but here you configure the clients which can use your api

export const helmetOptions: HelmetOptions = {
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

export const corsOptions = {
  // btw here's a tip, never use cors() cause you basically allow requests for any client, and let's say it is not the best practice if you are building an api
  credentials: true, // when set to true, the request which was made can include credentials, like cookies, http auth
  allowedHeaders: ['Authorization', 'Content-type', 'Content-Lenght', 'Origin'],
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
