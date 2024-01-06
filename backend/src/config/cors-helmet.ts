import { HelmetOptions } from 'helmet'

import config from '.'

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
  exposedHeaders: 'Authorization',
  allowedHeaders: [
    'Authorization',
    'Content-type',
    'Content-Length',
    'Origin',
    'x-csrf-token',
  ],
  preflightContinue: true,

  credentials: true,
  origin: [
    `https://${config.client}`,
    `http://${config.client}`,
    config.client.toString(),
  ],
  methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
}
